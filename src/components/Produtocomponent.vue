<script setup>
import { reactive } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

// Lista de produtos
const produtos = reactive([
  { id: 1, nome: 'barraca', preco: 300, estrelas: 4, likes: 20, liked: false },
  { id: 2, nome: 'saco de dormir', preco: 25, estrelas: 5, likes: 4, liked: false },
  { id: 3, nome: 'lanterna', preco: 10, estrelas: 4, likes: 14, liked: false },
  { id: 4, nome: 'fogareiro', preco: 40, estrelas: 3, likes: 12, liked: false },
  { id: 5, nome: 'mochila', preco: 50, estrelas: 5, likes: 10, liked: false },
]);



// Imagens do carrossel interno
const imagesSingle1 = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/400/300?random=${index + 100}`,
}));

// Configuração do carrossel interno
const configSingle1 = {
  itemsToShow: 1,
  gap: 5,
  snapAlign: 'center',
  breakpointMode: 'carousel',
};
</script>

<template>
  <div class="listaFavoritos">
    <ul>
      <li v-for="produto in produtos" :key="produto.id">
        <div class="produto">
          <div class="imagem">
            <Carousel v-bind="configSingle1" class="carroProduto">
              <Slide v-for="image in imagesSingle1" :key="image.id">
                <img :src="image.url" alt="image" />
              </Slide>
              <template #addons>
                <Navigation />
              </template>
            </Carousel>
          </div>



          <div class="info">
            <h1>{{ produto.nome }}</h1>
            <p>
              <span v-for="n in produto.estrelas" :key="n" class="mdi mdi-star"></span>
            </p>
            <strong>R${{ produto.preco.toFixed(2).replace('.', ',') }}/Dia</strong>
            <p class="vezes">Em até 10 vezes {{ (produto.preco / 10).toFixed(2) }} </p>

          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Container da lista de produtos */
div.listaFavoritos {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px;
}

.listaFavoritos ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  list-style: none;
  padding: 0;
}

/* Card do produto */
div.produto {
  max-width: 270px;
  height: 410px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #cecece;
  text-align: center;
  position: relative;
}

/* Imagem */
div.produto img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin: 10px 0 0 ;
}


/* Nome do produto */
div.produto h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 10px 0 1vw 0;
  text-align: left;
}

/* Info preço e estrelas */
div.produto .info p,
div.produto .info strong {
  margin: 3px 0;       /* remove margem padrão */
  padding: 0;      /* remove padding padrão */
}

div.produto .info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0.5vw 0 0 1vw;
}
div.produto .info p span {
  font-size: 23px;
}
div.produto .info strong {
  font-size: 28px;
}
div.produto p.vezes {
  font-size: 16px;
  color: #BEBEBE;
  font-family: poppins , sans-serif;
}

div.produto .info strong
div.produto .info span {
  color: #ffd700;
}

/* Carrossel interno */
.carousel2 .carousel.carroProduto {
  --vc-nav-background: white;
  --vc-nav-color: #244e84;
  --vc-nav-size: 30px;
}
</style>
