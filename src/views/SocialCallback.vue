<script setup>
import { useRoute, useRouter } from 'vue-router'
import { user as globalUser } from '@/stores/user.js'

const route = useRoute()
const router = useRouter()

const access = route.query.access
const refresh = route.query.refresh
const email = route.query.email
const avatar = route.query.avatar

if (access && refresh) {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)

  // Salva usuário globalmente
  globalUser.value = {
    email: email || 'Usuário Google',
    avatar: avatar || 'caminho/default.png'
  }

  router.replace('/')
} else {
  router.replace('/login')
}
</script>

<template>
  <div>Conectando com o Google…</div>
</template>
