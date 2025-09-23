<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { user as globalUser } from '@/stores/user.js'
import axios from 'axios'
import HeaderComponent from './HeaderComponent.vue'
import FooterComponent from './FooterComponent.vue'

const isLogged = computed(() => !!localStorage.getItem('access_token'))

// Campos do produto
const nome = ref('')
const preco = ref('')
const categoria = ref('')
const condicao = ref('')
const cor = ref('')
const quant_estoque = ref('')
const rua = ref('')
const numero = ref('')
const descricao = ref('')
const fotos = ref([])
const fotosPreview = ref([])

const categorias = [
  { id: 1, descricao: 'Eventos e festas' },
  { id: 2, descricao: 'Esporte e lazer' },
  { id: 3, descricao: 'Casa e utilidades' },
  { id: 4, descricao: 'Tecnologia e Eletrônicos' },
  { id: 5, descricao: 'Construção e Reforma' },
  { id: 6, descricao: 'Roupas e acessórios' },
  { id: 7, descricao: 'Infantil' },
  { id: 8, descricao: 'Instrumentos musicais' },
]

const condicoes = [
  { id: 1, descricao: 'Novo' },
  { id: 2, descricao: 'Seminovo' },
  { id: 3, descricao: 'Usado' },
  { id: 4, descricao: 'Recondicionado' },
  { id: 5, descricao: 'Defeituoso' },
]

// Flags de sucesso/erro
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// Seleção de fotos
const selecionarFotos = (event) => {
  let files = Array.from(event.target.files)
  if (files.length > 6) {
    files = files.slice(0, 6)
    alert("Você só pode adicionar no máximo 6 fotos.")
  }
  fotos.value = files
  fotosPreview.value = files.map(file => URL.createObjectURL(file))
}

// Função para limpar todos os campos
const limparCampos = () => {
  nome.value = ''
  preco.value = ''
  categoria.value = ''
  condicao.value = ''
  descricao.value = ''
  numero.value = ''
  rua.value = ''
  cor.value = ''
  quant_estoque.value = ''
  fotos.value = []
  fotosPreview.value = []
}

// Cadastro de produto
const cadastrarProduto = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const formData = new FormData()
    formData.append('nome', nome.value)
    formData.append('preco', preco.value)
    formData.append('descricao', descricao.value)
    formData.append('numero', numero.value)
    formData.append('nome_rua', rua.value)
    formData.append('categoria', categoria.value)
    formData.append('condicao', condicao.value)
    formData.append('cor', cor.value)
    formData.append('quant_estoque', quant_estoque.value)
    fotos.value.forEach(file => formData.append('fotos', file))

    const response = await axios.post(
      'http://127.0.0.1:8000/api/itens/',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    // Cadastro deu certo
    showSuccess.value = true
    showError.value = false
    limparCampos()
    setTimeout(() => { showSuccess.value = false }, 3000)

  } catch (error) {
    const errorText = error.response?.data || error.message

    // Ignora se for UNIQUE constraint do Midia_item
    if (typeof errorText === 'string' && errorText.includes('UNIQUE constraint failed: core_midia_item.item_id')) {
      console.warn('Produto já tinha Midia_item, ignorando...')
      showSuccess.value = true
      showError.value = false
      limparCampos()
      setTimeout(() => { showSuccess.value = false }, 3000)
      return
    }

    // Caso seja outro erro
    console.error(errorText)
    errorMessage.value = 'Erro ao cadastrar produto'
    showError.value = true
    showSuccess.value = false
    setTimeout(() => { showError.value = false }, 3000)
  }
}
</script>

<template>
  <HeaderComponent />
  <section>
    <div v-if="globalUser">
      <div v-if="showSuccess" class="sucesso">
  Produto cadastrado com sucesso!
</div>

<div v-if="showError" class="erro">
  {{ errorMessage }}
