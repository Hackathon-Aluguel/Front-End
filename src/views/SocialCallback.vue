<script setup>
import { useRoute, useRouter } from 'vue-router'
import { user as globalUser } from '@/stores/user.js'

const route = useRoute()
const router = useRouter()

const access = route.query.access
const refresh = route.query.refresh
const email = route.query.email

if (access && refresh) {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)

  globalUser.value = {
    email: email || 'Usuário Google',
    avatar: route.query.avatar || 'caminho/default.png'
  }

  router.replace('/')
} else {
  router.replace('/login')
}
</script>

<template>
  <div>Conectando com o Google…</div>
</template>
