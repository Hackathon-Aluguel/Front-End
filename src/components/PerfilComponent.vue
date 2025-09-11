<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ref, reactive } from 'vue'



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

// Carousel configuration
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

const imagesSingle1 = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/400/300?random=${index + 100}`,
}))

const configMulti1 = {
  itemsToShow: 4,
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

const dragExterno = ref(true)
</script>

<template>
  <section class="infos">
    <div class="p1">
      <div class="superior">
        <ul>
          <li>
            <img
              src="https://s2.glbimg.com/CZ7vt10tkQki58E3X37KbSrW8PA=/620x430/e.glbimg.com/og/ed/f/original/2022/04/11/dall_e_ia.png"
              alt="Foto de Perfil">
          </li>
          <li>
            <h1>Nome</h1>
            <p><span class="mdi mdi-map-marker"></span> Cidade - estado</p>
            <button>Mandar mensagem <span class="mdi mdi-send-circle"></span></button>
          </li>
        </ul>
      </div>
      <div class="inferior">
        <div>
          <p class="num">23</p>
          <!-- Número Avaliações -->
          <p>avaliações</p>
        </div>
        <div>
          <p class="num">5,0 <span class="mdi mdi-star"></span></p>
          <!-- Total de estrelas -->
          <p>estrelas</p>
        </div>
        <div>
          <p class="num">2</p>
          <!-- Tempo alugando -->
          <p>ano alugando</p>
        </div>
      </div>
    </div>
    <div class="p2">
      <h2>Sobre "Nome da pessoa"</h2>
      <p><span class="mdi mdi-notebook"></span>Onde estudei: Escola Municipal Dr Sadalla Amin Ghanem</p>
      <p><span class="mdi mdi-briefcase-account-outline"></span>Trabalho: Garoto de programa</p>
      <p class="off"><span class="mdi mdi-heart"></span>Curto muito: pintar boobie goods</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed hic iste id recusandae! Eveniet,
        repudiandae aliquid earum fugiat adipisci cupiditate placeat enim ex doloremque culpa incidunt optio
        molestiae quaerat accusantium!</p>

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

  <section class="produto_Usuario">
    <h2>Produtos de "Nome da pessoa"</h2>
    <div class="carousel2">
      <Carousel v-bind="configMulti1" :mouseDrag="dragExterno">
        <Slide v-for="produto in produtos" v-bind:key="produto.id">
          <div class="produto">
            <button class="like-btn" @click="toggleLike(produto)">
              <span :class="produto.liked ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"></span>
              {{ produto.likes }}
            </button>

            <div class="imagem" @mouseenter="dragExterno = false" @mouseleave="dragExterno = true">
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
  <section class="denuncia">
    <button><span class="mdi mdi-flag"></span>Denunciar "Nome da Pessoa"</button>
  </section>
</template>

<style lang="scss">
.infos {
  display: flex;
  gap: 9vw;
  margin: 0 5vw;
  margin-top: 5vw;
  padding-bottom: 5vw;
  border-bottom: solid 2px #d3d1d1;

  & .p1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 330px;
    width: 30%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    border-radius: 6px;

    & .superior {
      & ul {
        display: flex;
        list-style: none;
        padding: 0;

        & img {
          height: 215px;
          width: 220px;
          background-color: #1D2D51;
          border-radius: 120px;
          margin-right: 20px;
        }

        & li:last-of-type {
          width: 210px;
        }

        & h1 {
          margin-top: 30px;
          font-weight: bold;
          font-size: 30px;
          height: 45px;
          color: black;
        }

        & p {
          color: #CDCDCD;
          margin-bottom: 25px;
        }

        & button {
          padding: 16px 15px 12px 15px;
          font-size: 15px;
          background-color: #1D2D51;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          display: block;
          margin: 0 auto;
          display: flex;
          gap: 8px;


          & span {
            font-size: 20px;
          }
        }
      }


    }

    & .inferior {
      display: flex;
      gap: 65px;
      justify-content: center;
      padding-top: 20px;

      & .num {
        font-size: 30px;
        font-weight: bold;
        height: 37px;
      }

      & div:first-of-type {
        margin-left: 2vw;
      }

      & p {
        color: black;
      }

    }
  }

  & .p2 {
    & h2 {
      font-size: 25px;
      color: black;
      font-weight: bold;
      margin-bottom: 20px;
    }

    & p {
      color: black;
    }

    & p:not(p.off) {
      margin-bottom: 6px;
    }

    & p.off {
      margin-bottom: 35px;
    }

    & p:last-of-type {
      width: 500px;
    }

    & span {
      margin: 0 8px;
      font-size: 18px;
    }

  }
}

.avaliacao {
  margin: 0 5vw;
  margin-top: 5vw;
  border-bottom: solid 2px #d3d1d1;

  & h2 {
    font-size: 25px;
    color: black;
    font-weight: bold;
    margin-bottom: 20px;
  }


  & .carousel__wrapper {
    padding: 20px;
    width: 100%;
    height: 330px;
    display: block;


    & ul {
      display: flex;
      list-style: none;
      padding: 0;

      & img {
        margin-right: 20px;
      }

      & h2 {
        font-size: 20px;
        margin-top: 8px;
      }
    }

    & .textos_Inferiores {

      & p:first-of-type {
        margin-bottom: 10px;
      }

      & p:last-of-type {
        overflow: auto;
        max-height: 100px;

      }
    }

  }

  & .carousel__slide {
    display: block;
    min-width: 530px;
  }

  & .carousel__slide:not(:last-of-type) {
    padding: 0 40px;
    border-right: solid 2px #d3d1d1;
  }

  .carousel__slide:last-of-type {
    padding-left: 40px
  }

}

.produto_Usuario {
  margin-bottom: 7vw;

  & h2 {
    margin: 2vw 5vw 0 5vw;
    font-size: 25px;
    color: black;
    font-weight: bold;
    margin-bottom: 20px;
  }
}


.carro3 h2.secundaria {
  display: block;
  /* garante que o width funcione */
  margin: 1vw auto;
  /* centraliza horizontalmente com auto */

  color: #cdcdcd;
  font-size: 20px;
  width: 30%;
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
  margin: 0 6vw 0 6vw;
}

div.produto img {
  width: 93%;
  position: relative;
  /* necessário para o botão ficar relativo à imagem */
  border-radius: 8px;
  height: 87%;
  object-fit: cover;
}

div.produto .like-btn {
  position: absolute;
  top: 1.3vw;
  right: 2.9vw;
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
}

div.produto div.info {
  display: flex;
  justify-content: space-between;
  margin: 15px 15px 3px 14px;
}

div.produto button.alugar {
  width: 93%;
  height: 40px;
  background-color: #244e84;
  color: white;
  border: none;
  border-radius: 18px;
  margin-bottom: 10px;
  font-size: 1vw;
}

div.produto p span {
  color: #ffd700;
}

div.produto h1 {
  text-align: left;
  padding: 0 25px;
  display: block;
}

strong {
  padding-left: 10px;
}

.info p {
  padding-right: 10px;
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

.carousel__next,
.carousel__prev {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.carousel2:hover>.carousel>.carousel__next,
.carousel2:hover>.carousel>.carousel__prev,
.carousel__wrapper .carousel__next,
.carousel__wrapper .carousel__prev {
  opacity: 1;
  pointer-events: auto;
}

div.produto:hover .carousel__next,
div.produto:hover .carousel__prev,
div.produto .imagem:hover .carousel__next,
div.produto .imagem:hover .carousel__prev,
.carousel__icon {
  opacity: 1;
  pointer-events: auto;
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



.denuncia {
  & button {
    padding: 15px 10px;
    font-size: 18px;
    background-color: #1D2D51;
    color: #FFFFFF;
    border: none;
    border-radius: 6px;
    margin: 2vw 5vw 5vw 5vw;
  }

  & span {
    margin-right: 3px;
    font-size: 22px;
  }
}
</style>
