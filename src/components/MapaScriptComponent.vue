<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const latitude = ref(0);
const longitude = ref(0);

function success(pos) {
  latitude.value = pos.coords.latitude;
  longitude.value = pos.coords.longitude;

  console.log(latitude.value, longitude.value);

  // Atualiza o mapa com a posição
  if (window.map) {
    window.map.setView([latitude.value, longitude.value], 16);
    L.marker([latitude.value, longitude.value])
      .addTo(window.map)
      .bindPopup("Você está aqui!")
      .openPopup();
  }
}

function error(err) {
  console.error(err);
}

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
  navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000,
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
</style>
