<script setup>
import { onMounted, ref, reactive } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Carousel, Slide, Navigation } from 'vue3-carousel';

const produtos = reactive([
  {
    id: 1,
    nome: 'pantufas extremamente macias',
    preco: 30,
    estrelas: 4,
    cidade: 'Joinville',
    estado: 'SC',
    endereco: 'Rua das Flores, 123',
    lat: -26.3044,
    lng: -48.8463,
    likes: 20,
    liked: false,
    imagem: 'https://picsum.photos/400/300?random=100',
    categoria: 'Roupas e acessorios',
  },
  {
    id: 2,
    nome: 'saco de dormir',
    preco: 25,
    estrelas: 5,
    cidade: 'Joinville',
    estado: 'SC',
    endereco: 'Rua das Palmeiras, 50',
    lat: -26.3052,
    lng: -48.8439,
    likes: 4,
    liked: false,
    imagem: 'https://picsum.photos/400/300?random=101',
    categoria: 'Esporte e lazer',
  },
  {
    id: 3,
    nome: 'lanterna',
    preco: 10,
    estrelas: 4,
    cidade: 'Joinville',
    estado: 'SC',
    endereco: 'Rua Porto Rico, 147',
    lat: -26.3060,
    lng: -48.8450,
    likes: 14,
    liked: false,
    imagem: 'https://picsum.photos/400/300?random=102',
    categoria: 'Casa e utilidades',
  },
  {
    id: 4,
    nome: 'fogareiro',
    preco: 40,
    estrelas: 3,
    cidade: 'Joinville',
    estado: 'SC',
    endereco: 'Rua das Palmeiras, 12',
    lat: -26.3055,
    lng: -48.8447,
    likes: 12,
    liked: false,
    imagem: 'https://picsum.photos/400/300?random=103',
    categoria: 'Esporte e lazer',
  },
  {
    id: 5,
    nome: 'mochila',
    preco: 50,
    estrelas: 5,
    cidade: 'Joinville',
    estado: 'SC',
    endereco: 'Rua das Flores, 200',
    lat: -26.3048,
    lng: -48.8472,
    likes: 10,
    liked: false,
    imagem: 'https://picsum.photos/400/300?random=104',
    categoria: 'Roupas e acessorios',
  },
]);

// coordenadas reativas
const latitude = ref(0);
const longitude = ref(0);

// controla visibilidade do card
const showCarrossel = ref(false);

// posição do card sobre o marcador
const cardTop = ref(0);
const cardLeft = ref(0);

// imagens do carrossel (mock)
const imagesSingle1 = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/400/300?random=${index + 100}`,
}));

const configSingle1 = {
  height: 200,
  width: 300,
  itemsToShow: 1,
  snapAlign: 'start',
};

// ícone customizado do marcador
const packageIcon = L.divIcon({
  html: '<span class="mdi mdi-package-variant-closed" style="font-size: 20px; color: white; background-color: #244e84; border-radius: 50%; padding: 6px; display: inline-block; text-align: center; line-height: 1;"></span>',
  className: 'custom-mdi-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

let userMarker = null;
let firstLocation = true;

onMounted(() => {
  window.map = L.map("map").setView([-26.3044, -48.8463], 14);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(window.map);

  // adiciona os marcadores dos produtos diretamente
  for (const produto of produtos) {
    if (produto.lat && produto.lng) {
      L.marker([produto.lat, produto.lng], { icon: packageIcon })
        .addTo(window.map)
        .bindPopup(produto.nome);
    }
  }

  // ativa localização do usuário
  window.map.locate({ watch: true, setView: false, maxZoom: 16, enableHighAccuracy: true });

  window.map.on("locationfound", (e) => {
    latitude.value = e.latlng.lat;
    longitude.value = e.latlng.lng;

    if (firstLocation) {
      window.map.setView(e.latlng, 16);
      firstLocation = false;
    }

    if (userMarker) {
      userMarker.setLatLng(e.latlng);
    } else {
      userMarker = L.marker(e.latlng, { icon: packageIcon }).addTo(window.map);

      userMarker.on("click", () => {
        showCarrossel.value = true;
        updateCardPosition();
      });
    }
  });

  window.map.on("locationerror", (e) => {
    console.error("Erro ao obter localização:", e.message);
  });

  window.map.on("move zoomend", () => {
    updateCardPosition();
  });

  window.map.on("click", () => {
    showCarrossel.value = false;
  });

  window.map.on("zoomend", () => {
    const zoom = window.map.getZoom();
    if (userMarker) {
      userMarker.setOpacity(zoom < 13 ? 0 : 1);
    }
    updateCardPosition();
  });
});

// função que atualiza a posição do card sobre o marcador
function updateCardPosition() {
  if (!userMarker || !showCarrossel.value) return;
  const point = window.map.latLngToContainerPoint(userMarker.getLatLng());
  cardTop.value = point.y - 220;
  cardLeft.value = point.x - 160;
}
</script>

<template>
  <div id="map">
    <!-- card do produto dentro do mapa -->
    <div v-if="showCarrossel" class="carrossel-container"
         :style="{ top: cardTop + 'px', left: cardLeft + 'px' }"
         @click.stop>
      <button class="botaoProduto">
        <Carousel v-bind="configSingle1">
          <Slide v-for="image in imagesSingle1" :key="image.id">
            <img :src="image.url" alt="image" />
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
        <h1>Barraca</h1>
        <h3>Acampamento</h3>
        <h2>R$10/dia</h2>
      </button>
      <button @click="showCarrossel = false" class="fecharBotao">Fechar</button>
    </div>
  </div>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

#map {
  margin: 4vw 0 0 0;
  height: 80vh;
  width: 55vw;
  position: relative; /* essencial para posicionamento absoluto do card */
}

.carrossel-container {
  position: absolute; /* relativo ao #map */
  width: 320px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
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
  margin: 5px 0 2px 0;
  color: black;
}

.carrossel-container h3 {
  font-size: 14px;
  margin: 0 0 2px 0;
  color: #CDCDCD;
}

.carrossel-container h2 {
  font-size: 1.4rem;
  margin: 2px 0 2px 0;
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
