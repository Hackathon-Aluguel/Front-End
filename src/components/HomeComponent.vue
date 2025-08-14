<script setup>
import 'vue3-carousel/carousel.css'
import { ref } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const showNav = ref(false);
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
const configSingle2 = {
  height: 400,
  itemsToShow: 1,
  gap: 5,
  snapAlign: 'center',
  breakpointMode: 'carousel',
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
  itemsToShow: 4,      // mantém 4 produtos por slide
  snapAlign: 'start',
  breakpointMode: 'carousel',
  breakpoints: {
    300: { itemsToShow: 1 },
    600: { itemsToShow: 2 },
    900: { itemsToShow: 3 },
    1200: { itemsToShow: 4},
  },
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
      <div class="carousel2">
        <Carousel v-bind="configSingle2">
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
        <Carousel v-bind="configMulti1" >
          <Slide v-for="categoria in imagesMulti" :key="categoria.id">
            <div class="produto">

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

              <h1>texto</h1>

              <div class="info">
                <strong>R$15/dia</strong>
                <p>5 <span class="mdi mdi-star"></span></p>
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
</template>

<style>
:root {
  background-color: #242424;
  
}
/* PRIMEIRO CARROSELLLLLLLLLLLLLLLL */
.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
  margin: 0 15px 0 15px;
}
.meio {
  display: flex;
  justify-content: center; /* centro horizontal */
  align-items: center; /* centro vertical se quiser */
}
img {
  border-radius: 8px;
  width: 100%;
  height: 80%;
  object-fit: cover;
}
.carousel__wrapper img {
  width: 100%;
  height: 100%;
}
.carousel__wrapper {
  resize: horizontal;
  border-radius: 32px;
  overflow: auto;
  max-width: 950px;
  height: 524px;
  padding: 2px;
  margin: 80px 0 0 0;
  display: block;
  justify-content: center;
  align-items: center;
  display: flex;
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
  left: -40px; /* valor negativo puxa para fora */
}

/* Afasta seta direita */
.carousel1 .carousel__next {
  right: -40px;
}
/* TERCEIRO CARROSELLLLLLLLLLLL */
.carro3 h1.titulo {
  margin: 0 0 20px 20px;
  font-weight: bold;
  color: black;
  font-size: 1.81rem;
}
.carro3 h1.titulo span {
  font-weight: bold;
  color: #244e84;
  font-size: 1.81rem;
}
.carousel2 {
  width: 100%;
  max-width: 1300px;       /* suficiente para 4 produtos */
  padding: 0 10px;
  box-sizing: border-box;
  margin: 0 0 20px 0;
}
div.produto {
  max-width: 250px;        /* largura de cada produto */
  font-size: 1.1rem;       /* tamanho maior do texto */
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  box-sizing: border-box;
  border: 1px solid #244e84;
  text-align: center;
}
div.produto img {
    width: 100%;
}
section.carro3 div.produto h1 {
  margin: 0 0 0 14px;
  color: black;
  text-align: left;
}
div.produto div.info {
  display: flex;
  justify-content: space-between;
  margin: 3px 15px 3px 14px ;
}
div.produto button.alugar{
  width: 220px;
  height: 40px;
  background-color: #244e84;
  color: white;
  border: none;
  border-radius: 14px;
  margin: 10px 0 10px 0;
  font-size: 17px;
}
div.produto p span {
  color: #FFD700;
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
</style>
