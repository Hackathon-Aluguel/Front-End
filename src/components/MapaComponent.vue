<script setup>
import { reactive, ref } from 'vue'
import MapaScriptComponent from './MapaScriptComponent.vue'

const produtos = reactive([
  { id: 1, nome: 'Pantufas extremamente macias', preco: 30, estrelas: 4, cidade: 'Joinville', estado: 'SC', likes: 20, liked: false, imagem: 'https://picsum.photos/400/300?random=100', categoria: 'Roupas e acessorios' },
  { id: 2, nome: 'Saco de dormir', preco: 25, estrelas: 5, cidade: 'Joinville', estado: 'SC', likes: 4, liked: false, imagem: 'https://picsum.photos/400/300?random=101', categoria: 'Esporte e lazer' },
  { id: 3, nome: 'Lanterna', preco: 10, estrelas: 4, cidade: 'Joinville', estado: 'SC', likes: 14, liked: false, imagem: 'https://picsum.photos/400/300?random=102', categoria: 'Casa e utilidades' },
  { id: 4, nome: 'Fogareiro', preco: 40, estrelas: 3, cidade: 'Joinville', estado: 'SC', likes: 12, liked: false, imagem: 'https://picsum.photos/400/300?random=103', categoria: 'Esporte e lazer' },
  { id: 5, nome: 'Mochila', preco: 50, estrelas: 5, cidade: 'Joinville', estado: 'SC', likes: 10, liked: false, imagem: 'https://picsum.photos/400/300?random=104', categoria: 'Roupas e acessorios' },
])

const hoverId = ref(-1)

function toggleLike(produto) {
  produto.liked = !produto.liked
  produto.likes += produto.liked ? 1 : -1
}

function marcarHover(id) {
  hoverId.value = id
}

function removerHover() {
  hoverId.value = -1
}
</script>

<template>
  <section>
    <div class="produtosTodo">
      <div class="rolagem">
        <ul>
          <li v-for="produto in produtos" :key="produto.id" class="produto"
              @mouseover="marcarHover(produto.id)"
              @mouseleave="removerHover()">
            <div class="info">
              <img :src="produto.imagem" :alt="produto.nome" />
              <div class="nome">
                <h2>{{ produto.nome }}</h2>
                <p class="categoria">{{ produto.categoria }}</p>
                <p><span class="mdi mdi-map-marker"></span> {{ produto.cidade }} - {{ produto.estado }}</p>
                <h2 class="preco">R${{ produto.preco }}/dia</h2>
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
    <div class="mapa">
      <MapaScriptComponent :hoverId="hoverId" />
    </div>
  </section>
</template>

<style scoped>
p,h1,h2,button {
  font-family: poppins, sans-serif;
}
section {
  background-color: white;
  display: flex;
}
section div.produtosTodo {
  margin: 4vw 4vw 0 0vw;
  width: 36%;
  background-color: white ;
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
    width: 30vw;
    height: 20vh;
    border: 1px solid #cdcdcd;
    border-radius: 1vw;
    margin: 1vw;
}
section ul li.produto img {
    width: 11vw;
    height: 15vh;
    margin: 1vw;
    border-radius: 1vw;
    
}
section ul li.produto div.info{
display: flex;
}
section ul li.produto div.info div.nome {
  width: 11vw;
}
section ul li.produto div.info p.categoria {
  color: #BEBEBE;
}
section ul li.produto div.info p {
  color: #CDCDCD;
}
section ul li.produto div.info h2 {
    font-size: 1.2vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12vw;
  margin: 0.5vw 0 0 0;
  color: black;
  font-weight: bold;
}
section ul li.produto div.info h2.preco {
  color: #386CBE;
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
  gap: 2px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 4vw;
  height: 2vw;
  margin: 1vw 1vw;
}
</style>