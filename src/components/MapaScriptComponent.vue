<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FiltroMapa from "./FiltroMapa.vue";
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const props = defineProps({
  produtos: Array,      // lista de produtos filtrados
  hoverId: Number       // id do produto que está sendo hover
});
const filtroAberto = ref(false);

function toggleFiltro() { filtroAberto.value = !filtroAberto.value }
function fecharFiltro() { filtroAberto.value = false }

const produtosAntes = reactive([
  { id: 1, nome: 'Pantufas', preco: 30, lat: -26.3044, lng: -48.8463, categoria: 'Roupas e acessórios', estrelas: 4, likes: 12, liked: false, cidade: 'Joinville', estado: 'SC' },
  { id: 2, nome: 'Saco de dormir', preco: 25, lat: -26.3052, lng: -48.8439, categoria: 'Esporte e lazer', estrelas: 5, likes: 8, liked: false, cidade: 'Joinville', estado: 'SC' },
  { id: 3, nome: 'Lanterna', preco: 10, lat: -26.3035, lng: -48.8470, categoria: 'Casa e utilidades', estrelas: 4, likes: 15, liked: false, cidade: 'Joinville', estado: 'SC' },
  { id: 4, nome: 'Fogareiro', preco: 40, lat: -26.3060, lng: -48.8445, categoria: 'Esporte e lazer', estrelas: 3, likes: 10, liked: false, cidade: 'Joinville', estado: 'SC' },
  { id: 5, nome: 'Mochila', preco: 50, lat: -26.3048, lng: -48.8452, categoria: 'Roupas e acessórios', estrelas: 5, likes: 20, liked: false, cidade: 'Joinville', estado: 'SC' },
  { id: 6, nome: 'Barraca', preco: 100, lat: -26.3280, lng: -48.8600, categoria: 'Esporte e lazer', estrelas: 4, likes: 7, liked: false, cidade: 'Joinville', estado: 'SC' },
  { id: 7, nome: 'Câmera', preco: 200, lat: -26.3660, lng: -48.8900, categoria: 'Tecnologia e Eletrônicos', estrelas: 5, likes: 25, liked: false, cidade: 'Joinville', estado: 'SC' },
  { id: 8, nome: 'Kit Ferramentas', preco: 150, lat: -26.4200, lng: -48.9500, categoria: 'Construção e Reforma', estrelas: 4, likes: 18, liked: false, cidade: 'Joinville', estado: 'SC' },
  { id: 9, nome: 'Caixa de som', preco: 80, lat: -26.4800, lng: -49.0000, categoria: 'Instrumentos musicais', estrelas: 5, likes: 22, liked: false, cidade: 'Joinville', estado: 'SC' },
])
const minhaLocalizacao = reactive({ lat: -26.3045, lng: -48.8460 })
const showCarrossel = ref(false)
const produtoSelecionado = ref(null)
const cardTop = ref(0)
const cardLeft = ref(0)
const produtoMarkers = []
let userMarker = null
let firstLocation = true

