<script setup>
import { reactive, ref } from 'vue'

const produtos = reactive([
  {
    id: 1,
    nome: 'pantufas extremamente macias',
    preco: 30,
    estrelas: 4,
    cidade: 'Joinville',
    estado: 'SC',
    likes: 20,
    liked: false,
    periodoInicial: new Date(2025, 7, 28),
    periodoFinal: new Date(2025, 7, 30),
    imagem: 'https://picsum.photos/400/300?random=100',
    categoria: 'Roupas e acessorios',
    editando: false,
  },
  {
    id: 2,
    nome: 'saco de dormir',
    preco: 25,
    estrelas: 5,
    cidade: 'Joinville',
    estado: 'SC',
    likes: 4,
    liked: false,
    periodoInicial: new Date(2025, 7, 28),
    periodoFinal: new Date(2025, 7, 30),
    imagem: 'https://picsum.photos/400/300?random=101',
    categoria: 'esporte e lazer',
    editando: false,
  },
  {
    id: 3,
    nome: 'lanterna',
    preco: 10,
    estrelas: 4,
    cidade: 'Joinville',
    estado: 'SC',
    likes: 14,
    liked: false,
    periodoInicial: new Date(2025, 7, 28),
    periodoFinal: new Date(2025, 7, 30),
    imagem: 'https://picsum.photos/400/300?random=102',
    categoria: 'Casa e utilidades',
    editando: false,
  },
  {
    id: 4,
    nome: 'fogareiro',
    preco: 40,
    estrelas: 3,
    cidade: 'Joinville',
    estado: 'SC',
    likes: 12,
    liked: false,
    periodoInicial: new Date(2025, 7, 28),
    periodoFinal: new Date(2025, 7, 30),
    imagem: 'https://picsum.photos/400/300?random=103',
    categoria: 'esporte e lazer',
    editando: false,
  },
  {
    id: 5,
    nome: 'mochila',
    preco: 50,
    estrelas: 5,
    cidade: 'Joinville',
    estado: 'SC',
    likes: 10,
    liked: false,
    periodoInicial: new Date(2025, 7, 28),
    periodoFinal: new Date(2025, 7, 30),
    imagem: 'https://picsum.photos/400/300?random=104',
    categoria: 'Roupas e acessorios',
    editando: false,
  },
])
function toggleLike(produto) {
  produto.liked = !produto.liked
  produto.likes += produto.liked ? 1 : -1
}
</script>

<template>
    <section>
        <div class="produtosTodo">
        <div class="rolagem">
<ul>
          <li v-for="produto in produtos" :key="produto.id" class="produto">
            <div class="info">
              <img :src="produto.imagem" :alt="produto.nome" width="200" />
              <div class="nome">
                <h2>{{ produto.nome }}</h2>
                <p>{{ produto.categoria }}</p>
                <p><span class="mdi mdi-map-marker"></span> {{ produto.cidade }} - {{ produto.estado }}</p>
                <h2>R${{ produto.preco }}/dia</h2>
              </div>
            </div>
                <button class="like-btn" @click="toggleLike(produto)">
                <span :class="produto.liked ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"></span>
                {{ produto.likes }}
              </button>
            </li>
            </ul>
        </div>
        </div>
        

    </section>
</template>

<style scoped>
section div.produtosTodo {
  margin: 4vw 4vw 0 4vw;
  width: 40%;
}
section div.produtosTodo .rolagem {
  max-height: 35vw;
  overflow-y: auto;
  border-radius: 1vw;
}
.rolagem::-webkit-scrollbar {
  width: 8px;
  /* largura da barra */
}

.rolagem::-webkit-scrollbar-thumb {
  background: #1d2d51;
  /* cor do "botão" que arrasta */
  border-radius: 8px;
}

.rolagem::-webkit-scrollbar-thumb:hover {
  background: #244e84;
  /* cor quando passa o mouse */
}
section ul li.produto {
    display: flex;
    justify-content: space-between;
    width: 35vw;
    height: 20vh;
    border: 1px solid #cdcdcd;
    border-radius: 1vw;
    margin: 1vw;
}
section ul li.produto img {
    width: 15vw;
    height: 15vh;
    margin: 1vw;
    border-radius: 1vw;
    
}
section ul li.produto div.info{
display: flex;
  width: 40%;
}
section ul li.produto div.info h2 {
    font-size: 1.2vw;
  white-space: nowrap;
  /* não deixa quebrar a linha */
  overflow: hidden;
  /* corta o que passar do espaço */
  text-overflow: ellipsis;
  /* mostra "..." no fim se cortar */
  max-width: 12vw;
  margin: 1vw 0 0 0;
}
section ul li.produto .like-btn {
  background: #244e84;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 3vw;
  height: 2vw;
  margin: 1vw 1vw;
}
</style>