<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ref } from "vue";

const imagens = [
  "https://cdn11.bigcommerce.com/s-y0mb5v9hpd/images/stencil/1280x1280/products/732/1538/Makita_GEC01PL4_Power_Cutter_Saw__62735.1682308055.png?c=2",
  "https://www.powertoolworld.co.uk/media/catalog/product/cache/7c271e7e94c8021213ee582f782fed0d/m/a/makduc101z_1.jpg",
  "https://cdn11.bigcommerce.com/s-y0mb5v9hpd/images/stencil/1280x1280/products/732/1538/Makita_GEC01PL4_Power_Cutter_Saw__62735.1682308055.png?c=2",
  "https://www.powertoolworld.co.uk/media/catalog/product/cache/7c271e7e94c8021213ee582f782fed0d/m/a/makduc101z_1.jpg",
];
const fotoAtual = ref(imagens[0]);

const trocarFoto = (src) => {
  fotoAtual.value = src;
};

const avaliacoes = [
  { id: 1, nome: 'Pietro', texto: 'Não sabia sobre esse site, depois que conheci ele consegui fazer minhas coisas sem precisar gastar muito' },
  { id: 2, nome: 'Mariana', texto: 'Consegui alugar o que eu precisava de forma rápida e prática, super recomendo!' },
  { id: 3, nome: 'Lucas', texto: 'Achei muito útil, economizei dinheiro e ainda conheci um serviço confiável.' },
  { id: 4, nome: 'Beatriz', texto: 'Experiência excelente, o atendimento foi ótimo e o processo bem simples.' },
  { id: 5, nome: 'Rafael', texto: 'Já usei várias vezes e sempre deu tudo certo, muito melhor do que comprar algo que vou usar pouco.' },
  { id: 6, nome: 'Carolina', texto: 'Adorei a ideia, é sustentável e ajuda bastante no dia a dia.' },
  { id: 7, nome: 'Fernanda', texto: 'Me surpreendi com a qualidade do serviço, certamente vou usar de novo.' },
  { id: 8, nome: 'João', texto: 'Muito prático, facilitou bastante minha vida em um momento que eu precisava.' },
]



