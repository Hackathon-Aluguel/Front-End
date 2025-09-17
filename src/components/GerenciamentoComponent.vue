<script setup>

</script>
<template>
  <div class="tudo">
    <div class="esquerda">
      <div>
        <h1 class="bola"></h1>
        <button>Alterar Foto</button>

        <h2>Nome e sobrenome</h2>
        <p>BlablablablablablablaBlablablablablab <br> BlablablablablablablaBlablablablablab
          BlablablablablablablaBlablablablablab <br> BlablablablablablablaBlablablablablab <br>
          BlablablablablablablaBlablablablablab</p>
      </div>

      <h3>Rua Lorem ipsum, 101- SP</h3>
    </div>
    <div class="direita">
      <h1>Gerenciamento da conta</h1>
      <p>Gerencie suas informações, privacidade e segurança aqui.</p>

      <form>
        <div class="um">
          <div class="form">
            <label for="email">E-mail</label>
            <input type="email" id="email">
          </div>
          <div class="form">
            <label for="telefone">Telefone</label>
            <input type="telefone" id="telefone">
          </div>
        </div>
        <div class="dois">
          <div class="form">
            <label for="nascimento">Data de nascimento</label>
            <input type="date" id="nascimento">
          </div>
          <div class="form">
            <label for="pais">País/região</label>
            <input type="text" id="pais">
          </div>
        </div>
        <div class="tres">
          <h1>informações pessoais</h1>
          <div class="form">
            <label for="sobre">Sobre</label>
            <input type="text" id="sobre">
          </div>
        </div>
        <div class="quatro">
          <div class="form">
            <label for="nome">Nome</label>
            <input type="text" id="nome">
          </div>
          <div class="form">
            <label for="sobrenome">Sobrenome</label>
            <input type="text" id="sobrenome">
          </div>
        </div>
        <div class="cinco">
          <div class="form">
            <label for="genero">Gênero</label>
            <input type="text" id="genero">
          </div>
        </div>
        <div class="form">
          <h3>Endereço</h3>
          <button type="button" class="adicionar">+ Adicionar endereço</button>
        </div>

        <div class="risco">
          <h3>Área de risco</h3>
          <p>Excluir seus dados e a conta <br>
            Exclua permanentemente seus dados e tudo o que estiver associado à sua conta</p>
          <button type="button" class="delete-button"> Excluir Conta</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.tudo {
  display: flex;
}

/*/////////////////////
      Esquerda
/////////////////// */

.esquerda {
  padding: 2vw;
  border-radius: 16px;
  background: #fff;
  display: inline-block;
  padding: 1.5vw 2vw 0 1vw;
  margin: 2vw;
  height: 700px;
  width: 325px;
  flex-shrink: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

}

.bola {
  width: 150px;
  height: 150px;
  background-color: #D9D9D9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 5vw;
  display: flex;
  justify-content: center;
}

.esquerda button {
  all: unset;
  background-color: #D9D9D9;
  border-radius: 20px;
  padding: 4px 20px 4px 20px;
  color: #000;
  font-family: "Inria Sans", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 2vw 0 0 5.8vw;
  cursor: pointer;
}

.esquerda h2 {
  color: #244E8A;
  font-family: "Inria Sans", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 2vw 0 2vw 5.3vw;
}

.esquerda p {
  margin: 0 0 0 1.6vw;
  color: #000;
  font-family: "Inria Sans";
  font-size: 18px;
  font-style: normal;

  line-height: normal;
}

.esquerda h3 {
  margin: 13vw 0 0 3vw;
  color: #244E8A;
  font-family: "Inria Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

/*/////////////////////
      Direita
/////////////////// */


.direita {
  margin: 2vw 0 0 2vw;
}

.direita h1 {
  color: #000;
  font-family: "Inria Sans";
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0 0 14px 0;
}

.direita p {
  color: #13293D;
  font-family: "Inria Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.direita form {
  margin: 20px 0 0 0;
}

.direita form h3 {
  color: #244E8A;
  font-family: "Inria Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0 0 10px 0;
}

.direita .form {
  margin: 15px 0 0 0;
}

.direita .form label {
  display: block;
  color: #000;
  font-family: "Inria Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 15px 0 15px 0;
}

.direita .form input {
  border-radius: 20px;
  border: 1px solid #13293D;
  width: 500px;
  height: 50px;
  flex-shrink: 0;
}

.direita .form .adicionar {
  border-radius: 20px;
  border: 1px solid #13293D;
  width: 225px;
  height: 50px;
  background: #fff;
  font-size: 15px;
  margin: 10px 0 15px 0;
}

.direita .risco h3 {
  color: #9E1B1B;
  font-family: "Inria Sans";
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 5px 0 10px 0;
}

.direita .risco button {

  border-radius: 15px;
  background: #9E1B1B;
  color: #fff;
  width: 140px;
  height: 50px;
  flex-shrink: 0;
  margin: 15px 0 15px 0;
  border: none;
}

.direita .um {
  display: flex;
}

.direita .um {
  display: flex;
  gap: 60px;

}


.direita .dois {
  display: flex;
  gap: 60px;
  margin: 2vw 0 0 0;
}

.direita .tres h1 {
  color: #244E8A;
  font-family: "Inria Sans" sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 2.5vw 0 1.5vw 0;
}

.direita .tres .form input {
  width: 1070px;
  height: 60px;
}
.direita .quatro {
  display: flex;
  gap: 60px;

}
.direita .cinco {
  margin: 2vw 0 0 0;
}

.direita .cinco input {
  width: 1070px;
  height: 60px;
}
</style>
