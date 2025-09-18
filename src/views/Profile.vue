<script >
import api from '@/services/api.js' // vamos usar o axios já configurado

export default {
  name: 'ProfileView',
  props: {
    username: { type: String, required: true }
  },
  data() {
    return {
      profile: null,
      loading: true,
      error: null,
      currentUser: null,
    }
  },
  async created() {
    try {
      // Busca o perfil que está sendo visitado
      const res = await api.get(`profile/${this.username}/`)
      this.profile = res.data
      console.log('Perfil recebido:', this.profile)

      // Busca o usuário logado
      const me = await api.get(`users/me/`)
      this.currentUser = me.data
      console.log('Usuário logado:', this.currentUser)
    } catch (err) {
      console.error('Erro ao carregar perfil:', err)
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
          :src="profile.avatar || '/default-avatar.png'"
          alt="Avatar"
        />
        <h1>{{ profile.name || profile.username || 'Sem nome' }}</h1>
        <div class="username">@{{ profile.user?.username || profile.username || 'desconhecido' }}</div>

        <div v-if="profile.info" class="info">
          {{ profile.info }}
        </div>

        <!-- Só mostra botão se o perfil não for o do próprio user -->
        <button
          v-if="currentUser && profile.user && currentUser.username !== profile.user.username"
          class="chat-btn"
          @click="$router.push({ name: 'chat-room', params: { chatroomName: profile.user.username } })"
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
