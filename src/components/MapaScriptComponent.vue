<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Carousel, Slide, Navigation } from 'vue3-carousel';

// coordenadas reativas
const latitude = ref(0);
const longitude = ref(0);

// controla visibilidade do card
const showCarrossel = ref(false);

// posição do card sobre o marcador
const cardTop = ref(0);
const cardLeft = ref(0);

// imagens do carrossel
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
  window.map = L.map("map").setView([0, 0], 2);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(window.map);

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

      // clique no marcador para mostrar o card
      userMarker.on("click", () => {
        showCarrossel.value = true;
        updateCardPosition();
      });
    }
  });

  window.map.on("locationerror", (e) => {
    console.error("Erro ao obter localização:", e.message);
  });

  // atualiza o card enquanto move ou dá zoom
  window.map.on("move zoomend", () => {
    updateCardPosition();
  });

  // esconde o card ao clicar no mapa (fora do card)
  window.map.on("click", () => {
    showCarrossel.value = false;
  });

  // controla visibilidade do marcador pelo zoom
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

/* imagens do carrossel */
.carrossel-container img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

/* textos do produto */
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

/* botão do card */
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

/* botão fechar */
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
