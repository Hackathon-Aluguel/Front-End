<script setup>
import { user as globalUser } from '@/stores/user.js';
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import { gapi } from 'gapi-script';

const route = useRoute();
const router = useRouter();

const loginForm = reactive({ email: '', password: '' });
const loading = ref(false);
const errorMessage = ref('');

// Login via query (Google)
const access = route.query.access;
const refresh = route.query.refresh;
const email = route.query.email;
const avatar = route.query.avatar;

if (access && refresh && email) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  localStorage.setItem('globalUser_email', email);
  localStorage.setItem('globalUser_avatar', avatar || '/images/avatar.png');

  globalUser.value = { email, avatar: avatar || '/images/avatar.png' };
  router.replace('/');
}

// Inicializa SDK Google
onMounted(() => {
  gapi.load('auth2', () => {
    gapi.auth2.init({
      client_id: 'SEU_CLIENT_ID',
      ux_mode: 'popup'
    });
  });
});

function loginWithGoogle() {
  window.location.href = 'http://localhost:8000/accounts/google/login/?process=login';
}

async function loginManual() {
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await api.post('token/', {
      email: loginForm.email,
      password: loginForm.password
    });

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem('globalUser_email', loginForm.email);
    localStorage.setItem('globalUser_avatar', '/images/avatar.png');

    globalUser.value = { email: loginForm.email, avatar: '/images/avatar.png' };

    router.push('/');
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Erro ao conectar com o servidor.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section>
    <div class="square">
      <div class="um">
        <h1>B<span>e</span>m vindo de volta</h1>

        <div class="campos">
          <p class="sub">Por favor, preencha os seguintes campos para logar</p>
          <input class="email" type="text" v-model="loginForm.email" placeholder="Insira o seu email...">
          <input class="senha" type="password" v-model="loginForm.password" placeholder="Insira a sua senha...">
          <p class="esq"><a class="esq" href="">Esqueceu sua senha?</a></p>
          <button class="bum" @click="loginManual">
            <p>Entrar</p>
          </button>

          <div class="error-container">
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </div>

        </div>

        <div class="hr">
          <hr>
          <p>ou</p>
          <hr>
        </div>

      <button @click="loginWithGoogle" class="gog">
      <img src="/public/imgs/Google__G__logo.svg.png" alt="Google" />
      Continuar com o Google
      </button>

        <p class="nt">
          Não tem uma conta ainda?
          <RouterLink to="/register">Criar Conta</RouterLink>
        </p>
      </div>

      <div class="dois">
        <h1>Alugaê</h1>
        <img src="/public/imgs/Design sem nome 1.png" alt="">
      </div>
    </div>
  </section>
</template>


<style scoped>
span {
  color: #3853be;
  text-align: center;
  font-weight: 700;
  font-size: 2.2rem
}

section {
  background: conic-gradient(from 180deg at 50% 50%,
      #4A62C4 0deg,
      /* azul mais suave que o inicial */
      #3E52A1 72deg,
      /* transição intermediária */
      #333F7E 144deg,
      /* azul menos escuro */
      #3E52A1 288deg,
      /* volta suave */
      #4A62C4 360deg
      /* igual ao inicial */
    );
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;


}

.square {
  width: 85vw;
  height: 90vh;
  border-radius: 1.4vw;
  background-color: rgb(255, 255, 255);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

.um {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;
  margin-left: 8vw;
}

.um h1 {
  text-align: center;
  position: relative;
  bottom: 3vh;
  font-weight: 700;
  color: black;
  font-size: 2.2rem;

}

.sub {
  color: black;
  font-family: poppins, sans-serif;
  font-weight: 600;
  font-size: 0.6rem;
  text-align: left;
  margin-left: 1.3vw;
  margin-bottom: 1vh;
}

.email,
.senha {
  width: 87%;

  height: 5vh;
  border-radius: 0.8vw;
  border: none;
  background-color: #d9d9d9;
  padding: 1.3vw;
  color: #a1a1a1;
  font-size: 0.7rem;
}

.email::placeholder,
.senha::placeholder {
  color: #a1a1a1;
  /* cinza só no placeholder */
}

.email,
.senha {
  color: #000000;
}

.senha {
  margin-top: 1.6vw;
}

.campos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  object-fit: contain;
}

.esq {
  text-align: end;
  color: #3853be;
  font-family: poppins, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  margin-top: 0.4vh;
  margin-right: 0.4vw;
}

.error-container {
  width: 100%;
  text-align: center;
  margin-top: 50px;
  /* Ajustável */
}

.error-message {
  color: red;
  font-size: 14px;
}

.bum {
  position: relative;
  top: 5vh;
  border: none;
  width: 100%;
  max-width: 400px;
  height: 5vh;
  border-radius: 0.8vw;
  font-family: poppins, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  background-color: #3853be;
  color: white;
  padding: 1.3vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hr {
  margin-top: 1vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

}

.hr p {
  margin: 0 0.2vw;
  color: #c2c2c2;
}

:deep(hr) {
  border: none;
  height: 1px;
  background-color: #c2c2c2;
  width: 12vw;

}

.gog {
  width: 14vw;
  height: 5vh;
  border: #a1a1a1 solid 1px;
  border-radius: 0.6vw;
  background-color: white;
  margin-top: 4vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

.gog p {
  font-size: 0.7rem;
  font-weight: 600;
  font-family: poppins, sans-serif;
}

.gog img {
  width: 1.4vw;
  height: 1.4vw;
  margin-right: 0.8vw;

}

.nt {
  color: black;
  font-size: 0.7rem;
  font-weight: 600;
  font-family: poppins, sans-serif;
  margin-top: 4vh;

}

.nt a {
  text-decoration: none;
  font-weight: 600;
  color: #3853be;
  margin-left: 0.4vw;

}

.dois {
  width: 38vw;
  height: 85vh;
  background-color: #3853be;

  border-radius: 1vw;
  position: relative;
  margin-right: 1.2vw;

}

.dois h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  font-family: poppins, sans-serif;
  padding: 3vh 2.5vw;

}

.dois img {
  width: 100%;
  max-height: 100%;
  object-fit: contain;
  width: 58vw;
  height: 75vh;
  position: relative;
  right: 21vw;
  top: -8vh;

  pointer-events: none;

}
</style>
