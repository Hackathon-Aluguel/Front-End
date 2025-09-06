<script setup>
import { ref, watch } from 'vue'

// Props do componente
const props = defineProps({
  produtosAntes: Array,
  precoMin: Number,
  precoMax: Number,
  filtroAberto: Boolean,
  minhaLocalizacao: Object
})

// Eventos emitidos
const emit = defineEmits(['filtrar', 'fechar'])

const produtosFiltrados = ref([])
const distanciaAtual = ref(2)
const categoriasSelecionadas = ref([])
const precoSelecionado = ref(props.precoMax / 2)
const tooltipPos = ref(50)
const rangeSlider = ref(null)

watch(() => props.minhaLocalizacao, (newVal, oldVal) => {
  if (newVal.lat !== oldVal.lat || newVal.lng !== oldVal.lng) {
    aplicarFiltro()
  }
}, { deep: true })



const categorias = [
  'Eventos e festas', 'Esporte e lazer', 'Casa e utilidades', 
  'Tecnologia e Eletrônicos', 'Construção e Reforma', 'Infantil', 
  'Roupas e acessórios', 'Instrumentos musicais'
]

// Função de distância
function calcularDistanciaMetros(lat1, lng1, lat2, lng2) {
  const R = 6371e3
  const toRad = x => (x * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function filtrarPorDistancia(distanciaKm) {
  return props.produtosAntes.filter(produto => {
    const distanciaFinal = calcularDistanciaMetros(
      produto.lat, produto.lng,
      props.minhaLocalizacao.lat, props.minhaLocalizacao.lng
    )
    console.log(produto.nome, distanciaFinal / 1000, "km")
    return distanciaFinal / 1000 <= distanciaKm
  })
}

function atualizarTooltip() {
  const slider = rangeSlider.value
  if (!slider) return
  const val = precoSelecionado.value
  tooltipPos.value = ((val - slider.min) / (slider.max - slider.min)) * 100
}

function aplicarFiltro() {
  let filtrados = filtrarPorDistancia(distanciaAtual.value)

  if (categoriasSelecionadas.value.length > 0) {
    filtrados = filtrados.filter(produto =>
      categoriasSelecionadas.value.includes(produto.categoria)
    )
  }

  filtrados = filtrados.filter(produto =>
    produto.preco <= precoSelecionado.value
  )

  // Atualiza produtosFiltrados local
  produtosFiltrados.value = filtrados

  // Emite o evento com a lista filtrada  emit(\'filtrar\', [...produtosFiltrados.value]) 
  emit('fechar')}
</script>

<template>
  <div v-if="filtroAberto" class="filtroAberto" @mousedown.stop @touchstart.stop>
    <div class="tituloFiltro">
   <span class="mdi mdi-chevron-left" @click="$emit('fechar')"></span>
      <h1>Filtros</h1>
    </div>

    <h2>Distância</h2>
    <div class="distancia">
      <button @click="distanciaAtual = 2; aplicarFiltro()" :class="{ ativo: distanciaAtual === 2 }">Até 2km</button>
      <button @click="distanciaAtual = 5; aplicarFiltro()" :class="{ ativo: distanciaAtual === 5 }">5km</button>
      <button @click="distanciaAtual = 10; aplicarFiltro()" :class="{ ativo: distanciaAtual === 10 }">10km</button>
      <button @click="distanciaAtual = 20; aplicarFiltro()" :class="{ ativo: distanciaAtual === 20 }">20km</button>
    </div>

    <h2>Categoria</h2>
    <div class="categorias">
      <div class="checkbox-container" v-for="categoria in categorias" :key="categoria">
        <label>
          <input type="checkbox" :value="categoria" v-model="categoriasSelecionadas" />
          {{ categoria }}
        </label>
      </div>
    </div>

    <h2>Preço do produto por dia</h2>
    <div class="slider-overlay">
      <div class="double-slider-box">
        <div class="price-slider">
          <h3>R${{ props.precoMin }}</h3>
          <div class="input-wrapper slider-event-shield">
            <input type="range" class="range-slider" :min="props.precoMin" :max="props.precoMax"
              v-model="precoSelecionado" @input="atualizarTooltip" ref="rangeSlider" />
            <div class="tooltip" :style="{ left: tooltipPos + '%' }">
              R${{ precoSelecionado }}
            </div>
          </div>
          <h3>R${{ props.precoMax }}</h3>
        </div>
      </div>
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
    margin: 1vw 3vw 0 0.7vw;
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
    margin: 0.7vw 1vw 0.2vw 1vw;
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
    gap: 0.6vw;
    margin-left: 1vw;
    max-width: 100%;
}

.checkbox-container {
    flex: 1 1 10vw;
    /* cresce e encolhe, base 10vw */
    min-width: 8vw;
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
    left: 0.5vw;
    top: 0.2vw;
    width: 0.4vw;
    height: 0.8vw;
    border: solid white;
    border-width: 0 0.2vw 0.2vw 0;
    transform: rotate(45deg);
}

/* opcional: muda fundo quando marcado */
input[type="checkbox"]:checked {
    background-color: #1D2D51;
    border: none;
}

.checkbox-container {
    width: 10vw;
}

.categorias {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5vw;
    margin: 0 0 0 1vw;
}

.checkbox-container {
    width: 10vw;
}

label {
    display: flex;
    align-items: center;
    gap: 0.5vw;
    cursor: pointer;
    color: black;
    font-size: 1vw;
    width: 18vw;
}

.double-slider-box {
    margin: 4vw 2vw;
    width: 40vw;
}

.price-slider {
    margin: 3vh 0;
    display: flex;
    align-items: center;
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