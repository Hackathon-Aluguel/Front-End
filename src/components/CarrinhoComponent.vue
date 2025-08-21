<script setup>
import { reactive, ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const produtos = reactive([
  {
    id: 1,
    nome: 'pantufas extremamente macias',
    preco: 30,
    estrelas: 4,
    likes: 20,
    liked: false,
    periodoInicial: new Date(2025, 7, 28),
    periodoFinal: new Date(2025, 7, 30),
    imagem: 'https://picsum.photos/400/300?random=100',
    categoria: 'camping',
    editando: false,
  },
  {
    id: 2,
    nome: 'saco de dormir',
    preco: 25,
    estrelas: 5,
    likes: 4,
    liked: false,
    periodoInicial: new Date(2025, 7, 28),
    periodoFinal: new Date(2025, 7, 30),
    imagem: 'https://picsum.photos/400/300?random=101',
    categoria: 'camping',
    editando: false,
  },
  {
    id: 3,
    nome: 'lanterna',
    preco: 10,
    estrelas: 4,
    likes: 14,
    liked: false,
    periodoInicial: new Date(2025, 7, 28),
    periodoFinal: new Date(2025, 7, 30),
    imagem: 'https://picsum.photos/400/300?random=102',
    categoria: 'iluminação',
    editando: false,
  },
  {
    id: 4,
    nome: 'fogareiro',
    preco: 40,
    estrelas: 3,
    likes: 12,
    liked: false,
    periodoInicial: new Date(2025, 7, 28),
    periodoFinal: new Date(2025, 7, 30),
    imagem: 'https://picsum.photos/400/300?random=103',
    categoria: 'cozinha',
    editando: false,
  },
  {
    id: 5,
    nome: 'mochila',
    preco: 50,
    estrelas: 5,
    likes: 10,
    liked: false,
    periodoInicial: new Date(2025, 7, 28),
    periodoFinal: new Date(2025, 7, 30),
    imagem: 'https://picsum.photos/400/300?random=104',
    categoria: 'mochila',
    editando: false,
  },
])

const aberto = ref(false)
const abertoProduto = ref(null)

function abrirProduto(id) {
  abertoProduto.value = id
}
function fecharProduto() {
  abertoProduto.value = null
}

function abrirTudo() {
  aberto.value = !aberto.value
}
function limparTudo() {
  produtos.splice(0, produtos.length)
  aberto.value = !aberto.value
}

function preco() {
  return produtos.reduce((total, prod) => total + calcularPreco(prod), 0)
}
function desconto() {
  return 2
}

function calcularDias(produto) {
  const inicio = new Date(produto.periodoInicial)
  const fim = new Date(produto.periodoFinal)
  const diff = fim - inicio
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function calcularPreco(produto) {
  return produto.preco * calcularDias(produto)
}

const datasTemporarias = reactive({
  periodoInicial: null,
  periodoFinal: null,
})

function formatarData(date) {
  if (!date) return ''
  const dia = String(date.getDate()).padStart(2, '0')
  const mes = String(date.getMonth() + 1).padStart(2, '0')
  const ano = date.getFullYear()
  return `${dia}/${mes}/${ano}`
}

function editarProduto(produto) {
  produto.editando = true
  datasTemporarias.periodoInicial = produto.periodoInicial
  datasTemporarias.periodoFinal = produto.periodoFinal
}

function salvar(produto) {
  produto.periodoInicial = datasTemporarias.periodoInicial
  produto.periodoFinal = datasTemporarias.periodoFinal
  pararEditar(produto)
}

function pararEditar(produto) {
  produto.editando = false
}

function remover(id) {
  const index = produtos.findIndex((p) => p.id === id)
  if (index !== -1) produtos.splice(index, 1)
  abertoProduto.value = null
}
</script>

<template>
  <section>
    <div class="carrinho">
      <div class="titu">
        <h1>
          Carrinho <span>({{ produtos.length }} produtos)</span>
        </h1>
        <button class="lixeira" @click="abrirTudo">
          <span class="mdi mdi-close"></span>
          <h2>
            Limpar Carrinho
          </h2>
        </button>
      </div>
      <div v-if="aberto">
        <div class="overlay">
          <div class="lixeiraAberta">
            <h2>Tem certeza que voce quer limpar tudo?</h2>
            <div class="botoes">
              <button @click="abrirTudo">Cancelar</button>
              <button @click="limparTudo">Sim</button>
            </div>
          </div>
        </div>
      </div>
      <ul class="titulos">
        <li class="prod">Produto</li>
        <li class="peri">Periodo</li>
        <li class="preco">Preço</li>
      </ul>
      <div class="carrinhoProduto">
        <ul>
          <li v-for="produto in produtos" :key="produto.id" class="produto">
            <div class="info">
              <img :src="produto.imagem" :alt="produto.nome" width="200" />
              <div class="nome">
                <h2>{{ produto.nome }}</h2>
                <p>{{ produto.categoria }}</p>
              </div>
            </div>
            <div class="periodo">
              <p>
                {{ formatarData(produto.periodoInicial) }}
                <span class="mdi mdi-arrow-right-thin"></span>
                {{ formatarData(produto.periodoFinal) }}
              </p>
              <button @click="editarProduto(produto)">Editar datas</button>
              <div v-if="produto.editando">
                <div class="overlay" @click="pararEditar(produto)"></div>
                <div class="aberto">
                  <h3>Editar datas</h3>
                  <label>
                    <p>Data inicial</p>
                    <Datepicker v-model="datasTemporarias.periodoInicial" :format="'dd/MM/yyyy'"
                      :input-format="'dd/MM/yyyy'" :use-utc="true" :time-picker="false"
                      placeholder="Selecione a data" />
                  </label>
                  <label>
                    <p>Data final</p>
                    <Datepicker v-model="datasTemporarias.periodoFinal" :format="'dd/MM/yyyy'"
                      :input-format="'dd/MM/yyyy'" :use-utc="true" :time-picker="false"
                      placeholder="Selecione a data" />
                  </label>
                  <div class="botoes">
                    <button @click="salvar(produto)">Salvar</button>
                    <button @click="pararEditar(produto)">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
            <p class="preco">R${{ calcularPreco(produto) }}</p>
            <button @click="abrirProduto(produto.id)" class="remover"><span class="mdi mdi-close"></span></button>
          </li>
          <div v-if="abertoProduto" class="overlay">
  <div class="lixeiraAberta">
    <h2>Tem certeza que voce quer apagar esse produto?</h2>
    <div class="botoes">
      <button @click="fecharProduto">Cancelar</button>
      <button @click="remover(abertoProduto)">Sim</button>
    </div>
  </div>
</div>
        </ul>
      </div>
    </div>
    <div class="promocao">
      <h2 class="principal">
        Codigo Promocional
      </h2>

      <div class="container">
        <form action="" class="search-bar">
          <input type="text" placeholder="Escreva aqui" name="q" />
          <button type="submit">Pronto</button>
        </form>
      </div>
      <hr class="linha">
      <ul>
        <li>
          <h3>subtotal</h3>
          <h3>R${{ preco() }}</h3>
        </li>
        <li>
          <h3>desconto</h3>
          <h3>R${{ desconto() }}</h3>
        </li>
        <li>
          <h3>total</h3>
          <h3><span>R${{ preco() - desconto() }}</span></h3>
        </li>
      </ul>
      <button class="continuar">Continue para o checkout</button>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
}

ul {
  list-style: none;
}

div.promocao {
  background-color: #244e84;
  height: 39vh;
  width: 20vw;
  border-radius: 15px;
  margin: 4vw 4vw 0 2vw;
}

div.promocao h2.principal {
  color: white;
  margin: 1vw 0 0 1vw
}

.container {
  display: flex;
  padding: 20px;
}

.search-bar {
  display: flex;
  gap: 9px;
}

.search-bar input {
  padding: 0.6vw 1vw;
  border: 1px solid #cdcdcd;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  color: #cdcdcd;
  background: transparent;
}

.search-bar input::placeholder {
  color: #cdcdcd;
  font-size: 1vw;
}

.search-bar button {
  padding: 0.8vw 1vw;
  border: none;
  border-radius: 5px;
  color: #0066cc;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease;
  width: 6.6vw;
}

.search-bar button span {
  color: red;
  font-size: 1.8vw;
}

hr {
  margin: 0.5vw 1vw 0.5vw 1vw;
}

div.promocao ul {
  margin: 0;
  padding: 0;
  /* tira o espaço interno */

}

div.promocao ul li {
  display: flex;
  justify-content: space-between;
  margin: 0.5vw 1vw 0 1vw;
}

div.promocao ul li h3 {
  font-size: 18px;
  color: #cdcdcd;
}

div.promocao ul li h3 span {
  color: white;
  font-weight: bold;
}

div.promocao button.continuar {
  background-color: #1d2d51;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  margin-top: 0.8vw;
  width: 16vw;
  height: 6vh;
  color: white;
}

/* CARRRINHOOOOOOOO */
section div.carrinho {
  border: 1px solid #cdcdcd;
  border-radius: 1vw;
  margin: 4vw 4vw 0 4vw;
  width: 65%;
}

section div.carrinho .carrinhoProduto {
  max-height: 35vw;
  /* altura máxima da lista */
  overflow-y: auto;
  /* ativa barra de rolagem vertical */
  border-radius: 1vw;
  margin: 0 2vw 1vw 2vw;
}

section div.carrinho .titu {
  display: flex;
  justify-content: space-between;
}

section div.carrinho h1 {
  color: black;
  font-size: 1.4vw;
  font-weight: bold;
  margin: 2vw 0 2vw 4vw;
}

section div.carrinho .titu button.lixeira {
  border: none;
  background: transparent;
  display: flex;
  color: #1d2d51;
  margin: 2vw 4vw 2vw 0;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  position: relative;
  /* mantém o botão no lugar */
}

section div.carrinho .titu button.lixeira span {
  font-size: 2vw;
}

section div.carrinho h1 span {
  color: #cdcdcd;
}

section div.carrinho div div.overlay div.lixeiraAberta {
  position: fixed;
  width: 20vw;
  height: 20vh;
  background: white;
  border: 1px solid #cdcdcd;
  border-radius: 1vw;
  padding: 1vw;
  margin-top: 0.5vw;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

section div.carrinho ul.titulos {
  display: flex;
  justify-content: space-around;
  font-size: 1.1vw;
  color: black;
}

section div.carrinho ul.titulos li {
  font-weight: bold;
}

section div.carrinho ul.titulos li.peri {
  margin: 0 0 0 15vw;
}

section div.carrinho ul.titulos li.preco {
  margin: 0 10vw 0 0;
}

section div.carrinho ul li.produto {
  display: flex;
  justify-content: space-between;
  border: 1px solid #cdcdcd;
  padding: 1vw;
  margin: 1vw 4vw 1vw 0;
  border-radius: 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

section div.carrinho ul li.produto div.info {
  display: flex;
  width: 40%;
}

section div.carrinho ul li.produto div.info img {
  border-radius: 0.5vw;
  margin: 0 1vw 0 0;
}

section div.carrinho ul li.produto div.info .nome h2 {
  font-size: 1.2vw;
  white-space: nowrap;
  /* não deixa quebrar a linha */
  overflow: hidden;
  /* corta o que passar do espaço */
  text-overflow: ellipsis;
  /* mostra "..." no fim se cortar */
  max-width: 12vw;
}

section div.carrinho ul li.produto div.info .nome p {
  color: #cdcdcd;
  font-size: 0.9vw;
}

.periodo {
  display: flex;
  flex-direction: column;
  /* mantém datas e botão em coluna */
  align-items: center;
  /* centraliza horizontalmente */
}

.periodo p {
  font-size: 0.9vw;
  color: #1d2d51;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.3vw;
  /* espaço entre datas e ícone */
}

.periodo span.mdi {
  font-size: 1.5vw;
  color: #244e84;
}

.periodo button {
  padding: 0.3vw 0.8vw;
  border: none;
  border-radius: 0.5vw;
  color: #1d2d51;
  cursor: pointer;
  font-size: 0.9vw;
  background-color: white;
  text-decoration: underline;
}

section div.carrinho ul li.produto p.preco {
  font-size: 1.1vw;
  font-weight: bold;
  color: black;
}

section div.carrinho ul li.produto button.remover {
  border: none;
  background-color: white;
  font-size: 1.4vw;
  color: #1d2d51;
}

.carrinhoProduto::-webkit-scrollbar {
  width: 8px;
  /* largura da barra */
}

.carrinhoProduto::-webkit-scrollbar-thumb {
  background: #1d2d51;
  /* cor do "botão" que arrasta */
  border-radius: 8px;
}

.carrinhoProduto::-webkit-scrollbar-thumb:hover {
  background: #244e84;
  /* cor quando passa o mouse */
}

.aberto {
  position: fixed;
  width: 20vw;
  height: 40vh;
  background: white;
  border: 1px solid #cdcdcd;
  border-radius: 1vw;
  padding: 1vw;
  margin-top: 0.5vw;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  /* preto semitransparente */
  z-index: 0;
  /* menor que o modal, que está em 10 */
}

.aberto h3 {
  margin: 0 0 1vw 0;
  font-size: 1.1vw;
}

.aberto label {
  display: block;
  margin-bottom: 0.5vw;
}

.aberto label p {
  margin: 0 0 0.2vw 0;
  font-size: 0.9vw;
  color: #333;
}

.botoes {
  display: flex;
  justify-content: flex-end;
  gap: 0.5vw;
  margin-top: 0.5vw;
}

.botoes button {
  padding: 0.3vw 0.8vw;
  border: none;
  border-radius: 0.5vw;
  cursor: pointer;
  font-size: 0.9vw;
}

.botoes button:first-child {
  background-color: #1d2d51;
  color: white;
}

.botoes button:last-child {
  background-color: #cdcdcd;
  color: #333;
}
</style>
