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
          @click="selectChat(chat.name)"
        >
          <div class="avatar"></div>
          <div class="conversation-info">
            <p class="conversation-name">{{ chat.name }}</p>
            <p class="conversation-preview">{{ chat.preview }}</p>
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
          <p class="chat-header-name">{{ activeChat }}</p>
          <span class="chat-header-sub">Clique para ver o perfil do usuário</span>
        </div>
      </div>

      <!-- Mensagens -->
      <div class="messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.username === 'Você' ? 'sent' : 'received']"
        >
          <template v-if="msg.username !== 'Você'">
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

          <template v-else>
            <div class="bubble">
              <span>{{ msg.content }}</span>
              <template v-if="msg.file">
                <a :href="msg.file" target="_blank" class="file-link">[Arquivo]</a>
              </template>
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
        <button type="submit" class="mic-btn" @click="submit">></button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import HeaderComponent from "@/components/HeaderComponent.vue";

const chatroomName = ref("public-chat");
const newMessage = ref("");
const messages = ref([]);
const selectedFile = ref(null);
const ws = ref(null);

const chats = ref([
  { name: "Erick", preview: "Lorem ipsum dolor sit amet" },
  { name: "Matue", preview: "Lorem ipsum dolor sit amet" },
  { name: "Renan", preview: "Lorem ipsum dolor sit amet" },
  { name: "Teteu", preview: "Lorem ipsum dolor sit amet" },
  { name: "Ricardo", preview: "Lorem ipsum dolor sit amet" },
  { name: "Bianca Lunelli", preview: "Lorem ipsum dolor sit amet" },
]);
const activeChat = ref("Renan");

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

const getValidToken = async () => {
  let token = localStorage.getItem("access_token");
  if (!token) {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) return null;
    try {
      const res = await api.post("token/refresh/", { refresh });
      token = res.data.access;
      localStorage.setItem("access_token", token);
    } catch (err) {
      console.error("Erro ao renovar token", err);
      return null;
    }
  }
  return token;
};

const loadMessages = async () => {
  try {
    const token = await getValidToken();
    if (!token) return;
    const res = await api.get(`chat/${chatroomName.value}/messages/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    messages.value = res.data.map((msg) => ({
      username: msg.author_username,
      content: msg.body,
      file: msg.file,
    }));
    scrollToBottom();
  } catch (err) {
    console.error("Erro ao carregar mensagens:", err);
  }
};

const connectWebSocket = async () => {
  const token = await getValidToken();
  if (!token) return;

  ws.value = new WebSocket(
    `ws://127.0.0.1:8000/ws/chatroom/${chatroomName.value}/?token=${token}`
  );

  ws.value.onopen = () => console.log("WS conectado");

  ws.value.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.author !== "voce") {
      messages.value.push({
        username: data.author,
        content: data.message,
        file: data.file || null,
      });
      scrollToBottom();
    }
  };

  ws.value.onclose = () => {
    console.warn("WS fechado, reconectando em 2s...");
    setTimeout(connectWebSocket, 2000);
  };

  ws.value.onerror = (err) => console.error("Erro WS", err);
};

const scrollToBottom = () => {
  const container = document.querySelector(".messages");
  if (container) container.scrollTop = container.scrollHeight;
};

const sendMessage = async () => {
  if (!newMessage.value && !selectedFile.value) return;

  let tempMessage = { username: "Você", content: newMessage.value, file: null };

  if (selectedFile.value) {
    const formData = new FormData();
    formData.append("file", selectedFile.value);
    try {
      const token = await getValidToken();
      const res = await api.post(`chat/fileupload/${chatroomName.value}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      tempMessage.file = res.data.file;
      selectedFile.value = null;
    } catch (err) {
      console.error("Erro upload:", err);
      return;
    }
  }

  messages.value.push(tempMessage);
  newMessage.value = "";
  scrollToBottom();

  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    ws.value.send(
      JSON.stringify({
        author: "Você",
        message: tempMessage.content,
        file: tempMessage.file,
      })
    );
  }
};

// const handleFileUpload = (event) => {
//   selectedFile.value = event.target.files[0];
//   event.target.value = "";
// };

const selectChat = (name) => {
  activeChat.value = name;
};

onMounted(() => {
  loadMessages();
  connectWebSocket();
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
.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.bubble {
  padding: 10px 14px;
  border-radius: 10px;
  background: #eee;
}
.sent .bubble {
  background: #265df2;
  color: #fff;
}
.file-link {
  display: block;
  font-size: 0.8rem;
  text-decoration: underline;
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
