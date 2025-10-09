<script setup>
import { ref } from 'vue'
import api from '@/services/api'

const email = ref('')
const message = ref('')

async function submit() {
  try {
    await api.post('auth/forgot-password/', { email: email.value })
    message.value = 'Se houver uma conta com esse e-mail, você receberá instruções.'
  } catch (err) {
    message.value = 'Erro ao processar. Tente novamente mais tarde.'
  }
}
</script>

<template>
  <section>
    <h2>Esqueceu sua senha?</h2>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Seu e-mail" required />
      <button type="submit">Enviar link de redefinição</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </section>
</template>

<style scoped>
section {
  padding: 19.9vw;
  align-items: center ;
}
section h2 {
  text-align: center;
  font-family: poppins, sans-serif;
  text-decoration: none;
}
section form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vw;
}
section form input {
  width: 20vw;
  height: 1.5vw;
  font-size: 16px;
  font-family: poppins, sans-serif;
  border-radius: 15px;
  border: 1px solid;
  outline: none;
  transition: border-color 0.3s;
  text-align: center;
}
section form input:focus {
  border-color: #244E8A;
  text-align: center;
  font-family: poppins, sans-serif;
  font-size: 16px;
}
section form input::placeholder {
  text-align: center;
  font-size: 16px;
}
section form button{
  background: #244E8A;
  border-radius: 20px;
  border: 1px solid black;
  width: 20vw;
  height: 1.7vw;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-family: poppins, sans-serif;
  background: linear-gradient(45deg, #244E8A, #2e70cc);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
section form button:active{
  transform: scale(0.95);
}
section form button:hover{
  box-shadow: 0 0 15px #244E8A;
  transform: scale(1.05);
}
section form button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  transform: skewX(-25deg);
}
section form button:hover::before {
  animation: brilho 0.8s forwards;
}
/* keyframes da animação */
@keyframes brilho {
  0% {
    left: -75%;
  }
  100% {
    left: 125%;
  }
}

p {
  text-align: center;
}


</style>