function packageIcon(color = '#ffffff', iconColor = '#244e84') {
  return L.divIcon({
    html: `
      <div style="
        background:${color};
        border-radius:50%;
        width:32px;
        height:32px;
        display:flex;
        align-items:center;
        justify-content:center;
        border:2px solid ${iconColor};
      ">
        <span class="mdi mdi-package-variant-closed" style="font-size:20px; color:${iconColor};"></span>
      </div>
    `,
    className: 'custom-mdi-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}
function updateCardPosition(marker) {
  if (!marker) return;
  const latlng = marker.getLatLng();
  const point = window.map.latLngToContainerPoint(latlng);
  cardTop.value = point.y - 220;
  cardLeft.value = point.x - 160;
}

function abrirCarrossel(produto, marker) {
  produtoSelecionado.value = produto;
  showCarrossel.value = true;
  updateCardPosition(marker);
}

function updateMarkers(lista) {
  produtoMarkers.forEach(m => window.map.removeLayer(m));
  produtoMarkers.length = 0;

  lista.forEach(produto => {
    const isHovered = props.hoverId === produto.id;
    const marker = L.marker([produto.lat, produto.lng], { 
      icon: isHovered 
        ? packageIcon('#ffffff', '#244e84') // hover (fundo branco, ícone azul)
        : packageIcon('#244e84', '#ffffff') // normal (fundo azul, ícone branco)
    }).addTo(window.map);

    marker.produtoId = produto.id;
    marker.on("click", () => abrirCarrossel(produto, marker));
    produtoMarkers.push(marker);
  });
}

watch(() => props.hoverId, (id) => {
  produtoMarkers.forEach(marker => {
    if(marker.produtoId === id) {
      marker.setIcon(packageIcon('#ffffff', '#244e84')); // hover
    } else {
      marker.setIcon(packageIcon('#244e84', '#ffffff')); // normal
    }
  });
});
onMounted(() => {
  window.map = L.map("map", { zoomControl: false }).setView([-26.3044, -48.8463], 14)
  L.control.zoom({ position: "topright" }).addTo(window.map)
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(window.map)

  window.map.locate({ watch: true, setView: false, maxZoom: 16, enableHighAccuracy: true })
  window.map.on("locationfound", (e) => {
    if (firstLocation) { window.map.setView(e.latlng, 16); firstLocation = false }
    if (userMarker) userMarker.setLatLng(e.latlng)
    else {
      userMarker = L.marker(e.latlng, { icon: packageIcon() }).addTo(window.map)
      userMarker.on("click", () => { showCarrossel.value = true; updateCardPosition(userMarker) })
    }
    minhaLocalizacao.lat = e.latlng.lat
    minhaLocalizacao.lng = e.latlng.lng
    updateMarkers(props.produtos)
  })

  window.map.on("click", () => { showCarrossel.value = false })
  window.map.on("move zoomend", () => {
    if (showCarrossel.value && produtoSelecionado.value) {
      const marker = produtoMarkers.find(m => m.produtoId === produtoSelecionado.value.id)
      updateCardPosition(marker)
    }
  })
})

const emit = defineEmits(['produtos-filtrados'])

function onFiltrar(filtrados) {
  // quando o filtro atualizar os produtos
  emit('produtos-filtrados', filtrados) // envia para o pai
  fecharFiltro()
}

watch(() => props.produtos, (novaLista) => {
  updateMarkers(novaLista)
}, { deep: true })
</script>

<template>
  <div id="map">
    <button class="btn-filtro" @click="toggleFiltro">Filtrar & organizar</button>

    <!-- Filtro -->
<FiltroMapa
  v-if="filtroAberto"
  :produtosAntes="produtosAntes"
  :precoMin="0"
  :precoMax="150"
  :filtroAberto="filtroAberto"
  :minhaLocalizacao="minhaLocalizacao"
  @produtos-filtrados="onFiltrar"
  @fechar="fecharFiltro"
/>

    <!-- Carrossel -->
    <div v-if="showCarrossel && produtoSelecionado" class="carrossel-container" :style="{ top: cardTop + 'px', left: cardLeft + 'px' }" @click.stop>
      <button class="botaoProduto">
        <Carousel :height="200" :width="300" :itemsToShow="1" snapAlign="start">
          <Slide v-for="i in 5" :key="i">
            <img :src="`https://picsum.photos/400/300?random=${i+100}`" alt="image" />
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
#map { margin: 4vw 0 0 0; height: 80vh; width: 55vw; position: relative; border-radius: 10px; }
.btn-filtro { position: absolute; margin: 1vw 1vw; z-index: 1000; background-color: #1D2D51; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 1rem; }
.carrossel-container { position: absolute; width: 320px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); display: flex; flex-direction: column; z-index: 1000; padding: 5px; }
.carrossel-container img { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; }
.carrossel-container h1 { font-size: 1.6rem; margin: 5px 0 2px 1vw; color: black; }
.carrossel-container h3 { font-size: 14px; margin: 0 0 2px 1vw; color: #CDCDCD; }
.carrossel-container h2 { font-size: 1.4rem; margin: 2px 0 2px 1vw; color: #244e84; font-weight: bold; }
.botaoProduto { display: block; background: none; border: none; padding: 0; margin: 0; width: 100%; text-align: left; cursor: pointer; }
.fecharBotao { background-color: #244e84; color: white; border: none; border-radius: 6px; padding: 6px 12px; margin-top: 5px; cursor: pointer; }
</style>