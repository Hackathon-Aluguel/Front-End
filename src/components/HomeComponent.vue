<script setup>
import 'vue3-carousel/carousel.css'
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import HeaderComponent from "./HeaderComponent.vue";
import FooterComponent from './FooterComponent.vue';



/* BACKENDDDDDDDDDDDDDDDDDDDDDDDDDDDDD */
const produtosBackend = ref([])

// Checa se o usuário está logado
const isLogged = computed(() => !!localStorage.getItem('access_token'))

// Função para carregar produtos
const carregarProdutos = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/itens/')
    produtosBackend.value = response.data
    console.log('Produtos carregados:', response.data)
  } catch (error) {
    console.error(error.response?.data || error.message)
    alert('Erro ao carregar produtos')
  }
}

// Carrega produtos assim que o componente monta
onMounted(() => {
  carregarProdutos()
})


/* FINALLLLLLLLLLLLLL DO BACKENDDDDD */
const liked = ref(false)
const likes = ref(0)
const showNav = ref(false)
// Carrossel de 1 imagem

// Carrossel multi-imagem
const categorias = [
  { id: 1, nome: 'Eventos e festas', cor: '#244E8A', icone: 'mdi mdi-balloon' },
  { id: 2, nome: 'Esporte e lazer', cor: '#244E8A', icone: 'mdi mdi-soccer' },
  { id: 3, nome: 'Casa e utilidades', cor: '#244E8A', icone: 'mdi mdi-home' },
  { id: 4, nome: 'Tecnologia e Eletrônicos', cor: '#244E8A', icone: 'mdi mdi-cellphone' },
  { id: 5, nome: 'Construção e Reforma', cor: '#244E8A', icone: 'mdi mdi-hammer' },
  { id: 6, nome: 'Roupas e acessório', cor: '#244E8A', icone: 'mdi mdi-hanger' },
  { id: 7, nome: 'Infantil', cor: '#244E8A', icone: 'mdi mdi-teddy-bear' },
  { id: 8, nome: 'Instrumentos musicais', cor: '#244E8A', icone: 'mdi mdi-guitar-electric' }
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

/* CARROSSEL DE PRODUTOOOSSSSS */
const configMulti = {
  height: 400,
  itemsToShow: 3,
  snapAlign: 'center',
  breakpointMode: 'carousel',
  gap: 0,
}
const config = {
  height: 500,
  itemsToShow: 5,
  gap: 0,
  snapAlign: 'center',
  breakpointMode: 'carousel',
  breakpoints: {
    300: { itemsToShow: 3 },  // só reduzir se for muito estreito
    500: { itemsToShow: 4 },
    800: { itemsToShow: 5 }
  },
}
const carousel = ref(null);

const prevSlide = () => {
  carousel.value.prev();
};

const nextSlide = () => {
  carousel.value.next();
};
const produtos = reactive([
  { id: 1, nome: 'barraca', preco: 30, estrelas: 3, likes: 20, liked: false },
  { id: 2, nome: 'saco de dormir', preco: 25, estrelas: 5, likes: 4, liked: false },
  { id: 3, nome: 'lanterna', preco: 10, estrelas: 4, likes: 14, liked: false },
  { id: 4, nome: 'fogareiro', preco: 40, estrelas: 3, likes: 12, liked: false },
  { id: 5, nome: 'mochila', preco: 50, estrelas: 5, likes: 10, liked: false },
  { id: 6, nome: 'bota de trilha', preco: 80, estrelas: 4, likes: 18, liked: false },
  { id: 7, nome: 'cantil', preco: 15, estrelas: 3, likes: 6, liked: false },
  { id: 8, nome: 'corda de escalada', preco: 60, estrelas: 5, likes: 9, liked: false },
  { id: 9, nome: 'jaqueta corta-vento', preco: 120, estrelas: 4, likes: 15, liked: false },
  { id: 10, nome: 'kit primeiros socorros', preco: 35, estrelas: 5, likes: 25, liked: false },
])
function toggleLike(produto) {
  produto.liked = !produto.liked
  produto.likes += produto.liked ? 1 : -1
}
const config1 = {
  height: 500,
  itemsToShow: 2,  // menos itens = mais espaço real para cada slide
  gap: 0,           // pequeno mas visível
  snapAlign: 'center',
  breakpointMode: 'carousel',
  breakpoints: {
    300: { itemsToShow: 1, gap: 1 },
    600: { itemsToShow: 2, gap: 1 },
    900: { itemsToShow: 3, gap: 1 },
  },
}

</script>

<template>
  <HeaderComponent />
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
    <div class="catego">
      <Carousel v-bind="config1">
        <Slide v-for="categoria in categorias" :key="categoria.id">
          <div class="cat">
            <button :style="{ backgroundColor: categoria.cor }">
              <span :class="categoria.icone" style="margin-right: 8px;"></span>
              <h2>{{ categoria.nome }}</h2>
            </button>
          </div>
        </Slide>

        <template #addons>
          <Navigation />

        </template>
      </Carousel>
    </div>
  </section>


  <section class="carro3">
    <h1 class="principal">Mais do que apenas alugueis</h1>
    <h2 class="secundaria">Desfrute de uma variedade de produtos de alegria, sempre únicos, sempre seus</h2>
    <h1 class="titulo">Mais v<span>e</span>ndidos</h1>
    <div class="produtosFundos">
      <div class="carousel__wrapper">
        <Carousel ref="carousel" v-bind="config" :navigationEnabled="false">
          <Slide v-for="produto in produtos" :key="produto.id">
            <div class="produto">
              <button class="like-btn" @click="toggleLike(produto)">
                <span :class="produto.liked ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"></span>
                {{ produto.likes }}
              </button>
              <div class="imagem">
                <img
                  src="https://casadosoldador.com.br/files/products_images/9307/0053586-serra-marmore-4polegadas-4100nh3z-seco-110v-makita.jpg?1651750862"
                  alt="">
              </div>

              <div class="info">
                <h1>{{ produto.nome }}</h1>
                <p class="estrelasProduto">
                  <span v-for="n in 5" :key="n" :class="[
                    'mdi mdi-star',
                    n <= produto.estrelas ? 'estrela-cheia' : 'estrela-vazia'
                  ]"></span>
                </p>
                <strong>R${{ produto.preco.toFixed(2).replace('.', ',') }}/Dia</strong>
                <p class="vezes">Em até 10 vezes {{ (produto.preco / 10).toFixed(2) }} </p>

              </div>
            </div>
          </Slide>

          <template #addons>
            <div class="custom-nav">
              <button class="custom-prev" @click="prevSlide">
                <span class="mdi mdi-chevron-left"></span>
              </button>
              <button class="custom-next" @click="nextSlide">
                <span class="mdi mdi-chevron-right"></span>
              </button>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
    <h1 class="titulo">Mais v<span>e</span>ndidos</h1>
    <div class="produtosFundos">
      <div class="carousel__wrapper">
        <Carousel ref="carousel" v-bind="config" :navigationEnabled="false">

          <Slide v-for="produto in produtosBackend" :key="produto.id">
            <div class="produto">

              <div class="imagem" v-for="foto in produto.midias" :key="foto.id">
                <img :src="foto.file" alt="">
              </div>
              <h1>{{ produto.nome }}</h1>
              <div class="info">
                <p class="estrelasProduto">
                  <span class="mdi mdi-star"></span>
                  <span class="mdi mdi-star"></span>
                  <span class="mdi mdi-star"></span>
                  <span class="mdi mdi-star"></span>
                  <span class="mdi mdi-star"></span>
                </p>
                <strong>R${{ produto.preco }}/Dia</strong>
                <p class="vezes">
                  {{ produto.descricao }}
                </p>
              </div>

            </div>
          </Slide>

          <!-- addons precisa ficar dentro do Carousel -->
          <template #addons>
            <div class="custom-nav">
              <button class="custom-prev" @click="prevSlide">
                <span class="mdi mdi-chevron-left"></span>
              </button>
              <button class="custom-next" @click="nextSlide">
                <span class="mdi mdi-chevron-right"></span>
              </button>
            </div>
          </template>

        </Carousel>
      </div>
    </div>

    <button class="perto">
      Descubra produtos perto de você
    </button>
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
          <h2>Seu produto chegou! Agora é hora de curtir, usar com cuidado e aproveitar ao máximo cada momento que ele
            oferece. </h2>
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


  <FooterComponent />
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__wrapper {
  resize: horizontal;
  overflow: auto;
  max-width: 100%;
  width: 100vw;
  padding: 2px;
}

