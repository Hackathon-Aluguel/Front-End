<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { user } from '@/stores/user.js'
import axios from 'axios'

const isLogged = computed(() => !!localStorage.getItem('access_token'))

// Campos do produto
const nome = ref('')
const preco = ref('')
const categoria = ref('')
const cor = ref('')
const condicao = ref('')
const quant_estoque = ref('')
const rua = ref('')
const numero = ref('')
const descricao = ref('')
const fotos = ref([]) // Armazena arquivos de imagem

// Seleção de fotos
const selecionarFotos = (event) => {
  fotos.value = Array.from(event.target.files)
  console.log(fotos.value) // Para teste
}

// Cadastro de produto
const cadastrarProduto = async () => {
  try {
    const token = localStorage.getItem('access_token')

    // Criando FormData para enviar arquivos
    const formData = new FormData()
    formData.append('nome', nome.value)
    formData.append('preco', preco.value)
    formData.append('categoria', categoria.value)
    formData.append('cor', cor.value)
    formData.append('condicao', condicao.value)
    formData.append('quant_estoque', quant_estoque.value)
    formData.append('rua', rua.value)
    formData.append('numero', numero.value)
    formData.append('descricao', descricao.value)
    fotos.value.forEach((file, i) => {
      formData.append('fotos', file) // backend precisa aceitar 'fotos' como array
    })

    const response = await axios.post('http://127.0.0.1:8000/produtos/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    alert('Produto cadastrado com sucesso!')
    console.log(response.data)

    // Limpar campos
    nome.value = ''
    preco.value = ''
    categoria.value = ''
    cor.value = ''
    condicao.value = ''
    quant_estoque.value = ''
    rua.value = ''
    numero.value = ''
    descricao.value = ''
    fotos.value = []

  } catch (error) {
    console.error(error)
    alert('Erro ao cadastrar produto. Veja o console para mais detalhes.')
  }
}
</script>

<template>
  <div v-if="user">
    <div class="fundo">
      <h1>Cadastre seu produto</h1>
      <div class="cadastro-produto">

        <!-- Área de imagem -->
        <div class="img-produto">
          <label for="inputFotos" style="cursor:pointer">
            <div style="width:80%; height:58%; border-radius:20px; background-color:#E8F1F2; display:flex; justify-content:center; align-items:center; font-size:50px;">
              <span class="mdi mdi-download"></span>
            </div>
          </label>
          <input type="file" id="inputFotos" multiple accept="image/png, image/jpeg" @change="selecionarFotos" style="display:none">
          <p>Adicione 6 fotos no formato PNG ou JPG</p>
          <p>R$ <input type="number" v-model="preco"></p>
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
                  <option value="evento/festa">Eventos e festas</option>
                  <option value="esporte/lazer">Esporte e lazer</option>
                  <option value="casa/utilidades">Casa e Utilidades</option>
                  <option value="tech/eletro">Tecnologia e Eletrônicos</option>
                  <option value="const/reforma">Construção e Reforma</option>
                  <option value="roupas/acesso">Roupas e acessórios</option>
                  <option value="infantil">Infantil</option>
                  <option value="instru-musicais">Instrumentos musicais</option>
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
                  <option value="novo">Novo</option>
                  <option value="seminovo">Seminovo</option>
                  <option value="usado">Usado</option>
                  <option value="recondicionado">Recondicionado</option>
                  <option value="defeituoso">Defeituoso</option>
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
          <textarea v-model="descricao" maxlength="300" placeholder="Descreva seu produto (até 300 caracteres)."></textarea>
          <p><small>Obs: coloque informações relevantes como: Marca/Fabricante, Modelo/Código, peso/dimensões, cor, material, etc.</small></p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Você precisa <RouterLink to="/login">entrar</RouterLink> para cadastrar produtos.</p>
  </div>
</template>


<style lang="scss">
h1 { text-align:center; font-size:25px; }
.fundo { background-color:white; padding:2vw 0; }
.cadastro-produto { display:flex; margin-top:3vw; }

.img-produto {
  margin:1.5vw 0 0 6vw; width:25%;
  & button:not(.cadastrar) { width:80%; height:58%; border-radius:20px; border:none; background-color:#E8F1F2; font-size:50px; }
  & button:hover:not(.cadastrar) { border:2px solid #244E8A; cursor:pointer; }
  & button:focus:not(.cadastrar) { border:2px solid #244E8A; outline:none; }
  & .cadastrar { width:80%; height:50px; border-radius:2px; border:none; background-color:#244E8A; color:white; font-size:20px; margin-top:1.6vw; }
  & p:first-of-type { color:#244E8A; font-size:18px; }
  & p:last-of-type { font-size:30px; color:black; font-weight:bold; margin-top:50px; display:flex; align-items:center;
    & input { width:66%; margin-left:10px; font-size:18px; }
  }
}

.form-produto {
  width:80%;
  & ul { display:flex; flex-wrap:wrap; margin:0; & li { width:50%;
    & p { font-size:18px; font-weight:bold; }
    & input, & select { width:80%; height:45px; border-radius:8px; border:1px solid black; background-color:#F4F4F4; font-size:18px; padding-left:10px; margin-bottom:1.2vw; }
    & input:hover, & select:hover { border:2px solid #244E8A; }
    & input:focus, & select:focus { border:2px solid #244E8A; outline:none; }
    & select { width:82%; height:50px; padding-right:20px; }
    & ul{ display:flex; padding:0; width:88.8%; }
  }}
  & textarea { margin:2vw 0 0 39.5px; width:86%; height:150px; background-color:#F4F4F4; font-size:18px; padding:8px 15px; border-radius:8px; }
  & textarea:focus, & textarea:hover { border:2px solid #244E8A; outline:none; }
  & small { margin-left:39.5px; color:gray; font-size:14px; }
}
</style>
