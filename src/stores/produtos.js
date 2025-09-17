import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useProdutosStore = defineStore('produtos', () => {
  const produtos = reactive([
    { id: 1, nome: 'Pantufas extremamente macias', preco: 30, estrelas: 4, cidade: 'Joinville', estado: 'SC', likes: 20, liked: false, imagem: 'https://picsum.photos/400/300?random=100', categoria: 'Roupas e acessorios' },
    { id: 2, nome: 'Saco de dormir', preco: 25, estrelas: 5, cidade: 'Joinville', estado: 'SC', likes: 4, liked: false, imagem: 'https://picsum.photos/400/300?random=101', categoria: 'Esporte e lazer' },
    { id: 3, nome: 'Lanterna', preco: 10, estrelas: 4, cidade: 'Joinville', estado: 'SC', likes: 14, liked: false, imagem: 'https://picsum.photos/400/300?random=102', categoria: 'Casa e utilidades' },
    { id: 4, nome: 'Fogareiro', preco: 40, estrelas: 3, cidade: 'Joinville', estado: 'SC', likes: 12, liked: false, imagem: 'https://picsum.photos/400/300?random=103', categoria: 'Esporte e lazer' },
    { id: 5, nome: 'Mochila', preco: 50, estrelas: 5, cidade: 'Joinville', estado: 'SC', likes: 10, liked: false, imagem: 'https://picsum.photos/400/300?random=104', categoria: 'Roupas e acessorios' },
])

  function adicionarProduto(produto) {
    produtos.push(produto)
  }

  return { produtos, adicionarProduto }
})