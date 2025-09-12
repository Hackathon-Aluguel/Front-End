<script setup>
import { user as globalUser } from '@/stores/user.js'
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import { gapi } from 'gapi-script';

const route = useRoute()
const router = useRouter()

const loginForm = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

const access = route.query.access
const refresh = route.query.refresh

if (access && refresh) {
  localStorage.setItem('access_token', access)
  localStorage.setItem('refresh_token', refresh)
  router.replace('/')  // 🔥 redireciona pra home
}

// Inicializa o SDK do Google quando o componente monta
onMounted(() => {
  gapi.load('auth2', () => {
    gapi.auth2.init({
      client_id: '307764432125-sj64153ja75622bdbssdj7o471skrlds.apps.googleusercontent.com',
      ux_mode: 'popup', // evita redirect
    })
  })
})

function loginWithGoogle() {
  // redireciona para o endpoint Django que inicia o OAuth
  window.location.href = 'http://localhost:8000/accounts/google/login/?process=login'
}

function handleGoogleLogin() {
  const auth2 = gapi.auth2.getAuthInstance()
  auth2.signIn().then(googleUser => {
    const id_token = googleUser.getAuthResponse().id_token

    fetch('http://localhost:8000/auth/social/google/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_token }), // 👈 id_token em vez de access_token
    })
      .then(async res => {
        if (!res.ok) throw new Error('Falha no backend')
        return await res.json()
      })
      .then(data => {
        console.log('Resposta backend:', data)
        localStorage.setItem('access_token', data.access_token)
        router.push('/') // 🔥 redireciona para home
      })
      .catch(err => {
        console.error('Erro login Google:', err)
        errorMessage.value = 'Erro ao logar com Google'
      })
  })
}

async function login() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.post('token/', {
      email: loginForm.email,
      password: loginForm.password,
    })


    localStorage.setItem('access_token', response.data.access)
    localStorage.setItem('refresh_token', response.data.refresh)

    globalUser.value = {
      email: loginForm.email,
      avatar: 'caminho/para/foto.jpg'
    }

    console.log('Login OK:', response.data)

    router.push('/')
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message)

    if (error.response?.data?.detail) {
      errorMessage.value = error.response.data.detail
    } else {
      errorMessage.value = 'Erro ao conectar com o servidor.'
    }
  }
}

console.log('Mensagem de erro que vai aparecer:', errorMessage.value)

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
          <button class="bum" @click="login">
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
  /* texto digitado em preto */
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