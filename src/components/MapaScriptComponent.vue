<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FiltroMapa from "./FiltroMapa.vue";
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const filtroAberto = ref(false)

function toggleFiltro() {
  filtroAberto.value = !filtroAberto.value
}

function fecharFiltro() {
  filtroAberto.value = false
}

const produtos = reactive([]);

const produtosAntes = reactive([
  { id: 1, nome: 'Pantufas extremamente macias', preco: 30, estrelas: 4, cidade: 'Joinville', estado: 'SC', likes: 20, liked: false, imagem: 'https://picsum.photos/400/300?random=100', categoria: 'Roupas e acessorios', lat: -26.3044, lng: -48.8463 },
  { id: 2, nome: 'Saco de dormir', preco: 25, estrelas: 5, cidade: 'Joinville', estado: 'SC', likes: 4, liked: false, imagem: 'https://picsum.photos/400/300?random=101', categoria: 'Esporte e lazer', lat: -26.3052, lng: -48.8439 },
  // ... (outros produtos)
])

const minhaLocalizacao = reactive({
  lat: -26.3045,
  lng: -48.8460
});

const showCarrossel = ref(false);
const produtoSelecionado = ref(null);
const cardTop = ref(0);
const cardLeft = ref(0);

function abrirCarrossel(produto, marker) {
  produtoSelecionado.value = produto;
  showCarrossel.value = true;
  updateCardPosition(marker);
}

const imagesSingle1 = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/400/300?random=${index + 100}`
}));
const configSingle1 = { height: 200, width: 300, itemsToShow: 1, snapAlign: 'start' };

const props = defineProps({ hoverId: Number });

let userMarker = null;
let firstLocation = true;
const produtoMarkers = [];

function packageIcon(background = '#244e84', color = 'white') {
  return L.divIcon({
    html: `<span class="mdi mdi-package-variant-closed" style="font-size: 20px; color: ${color}; background-color: ${background}; border-radius: 50%; padding: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display:inline-block; text-align:center; line-height:1;"></span>`,
    className: 'custom-mdi-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}

function updateCardPosition(marker) {
  const latlng = marker ? marker.getLatLng() : userMarker?.getLatLng();
  if (!latlng) return;
  const point = window.map.latLngToContainerPoint(latlng);
  cardTop.value = point.y - 220;
  cardLeft.value = point.x - 160;
}

// Função que atualiza os marcadores no mapa
function updateMarkers(lista) {
  produtoMarkers.forEach(m => window.map.removeLayer(m));
  produtoMarkers.length = 0;

  for (const produto of lista) {
    const marker = L.marker([produto.lat, produto.lng], { icon: packageIcon() }).addTo(window.map);
    marker.produtoId = produto.id;
    marker.on("click", () => abrirCarrossel(produto, marker));
    produtoMarkers.push(marker);
  }
}

onMounted(() => {
  window.map = L.map("map", { zoomControl: false }).setView([-26.3044, -48.8463], 14);
  L.control.zoom({ position: "topright" }).addTo(window.map);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(window.map);

  window.map.locate({ watch: true, setView: false, maxZoom: 16, enableHighAccuracy: true });
  window.map.on("locationfound", (e) => {
    if (firstLocation) {
      window.map.setView(e.latlng, 16);
      firstLocation = false;
    }
    if (userMarker) userMarker.setLatLng(e.latlng);
    else {
      userMarker = L.marker(e.latlng, { icon: packageIcon() }).addTo(window.map);
      userMarker.on("click", () => {
        showCarrossel.value = true;
        updateCardPosition(userMarker);
      });
    }
    minhaLocalizacao.lat = e.latlng.lat;
    minhaLocalizacao.lng = e.latlng.lng;

    produtos.length = 0;
    produtosAntes.forEach(p => produtos.push(p));
    updateMarkers(produtos);
  });

  window.map.on("click", () => {
    showCarrossel.value = false;
  });

  window.map.on("move zoomend", () => {
    if (showCarrossel.value && produtoSelecionado.value) {
      const marker = produtoMarkers.find(m => m.produtoId === produtoSelecionado.value.id);
      updateCardPosition(marker);
    }
  });
});

watch(() => props.hoverId, (id) => {
  produtoMarkers.forEach(marker => {
    if (marker.produtoId === id)
      marker.setIcon(packageIcon('white', '#244e84'));
    else
      marker.setIcon(packageIcon('#244e84', 'white'));
  });
});

// Recebe os produtos filtrados do filtro
function onFiltrar(filtrados) {
  produtos.length = 0;
  filtrados.forEach(p => produtos.push(p));
  updateMarkers(produtos);
  fecharFiltro();
}

</script>

<template>
  <div id="map">
    <!-- Botão que abre o filtro -->
    <button class="btn-filtro" @click="toggleFiltro">Filtrar & organizar</button>

    <!-- Filtro -->
    <FiltroMapa 
      v-if="filtroAberto"
      :categorias="[
        { id: 1, nome: 'Roupas e acessorios' },
        { id: 2, nome: 'Esporte e lazer' },
        { id: 3, nome: 'Casa e utilidades' }
      ]"
      :minhaLocalizacao="minhaLocalizacao"
      :produtosAntes="produtosAntes"
      :precoMin="0"
      :precoMax="150"
      @fechar="fecharFiltro"
      @filtrar="onFiltrar"
    />

    <!-- Carrossel -->
    <div
      v-if="showCarrossel && produtoSelecionado"
      class="carrossel-container"
      :style="{ top: cardTop + 'px', left: cardLeft + 'px' }"
      @click.stop
    >
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
  </div>
</template>

<style>
body,
h1,
h2,
h3,
div,
label,
button {
  font-family: poppins, sans-serif;
}
#map {
  margin: 4vw 0 0 0;
  height: 80vh;
  width: 55vw;
  position: relative;
  border-radius: 10px;
  pointer-events: auto;
}

.btn-filtro {
  position: absolute;
  margin: 1vw 1vw;
  z-index: 1000;
  background-color: #1D2D51;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
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
</style>
