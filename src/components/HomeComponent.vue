<script setup>
import 'vue3-carousel/carousel.css'
import { ref, reactive } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
const liked = ref(false)
const likes = ref(0)

const showNav = ref(false)
// Carrossel de 1 imagem
const imagesSingle = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/400/300?random=${index + 100}`,
}))
const imagesSingle1 = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/400/300?random=${index + 100}`,
}))
// Carrossel multi-imagem
const imagesMulti = [
  { id: 1, nome: 'fantasias' },
  { id: 2, nome: 'camping' },
  { id: 3, nome: 'Brinquedos' },
  { id: 4, nome: 'Ferramentas' },
  { id: 5, nome: 'construção' },
  { id: 6, nome: 'limpeza' },
]

// Carousel configuration
// Configuração carrossel 1 imagem
const configSingle = {
  height: 510,
  itemsToShow: 1,
  gap: 5,
  snapAlign: 'center',
  breakpointMode: 'carousel',
}
const configDuo = {
  height: 510,
  itemsToShow: 2, // sempre 2 produtos por vez
  snapAlign: 'start', // alinha ao iniciar o slide              // espaço entre produtos
  breakpoints: {
    600: { itemsToShow: 1 }, // celular
    900: { itemsToShow: 2 }, // tablet/desktop
    1200: { itemsToShow: 2 }, // desktop grande
  },
}
const configMulti = {
  height: 200,
  itemsToShow: 4,
  gap: 20,
  snapAlign: 'center',
  breakpointMode: 'carousel',
  breakpoints: {
    300: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    400: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    500: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
  },
}
const configMulti1 = {
  itemsToShow: 4, // mantém 4 produtos por slide
  snapAlign: 'start',
  breakpointMode: 'carousel',
  breakpoints: {
    300: { itemsToShow: 1 },
    600: { itemsToShow: 2 },
    900: { itemsToShow: 3 },
    1200: { itemsToShow: 4 },
  },
}

const produtos = reactive([
  { id: 1, nome: 'barraca', preco: 30, estrelas: 4, likes: 20, liked: false },
  { id: 2, nome: 'saco de dormir', preco: 25, estrelas: 5, likes: 4, liked: false },
  { id: 3, nome: 'lanterna', preco: 10, estrelas: 4, likes: 14, liked: false },
  { id: 4, nome: 'fogareiro', preco: 40, estrelas: 3, likes: 12, liked: false },
  { id: 5, nome: 'mochila', preco: 50, estrelas: 5, likes: 10, liked: false },
])
function toggleLike(produto) {
  produto.liked = !produto.liked
  produto.likes += produto.liked ? 1 : -1
}
</script>

