<script setup>
import { ref, onMounted, watch, reactive, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

const produtos = reactive([
  { id: 1, nome: 'Pantufas extremamente macias', preco: 30, estrelas: 4, cidade: 'Joinville', estado: 'SC', likes: 20, liked: false, imagem: 'https://picsum.photos/400/300?random=100', categoria: 'Roupas e acessorios', lat: -26.3044, lng: -48.8463 },
  { id: 2, nome: 'Saco de dormir', preco: 25, estrelas: 5, cidade: 'Joinville', estado: 'SC', likes: 4, liked: false, imagem: 'https://picsum.photos/400/300?random=101', categoria: 'Esporte e lazer', lat: -26.3052, lng: -48.8439 },
  { id: 3, nome: 'Lanterna', preco: 10, estrelas: 4, cidade: 'Joinville', estado: 'SC', likes: 14, liked: false, imagem: 'https://picsum.photos/400/300?random=102', categoria: 'Casa e utilidades', lat: -26.3060, lng: -48.8450 },
  { id: 4, nome: 'Fogareiro', preco: 40, estrelas: 3, cidade: 'Joinville', estado: 'SC', likes: 12, liked: false, imagem: 'https://picsum.photos/400/300?random=103', categoria: 'Esporte e lazer', lat: -26.3055, lng: -48.8447 },
  { id: 5, nome: 'Mochila', preco: 50, estrelas: 5, cidade: 'Joinville', estado: 'SC', likes: 10, liked: false, imagem: 'https://picsum.photos/400/300?random=104', categoria: 'Roupas e acessorios', lat: -26.3048, lng: -48.8472 },
  { id: 5, nome: 'Eu', preco: 50, estrelas: 5, cidade: 'Joinville', estado: 'SC', likes: 10, liked: false, imagem: 'https://picsum.photos/400/300?random=104', categoria: 'Roupas e acessorios', lat: -26.3045, lng: -48.8460 },
])
const minhaLocalizacao = reactive({
  lat: -26.3045,
  lng: -48.8460
});
const categorias = [
  { id: 1, nome: 'Eventos e festas', imagem: './public/images/categoria/categoriaFantasias.jpg' },
  { id: 2, nome: 'Esporte e lazer', imagem: './public/images/categoria/categoriaCamping.jpg' },
  { id: 3, nome: 'Casa e Utilidades', imagem: './public/images/categoria/categoriaBrinquedos.jpg' },
  { id: 4, nome: 'Tecnologia e Eletrônicos', imagem: './public/images/categoria/categoriaFerramentas.jpg' },
  { id: 5, nome: 'Construção e Reforma', imagem: './public/images/categoria/categoriaConstrucao.jpg' },
  { id: 6, nome: 'Infantil', imagem: './public/images/categoria/categoriaLimpeza.jpg' },
  { id: 7, nome: 'Roupas e acessorios', imagem: './public/images/categoria/categoriaLimpeza.jpg' },
  { id: 8, nome: 'Instrumentos musicais', imagem: './public/images/categoria/categoriaLimpeza.jpg' },
]
// Controle do card
const showCarrossel = ref(false)
const produtoSelecionado = ref(null)
const cardTop = ref(0)
const cardLeft = ref(0)

// Função para abrir o card
function abrirCarrossel(produto, marker) {
  produtoSelecionado.value = produto;
  showCarrossel.value = true;
  updateCardPosition(marker);
}

// Carrossel de imagens
const imagesSingle1 = Array.from({ length: 5 }, (_, index) => ({ id: index + 1, url: `https://picsum.photos/400/300?random=${index + 100}` }))
const configSingle1 = { height: 200, width: 300, itemsToShow: 1, snapAlign: 'start' }

// Props para hover
const props = defineProps({ hoverId: Number })

let userMarker = null
let firstLocation = true
const produtoMarkers = []

// Ícone dos marcadores
function packageIcon(background = '#244e84', color = 'white') {
  return L.divIcon({
    html: `<span class="mdi mdi-package-variant-closed" style="font-size: 20px; color: ${color}; background-color: ${background}; border-radius: 50%; padding: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display:inline-block; text-align:center; line-height:1;"></span>`,
    className: 'custom-mdi-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  })
}

// Lista de produtos com coordenadas fixas

// Atualiza posição do card sobre o marcador
function updateCardPosition(marker) {
  const latlng = marker ? marker.getLatLng() : userMarker?.getLatLng()
  if (!latlng) return
  const point = window.map.latLngToContainerPoint(latlng)
  cardTop.value = point.y - 220
  cardLeft.value = point.x - 160
}

onMounted(() => {
  window.map = L.map("map", {
    zoomControl: false // desativa o zoom padrão
  }).setView([-26.3044, -48.8463], 14);

  // adiciona o zoom no canto superior direito
  L.control.zoom({
    position: "topright" // opções: 'topleft', 'topright', 'bottomleft', 'bottomright'
  }).addTo(window.map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(window.map);

  // Marcadores dos produtos
  for (const produto of produtos) {
    const marker = L.marker([produto.lat, produto.lng], { icon: packageIcon() }).addTo(window.map);
    marker.produtoId = produto.id
    marker.on("click", () => abrirCarrossel(produto, marker));
    produtoMarkers.push(marker)
  }

  // Localização do usuário
  window.map.locate({ watch: true, setView: false, maxZoom: 16, enableHighAccuracy: true });
  window.map.on("locationfound", (e) => {
    if (firstLocation) { window.map.setView(e.latlng, 16); firstLocation = false; }
    if (userMarker) userMarker.setLatLng(e.latlng)
    else {
      userMarker = L.marker(e.latlng, { icon: packageIcon() }).addTo(window.map)
      userMarker.on("click", () => {
        showCarrossel.value = true
        updateCardPosition(userMarker)
      })
    }
  })
  window.map.on("locationerror", (e) => console.error("Erro ao obter localização:", e.message))

  // Fecha o card ao clicar fora
  window.map.on("click", () => { showCarrossel.value = false })

  // Atualiza posição do card ao mover ou dar zoom
  window.map.on("move zoomend", () => {
    if (showCarrossel.value && produtoSelecionado.value) {
      const marker = produtoMarkers.find(m => m.produtoId === produtoSelecionado.value.id)
      updateCardPosition(marker)
    }
  })
})

// Watch para hover nos marcadores
watch(() => props.hoverId, (id) => {
  produtoMarkers.forEach(marker => {
    if (marker.produtoId === id)
      marker.setIcon(packageIcon('white', '#244e84')) // hover
    else
      marker.setIcon(packageIcon('#244e84', 'white')) // normal
  })
})
let filtroAberto = ref(false)
function abrirFiltro() {
  filtroAberto.value = !filtroAberto.value
}


const distanciaSelecionada = ref(null)

function distancia(valor) {
  distanciaSelecionada.value = valor
  for (produto of produtos) {
    
  }
}
const categoriasSelecionadas = ref([]);
// valores mínimo e máximo
const min = ref(0);
const max = ref(100);

// valor selecionado
const value = ref(50);

// SLIDER DO FILTROOOOOOOOOOOO 
const precoMin = 100
const precoMax = 5000
const precoSelecionado = ref(2500)
const tooltipPos = ref(50)
const rangeSlider = ref(null)

function atualizarTooltip() {
  const slider = rangeSlider.value
  if (!slider) return
  const val = precoSelecionado.value
  const min = parseInt(slider.min)
  const max = parseInt(slider.max)
  const percent = ((val - min) / (max - min)) * 100
  const sliderWidth = slider.offsetWidth
  const thumbWidth = sliderWidth * 0.02
  const offsetPercent = (thumbWidth / 2 / sliderWidth) * 100
  tooltipPos.value = percent - offsetPercent
  slider.style.background = `linear-gradient(to right, #1D2D51 ${percent}%, #ddd ${percent}%)`
}
// ✅ Isso garante que o background apareça assim que carregar
onMounted(async () => {
  await nextTick()
  atualizarTooltip()
})
</script>

<template>
  <div id="map">
    <div v-if="showCarrossel && produtoSelecionado" class="carrossel-container"
      :style="{ top: cardTop + 'px', left: cardLeft + 'px' }" @click.stop>
      <button class="botaoProduto">
        <Carousel v-bind="configSingle1">
          <Slide v-for="image in imagesSingle1" :key="image.id">
            <img :src="image.url" alt="image" />
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
        <h1>{{ produtoSelecionado.nome }}</h1>
        <h3>{{ produtoSelecionado.categoria }}</h3>
        <h2>R${{ produtoSelecionado.preco }}/dia</h2>
      </button>
      <button @click="showCarrossel = false" class="fecharBotao">Fechar</button>
    </div>

    <button class="filtro" @click="abrirFiltro()">
      <span class="mdi mdi-filter"></span>
      <h2>Filtrar & organizar </h2>
    </button>

    <div v-if="filtroAberto" class="filtroAberto" @mousedown.stop @touchstart.stop>
      <div class="tituloFiltro">
      <span class="mdi  mdi-chevron-left" @click="abrirFiltro "></span>
      <h1>Filtros</h1>
      </div>

      <h2>Distancia</h2>
      <div class="distancia">
        <button @click="distancia(2)" :class="{ ativo: distanciaSelecionada === 2 }">Até 2km</button>
        <button @click="distancia(5)" :class="{ ativo: distanciaSelecionada === 5 }">5km</button>
        <button @click="distancia(10)" :class="{ ativo: distanciaSelecionada === 10 }">10km</button>
        <button @click="distancia(20)" :class="{ ativo: distanciaSelecionada === 20 }">20km</button>
      </div>
      <h2>Categoria</h2>
      <div class="categorias">
        <div class="checkbox-container" v-for="categoria in categorias" v-bind:key="categoria.id">
          <label>
            <input type="checkbox" :value="categoria.nome" v-model="categoriasSelecionadas" />
            {{ categoria.nome }}
          </label>
        </div>
      </div>
      <h2>Preço do produto por dia</h2>
      <div class="slider-overlay">
        <div class="double-slider-box">
          <div class="price-slider">
            <h3>R${{ precoMin }}</h3>
            <div class="input-wrapper slider-event-shield">
              <input type="range" class="range-slider" :min="precoMin" :max="precoMax" v-model="precoSelecionado"
                @input="atualizarTooltip" @mousedown.stop @touchstart.stop ref="rangeSlider" />
              <div class="tooltip" :style="{ left: tooltipPos + '%' }">
                R${{ precoSelecionado }}
              </div>
            </div>
            <h3>R${{ precoMax }}</h3>
          </div>

        </div>
      </div>
      <div class="botooes">
        <button class="cancelar" @click="abrirFiltro()">Cancelar</button>
        <button class="pronto">Pronto</button>
      </div>
    </div>
  </div>
</template>

<style>
#map {
  margin: 4vw 0 0 0;
  height: 80vh;
  width: 55vw;
  position: relative;
  border-radius: 10px;
  pointer-events: auto;
}

p,
h1,
h2,
label,
div,
h3,
button {
  font-family: poppins, sans-serif;
}

.carrossel-container {
  position: absolute;
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  padding: 5px;
}

.carrossel-container img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.carrossel-container h1 {
  font-size: 1.6rem;
  margin: 5px 0 2px 1vw;
  color: black;
}

.carrossel-container h3 {
  font-size: 14px;
  margin: 0 0 2px 1vw;
  color: #CDCDCD;
}

.carrossel-container h2 {
  font-size: 1.4rem;
  margin: 2px 0 2px 1vw;
  color: #244e84;
  font-weight: bold;
}

.botaoProduto {
  display: block;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.fecharBotao {
  background-color: #244e84;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  margin-top: 5px;
  cursor: pointer;
}

button.filtro {
  position: absolute;
  margin: 1vw 1vw;
  background: #1D2D51;
  border: none;
  color: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  height: 7vh;
  justify-content: center;
  text-align: center;
  align-items: center;
  z-index: 1000;
  padding: 5px;
}

button.filtro span {
  font-size: 1.4rem;
}

button.filtro h2 {
  font-size: 1rem;
}

div.filtroAberto {
  position: absolute;
  margin: 1vw;
  background: white;
  border: none;
  border-radius: 0.4vw;
  box-shadow: 0 0.2vw 0.6vw rgba(0, 0, 0, 0.25);
  height: 75vh;
  width: 32vw;
  z-index: 1000;
  padding: 0.5vw;
  pointer-events: auto;
}
div.tituloFiltro {
  color: black;
  font-size: 2vw;
  display: flex;
  text-align: center;
  align-items: center;
  margin: 1vw 3vw 0 0.7vw;
}
div.tituloFiltro span {
  cursor: pointer;
}
div.filtroAberto h1 {
  text-align: center;
  margin: 1vw;
  font-size: 2vw;
  margin: 0 auto; /* centraliza horizontalmente */
  color: black;
  width: 100%; /* garante que ocupe toda a largura do container */
}
div.filtroAberto h2 {
  color: black;
  font-size: 1.2vw;
  margin: 0.7vw 1vw 0.2vw 1vw;
}

div.filtroAberto div.distancia {
  display: flex;
  justify-content: center;
  margin: 0 0 0 1vw;
  gap: 0.6vw;
}

div.filtroAberto div.distancia button {
  color: black;
  background-color: #D9D9D9;
  border: none;
  width: 6.5vw;
  height: 4.5vh;
  border-radius: 0.4vw;
  font-size: 1vw;
  margin: 0 0.6vw 0 0;
}

div.filtroAberto div.distancia button.ativo {
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
  flex: 1 1 10vw; /* cresce e encolhe, base 10vw */
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
/* Marca de seleção */

/* Marca de check */
div.double-slider-box .price-slider h3 {
  font-size: 1.2vw;
  color: #1D2D51;
}

div.double-slider-box {
  margin: 4vw 2vw 2vw 2vw;
  width: 40vw;
}

.price-slider {
  margin: 3vh 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.input-wrapper {
  position: relative;
  display: flex;
  margin: 0 1vw;
  min-width: 15vw;
}

.input-wrapper input {
  -webkit-appearance: none;
  height: 1vh;
  outline: none;
  border: none;
  width: 100%;
  background: linear-gradient(to right, #1D2D51 50%, #ddd 50%);
  border-radius: 0.6vw;
}

.input-wrapper input[type="range"]::-moz-range-thumb {
  -moz-appearance: none;
  border: none;
  background-color: #1D2D51;
  pointer-events: auto;
  cursor: pointer;
  border-radius: 0.6vw;
    border-radius: 50%; /* bolinha perfeita */
}

.input-wrapper input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1.5vw;
  height: 1.5vw;
  border: none;
  background-color: #1D2D51;
  border-radius: 50%; /* bolinha perfeita */
  pointer-events: auto;
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
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  transition: left 0.05s ease;
}
div.botooes {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 1.4vw;
}
div.botooes button.cancelar {
  width: 7vw;
  height: 5vh;
  border: none;
  border-radius: 0.5vw;
}
div.botooes button.pronto {
  width: 7vw;
  height: 5vh;
  background-color: #1D2D51;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5vw;
}
</style>