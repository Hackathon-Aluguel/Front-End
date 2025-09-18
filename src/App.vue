
<script setup>
import CadastrarProduto from '@/components/CadastrarProdutoComponent.vue'
import { user } from '@/stores/user.js'
import api from '@/services/api'

const token = localStorage.getItem('access_token')
if (token && !user.value) {
  api.get('/users/me/').then(res => {
    user.value = res.data
  }).catch(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  })
}
</script>

<template>
  <RouterView />
  <CadastrarProduto />
</template>


<style scoped>
</style>
