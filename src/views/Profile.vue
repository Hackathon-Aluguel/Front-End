<script>
import axios from 'axios'

export default {
  name: 'Profile',
  props: {
    username: { type: String, required: true }
  },
  data() {
    return {
      profile: null,
      loading: true,
      error: null,
      currentUser: null, // usuário logado (vamos buscar do back)
    }
  },
  async created() {
    try {
      // Busca o perfil do usuário
      const res = await axios.get(`/api/profile/${this.username}/`)
      this.profile = res.data

      // Busca dados do usuário logado (opcional, usado p/ esconder botão "Converse comigo")
      const me = await axios.get(`/api/profile/me/`)
      this.currentUser = me.data
    } catch (err) {
      this.error = 'Não foi possível carregar o perfil.'
    } finally {
      this.loading = false
    }
  }
}
</script>

<template>
  <div class="profile-container">
    <div v-if="loading">Carregando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="profile-card">
        <img
          class="avatar"
          :src="profile.avatar"
          alt="Avatar"
        />
        <h1>{{ profile.name }}</h1>
        <div class="username">@{{ profile.user.username }}</div>

        <div v-if="profile.info" class="info">
          {{ profile.info }}
        </div>

        <!-- Só mostra botão se o perfil não for o do próprio user -->
        <button
          v-if="currentUser && currentUser.username !== profile.user.username"
          class="chat-btn"
          @click="$router.push({ name: 'Chat', params: { chatroomName: profile.user.username } })"
        >
          Converse comigo!
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.profile-card {
  text-align: center;
  max-width: 400px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.username {
  color: #777;
  margin-top: -8px;
  margin-bottom: 16px;
}

.info {
  margin-top: 1.5rem;
  white-space: pre-line;
}

.chat-btn {
  margin-top: 1.5rem;
  padding: 10px 16px;
  border: none;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}

.chat-btn:hover {
  background-color: #45a049;
}
</style>

