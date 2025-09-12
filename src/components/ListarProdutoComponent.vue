<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Lista de produtos
const produtos = ref([])

// Buscar produtos da API
const carregarProdutos = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const response = await axios.get(
      'http://127.0.0.1:8000/api/itens/',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    produtos.value = response.data
    console.log('Produtos carregados:', response.data)
    console.log('Produtos carregados:', response.data)
response.data.forEach(p => console.log(p.nome, p.midia))
  } catch (error) {
    console.error(error.response?.data || error.message)
    alert('Erro ao carregar produtos')
  }
}

// Carregar assim que o componente montar
onMounted(() => {
  carregarProdutos()
})
</script>

<template>
  <div>
    <h2>Produtos cadastrados</h2>
    <ul>
      <li v-for="produto in produtos" :key="produto.id">
        <strong>{{ produto.nome }}</strong> - R$ {{ produto.preco }}
        <br>
        Categoria: {{ produto.categoria }} |
        Condição: {{ produto.condicao }}
        <div v-if="produto.midia && produto.midia.length">
          <img 
            v-for="foto in produto.midia" 
            
            :key="foto.id" 
            :src="foto.arquivo" 
            alt="Foto do produto"
            style="width: 120px; height: 120px; object-fit: cover; margin: 5px; border-radius: 8px;"
          />
        </div>
        <div v-else>
          <small>Sem fotos</small>
        </div>
      </li>
    </ul>
  </div>
</template>
