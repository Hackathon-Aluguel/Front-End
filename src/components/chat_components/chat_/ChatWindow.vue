<template>
  <div class="chat-window">
    <!-- Cabeçalho do chat -->
    <div class="chat-header">
      <div :class="['online-indicator', onlineClass, 'fade-in-scale']"></div>
      <router-link :to="{ name: 'profile', params: { username: otherUser.username } }">
        <div class="user-info">
          <img class="avatar" :src="otherUser.profile.avatar" />
          <div>
            <span class="name">{{ otherUser.profile.name }}</span>
            <span class="username">@{{ otherUser.username }}</span>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Mensagens -->
    <div class="chat-messages" ref="chatContainer">
      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :message="msg"
        :currentUser="currentUser"
      />
    </div>

    <!-- Área de envio -->
    <div class="chat-input-area">
      <form @submit.prevent="sendMessage" class="chat-form">
        <input v-model="newMessage" type="text" placeholder="Digite sua mensagem..." />
        <button type="submit">Enviar</button>
      </form>

      <form @submit.prevent="sendFile" class="file-form" enctype="multipart/form-data">
        <input type="file" ref="fileInput" />
        <button type="submit">Enviar arquivo</button>
      </form>
    </div>
  </div>
</template>

<script>
import ChatMessage from '@/components/ChatMessage.vue'

export default {
  name: 'ChatWindow',
  components: { ChatMessage },
  props: {
    otherUser: Object,
    onlineCount: Number,
    chatroomName: String,
    currentUser: Object,
    initialMessages: Array
  },
  data() {
    return {
      messages: this.initialMessages || [],
      newMessage: '',
      ws: null
    }
  },
  computed: {
    onlineClass() {
      return this.onlineCount > 0 ? 'green-dot' : 'gray-dot'
    }
  },
  mounted() {
    this.connectWebSocket()
    this.scrollToBottom()
  },
  beforeUnmount() {
    if (this.ws) this.ws.close()
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContainer
        container.scrollTop = container.scrollHeight
      })
    },

    // Conecta ao WebSocket
    connectWebSocket() {
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
      const wsUrl = `${protocol}://${window.location.host}/ws/chatroom/${this.chatroomName}/`
      this.ws = new WebSocket(wsUrl)

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'chat_message') {
          this.messages.push(data.message)
          this.scrollToBottom()
        }
      }

      this.ws.onclose = () => {
        console.log('WebSocket fechado. Tentando reconectar em 2s...')
        setTimeout(this.connectWebSocket, 2000)
      }

      this.ws.onerror = (err) => {
        console.error('Erro no WebSocket:', err)
      }
    },

    sendMessage() {
      if (!this.newMessage.trim() || !this.ws || this.ws.readyState !== WebSocket.OPEN) return

      const payload = {
        type: 'chat_message',
        body: this.newMessage
      }

      this.ws.send(JSON.stringify(payload))
      this.newMessage = ''
    },

    async sendFile() {
      const file = this.$refs.fileInput.files[0]
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch(`/api/chat/fileupload/${this.chatroomName}/`, {
          method: 'POST',
          body: formData,
          headers: { 'X-CSRFToken': this.getCSRFToken() }
        })
        const data = await res.json()
        this.messages.push(data)
        this.$refs.fileInput.value = ''
        this.scrollToBottom()
      } catch (err) {
        console.error('Erro ao enviar arquivo:', err)
      }
    },

    getCSRFToken() {
      const value = `; ${document.cookie}`
      const parts = value.split(`; csrftoken=`)
      if (parts.length === 2) return parts.pop().split(';').shift()
      return ''
    }
  }
}
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 700px;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
}

.online-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.green-dot { background-color: #4caf50; }
.gray-dot { background-color: #888; }

@keyframes fadeInScale {
  from { opacity: 0; transform: scale(4); }
  to { opacity: 1; transform: scale(1); }
}
.fade-in-scale {
  animation: fadeInScale 0.6s ease;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #f4f4f4;
}

.chat-input-area {
  padding: 10px;
  border-top: 1px solid #ccc;
}

.chat-form, .file-form {
  display: flex;
  gap: 6px;
}
.chat-form input {
  flex: 1;
}
</style>



