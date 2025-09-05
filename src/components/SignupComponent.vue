<script setup>
import { reactive } from "vue";
import axios from "axios";

// estado do formulário
const form = reactive({
  username: "",
  phone: "",
  email: "",
  password: "",
  agree: false,
});

// função para enviar dados pro backend
async function registerUser() {
  if (!form.agree) {
    alert("Você precisa aceitar os termos e condições.");
    return;
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/register/", {
      username: form.username,
      phone: form.phone,
      email: form.email,
      password: form.password,
    });

    console.log("Usuário criado:", response.data);
    alert("Conta criada com sucesso!");
    // exemplo: redirecionar para login depois
    // router.push("/login")
  } catch (error) {
    console.error("Erro ao cadastrar:", error.response?.data || error.message);
    if (error.response) {
      console.error("Erro ao cadastrar:", error.response.data);
      alert("Erro ao criar conta: " + JSON.stringify(error.response.data));
    } else {
      console.error("Erro:", error.message);
      alert("Erro inesperado: " + error.message);
    }
  }
}
</script>

<template>
  <section>
    <div class="square">
      <div class="um">
        <h1>Criar cont<span>a</span></h1>

        <div class="campos">
          <p class="sub">
            Já possui uma conta? <RouterLink to="/login">Log in</RouterLink>
          </p>
          <div class="peq">
            <input v-model="form.username" class="usu" type="text" placeholder="Nome de usuário" />
            <input v-model="form.phone" class="num" type="tel" placeholder="Número de telefone" />
          </div>
          <input v-model="form.email" class="email" type="email" placeholder="Insira o seu email..." />
          <input v-model="form.password" type="password" class="senha" placeholder="Insira a sua senha..." />

          <p class="esq">
            <input v-model="form.agree" class="che" type="checkbox" /> Concordo
            com os
            <a class="con" href="">Termos & condições</a>
          </p>

          <button class="bum" @click="registerUser">
            <p>Criar Conta</p>
          </button>
        </div>
        <div class="hr">
          <hr>
          <p>ou</p>
          <hr>
        </div>

        <a class="gog" href="http://localhost:8000/accounts/google/register/">
          <img src="/public/imgs/Google__G__logo.svg.png" alt="Google" />
          <p>Continuar com o Google</p>
        </a>

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
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
  bottom: 6.2vh;



  font-weight: 700;
  color: black;
  font-size: 2.2rem;

}

.sub {
  color: black;
  font-family: poppins, sans-serif;
  font-weight: 600;
  font-size: 0.7rem;
  text-align: left;
  margin-left: 1.3vw;
  margin-bottom: 1vh;
}

.sub a {
  text-decoration: none;
  color: #3853be;
  font-weight: 600;
}

.peq {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

}

.usu,
.num {
  width: 13vw;
  height: 4.8vh;
  border-radius: 0.8vw;
  border: none;
  background-color: #d9d9d9;
  padding: 1.3vw;
  color: #a1a1a1;
  font-size: 0.7rem;
  margin-bottom: 3vh;
}

.num {
  position: relative !important;
  z-index: 1000 !important;
}

.usu {
  margin-right: 2vw;
}

.email,
.senha {
  width: 28vw;
  height: 4.8vh;
  border-radius: 0.8vw;
  border: none;
  background-color: #d9d9d9;
  padding: 1.3vw;
  color: #a1a1a1;
  font-size: 0.7rem;

}

.senha {
  margin-top: 3vh;
  margin-bottom: 5vh;
}

.email::placeholder,
.senha::placeholder,
.num::placeholder,
.usu::placeholder {
  color: #a1a1a1;
  /* cinza só no placeholder */
}

.email,
.senha,
.usu,
.num {
  color: #000000;
  /* texto digitado em preto */
}

.campos {
  display: flex;
  flex-direction: column;
  justify-content: left;

}

.esq {
  color: black;
  font-family: poppins, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  margin-left: 1vw;
  display: flex;
  align-items: center;


}

.esq a {
  color: #333F7E;
  font-family: poppins, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.2vw;
}

.esq .che {
  transform: scale(1.5);
  border: 3px solid #333F7E;
  color: #333F7E;
  accent-color: #333f7e;
  cursor: pointer;
  margin-right: 0.4vw;


}

.bum {
  position: relative;
  top: 5vh;
  border: none;
  width: 28VW;
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
  margin-top: 3.5vw;
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

  width: 58vw;
  height: 75vh;
  position: relative;
  right: 1vw;
  top: 10vh;
  position: absolute;


}
</style>
