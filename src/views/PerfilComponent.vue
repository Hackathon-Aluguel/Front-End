<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

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

  // 'breakpointMode' determines how the carousel breakpoints are calculated
  // Acceptable values: 'viewport' (default) | 'carousel'
  // 'viewport' - breakpoints are based on the viewport width
  // 'carousel' - breakpoints are based on the carousel width
  breakpointMode: 'carousel',

  // Breakpoints are mobile-first
  // Any settings not specified will fall back to the carousel's default settings
  breakpoints: {
    // 300px and up
    300: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    // 400px and up
    400: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    // 500px and up
    500: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
  },
}
</script>
<template>
    <section class="infos">
        <div class="p1">
            <div class="superior">
                <ul>
                    <li>
                        <img src="https://s2.glbimg.com/CZ7vt10tkQki58E3X37KbSrW8PA=/620x430/e.glbimg.com/og/ed/f/original/2022/04/11/dall_e_ia.png"
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
                    <p class="num">5,0 <span class="mdi mdi-star-check"></span></p>
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
      <Slide v-for="avaliacao in avalicoes" :key="avaliacao.id" style="background-color: #f5f5f5; padding: 20px; border-radius: 8;">
        <h1>{{ avaliacao.nome }}</h1>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
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
    padding-bottom: 5vw;
    border-bottom: solid 2px #d3d1d1;

    & h2 {
        font-size: 25px;
        color: black;
        font-weight: bold;
        margin-bottom: 20px;
    }
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
  border: 2px dashed gray;
  overflow: auto;
  max-width: 688px;
  padding: 2px;
}
</style>