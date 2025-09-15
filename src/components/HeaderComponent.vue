<script setup>
import { user } from '@/stores/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  // Remove os tokens
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')

  // Reseta o estado global do usuário
  user.value = null

  // Redireciona para a home ou login
  router.push('/')
}
</script>

<template>
  <header>
    <nav>
      <div class="topo-header">
        <h1>
          <RouterLink to="/">Aluga<span class="alugae">ê</span></RouterLink>
        </h1>

        <div class="container">
          <form action="" class="search-bar">
            <input type="text" placeholder="Precisa de algo só por uns dias? Encontre aqui" name="q">
            <button type="submit"><span class="mdi mdi-magnify"></span></button>
          </form>
        </div>

        <ul class="icons">
          <li><span class="mdi mdi-cart-outline"></span></li>
          <li><span class="mdi mdi-heart-outline"></span></li>
        </ul>

        <ul class="login" v-if="user">
          <li>
            <img :src="user.avatar" alt="Avatar" class="avatar" />
            <span class="usuario">{{ user.email }}</span>
            <button><span class="mdi mdi-chevron-down"></span></button>
          </li>
          <li><button @click="logout">Sair</button></li>
        </ul>

        <ul class="login" v-else>
          <li><a class="log"><RouterLink to="/login">Log in</RouterLink></a></li>
          <li><a class="conta"><RouterLink to="/register">Criar Conta</RouterLink></a></li>
        </ul>

      </div>


    </nav>
  </header>
  <div class="menu">
        <a href="#">MEUS <br>  PEDIDOS</a>
        <a href="#">OFERTAS</a>
        <a href="#">ATENDIMENTO</a>
        <a href="#">TERMOS</a>
      </div>
</template>
<style scoped>

header nav div.topo-header {
  position: fixed;
  top: 0; /* garante que fique colado no topo */
  left: 0; /* garante alinhamento à esquerda */
  z-index: 1000;
  width: 100%;
  background-color: white;
  display: flex;
  height: 10vh;
  justify-content: center;
  align-items: center;
  padding: 14px 0 0 0;
  margin: 0; /* remove margens que podem empurrar */
   box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.1); /* sombra só embaixo */
}
header div.topo-header h1 {
  color: #000;
  font-family: Poppins, sans-serif;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0 3vw 0 0;
}

div.topo-header span.alugae {
  color: #244E8A;
}

.container {
  width: 45%;
  height: 35px;
  display: flex;
  background-color: #e6e6e6;
  border-radius: 100px;
  margin: 15px 0px 10px 13px;
}
.search-bar {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 60px;
}

.search-bar input {
   background-color: transparent;
  flex: 1;
  border: 0;
  outline: none;
  padding: 10px 15px;
  font-size: 14px;
  color: #000;
}

.search-bar button {
  background-color:  ; /* azul */
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
    }

.search-bar button span {
  color: white;
  font-size: 18px;
}


div.topo-header ul.icons {
  display: flex;
  margin: 0 1.5vw 0 2vw;
}

div.topo-header ul.icons li {
  list-style: none;
  margin: 0 1.8vw 0 0;
  font-size: 1.5vw;
}

div.topo-header ul.icons li:last-child {
  margin-right: 5px;
}

div.topo-header ul.login {
  display: flex;
}

div.topo-header ul.login li {
  list-style: none;
  margin: 0 1.8vw 0 0;
}

div.topo-header ul.login li a.log {
  color: #244E8A;
  font-size: 1.1vw;
}

div.topo-header ul.login li a.conta {
  border-radius: 8px;
  background-color: #244E8A;
  color: #f1f1f1;
  padding: 6px 12px 6px 12px;
  font-size: 1.1vw;
}

div.menu {
  display: flex;
  justify-content: center;
  border-top: 1px solid #244E8A;
  background-color: white;
  margin-top: 11vh; /* empurra o menu para baixo do header */
  position: relative;
  z-index: 500; /* abaixo do header */
}

div.menu a {
  text-decoration: none;
  color: black;
  text-align: center;
  font-family: Poppin, sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 550;
  line-height: 1.5vw;
  margin: 1.5vw 3.5vw 0 0;
  transition: all 0.3s ease;
  position: relative;
}

div.menu a:hover {
  color: #244E8A;
}

div.menu a:hover::before {
  content: "";
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 5px;
  background-color: #244E8A;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  align-items: center;
}

ul.logado {
  display: flex;
}
ul.logado button {
  all: unset;
  cursor: pointer;
  color: aquamarine;
}

ul.logado .avatar {
  width: 35px;
  height: 35px;
  background-color: #d3d3d3;
  border-radius: 50%;
  margin: 0 15px 0 0;
}

ul.logado button span {
  margin: 10px 0 0 5px;
}

ul.logado span.usuario {
  color: #000;
  font-family: Poppins, sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 10px 0 0 0;
}
</style>
