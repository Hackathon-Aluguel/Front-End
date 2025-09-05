<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const access = route.query.access
const refresh = route.query.refresh

if (access && refresh) {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
  router.replace('/')
} else {
  router.replace('/login')
}
</script>

<template>
  <div>Conectando com o Google…</div>
</template>
