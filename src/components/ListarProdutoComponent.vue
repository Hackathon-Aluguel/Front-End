<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

// Lista de produtos
const produtos = ref([])

// Checa se o usuário está logado
const isLogged = computed(() => !!localStorage.getItem('access_token'))

// Função para carregar produtos
const carregarProdutos = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/itens/')
    produtos.value = response.data
    console.log('Produtos carregados:', response.data)
  } catch (error) {
    console.error(error.response?.data || error.message)
    alert('Erro ao carregar produtos')
  }
}

// Carrega produtos assim que o componente monta
onMounted(() => {
  carregarProdutos()
})
</script>

<template>
  <div>
    <h1>Produtos Cadastrados</h1>

    <ul v-if="produtos.length">
      <li v-for="produto in produtos" :key="produto.id" style="margin-bottom: 30px;">
        <h2>{{ produto.nome }}</h2>
        <p>{{ produto.descricao }}</p>
        <strong>R$ {{ produto.preco }}</strong>
        <p>Categoria: {{ produto.categoria }} | Condição: {{ produto.condicao }}</p>
        <div v-if="produto.midias && produto.midias.length" style="display:flex; gap:10px; flex-wrap:wrap;">
          <div v-for="foto in produto.midias" :key="foto.id">
  <p>{{ foto.url }}</p> <!-- mostrar o link da imagem -->
  <img :src="foto.url" style="width:120px; height:120px; object-fit:cover;" />
</div>
<div v-for="foto in produto.midias" :key="foto.id">
  <p>{{ foto.url }}</p> <!-- mostrar o link da imagem -->
  <img :src="foto.file" style="width:120px; height:120px; object-fit:cover;" />
</div>
</div>
      </li>
    </ul>

    <div v-else>
      <p>Nenhum produto cadastrado ainda.</p>
    </div>

    <div v-if="!isLogged">
      <p>Para cadastrar produtos, <RouterLink to="/login">entre</RouterLink> primeiro.</p>
    </div>
  </div>
</template>
