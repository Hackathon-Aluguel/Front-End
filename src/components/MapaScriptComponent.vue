<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const latitude = ref(0);
const longitude = ref(0);
const packageIcon = L.divIcon({
    html: '<span class="mdi mdi-package-variant-closed" style="font-size: 20px; color: white; background-color: #244e84; border-radius: 50%; padding: 6px; display: inline-block; text-align: center; line-height: 1; box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);"></span>',
  className: 'custom-mdi-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 16], // centraliza o ícone sobre a coordenada
  popupAnchor: [0, -16]
});


function success(pos) {
  latitude.value = pos.coords.latitude;
  longitude.value = pos.coords.longitude;

  console.log(latitude.value, longitude.value);

  // Atualiza o mapa com a posição
  if (window.map) {
    window.map.setView([latitude.value, longitude.value], 16);
    L.marker([latitude.value, longitude.value], { icon: packageIcon })
      .addTo(window.map)
      .bindPopup("Você está aqui!")
      .openPopup();
  }
}

function error(err) {
  console.error(err);
}
let firstLocation = true;
let userMarker = null;
onMounted(() => {
  // Cria o mapa global para poder atualizar depois
  window.map = L.map("map").setView([0, 0], 2);

  // Tile layer
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(window.map);

  // Começa a assistir a posição do usuário
  window.map.locate({
    watch: true,
    setView: false, // Não centraliza automaticamente
    maxZoom: 16,
    enableHighAccuracy: true
  });

  window.map.on("locationfound", (e) => {
    latitude.value = e.latlng.lat;
    longitude.value = e.latlng.lng;

    // Centraliza o mapa na primeira localização
    if (firstLocation) {
      window.map.setView(e.latlng, 16);
      firstLocation = false;
    }

    // Atualiza o marcador ou cria um novo
    if (userMarker) {
      userMarker.setLatLng(e.latlng);
    } else {
      userMarker = L.marker(e.latlng, { icon: packageIcon })
        .addTo(window.map)
        .bindPopup("Você está aqui!")
        .openPopup();
    }
  });

  window.map.on("locationerror", (e) => {
    console.error("Erro ao obter localização:", e.message);
  });

  let userMarker = L.marker([latitude.value, longitude.value], { icon: packageIcon }).addTo(window.map);

// Controla a visibilidade do marcador com base no nível de zoom
window.map.on("zoomend", () => {
  const zoom = window.map.getZoom();
  if (zoom < 13 ) {
    userMarker.setOpacity(0); // Torna o marcador invisível
  } else {
    userMarker.setOpacity(1); // Torna o marcador visível
  }
});
});


</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}
#map {
  height: 400px;
  width: 50vw;
}
span.custom-icon {
  font-size: 32px;
  color: #ff7800;
  background-color: #f0f0f0;
  border-radius: 50%;
  padding: 8px;
  display: inline-block;
  text-align: center;
  line-height: 1;
}
</style>
