<template>
  <HeaderComponent />
  <div class="chat-wrapper">
    <!-- Sidebar de conversas -->
    <div class="sidebar">
      <h2 class="sidebar-title">Suas <span>conversas</span></h2>
      <ul class="conversations-list">
        <li
          v-for="(chat, index) in chats"
          :key="index"
          :class="['conversation-item', { active: chat.name === activeChat }]"
          @click="selectChat(chat)"
        >
          <div class="avatar"></div>
          <div class="conversation-info">
            <p class="conversation-name">
              {{ getOtherUsername(chat.participants_usernames) }}
            </p>
            <p class="conversation-preview">
              {{ chat.last_message?.body || 'Nenhuma mensagem ainda' }}
            </p>

          </div>
        </li>
      </ul>
    </div>

    <!-- Área do chat -->
    <div class="chat-area">
      <!-- Cabeçalho -->
      <div class="chat-header">
        <div class="chat-header-avatar"></div>
        <div>
          <p class="chat-header-name">{{ getActiveChatName() }}</p>
        </div>
      </div>

      <!-- Mensagens -->
      <div class="messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', isCurrentUser(msg.username) ? 'sent' : 'received']"
        >
          <!-- Recebidas -->
          <template v-if="!isCurrentUser(msg.username)">
            <div class="avatar small"></div>
            <div class="message-content">
              <span class="author">{{ msg.username }}</span>
              <div class="bubble">
                <span>{{ msg.content }}</span>
                <template v-if="msg.file">
                  <a :href="msg.file" target="_blank" class="file-link">[Arquivo]</a>
                </template>
              </div>
            </div>
          </template>

          <!-- Enviadas -->
          <template v-else>
            <div class="message-content">
              <div class="bubble">
                <span>{{ msg.content }}</span>
                <template v-if="msg.file">
                  <a :href="msg.file" target="_blank" class="file-link">[Arquivo]</a>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Input -->
      <form @submit.prevent="sendMessage" class="chat-input">
        <input
          type="text"
          v-model="newMessage"
          placeholder="Digite sua mensagem aqui..."
        />
        <button type="submit" class="mic-btn">></button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import HeaderComponent from "@/components/HeaderComponent.vue";

const props = defineProps({
  chatroomName: { type: String, default: null } // router passará se houver
});

const router = useRouter();
const route = useRoute();

const newMessage = ref("");
const messages = ref([]);
const ws = ref(null);
const currentUser = ref(null);

const chats = ref([]); // lista de PrivateChat { chat_id, participants_usernames, last_message }
const activeChat = ref(props.chatroomName || ""); // chat_id

import api from "@/services/api";

// Reuse the token helper (or use your interceptor)
const getValidToken = () => localStorage.getItem("access_token");

const isCurrentUser = (username) => {
  return username && currentUser.value && username.toLowerCase() === currentUser.value.toLowerCase();
};

const loadCurrentUser = async () => {
  const token = getValidToken();
  if (!token) return;
  try {
    const res = await api.get("users/me/", { headers: { Authorization: `Bearer ${token}` } });
    currentUser.value = res.data.username;
  } catch (err) {
    console.error("Erro usuário:", err);
  }
};

