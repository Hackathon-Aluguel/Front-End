<script setup>
import 'vue3-carousel/carousel.css'
import { ref, reactive } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
const liked = ref(false)
const likes = ref(0)

const showNav = ref(false)
// Carrossel de 1 imagem

const imagesSingle1 = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/400/300?random=${index + 100}`,
}))
// Carrossel multi-imagem
const categorias = [
  { id: 1, nome: 'fantasias', imagem: './public/images/categoria/categoriaFantasias.jpg' },
  { id: 2, nome: 'camping', imagem: './public/images/categoria/categoriaCamping.jpg' },
  { id: 3, nome: 'Brinquedos', imagem: './public/images/categoria/categoriaBrinquedos.jpg' },
  { id: 4, nome: 'Ferramentas', imagem: './public/images/categoria/categoriaFerramentas.jpg' },
  { id: 5, nome: 'construção', imagem: './public/images/categoria/categoriaConstrucao.jpg' },
  { id: 6, nome: 'limpeza', imagem: './public/images/categoria/categoriaLimpeza.jpg' },
]
const botaoAnunciante = ref(true);
function trocarCliente() {
  botaoAnunciante.value = false;
}
function trocarAnunciante() {
  botaoAnunciante.value = true;
}
const avaliacoesCliente = [
  { id: 1, nome: 'Pietro', texto: 'Não sabia sobre esse site, depois que conheci ele consegui fazer minhas coisas sem precisar gastar muito' },
  { id: 2, nome: 'Mariana', texto: 'Consegui alugar o que eu precisava de forma rápida e prática, super recomendo!' },
  { id: 3, nome: 'Lucas', texto: 'Achei muito útil, economizei dinheiro e ainda conheci um serviço confiável.' },
  { id: 4, nome: 'Beatriz', texto: 'Experiência excelente, o atendimento foi ótimo e o processo bem simples.' },
  { id: 5, nome: 'Rafael', texto: 'Já usei várias vezes e sempre deu tudo certo, muito melhor do que comprar algo que vou usar pouco.' },
  { id: 6, nome: 'Carolina', texto: 'Adorei a ideia, é sustentável e ajuda bastante no dia a dia.' },
  { id: 7, nome: 'Fernanda', texto: 'Me surpreendi com a qualidade do serviço, certamente vou usar de novo.' },
  { id: 8, nome: 'João', texto: 'Muito prático, facilitou bastante minha vida em um momento que eu precisava.' },
]
const avaliacoesAnunciante = [
  { id: 1, nome: 'André', texto: 'Comecei a anunciar meus equipamentos e em pouco tempo já estava ganhando uma renda extra.' },
  { id: 2, nome: 'Patrícia', texto: 'O processo de cadastro é super simples e meus itens ganharam visibilidade rapidamente.' },
  { id: 3, nome: 'Thiago', texto: 'Consegui alugar ferramentas que ficavam paradas em casa, agora elas geram lucro.' },
  { id: 4, nome: 'Camila', texto: 'A plataforma é segura e prática, tive ótimas experiências com os locatários.' },
  { id: 5, nome: 'Eduardo', texto: 'Anunciar foi muito fácil, e em menos de uma semana já tive o primeiro aluguel.' },
  { id: 6, nome: 'Sofia', texto: 'Ótima oportunidade para quem quer monetizar objetos que não usa todo dia.' },
  { id: 7, nome: 'Mateus', texto: 'Achei incrível, consegui transformar minhas coisas guardadas em fonte de renda.' },
  { id: 8, nome: 'Larissa', texto: 'A visibilidade que meus produtos tiveram aqui foi muito maior do que eu esperava.' },
];
// Carousel configuration
// Configuração carrossel 1 imagem

const configDuo = {
  height: 510,
  itemsToShow: 2,
  snapAlign: 'start',
  breakpoints: {
    600: { itemsToShow: 1 },
    900: { itemsToShow: 2 },
    1200: { itemsToShow: 2 },
  },
}
const configMulti = {
  height: 400,
  itemsToShow: 3,
  snapAlign: 'center',
  breakpointMode: 'carousel',

  gap: 10,
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
  <section class="primeira">
    <div class="primeiro">
      <h1>
        Alugue itens que voce deseja,<br />
        apenas por alguns dias
      </h1>
      <div class="container">
        <form action="" class="search-bar">
          <input type="text" placeholder="Precisa de algo só por uns dias? Encontre aqui" name="q" />
          <button type="submit"><span class="mdi mdi-magnify"></span></button>
        </form>
      </div>
    </div>

    <div class="degrade-top">
      <div class="tom2"></div>
      <div class="tom3">
        <div class="maior">
          <h2>Mais de 200 mil experiencias</h2>
          <div class="estrelas1">
            <span class="mdi mdi-star"></span>
            <span class="mdi mdi-star"></span>
            <span class="mdi mdi-star"></span>
            <span class="mdi mdi-star"></span>
            <span class="mdi mdi-star"></span>
          </div>

          <h2>avaliados por mais de 12mil e contando</h2>
        </div>
      </div>
    </div>
  </section>
  <section class="juntar">
    <h1 class="principal">Junte-se a mais de 1.000.000 de pessoas que amam o Alugae</h1>
    <div class="botoes">
      <button :class="{ ativo: botaoAnunciante }" @click="trocarAnunciante()">Anunciante</button>
      <button :class="{ ativo: !botaoAnunciante }" @click="trocarCliente(botaoCliente)">Cliente</button>
    </div>

    <div class="meio" v-if="botaoAnunciante == true">
      <div class="carousel1">
        <Carousel v-bind="configMulti">
          <Slide v-for="avaliacao in avaliacoesAnunciante" :key="avaliacao.id">
            <div class="avaliacoes">
              <div class="estrelas1">
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
              </div>
              <h1>{{ avaliacao.nome }}</h1>
              <p>{{ avaliacao.texto }}</p>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
    <div class="meio" v-else>
      <div class="carousel1">
        <Carousel v-bind="configMulti">
          <Slide v-for="avaliacao in avaliacoesCliente" :key="avaliacao.id">
            <div class="avaliacoes">
              <div class="estrelas1">
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
                <span class="mdi mdi-star"></span>
              </div>
              <h1>{{ avaliacao.nome }}</h1>
              <p>{{ avaliacao.texto }}</p>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
  </section>

  <section class="categorias">
    <h1 class="principal">O que você deseja no Alugaê?</h1>
    <ul>
      <li v-for="categoria in categorias" :key="categoria.id">
        <button :style="{ backgroundImage: `url(${categoria.imagem})` }">
          <h2>{{ categoria.nome }}</h2>
        </button>

      </li>
    </ul>
  </section>


  <section class="carro3">
    <h1 class="principal">Mais do que apenas alugueis</h1>
    <h2 class="secundaria">Desfrute de uma variedade de produtos de alegria, sempre únicos, sempre seus</h2>
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
    <button class="perto">
      Descubra produtos perto de você
    </button>
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
  <section class="passoApasso">
    <h1>Aqui está o seu guia para alugar corretamente.</h1>
    <h2>Veja como o Alugaê funciona passo por passo</h2>
    <ul>
      <li class="passo1">
        <div class="esquerda">
          <button><span class="mdi mdi-magnify"></span></button>
          <h1>Passo 1: encontre o item que voce deseja</h1>
          <h2>Navegue pela nossa lista de itens disponíveis para aluguel e escolha o que mais combina com a sua
            necessidade.</h2>
        </div>
        <div class="direita">
          <img src="/public/images/passos/procurando.png" alt="">
        </div>
      </li>
      <li class="caminhoDireita">
        <img src="/public/images/passos/direitaEsquerda.png" alt="">
      </li>
      <li class="passo2">
        <div class="esquerda">
          <img src="/public/images/passos/esperando.png" alt="">
        </div>
        <div class="direita">
          <button><span class="mdi mdi-package-variant-closed"></span></button>
          <h1>Passo 2: espere o item que você alugou chegar</h1>
          <h2>Depois de finalizar o aluguel, basta aguardar com tranquilidade: o produto será entregue no endereço
            informado de forma rápida e segura.</h2>
        </div>
        
      </li>
      <li class="caminhoEsquerda">
        <img src="/public/images/passos/esquerdaDireita.png" alt="">
      </li>
      <li class="passo3">
        <div class="esquerda">
          <button><span class="mdi mdi-magnify"></span></button>
          <h1>Passo 3: aproveite o seu produto.</h1>
          <h2>Seu produto chegou! Agora é hora de curtir, usar com cuidado e aproveitar ao máximo cada momento que ele oferece. </h2>
        </div>
        <div class="direita">
          <img src="/public/images/passos/aproveitando.png" alt="">
        </div>
      </li>
      <li class="caminhoDireita">
        <img src="/public/images/passos/direitaEsquerda.png" alt="">
      </li>
      <li class="passo4">
        <div class="esquerda">
          <img src="/public/images/passos/avaliacao.png" alt="">
        </div>
        <div class="direita">
          <button><span class="mdi mdi-package-variant-closed"></span></button>
          <h1>Passo 4: avalie o produto que voce alugou.</h1>
          <h2>Depois de usar, deixe sua avaliação. Ajuda outros usuários e o proprietário a melhorar o serviço.</h2>
        </div>
      </li>
    </ul>
  </section>
  <section class="avaliacoes">
    <h1>SUA OPNIÃO TAMBÉM IMPORTA!</h1>
    <h3>
      Confira os comentarios de quem usa nossa plataforma<br />
      no dia a dia
    </h3>
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
        <h2>Mateus</h2>
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

.meio {
  display: flex;
  justify-content: center;
  /* centro horizontal */
  align-items: center;
  /* centro vertical se quiser */
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
  margin: 0 0.78vw 0 0.78vw;
}

/* PRIMEIRO SECTIONNNN */
section.primeira .primeiro {
  background: linear-gradient(to top, #1d2d51, #244e84);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 87vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.primeiro h1 {
  font-size: 2.5rem;
  text-align: center;
  color: white;
  line-height: 1.2;
  margin: 0 0 1vw 0;
  font-weight: bold;
}

.container {
  width: 45%;
  height: 60px;
  display: flex;
  background-color: #e6e6e6;
  border-radius: 100px;
  margin: 15px 0px 10px 13px;
}

.search-bar {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 60px;
}

.search-bar input {
  background-color: transparent;
  flex: 1;
  border: 0;
  outline: none;
  padding: 10px 15px;
  font-size: 1.2vw;
  color: #000;
}

.search-bar button {
  background-color: #244e8a;
  border: none;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.2vw 0 0;
}

.search-bar button span {
  color: white;
  font-size: 1.8vw;
}

.tom2,
.tom3 {
  display: flex;
  width: 100%;
  height: 70px;
}

.tom2 {
  background-color: #244e8a;
}

.tom3 {
  background-color: #386cbe;
  text-align: center;
  display: flex;
  justify-content: center;
  color: white;
}

.tom3 .maior {
  margin: 0.7vw 0 0 0;
  display: flex;
  font-size: 1.2rem;
}

.estrelas1 {
  display: flex;
  gap: 0;
  margin: 0.43vw 0.5vw 0 0.5vw;
  justify-content: center;
}

.estrelas1 span {
  font-size: 1.4rem;
  color: #ffd700;
}

/* SEGUNDO CARROSSELLLLLLLLLLLLLLLLLLL */
.carousel1 {
  max-width: 1200px;
  width: 1200px;
  margin: 50px 0 50px 0;
}

section.juntar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: linear-gradient(to bottom, #E0E5EF 70%, white 100%);
}

section.juntar h1.principal {
  margin: 4vw 0 0 0;
  color: #244e84;
  font-size: 38px;
}

section.juntar div.botoes {
  margin: 2vw 0 0 0;
}

section.juntar div.botoes button.ativo {
  background-color: #386CBE;
  border: none;
  color: #1d2d51;
  width: 12vw;
  height: 7vh;
  border-radius: 6px;
  font-size: 1.2vw;
  margin: 0 0.5vw;
}

section.juntar div.botoes button {
  background-color: white;
  border: 1px solid #386CBE;
  color: #386CBE;
  font-size: 1.2vw;
  width: 12vw;
  height: 7vh;
  border-radius: 6px;
  margin: 0 0.5vw;
}

.carousel1 div.avaliacoes {
  background-color: white;
  width: 36vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  align-items: center;
  justify-content: center;
  border-radius: 1vw;
  border: none;
  transition: all 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.carousel1 div.avaliacoes h1 {
  text-align: center;
  color: black;
  font-size: 20px;
  font-weight: bold;
}

.carousel1 div.avaliacoes p {
  text-align: center;
  color: black;
  font-size: 18px;
  width: 80%;
  justify-content: center;
}

.carousel1 button.nome:hover {
  background-color: #2a3f6c;
  transform: scale(1.08);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
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

/* SECTION CATEGORIASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS */
section.categoria {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

section.categorias h1.principal {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000;
  font-size: 30px;
  margin: 4vw 0 4vw 0;
  font-weight: bold;
}

section.categorias ul {
  display: flex;
  flex-wrap: wrap;
  /* permite quebrar em várias linhas */
  gap: 1vw;
  /* espaço entre os itens */
  width: 70%;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 8vw;
}

section.categorias ul li button {
  position: relative;
  width: 21vw;
  border: none;
  height: 25vh;
  background-size: cover;
  /* cobre toda a div */
  background-position: center;
  /* centraliza a imagem */
  border-radius: 10px;
  color: white;
  display: flex;
  align-items: flex-end;
  /* coloca o título embaixo */
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

section.categorias ul li button h2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* cobre toda a largura do card */
  background: rgba(36, 78, 138, 0.7);
  margin: 0;
  padding: 5px 0;
  border-radius: 0 0 10px 10px;
  /* arredonda só a parte de baixo */
}

/* TERCEIRO CARROSELLLLLLLLLLLL */
.carro3 h1.principal {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000;
  font-size: 30px;
  font-weight: bold;
}

.carro3 h2.secundaria {
  display: block;
  /* garante que o width funcione */
  margin: 1vw auto;
  /* centraliza horizontalmente com auto */
  text-align: center;
  /* centraliza o texto dentro do h2 */
  color: #cdcdcd;
  font-size: 20px;
  width: 30%;
}

.carro3 h1.titulo {
  margin: 4vw 0 2vw 2vw;
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

.carro3 button.perto {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #1d2d51;
  border: none;
  color: white;
  width: 15vw;
  height: 8vh;
  border-radius: 6px;
  /* cantos arredondados */
  cursor: pointer;
  margin: 0 auto;
  /* centraliza horizontalmente */
  margin-top: 3vw;
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

/* SECTION PASSOAAAAAAAAAAAAAAAAAAAAPASSSSSSOOOOOOOOOOO */
section.passoApasso {
  display: flex;
  justify-content: center;
  /* centraliza horizontal */
  align-items: center;
  /* centraliza vertical */
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  /* ocupa a tela inteira */
}
section.passoApasso h1{
  color: black;
  font-size: 40px;
  margin: 10vw 0 0 0;
}
section.passoApasso h2 {
  font-size: 24px;
  color: #555;

}
section.passoApasso ul {
  display: flex;
  flex-direction: column;
  /* cada li embaixo do outro */
  justify-content: center;
  align-items: center;
   margin: 6vw auto 4vw auto; 
  width: 80%; 
}

/* PAASSO 1 */
section.passoApasso ul li.passo1 {
  display: flex;
  justify-content: space-between;
  /* texto e imagem lado a lado */
  align-items: center;
  width: 100%;
  /* controla largura */
  max-width: 1200px;
}

ul li.passo1 .esquerda button {
  background-color: #244e84;
  border: none;
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

ul li.passo1 .esquerda h1 {
  font-size: 2rem;
  color: #000;
  margin: 0.5vw 0 0.5vw 0;
  line-height: 1.7vw;
}

ul li.passo1 .esquerda h2 {
  font-size: 1.5rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

section.passoApasso ul li.passo1 .esquerda {
  width: 40%;
  margin: 0 1vw 0 0;
}

section.passoApasso ul li.passo1 .direita img {
  width: 80%;
  height: auto;
}

section.passoApasso ul li.caminhoDireita {
  margin: 0 10vw 0 0;
}

/* PAASSSOO 2 */

section.passoApasso ul li.passo2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2vw; /* espaço entre texto e imagem */
}

/* cada lado ocupa metade do espaço */
section.passoApasso ul li.passo2 .esquerda,
section.passoApasso ul li.passo2 .direita {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


/* botão */
ul li.passo2 .direita button {
  background-color: #244e84;
  border: none;
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1vw;
}

/* títulos e texto */
ul li.passo2 .direita h1 {
  font-size: 2rem;
  color: #000;
  margin: 0.5vw 0;
  line-height: 1.5;
}

ul li.passo2 .direita h2 {
  font-size: 1.5rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

/* imagem */
section.passoApasso ul li.passo2 .esquerda img {
  width: 100%; /* ocupa todo espaço da esquerda */
  height: auto;
  display: block;
}
/* PASSO 3 */
section.passoApasso ul li.passo3 {
  display: flex;
  justify-content: space-between;
  /* texto e imagem lado a lado */
  align-items: center;
  width: 100%;
  /* controla largura */
  max-width: 1200px;
}

ul li.passo3 .esquerda button {
  background-color: #244e84;
  border: none;
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

ul li.passo3 .esquerda h1 {
  font-size: 2rem;
  color: #000;
  margin: 0.5vw 0 0.5vw 0;
  line-height: 1.7vw;
}

ul li.passo3 .esquerda h2 {
  font-size: 1.5rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

section.passoApasso ul li.passo3 .esquerda {
  width: 40%;
  margin: 0 1vw 0 0;
}

section.passoApasso ul li.passo3 .direita img {
  width: 80%;
  height: auto;
}

section.passoApasso ul li.caminhoEsquerda {
  margin: 0 10vw 0 0;
}
/* PASSO 4 */
section.passoApasso ul li.passo4 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2vw; /* espaço entre texto e imagem */
}

/* cada lado ocupa metade do espaço */
section.passoApasso ul li.passo4 .esquerda,
section.passoApasso ul li.passo4 .direita {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


/* botão */
ul li.passo4 .direita button {
  background-color: #244e84;
  border: none;
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1vw;
}

/* títulos e texto */
ul li.passo4 .direita h1 {
  font-size: 2rem;
  color: #000;
  margin: 0.5vw 0;
  line-height: 1.5;
}

ul li.passo4 .direita h2 {
  font-size: 1.5rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

/* imagem */
section.passoApasso ul li.passo4 .esquerda img {
  width: 100%; /* ocupa todo espaço da esquerda */
  height: auto;
  display: block;
}
/*  ULTIMA SECTIONNNNNNNNNNNNNNNNNN */
section.avaliacoes {
  padding: 4vw;
  background: linear-gradient(to bottom, #244e84 50%, #ffffff 50%);
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
  color: #ffd700;
}
</style>
