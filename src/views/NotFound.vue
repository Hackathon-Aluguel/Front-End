<script setup>
// sem lógica complexa aqui, só a exibição
</script>

<template>
  <div class="notfound-container">
    <h1>404</h1>
    <p>Página não encontrada</p>
    <router-link to="/" class="home-link">Voltar para o início</router-link>
  </div>
</template>

<style scoped>
.notfound-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: #333;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: #e74c3c;
}

p {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.home-link {
  margin-top: 1rem;
  text-decoration: none;
  color: white;
  background-color: #3498db;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.home-link:hover {
  background-color: #2980b9;
}
</style>
