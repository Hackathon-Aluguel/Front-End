<script setup>
import { ref, watch, onMounted } from 'vue'
import { getDistance } from 'geolib'

// Props do componente
const props = defineProps({
  produtosAntes: Array,
  precoMin: Number,
  precoMax: Number,
  filtroAberto: Boolean,
  minhaLocalizacao: Object
})

// Eventos emitidos
const emit = defineEmits(['filtrar', 'fechar', 'produtos-filtrados'])

// Estado reativo
const produtosFiltrados = ref([...props.produtosAntes])
const distanciaAtual = ref(15) // valor inicial do filtro de distância (km)
const categoriasSelecionadas = ref([]) // categorias selecionadas
const precoSelecionado = ref(props.precoMax / 2) // valor inicial do slider
const tooltipPos = ref(50)
const rangeSlider = ref(null)

// Lista de categorias
const categorias = [
  'Eventos e festas',
  'Esporte e lazer',
  'Casa e utilidades',
  'Tecnologia e Eletrônicos',
  'Construção e Reforma',
  'Infantil',
  'Roupas e acessórios',
  'Instrumentos musicais'
]

// Alterna categoria clicada (ativa/desativa)
function toggleCategoria(categoria) {
  if (categoriasSelecionadas.value.includes(categoria)) {
    categoriasSelecionadas.value = categoriasSelecionadas.value.filter(c => c !== categoria)
  } else {
    categoriasSelecionadas.value.push(categoria)
  }
}

// Atualiza cor do slider
function atualizarTooltip() {
  const slider = rangeSlider.value
  if (!slider) return

  const val = precoSelecionado.value
  const min = Number(slider.min)
  const max = Number(slider.max)
  const percent = ((val - min) / (max - min)) * 100
  tooltipPos.value = percent

  slider.style.background = `linear-gradient(to right, #1D2D51 0%, #1D2D51 ${percent}%, #ddd ${percent}%, #ddd 100%)`
}

// Função para aplicar todos os filtros
function aplicarFiltro() {
  let filtrados = [...props.produtosAntes]

  // 🔹 Filtra por categorias
  if (categoriasSelecionadas.value.length > 0) {
    filtrados = filtrados.filter(produto =>
      categoriasSelecionadas.value.includes(produto.categoria_nome)
    )
  }

  // 🔹 Filtra por preço
  filtrados = filtrados.filter(produto =>
    Number(produto.preco) <= Number(precoSelecionado.value)
  )

  // 🔹 Filtra por distância
  if (props.minhaLocalizacao && props.minhaLocalizacao.lat && props.minhaLocalizacao.lng) {
    filtrados = filtrados.filter(produto => {
      if (!produto.lat || !produto.lng) return false
      const distanciaProduto = getDistance(
        { latitude: produto.lat, longitude: produto.lng },
        { latitude: props.minhaLocalizacao.lat, longitude: props.minhaLocalizacao.lng }
      ) / 1000
      return distanciaProduto <= Number(distanciaAtual.value)
    })
  }

  produtosFiltrados.value = filtrados
  emit('produtos-filtrados', filtrados)
  emit('fechar')
}

// Inicializa cor do slider
onMounted(() => {
  atualizarTooltip()
})
</script>




<template>
  <div v-if="filtroAberto" class="filtroAberto" @mousedown.stop @touchstart.stop>
    <div class="tituloFiltro">
      <span class="mdi mdi-chevron-left" @click="$emit('fechar')"></span>
      <h1>Filtros</h1>
    </div>

    <!-- Distância -->
    <h2>Distância</h2>
    <div class="distancia">
      <button @click="distanciaAtual = 2" :class="{ ativo: distanciaAtual === 2 }">Até 2km</button>
      <button @click="distanciaAtual = 5" :class="{ ativo: distanciaAtual === 5 }">Até 5km</button>
      <button @click="distanciaAtual = 10" :class="{ ativo: distanciaAtual === 10 }">Até 10km</button>
      <button @click="distanciaAtual = 20" :class="{ ativo: distanciaAtual === 20 }">Até 20km</button>
    </div>

    <!-- Categorias -->
    <h2>Categoria</h2>
    <div class="categorias">
      <div class="checkbox-container" v-for="categoria in categorias" :key="categoria">
        <label>
          <input type="checkbox" :value="categoria" v-model="categoriasSelecionadas"/>
          {{ categoria }}
        </label>
      </div>
    </div>

    <!-- Preço -->
    <h2>Preço do produto por dia</h2>
    <div class="slider-overlay">
      <div class="double-slider-box">
        <div class="price-slider">
          <h3>R${{ props.precoMin }}</h3>
          <div class="input-wrapper">
            <input 
              type="range" 
              class="range-slider" 
              :min="props.precoMin" 
              :max="props.precoMax"
              v-model="precoSelecionado" 
              ref="rangeSlider" 
              @input="atualizarTooltip"
            />
            <div class="tooltip" :style="{ left: tooltipPos + '%' }">
              R${{ precoSelecionado }}
            </div>
          </div>
          <h3>R${{ props.precoMax }}</h3>
        </div>
      </div>

      <!-- Botões -->
      <div class="botooes">
        <button class="cancelar" @click="$emit('fechar')">Cancelar</button>
        <button class="pronto" @click="aplicarFiltro">Pronto</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
