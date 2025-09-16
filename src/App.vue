<script setup>
import { user } from '@/stores/user.js'
import api from '@/services/api'
import CadastrarProdutoComponent from './components/CadastrarProdutoComponent.vue'

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
  <CadastrarProdutoComponent />
</template>

<style scoped>
</style>