/* Dentro do seu <style scoped> */
.custom-nav {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  pointer-events: none;
}

.custom-prev,
.custom-next {
  pointer-events: auto;
  background: white;
  border: 2px solid #244e84;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #244e84;
  font-size: 35px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.custom-prev span,
.custom-next span {
  display: flex;
  /* garante que o span também use flex */
  align-items: center;
  /* centraliza verticalmente */
  justify-content: center;
  /* centraliza horizontalmente */
  width: 100%;
  /* preenche o botão */
  height: 100%;
  /* preenche o botão */
  line-height: 0;
  /* evita espaçamento extra do ícone */
}


.carousel {
  --vc-nav-background: rgba(255, 0, 0, 0.7);
  --vc-nav-border-radius: 100%;
  margin: 0 0.78vw 0 0.78vw;
}

/* PRIMEIRO SECTIONNNN */
section.primeira .primeiro {
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.primeiro h1 {
  font-size: 2.5rem;
  text-align: center;
  color: black;
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

div.meio {
  display: flex;
  justify-content: center;
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
.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;

}


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

section.categorias div.cat {
  display: flex;
  width: auto;          /* tira o 70% que deixava folga */
  margin-bottom: 2vw;   /* diminui o espaço embaixo */
  gap: 0;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 8vw;
}

section.categorias div.cat button {
  margin: 6vw 0 0 0;
  align-items: center;
  position: relative;
  width: 390px;
  height: 260px;
  border: none;
  background-size: cover;
  border-radius: 10px;
  color: white;
  display: flex;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

section.categorias div.cat button h2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 25px;
  margin: 0 0 15px 0;
  padding: 5px 0;
  border-radius: 0 0 10px 10px;
  /* arredonda só a parte de baixo */
}

.categorias button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.categorias div.cat button span {
  font-size: 120px;
  margin: 0 0 10px 0;
}

section.categorias div.cat button:hover {
  transform: scale(1.10);
  /* aumenta levemente */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  /* sombra mais forte */
  filter: brightness(1.10);
  /* dá uma clareada */
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
  display: flex;
  justify-content: left;
  font-weight: bold;
  color: black;
  font-size: 1.8rem;
}

.carro3 h1.titulo span {
  font-weight: bold;
  color: #244e84;
  font-size: 1.8rem;
}

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
div.produtosFundos {
  display: flex;
  justify-content: center;
}

div.produto {
  max-width: 18vw;
  height: 60vh;
  width: 18vw;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #cecece;
  text-align: center;
  position: relative;
}

/* Imagem */
div.produto img {
  width: 85%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin: 3vh 0 0;
}


/* Nome do produto */
div.produto h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 10px 0 1vw 1vw;
  text-align: left;
}

/* Info preço e estrelas */
div.produto .info p,
div.produto .info strong {
  margin: 3px 0;
  padding: 0;
}

div.produto .info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1vw 0 0 1vw;
}

div.produto .info p span {
  font-size: 23px;
}

div.produto .info strong {
  font-size: 22px;
  margin: 0.5vw 0;
}

div.produto p.vezes {
  margin: 0.3vw 0;
  font-size: 16px;
  color: #BEBEBE;
  font-family: poppins, sans-serif;
}

div.produto span {
  color: #ffd700;
}

/* Carrossel interno */
.carousel2 .carousel.carroProduto {
  --vc-nav-background: white;
  --vc-nav-color: #244e84;
  --vc-nav-size: 30px;
}

div.produto .like-btn {
  position: absolute;
  top: 1.3vw;
  right: 1vw;
  z-index: 10;
  /* garante que fique acima do carousel/imagem */
  background: #244e84;
  color: white;
  height: 3.5vh;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

div.produto .like-btn span {
  color: white;
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

section.carro4 div.produto .like-btn {
  position: absolute;
  top: 1.8vw;
  right: 1.3vw;
  z-index: 10;
  /* garante que fique acima do carousel/imagem */
  background: #244e84;
  color: red;
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

section.passoApasso h1 {
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
  gap: 2vw;
  /* espaço entre texto e imagem */
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
  width: 100%;
  /* ocupa todo espaço da esquerda */
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
  gap: 2vw;
  /* espaço entre texto e imagem */
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
  width: 100%;
  /* ocupa todo espaço da esquerda */
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

.estrelasProduto .estrela-cheia {
  color: gold;
  /* cor das estrelas preenchidas */
  font-size: 28px;
}

.estrelasProduto .estrela-vazia {
  color: #cecece;
  /* cor das estrelas vazias (cinza, azul, vermelho etc.) */
  font-size: 28px;
}
</style>