const loadMessages = async (chatId) => {
  const token = getValidToken();
  if (!token || !chatId) return;
  try {
    const res = await api.get(`chats/${chatId}/messages/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    messages.value = res.data.map((m) => ({
      id: m.id,
      username: m.author_username,
      content: m.body,
      file: m.file,
      created: m.created,
    }));
    scrollToBottom();
  } catch (err) {
    console.error("Erro mensagens:", err);
    // Se receber 404 -> redireciona pra lista de chats ou mostra erro
    if (err.response && err.response.status === 404) {
      alert("Você não tem permissão para acessar essa conversa (404).");
      // redirect to chat index
      router.push({ name: "home" });
    }
  }
};

const loadMyChats = async () => {
  const token = getValidToken();
  if (!token) return;
  try {
    const res = await api.get("chats/", { headers: { Authorization: `Bearer ${token}` } });
    chats.value = res.data; // cada item: {chat_id, participants_usernames, last_message, created}
  } catch (err) {
    console.error("Erro ao carregar chats:", err);
  }
};

const connectWebSocket = async (chatId) => {
  const token = getValidToken();
  if (!token || !chatId) return;

  // fecha conexão antiga se existir
  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    ws.value.close();
  }

  ws.value = new WebSocket(`ws://127.0.0.1:8000/ws/chatroom/${chatId}/?token=${token}`);

  ws.value.onopen = () => console.log("WS conectado", chatId);
  ws.value.onmessage = (e) => {
  const data = JSON.parse(e.data);

  // 🔹 evita duplicar a mensagem do próprio usuário
  if (data.author === currentUser.value) {
    const alreadyExists = messages.value.some(
      (m) =>
        m.content === data.message &&
        m.username === currentUser.value &&
        !m.pending
    );
    if (alreadyExists) return;

    // 🔹 remove a versão "pendente" e substitui pela confirmada
    const pendingIndex = messages.value.findIndex(
      (m) => m.pending && m.content === data.message
    );
    if (pendingIndex !== -1) messages.value.splice(pendingIndex, 1);
  }

  // 🔹 adiciona a nova mensagem (ou atualizada)
  messages.value.push({
    id: data.id,
    username: data.author,
    content: data.message,
    file: data.file,
    created: data.created,
  });

  scrollToBottom();
};

  ws.value.onclose = (ev) => {
    console.log("WS fechado", ev);
    // se foi fechado porque forbidden (server fechou), não reconectamos automaticamente.
    // se quiser reconexão automática, adicione lógica aqui com backoff.
  };
  ws.value.onerror = (err) => {
    console.error("WS error", err);
  };
};

const scrollToBottom = () => {
  const c = document.querySelector(".messages");
  if (c) c.scrollTop = c.scrollHeight;
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  const chatId = activeChat.value;

  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    const tempId = Date.now(); // 🔹 id temporário

    // 🔹 adiciona a mensagem localmente (para feedback imediato)
    messages.value.push({
      id: tempId,
      username: currentUser.value,
      content: newMessage.value,
      file: null,
      created: new Date().toISOString(),
      pending: true,
    });

    // 🔹 envia ao servidor
    ws.value.send(JSON.stringify({ message: newMessage.value }));

    newMessage.value = "";
    scrollToBottom();
    return;
  }

  // fallback via REST
  const token = getValidToken();
  if (!token) return;
  try {
    await api.post(
      `chats/${chatId}/messages/`,
      { body: newMessage.value },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    newMessage.value = "";
  } catch (err) {
    console.error("Erro ao enviar via REST:", err);
  }
};

const selectChat = (chat) => {
  // quando clicar em um chat na sidebar, navegamos para a rota do chat
  router.push({ name: "chat-room", params: { chatroomName: chat.chat_id } });
};

const refreshChats = async () => {
  await loadMyChats();
};

const getOtherUsername = (participants) => {
  if (!participants || !currentUser.value) return "";
  return participants.find(u => u !== currentUser.value) || "Desconhecido";
};

const getActiveChatName = () => {
  const chat = chats.value.find(c => c.chat_id === activeChat.value);
  return chat ? getOtherUsername(chat.participants_usernames) : activeChat.value;
};


onMounted(async () => {
  await loadCurrentUser();
  await loadMyChats();

  const initialChat = props.chatroomName || (chats.value.length ? chats.value[0].chat_id : null);
  if (initialChat) {
    activeChat.value = initialChat;
    await loadMessages(activeChat.value);
    connectWebSocket(activeChat.value);
  }
});

// watch para quando rota/propriedade mudar (usuário navegou)
watch(() => route.params.chatroomName, async (newVal) => {
  if (!newVal) return;
  activeChat.value = newVal;
  messages.value = [];
  if (ws.value) {
    try { ws.value.close(); } catch (e) {}
  }
  await loadMessages(activeChat.value);
  connectWebSocket(activeChat.value);
});
</script>





<style scoped>
.chat-wrapper {
  display: flex;
  height: 80vh;
  margin: 2vh auto;
  max-width: 90vw;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 25%;
  background: #fff;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.sidebar-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
}
.sidebar-title span {
  color: #265df2;
}

.conversations-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.conversation-item:hover {
  background: #f5f5f5;
}
.conversation-item.active {
  background: #265df2;
  color: #fff;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #265df2;
}
.avatar.small {
  width: 35px;
  height: 35px;
}

.conversation-info {
  flex: 1;
}
.conversation-name {
  font-weight: bold;
}
.conversation-preview {
  font-size: 0.85rem;
  color: #777;
}

/* Área do chat */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom right, #f9f9fb, #eef1f8);
}

/* Header */
.chat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  background: #fff;
}
.chat-header-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #265df2;
}
.chat-header-name {
  font-weight: bold;
  font-size: 1.1rem;
}
.chat-header-sub {
  font-size: 0.8rem;
  color: #999;
}

/* Mensagens */
.messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.message {
  display: flex;
  align-items: flex-start;
  max-width: 60%;
}
.message.received {
  justify-content: flex-start;
}
.message.sent {
  margin-left: auto;
  justify-content: flex-end;
}
.message.sent .bubble {
  background: #265df2;
  color: #fff;
}
.message.received .bubble {
  background: #eee;
  color: #000;
}
.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.bubble {
  padding: 10px 14px;
  border-radius: 10px;
}
.author {
  font-size: 0.8rem;
  color: #555;
  margin-bottom: 2px;
}
.file-link {
  display: block;
  font-size: 0.8rem;
  text-decoration: underline;
  margin-top: 5px;
}

/* Input */
.chat-input {
  display: flex;
  align-items: center;
  padding: 12px;
  border-top: 1px solid #ddd;
  background: #fff;
  gap: 10px;
}
.chat-input input[type="text"] {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 25px;
  background: #f5f5f5;
  outline: none;
}
.mic-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #265df2;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
