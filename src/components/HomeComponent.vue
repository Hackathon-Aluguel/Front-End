<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

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
  <!-- Resizable container for testing 'carousel' breakpointMode -->
  <!-- Drag the right edge to adjust the width and see the breakpoints change -->
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
  <section>
    <h1>Mais vendidos</h1>
    <div class="meio">
      <div class="carousel2">
        <Carousel v-bind="configMulti1">
          <Slide v-for="categoria in imagesMulti" :key="categoria.id">
            <div class="produto">

              <div class="imagem">
                <Carousel v-bind="configSingle1">
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
                <strong>10 reais</strong>
                <p>5 estrelas</p>
              </div>
              <button>Comprar</button>
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
  width: 70%;
  height: 80%;
  object-fit: cover;
}

.carousel__wrapper {
  resize: horizontal;
  border-radius: 32px;
  overflow: auto;
  max-width: 800px;
  height: 450px;
  padding: 2px;
  margin: 80px 0 0 0;
  background-color: #386cbe;
  display: block;
  justify-content: center;
  align-items: center;
}
/* SEGUNDO CARROSSELLLLLLLLLLLLLLLLLLL */
.carousel1 {
  max-width: 1000px;
  width: 1000px;
}

.carousel1 button.nome {
  background-color: #1d2d51;
  width: 200px;
  height: 100px;
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
.carousel2 {
  width: 100%;
  max-width: 1300px;       /* suficiente para 4 produtos */
  padding: 0 10px;
  box-sizing: border-box;
}
div.produto {
  max-width: 250px;        /* largura de cada produto */
  font-size: 1.1rem;       /* tamanho maior do texto */
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  box-sizing: border-box;
  border: 1px solid #244e84;
}
div.produto img {
    width: 100%;
}
div.produto h1
</style>
