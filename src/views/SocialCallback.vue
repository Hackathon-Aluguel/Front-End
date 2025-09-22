<script setup>
import { useRoute, useRouter } from 'vue-router'
import { user as globalUser } from '@/stores/user.js'

const route = useRoute()
const router = useRouter()

const access = route.query.access
const refresh = route.query.refresh
const email = route.query.email
const avatar = route.query.avatar

if (access && refresh && email) {
  // Salva tokens
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)

  // Salva infos do usuário
  localStorage.setItem('globalUser_email', email)
  localStorage.setItem('globalUser_avatar', avatar || '/images/avatar.png')

  // Atualiza store reativa
  globalUser.value = {
    email,
    avatar: avatar || '/images/avatar.png'
  }

  // Redireciona limpando query params
  router.replace('/')
} else {
  router.replace('/login')
}
</script>

<template>
  <div>Conectando com o Google…</div>
</template>