</div>
      <div class="fundo">
        <h1>Cadastre seu produto</h1>
        <div class="cadastro-produto">

          <!-- Área de imagem -->
          <div class="img-produto">
            <label for="inputFotos" style="cursor:pointer">
              <div
                style="max-width:30vw; max-height:35vh ; width:80%; height:58%; border-radius:20px; background-color:#E8F1F2; display:flex; justify-content:center; align-items:center; font-size:50px; overflow:hidden;">
                <span v-if="fotosPreview.length === 0" class="mdi mdi-download"></span>
                <img v-else :src="fotosPreview[0]" alt="Pré-visualização"
                  style="width:100%; height:100%; object-fit:cover; border-radius:20px;">
              </div>
            </label>

            <input type="file" id="inputFotos" multiple accept="image/png, image/jpeg" @change="selecionarFotos"
              style="display:none">

            <div v-if="fotosPreview.length > 1"
              style="display:flex; gap:10px; margin-top:10px; flex-wrap:wrap; max-width:80%;">
              <div v-for="(foto, index) in fotosPreview" :key="index"
                style="width:5.3vw; height:10vh; border-radius:10px; overflow:hidden; border:2px solid #ddd; cursor:pointer;">
                <img :src="foto" alt="Miniatura" style="width:100%; height:100%; object-fit:cover;" />
              </div>
            </div>

            <p v-if="fotosPreview.length === 6" style="color:red; font-size:12px;">
              Limite máximo de 6 fotos atingido.
            </p>

            <p>Adicione 6 fotos no formato PNG ou JPG</p>
            <div class="preco">
              <label for="sale-price">Preço do aluguel</label>
              <input type="number" v-model.number="preco" placeholder="R$ 100,00">

            </div>
            <p></p>
            <button class="cadastrar" @click.prevent="cadastrarProduto">Cadastrar</button>
          </div>

          <!-- Formulário -->
          <div class="form-produto">
            <form>
              <ul>
                <li>
                  <p>Nome do produto</p>
                  <input type="text" v-model="nome">
                </li>
                <li>
                  <p>Categoria</p>
                  <select v-model="categoria">
                    <option value="" disabled selected>Selecione...</option>
                    <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.descricao }}</option>
                  </select>
                </li>
                <li>
                  <p>Cor</p>
                  <input type="text" v-model="cor">
                </li>
                <li>
                  <p>Condição</p>
                  <select v-model="condicao">
                    <option value="" disabled selected>Selecione...</option>
                    <option v-for="c in condicoes" :key="c.id" :value="c.id">{{ c.descricao }}</option>
                  </select>
                </li>
                <li>
                  <p>Quantidade em estoque</p>
                  <input type="number" v-model="quant_estoque">
                </li>
                <li>
                  <ul class="endereco">
                    <li>
                      <p>Rua</p>
                      <input type="text" v-model="rua">
                    </li>
                    <li>
                      <p>Número</p>
                      <input type="number" v-model="numero">
                    </li>
                  </ul>
                </li>
              </ul>
            </form>
            <textarea v-model="descricao" maxlength="300"
              placeholder="Descreva seu produto (até 300 caracteres)."></textarea>
            <p><small>Obs: coloque informações relevantes como: Marca/Fabricante, Modelo/Código, peso/dimensões, cor,
                material, etc.</small></p>
          </div>

        </div>
      </div>
    </div>
    <div v-else class="logue">
      <p>Você precisa <span>
          <RouterLink to="/login" class="link-login">entrar</RouterLink>
        </span> para cadastrar produtos.</p>
    </div>
  </section>
  <FooterComponent />
</template>



<style lang="scss">
h1 {
  text-align: center;
  font-size: 25px;
}
.erro {
  position: fixed;
  text-align: center;
  left: 44%;
  justify-content: center;
  top: 18%;
  background-color: #f44336; /* vermelho */
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  font-size: 16px;
  z-index: 9999;
  transition: all 0.3s ease;
}
.fundo {
  background-color: white;
  padding: 2vw 0;
}

.cadastro-produto {
  display: flex;
  margin-top: 3vw;
}

.sucesso {
  position: fixed;
  top: 18%;
  left: 44%;
  background-color: #4CAF50;
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  font-size: 16px;
  z-index: 9999;
  transition: all 0.3s ease;
}

.img-produto {
  margin: 1.5vw 0 0 6vw;
  width: 25%;

  & button:not(.cadastrar) {
    width: 80%;
    height: 58%;
    border-radius: 20px;
    border: none;
    background-color: #E8F1F2;
    font-size: 50px;
  }

  & button:hover:not(.cadastrar) {
    border: 2px solid #244E8A;
    cursor: pointer;
  }

  & button:focus:not(.cadastrar) {
    border: 2px solid #244E8A;
    outline: none;
  }

  & .cadastrar {
    width: 80%;
    height: 50px;
    border-radius: 6px;
    border: none;
    background-color: #244E8A;
    color: white;
    font-size: 20px;
    margin-top: 1.6vw;
  }

  & p:first-of-type {
    color: #244E8A;
    font-size: 18px;
  }

  & div.preco {
    display: flex;
    margin-top: 2vw;
    flex-direction: column;
    gap: 15px;
    font-family: 'Poppins', sans-serif;
  }

  & div.preco label {
    font-size: 18px;
    font-weight: 600;
  }

  & div.preco input {
    padding: 12px;
    width: 75%;
    border: 2px solid #cdcdcd;
    background-color: #F4F4F4;
    border-radius: 8px;
    outline: none;
    font-size: 18px;
    font-family: 'Poppins', sans-serif;
    color: #333;
  }

  & div.preco input:focus,
  & div.preco input:hover {
    border: 2px solid #244E8A;
  }
}

.form-produto {
  width: 80%;

  & ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0;

    & li {
      width: 50%;

      & p {
        font-size: 18px;
        font-weight: bold;
      }

      & input,
      & select {
        width: 80%;
        height: 45px;
        border-radius: 8px;
        border: 2px solid #cdcdcd;
        background-color: #F4F4F4;
        font-size: 18px;
        padding-left: 10px;
        color: #333;
        margin-bottom: 1.2vw;
      }

      & input:hover,
      & select:hover {
        border: 2px solid #244E8A;
      }

      & input:focus,
      & select:focus {
        border: 2px solid #244E8A;
        outline: none;
      }

      & select {
        width: 82%;
        height: 50px;
        padding-right: 20px;
      }

      & ul {
        display: flex;
        padding: 0;
        width: 88.8%;
      }
    }
  }

  & textarea {
    margin: 2vw 0 0 39.5px;
    width: 86%;
    height: 150px;
    background-color: #F4F4F4;
    font-size: 18px;
    padding: 8px 15px;
    border-radius: 8px;
    border: 2px solid #cdcdcd;
    color: #333;
  }

  & textarea:focus,
  & textarea:hover {
    border: 2px solid #244E8A;
    outline: none;
  }

  & small {
    margin-left: 39.5px;
    color: gray;
    font-size: 14px;
  }
}

.logue {
  text-align: center;
  font-family: poppins, sans-serif;
  font-size: 1.75rem;
}

.link-login {
  color: #244E8A !important;
}
</style>
