<script setup>
import { ref } from "vue"

const descricao = ref("");
const selected = ref("");
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
                    <p class="num">5,0 <span class="mdi mdi-emoticon"></span></p>
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
        <div class="avaliar">
            <p>As avaliações são públicas e incluem informações sobre sua conta e seu dispositivo.</p>
            <ul>
                <li>
                    <span class="mdi mdi-emoticon Mfeliz" :class="{ ativo: selected === 'Mfeliz' }"
                        @click="selected = 'Mfeliz'">
                    </span>
                </li>
                <li>
                    <span class="mdi mdi-emoticon-wink feliz" :class="{ ativo: selected === 'feliz' }"
                        @click="selected = 'feliz'">
                    </span>
                </li>
                <li>
                    <span class="mdi mdi-emoticon-confused-outline neutro" :class="{ ativo: selected === 'neutro' }"
                        @click="selected = 'neutro'">
                    </span>
                </li>
                <li>
                    <span class="mdi mdi-emoticon-sad triste" :class="{ ativo: selected === 'triste' }"
                        @click="selected = 'triste'">
                    </span>
                </li>
                <li>
                    <span class="mdi mdi-emoticon-angry muito-triste" :class="{ ativo: selected === 'muito-triste' }"
                        @click="selected = 'muito-triste'">
                    </span>
                </li>
            </ul>

            <p class="desc">Descreva sua experiência (opcional)</p>
            <textarea name="descricao" id="descricao" maxlength="500" v-model="descricao">
            </textarea>
            <p class="contador">{{ descricao.length }}/500</p>

            <p class="btn"><button>Enviar</button></p>
        </div>
    </section>
</template>
<style lang="scss">
.infos {
    display: flex;
    width: 100%;
    margin: 0 5vw;
    margin-top: 5vw;
    padding-bottom: 5vw;
    border-bottom: solid 2px #d3d1d1;

    & .p1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 380px;
        width: 33%;
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
                    margin-bottom: 0;
                }

                & p {
                    color: #CDCDCD;
                    margin-bottom: 25px;
                    margin-top: 0;
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
                    cursor: pointer;


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
                display: flex;
                font-size: 30px;
                font-weight: bold;
                height: 37px;

                & span {
                    margin-left: 10px;
                }
            }

            & div:first-of-type {
                margin-left: 2vw;
            }

            & p {
                color: black;
                margin: 0;
            }

            & p:last-of-type {
                width: 100px;
            }

        }
    }

    & .avaliar {
        margin-left: 8vw;

        & ul {
            display: flex;
            gap: 50px;
            padding: 0;

            & li {

                & span {
                    font-size: 40px;
                    cursor: pointer;
                }
            }
        }

        & p:first-of-type {
            width: 68%;
            margin-bottom: 5vw;
        }

        & p.desc {
            margin-top: 5vw;
        }

        & .contador {
            width: 71%;
            text-align: right;
            margin: 0;
            margin-top: 10px;
        }

        & textarea {
            width: 68%;
            height: 150px;
            border-radius: 8px;
            border: solid 1px black;
            padding: 10px;
            font-size: 16px;
            resize: none;
        }
        & .btn {
            margin: 0;
        }
        & button {
            padding: 15px 45px;
            border-radius: 14px;
            border: solid 1px black;
            font-size: 16px;
        }


        & span.ativo.Mfeliz {
            color: green;
        }

        & span.ativo.feliz {
            color: lightgreen;
        }

        & span.ativo.neutro {
            color: yellow;
        }

        & span.ativo.triste {
            color: orange;
        }

        & span.ativo.muito-triste {
            color: red;
        }

    }
}
</style>