body,
h1,
h2,
h3,
div,
label,
button {
    font-family: poppins, sans-serif;
}

.filtroAberto {
    position: absolute;
    margin: 1vw;
    background: white;
    border-radius: 0.4vw;
    box-shadow: 0 0.2vw 0.6vw rgba(0, 0, 0, 0.25);
    height: 75vh;
    width: 32vw;
    z-index: 9999;
    padding: 0.5vw;
    pointer-events: auto;
}

.tituloFiltro {
    font-size: 2vw;
    display: flex;
    align-items: center;
    margin: 0vw 3vw 0 0.7vw;
}

.tituloFiltro span {
    cursor: pointer;
}

.filtroAberto h1 {
    text-align: center;
    font-size: 2vw;
    color: black;
    width: 100%;
}

.filtroAberto h2 {
    color: black;
    font-size: 1.2vw;
    margin: 0.5vw 1vw 0.2vw 1vw;
}

.distancia {
    display: flex;
    gap: 0.6vw;
    margin-left: 1vw;
}

.distancia button {
    color: black;
    background-color: #D9D9D9;
    border: none;
    width: 6.5vw;
    height: 4.5vh;
    border-radius: 0.4vw;
    font-size: 1vw;
}

.distancia button.ativo {
    background-color: #1D2D51;
    color: white;
}

.categorias {
    display: flex;
    flex-wrap: wrap;
    gap: 0; /* espaço entre checkboxes */
    margin-left: 1vw;
}

.checkbox-container {
    flex: 1 1 12vw; /* cresce e encolhe, base de 12vw */
    min-width: 11vw; /* garante que não fique muito pequeno */
}

label {
    display: flex;
    align-items: center;
    gap: 0.5vw;
    cursor: pointer;
    color: black;
    font-size: 0.9vw;
    width: 100%; /* ocupa o container do checkbox */
}

input[type="checkbox"] {
    width: 1.3vw;
    height: 1.3vw;
    -webkit-appearance: none;
    appearance: none;
    border: 0.1vw solid #CDCDCD;
    border-radius: 0.3vw;
    position: relative;
    cursor: pointer;
}

/* checkmark */
input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    left: 0.4vw;
    top: 0.2vw;
    width: 0.3vw;
    height: 0.5vw;
    border: solid white;
    border-width: 0 0.2vw 0.2vw 0;
    transform: rotate(45deg);
}

/* fundo quando marcado */
input[type="checkbox"]:checked {
    background-color: #1D2D51;
    border: none;
}


.double-slider-box {
    margin: 2vw 2vw 0 2vw;
    width: 40vw;
}

.price-slider {
    display: flex;
    align-items: center;
    margin: 0 0 0 3vw;
    flex-wrap: wrap;
}

.price-slider h3 {
    font-size: 1.2vw;
    color: #1D2D51;
}

.input-wrapper {
    position: relative;
    display: flex;
    margin: 0 1vw;
    min-width: 15vw;
}

.range-slider {
    -webkit-appearance: none;
    height: 1vh;
    width: 100%;
    background: linear-gradient(to right, #1D2D51 50%, #ddd 50%);
    border-radius: 0.6vw;
}

.range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1.5vw;
    height: 1.5vw;
    background-color: #1D2D51;
    border-radius: 50%;
    cursor: pointer;
}

.tooltip {
    background-color: #1D2D51;
    color: white;
    border-radius: 50vw;
    position: absolute;
    transform: translateX(-50%) translateY(-100%);
    bottom: 0vw;
    font-weight: 600;
    padding: 0.3vw 0.8vw;
    font-size: 0.9vw;
    pointer-events: none;
    z-index: 10;
    transition: left 0.05s ease;
}

.botooes {
    display: flex;
    justify-content: center;
    gap: 1.4vw;
    margin-top: 2vw; /* ajusta para mais perto do slider */
}

.cancelar,
.pronto {
    width: 7vw;
    height: 5vh;
    border-radius: 0.5vw;
    border: none;
    font-weight: bold;
}

.pronto {
    background-color: #1D2D51;
    color: white;
}
</style>