<template>
  <section>
    <div class="meio">
      <div class="carousel__wrapper">
        <Carousel v-bind="configSingle">
          <Slide v-for="image in imagesSingle" :key="image.id">
            <img :src="image.url" alt="image" />
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
  <section>
    <div class="meio">
      <div class="carousel1">
        <Carousel v-bind="configMulti">
          <Slide v-for="categoria in imagesMulti" :key="categoria.id">
            <button class="nome">
              <p v-text="categoria.nome"></p>
            </button>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
  <section class="carro3">
    <h1 class="titulo">Mais v<span>e</span>ndidos</h1>
    <div class="meio">
      <div class="carousel2">
        <Carousel v-bind="configMulti1">
          <Slide v-for="produto in produtos" v-bind:key="produto.id">
            <div class="produto">
              <button class="like-btn" @click="toggleLike(produto)">
                <span :class="produto.liked ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"></span>
                {{ produto.likes }}
              </button>

              <div class="imagem" @mouseover="showNav = true" @mouseleave="showNav = false">
                <Carousel v-bind="configSingle1" class="carroProduto">
                  <Slide v-for="image in imagesSingle1" :key="image.id">
                    <img :src="image.url" alt="image" />
                  </Slide>
                  <template #addons>
                    <Navigation />
                  </template>
                </Carousel>
              </div>

              <h1>{{ produto.nome }}</h1>

              <div class="info">
                <strong>R${{ produto.preco }}/dia</strong>
                <p>{{ produto.estrelas }} <span class="mdi mdi-star"></span></p>
              </div>
              <button class="alugar">Alugar</button>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
  <section class="carro4">
    <div class="esquerda">
      <img src="https://picsum.photos/400/300" alt="" />
    </div>
    <div class="carouselDuo">
      <Carousel v-bind="configDuo">
        <Slide v-for="produto in produtos" v-bind:key="produto.id">
          <div class="produto">
            <div class="imagem" @mouseover="showNav = true" @mouseleave="showNav = false">
              <button class="like-btn2" @click="toggleLike(produto)">
                <span :class="produto.liked ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"></span>
                {{ produto.likes }}
              </button>
              <Carousel v-bind="configSingle1" class="carroProduto">
                <Slide v-for="image in imagesSingle1" :key="image.id">
                  <img :src="image.url" alt="image" />
                </Slide>
                <template #addons>
                  <Navigation />
                </template>
              </Carousel>
            </div>

            <h1>{{ produto.nome }}</h1>

            <div class="info">
              <strong>R${{ produto.preco }}/dia</strong>
              <p>{{ produto.estrelas }} <span class="mdi mdi-star"></span></p>
            </div>
            <button class="alugar">Alugar</button>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>
  <section class="avaliacoes">
    <h1>SUA OPNIÃO TAMBÉM IMPORTA!</h1>
    <h3>Confira os comentarios de quem usa nossa plataforma<br> no dia a dia</h3>
    <ul>
      <li>
        <img src="https://picsum.photos/400/300" alt="" />
        <h2>Renan</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis culpa rem laudantium
          sunt ipsam iure repellat numquam, fugiat quo quae reiciendis minus praesentium id quidem
          dolor natus esse, temporibus nisi?
        </p>
        <div class="estrelas">
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
        </div>
      </li>
      <li>
        <img src="https://picsum.photos/400/300" alt="" />
        <h2>Ricardo</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis culpa rem laudantium
          sunt ipsam iure repellat numquam, fugiat quo quae reiciendis minus praesentium id quidem
          dolor natus esse, temporibus nisi?
        </p>
          <div class="estrelas">
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star-half-full"></span>
        </div>
      </li>
      <li>
        <img src="https://picsum.photos/400/300" alt="" />
        <h2>Mateus
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis culpa rem laudantium
          sunt ipsam iure repellat numquam, fugiat quo quae reiciendis minus praesentium id quidem
          dolor natus esse, temporibus nisi?
        </p>
        <div class="estrelas">
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
          <span class="mdi mdi-star"></span>
        </div>
      </li>
    </ul>
  </section>
</template>

<style>
:root {
  background-color: #242424;
}

/* PRIMEIRO CARROSELLLLLLLLLLLLLLLL */
.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
  margin: 0 0.78vw 0 0.78vw;
}

.meio {
  display: flex;
  justify-content: center;
  /* centro horizontal */
  align-items: center;
  /* centro vertical se quiser */
}

.carousel__wrapper img {
  width: 88%;
  height: 100%;
  border-radius: 1vw;
}

.carousel__wrapper {
  max-width: 80vw;
  margin: 3vw 0 0 0;
}

/* SEGUNDO CARROSSELLLLLLLLLLLLLLLLLLL */
.carousel1 {
  max-width: 1100px;
  width: 1100px;
  margin: 50px 0 50px 0;
}

.carousel1 button.nome {
  background-color: #1d2d51;
  width: 230px;
  height: 136px;
  align-items: center;
  border-radius: 10px;
  border: none;
  transition: all 0.3s ease;
}

