<script setup>
import { user } from '@/stores/user.js'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const route = useRoute()

// Pega os tokens da URL
const access = route.query.access
const refresh = route.query.refresh

if (access && refresh) {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)

  // Busca dados do usuário logado
  api.get('/users/me/').then(res => {
    user.value = res.data
    router.replace('/') // redireciona para home
  }).catch(() => {
    router.replace('/login')
  })
} else {
  router.replace('/login')
}
</script>
