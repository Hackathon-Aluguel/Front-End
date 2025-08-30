<script setup>
import { onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps({
  hoverId: Number
})

let userMarker = null
let firstLocation = true
const produtoMarkers = []

// ícone azul/vermelho dependendo do hover
function packageIcon(background = '#244e84', color = 'white') {
  return L.divIcon({
    html: `<span class="mdi mdi-package-variant-closed" style="font-size: 20px; color: ${color}; background-color: ${background}; border-radius: 50%; padding: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></span>`,
    className: 'custom-mdi-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

const produtos = [
  { id: 1, lat: -26.3044, lng: -48.8463 },
  { id: 2, lat: -26.3052, lng: -48.8439 },
  { id: 3, lat: -26.3060, lng: -48.8450 },
  { id: 4, lat: -26.3055, lng: -48.8447 },
  { id: 5, lat: -26.3048, lng: -48.8472 },
]

function abrirCarrossel(produto) {
  console.log('Clicou no produto', produto.id)
}

onMounted(() => {
  window.map = L.map("map").setView([-26.3044, -48.8463], 14);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(window.map);

  // Marcadores
  for (const produto of produtos) {
    const marker = L.marker([produto.lat, produto.lng], { icon: packageIcon() }).addTo(window.map);
    marker.produtoId = produto.id
    marker.on("click", () => abrirCarrossel(produto));
    produtoMarkers.push(marker)
  }

  // Localização do usuário
  window.map.locate({ watch: true, setView: false, maxZoom: 16, enableHighAccuracy: true });

  window.map.on("locationfound", (e) => {
    if (firstLocation) {
      window.map.setView(e.latlng, 16);
      firstLocation = false;
    }
  });

  window.map.on("locationerror", (e) => console.error("Erro ao obter localização:", e.message));
})

watch(() => props.hoverId, (id) => {
  produtoMarkers.forEach(marker => {
   if(marker.produtoId === id) 
      marker.setIcon(packageIcon('white', '#244e84')) // ícone vermelho e caixa rosa
    else 
      marker.setIcon(packageIcon('#244e84', 'white')) // azul normal
  })
})
</script>

<template>
  <div id="map" style="height:80vh; width:55vw;"></div>
</template>

<style>
#map { margin:4vw 0 0 0; height:80vh; width:55vw; position:relative; }
.carrossel-container { position:absolute; width:320px; background:white; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.25); display:flex; flex-direction:column; z-index:1000; padding:5px; }
.carrossel-container img { width:100%; height:180px; object-fit:cover; border-radius:8px; }
.carrossel-container h1 { font-size:1.6rem; margin:5px 0 2px 0; color:black; }
.carrossel-container h3 { font-size:14px; margin:0 0 2px 0; color:#CDCDCD; }
.carrossel-container h2 { font-size:1.4rem; margin:2px 0 2px 0; color:#244e84; font-weight:bold; }
.botaoProduto { display:block; background:none; border:none; padding:0; margin:0; width:100%; text-align:left; cursor:pointer; }
.fecharBotao { background-color:#244e84; color:white; border:none; border-radius:6px; padding:6px 12px; margin-top:5px; cursor:pointer; }
</style>
