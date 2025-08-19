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

function calcularDias(produto) {
  const inicio = new Date(produto.periodoInicial) // garante que seja Date
  const fim = new Date(produto.periodoFinal)
  const diff = fim - inicio // diferença em milissegundos
  const dias = Math.ceil(diff / (1000 * 60 * 60 * 24)) // converter para dias
  return dias
}

function calcularPreco(produto) {
  const dias = calcularDias(produto)
  return produto.preco * dias
}

// Exemplo de uso
produtos.forEach(produto => {
  console.log(`${produto.nome}: ${calcularDias(produto)} dias, R$ ${calcularPreco(produto)}`)
})

const datasTemporarias = reactive({
  periodoInicial: null,
  periodoFinal: null
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
  produtoEditando.value = produto
  // copia os valores atuais para edição temporária
  datasTemporarias.periodoInicial = produto.periodoInicial
  datasTemporarias.periodoFinal = produto.periodoFinal
}

function salvar(produto) {
  // só aqui atualiza o produto real
  produto.periodoInicial = datasTemporarias.periodoInicial
  produto.periodoFinal = datasTemporarias.periodoFinal
  pararEditar(produto)
}

function pararEditar(produto) {
  produto.editando = false
  produtoEditando.value = null
}
function remover(id) {
  const index = produtos.findIndex((p) => p.id === id)
  if (index !== -1) produtos.splice(index, 1)
}
</script>

<template>
  <section>
    <div class="carrinho">
      <h1>
        Carrinho <span>({{ produtos.length }} produtos)</span>
      </h1>
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
              <div v-if="produto.editando" >
                <div class="overlay" @click="pararEditar(produto)"></div>
                <div class="aberto">
                  <h3>Editar datas</h3>
                  <label>
                    <p>Data inicial</p>
                    <Datepicker
                      v-model="datasTemporarias.periodoInicial"
                      :format="'dd/MM/yyyy'"
                      :input-format="'dd/MM/yyyy'"
                      :use-utc="true"
                      :time-picker="false"
                      placeholder="Selecione a data"
                    />
                  </label>
                  <label>
                    <p>Data final</p>
                    <Datepicker
                      v-model="datasTemporarias.periodoFinal"
                      :format="'dd/MM/yyyy'"
                      :input-format="'dd/MM/yyyy'"
                      :use-utc="true"
                      :time-picker="false"
                      placeholder="Selecione a data"
                    />
                  </label>
                  <div class="botoes">
                    <button @click="salvar(produto)">Salvar</button>
                    <button @click="pararEditar(produto)">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
            <p class="preco">R${{ calcularPreco(produto) }}</p>
            <button @click="remover(produto.id)" class="remover"><span class="mdi mdi-close"></span></button>
          </li>
        </ul>
      </div>
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

section div.carrinho {
  border: 1px solid #cdcdcd;
  border-radius: 1vw;
  margin: 4vw;
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
section div.carrinho h1 {
  color: black;
  font-size: 1.4vw;
  font-weight: bold;
}

section div.carrinho h1 span {
  color: #cdcdcd;
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
  margin: 0 0 0 15vw ;
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
  flex-direction: column; /* mantém datas e botão em coluna */
  align-items: center; /* centraliza horizontalmente */
}

.periodo p {
  font-size: 0.9vw;
  color: #1d2d51;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.3vw; /* espaço entre datas e ícone */
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
  background: rgba(0, 0, 0, 0.5); /* preto semitransparente */
  z-index: 0; /* menor que o modal, que está em 10 */
}
.aberto1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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