const config = {
  height: 200,
  itemsToShow: 1,
  gap: 5,
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


</script>

<template>
  <section class="produto">
    <div class="foto">
      <div class="grande">
        <img :src="fotoAtual" alt="Foto principal do produto" />
      </div>
      <div class="baixo">
        <div v-for="(img, index) in imagens" :key="index" class="pequenas" @click="trocarFoto(img)">
          <img :src="img" alt="Miniatura do produto" />
        </div>
      </div>
    </div>
    <div class="info">
      <h1>Tenda Para Evento 3x3m</h1>
      <p>4.5 <span class="mdi mdi-star-outline"></span><span class="avaliar">(15 avaliações)</span></p>

      <p class="preco">R$ 20 / DIA</p>
      <div class="botoes">
        <button><span class="mdi mdi-cart-outline"></span>Adicionar ao carrinho</button>
        <button class="alugar">Alugar</button>
      </div>
      <button class="favorito">
        <span class="mdi mdi-heart-outline"></span> adicionar aos favoritos
      </button>
      <div class="dono">
        <p class="foto"></p>
        <h2>Dono do produto: <span>Renan</span></h2>
      </div>
      <button class="mensagem">Mandar mensagem <span class="mdi mdi-send-variant-outline"></span></button>
    </div>

  </section>
  <section class="avaliacao">
    <h2>Avaliações de "Nome da pessoa"</h2>

    <div class="carousel__wrapper">
      <Carousel v-bind="config">
        <Slide v-for="avaliacao in avaliacoes" :key="avaliacao.id">
          <ul>
            <li><img
                src="https://s2.glbimg.com/CZ7vt10tkQki58E3X37KbSrW8PA=/620x430/e.glbimg.com/og/ed/f/original/2022/04/11/dall_e_ia.png"
                alt="Foto de Perfil" style="height: 50px; width: 50px; border-radius: 30px;"></li>
            <li>
              <h2>Nome pessoa</h2>
            </li>
          </ul>
          <div class="textos_Inferiores">
            <p>Estrelinhas Obs: Ver depois!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores facilis officia
              iusto.
              Quod animi voluptates rerum? Exercitationem ut dolores ipsum modi at possimus adipisci
              officia rerum cupiditate rem, aliquam molestiae. </p>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>

</template>

<style scoped>
/*///////////////
    Produto
//////////////*/
.produto {
  display: flex;
  margin: 2vw 0 0 10vw;
}

.info {
  margin: 2vw 0 0 4vw;
}

.info h1 {
  color: #000;
  font-family: Poppins, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.info p {
  color: #000;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.info p span.avaliar {
  color: #CDCDCD;
  font-size: 16px;
}
.info p span {
  color: #FFD700;
}

.info p.preco {
  color: #000;
  font-family: Poppins, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;

  line-height: normal;
}

div.botoes {
  display: flex;
  gap: 30px;
}

div.botoes button {
  all: unset;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid #CDCDCD;
  background: #FFF;
  width: 229px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: #CDCDCD;
  font-family: Poppins;

}

div.botoes button span {
  margin: 0 10px 0 0;
  font-size: 20px;
}

div.botoes button.alugar {
  width: 229px;
  height: 55px;
  background-color: #1D2D51;
  border: none;
  color: #FFF;
}

div button.favorito {
  all: unset;
  margin: 20px 0 0 0;
  color: #1D2D51;
  text-decoration: underline;
  font-size: 18px;
}

div button.favorito span {
  font-size: 20px;
}

div p.foto {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  background-color: #1D2D51;
  border-radius: 100px;
  margin: 0 10px 0 0;
}

div.dono {
  display: flex;
  align-items: center;
  margin: 2vw 0 10px 0;
}

div.dono h2 {
  font-size: 16px;
  color: #000;
}

div.dono h2 span {
  color: #000;

  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

div button.mensagem {
  all: unset;
  width: 24px;
  width: 229px;
  height: 55px;
  background-color: #1D2D51;
  color: #FFF;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin: 20px 0 0 0 ;
}

div button.mensagem span {
  margin: 0 0 0 10px;
}

.foto {
  max-width: 500px;
  margin: 0 10vw 0 0;
}

.grande img {
  width: 100%;
  width: 640px;
  height: 540px;
  border-radius: 10px;
  border: 2px solid #ccc;
}

.baixo {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
}

.pequenas img {
  width: 150px;
  height: 132px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #ccc;
  cursor: pointer;
  transition: border 0.3s;
}

.pequenas img:hover {
  border: 2px solid #1D2D51;
}

/*///////////////
    AVALIAÇÃO
//////////////*/
.avaliacao {
  margin: 0 5vw;
  margin-top: 5vw;
  border-bottom: solid 2px #d3d1d1;
}

.avaliacao h2 {
  font-size: 25px;
  color: black;
  font-weight: bold;
  margin-bottom: 20px;

}

.avaliacao .carousel__wrapper {
  padding: 20px;
  width: 100%;
  height: 330px;
  display: block;
}

.avaliacao .carousel__wrapper ul {
  display: flex;
  list-style: none;
  padding: 0;
}

.avaliacao .carousel__wrapper ul img {
  margin-right: 20px;
}

.avaliacao .carousel__wrapper ul h2 {
  font-size: 20px;
  margin-top: 8px;
}

.avaliacao .carousel__wrapper .textos_Inferiores p:first-of-type {
  margin-bottom: 10px;
}

.avaliacao .carousel__wrapper .textos_Inferiores p:last-of-type {
  overflow: auto;
  max-height: 100px;
}

.avaliacao .carousel__slide {
  display: block;
  min-width: 530px;
}

.avaliacao .carousel__slide:not(:last-of-type) {
  padding: 0 40px;
  border-right: solid 2px #d3d1d1;
}

.avaliacao .carousel__slide:last-of-type {
  padding-left: 40px;
}
</style>