.carousel1 button.nome:hover {
  background-color: #2a3f6c;
  transform: scale(1.08);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.carousel1 p {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: white;
  font-weight: bold;
  font-size: 15px;
}

.carousel1 .carousel {
  --vc-nav-background: #244e84;
  --vc-nav-color: white;
  --vc-nav-size: 40px;
}

.carousel1 .carousel__prev {
  left: -40px;
  /* valor negativo puxa para fora */
}

/* Afasta seta direita */
.carousel1 .carousel__next {
  right: -40px;
}

/* TERCEIRO CARROSELLLLLLLLLLLL */
.carro3 h1.titulo {
  margin: 0 0 2vw 2vw;
  font-weight: bold;
  color: black;
  font-size: 1.81rem;
}

.carro3 h1.titulo span {
  font-weight: bold;
  color: #244e84;
  font-size: 1.81rem;
}

div.produto {
  max-width: 18vw;
  /* largura de cada produto */
  font-size: 1.1rem;
  /* tamanho maior do texto */
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border: 1px solid #244e84;
  text-align: center;
}

.carousel2 {
  margin: 0 4vw 0 4vw;
}

div.produto img {
  width: 100%;
  position: relative;
  /* necessário para o botão ficar relativo à imagem */
  border-radius: 8px;
  width: 100%;
  height: 80%;
  object-fit: cover;
}

div.produto .like-btn {
  position: absolute;
  top: 1.8vw;
  right: 3.5vw;
  z-index: 10;
  /* garante que fique acima do carousel/imagem */
  background: #244e84;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

section.carro3 div.produto h1 {
  margin: 0 0 0 14px;
  color: black;
  text-align: left;
}

div.produto div.info {
  display: flex;
  justify-content: space-between;
  margin: 3px 15px 3px 14px;
}

div.produto button.alugar {
  width: 90%;
  height: 40px;
  background-color: #244e84;
  color: white;
  border: none;
  border-radius: 14px;
  margin: 10px 0 10px 0;
  font-size: 1vw;
}

div.produto p span {
  color: #ffd700;
}

.carousel2 .carousel {
  --vc-nav-background: transparent;
  --vc-nav-color: black;
  --vc-nav-size: 40px;
  --vc-nav-margin: 30px;
}

.carousel2 .carousel.carroProduto {
  --vc-nav-background: white;
  --vc-nav-color: #244e84;
  --vc-nav-size: 40px;
}

/* QUARTOOOOO CARROSSELLLLLL */
.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

section.carro4 {
  display: flex;
  justify-content: space-between;
  margin: 5vw 3vw 0 0;
}

div.carouselDuo {
  max-width: 50%;
}

div.carouselDuo .produto .imagem {
  position: relative;
  /* faz o botão se posicionar sobre a imagem */
}

.like-btn2 {
  top: 2vw;
  /* ajuste próximo ao topo */
  right: 0.5vw;
  /* ajuste próximo à direita */
  z-index: 10;
  background: white;
  border: none;
  border-radius: 20px;
  padding: 0.5vw 1vw;
  display: flex;
  align-items: center;
  gap: 0.5vw;
  cursor: pointer;
  box-shadow: 0 0.2vw 0.5vw rgba(0, 0, 0, 0.2);
}

section.carro4 div.produto .like-btn2 {
  position: absolute;
  top: 1.8vw;
  right: 1.3vw;
  z-index: 10;
  /* garante que fique acima do carousel/imagem */
  background: #244e84;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.carousel4 {
  resize: horizontal;
  border: 2px dashed gray;
  overflow: auto;

}

section.carro4 div.esquerda {
  margin: 5vw 0 0 8vw;
}

section.carro4 div.esquerda img {
  height: 90%;
}

/*  ULTIMA SECTIONNNNNNNNNNNNNNNNNN */
section.avaliacoes {
  padding: 4vw;
  background: linear-gradient(to bottom, #24358A 50%, #ffffff 50%);
  text-align: center;
  margin: 2vw 0 0 0;
}
section.avaliacoes h1 {
  font-size: 2.3vw;
  font-weight: bold;
  color: white;
}
section.avaliacoes h3 {
  color: white;
  margin: 1vw 0 0 0;
}
ul,
li {
  list-style: none;
  /* remove bolinhas ou números */
}

section.avaliacoes ul {
  display: flex;
  gap: 5vw;
  margin: 7vw 0 0 0;
  padding: 0;
  overflow: visible;
  text-align: center;
  justify-content: center;
}

section.avaliacoes ul li {
  background-color: #e0e5ef;
  padding: 2vw;
  position: relative;
  border-radius: 10px;
  text-align: center;
  width: 20vw;
}

section.avaliacoes ul li img {
  border-radius: 50%;
  width: 8vw;
  height: 8vw;
  position: absolute;
  top: -4vw;
  transform: translateX(-50%);
}

section.avaliacoes ul li h2 {
  margin: 2.4vw 0 0 0;
  font-size: 2vw;
  color: black;
}

section.avaliacoes ul li p {
  margin: 1vw 0 0 0;
  color: black;
  font-size: 1vw;
}

.estrelas {
  display: flex;
  gap: 0;
  margin: 2vw 0 0 0;
  justify-content: center;
}

.estrelas span {
  font-size: 1.2rem;
  color: #FFD700;
}
</style>
