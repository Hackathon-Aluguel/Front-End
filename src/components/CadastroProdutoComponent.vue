<script setup>
</script>
<template>
    <div class="fundo">
    <h1>
        Cadastre seu produto
    </h1>
    <div class="cadastro-produto">
        <div class="img-produto">
            <button><span class="mdi mdi-download"></span></button>
            <p>Adicione 6 fotos no formato PNG ou JPG</p>
            <p>R$</p>
        </div>
        <div class="form-produto">
            <form action="" method="get">
                <ul>
                    <li>
                        <p>Nome do produto</p>
                        <input type="text" name="nome" id="nome">
                    </li>
                    <li>
                        <p>Categoria</p>
                        <select id="categoria" name="categoria">
                            <option value="evento/festa">Eventos e festas</option>
                            <option value="esporte/lazer">Esporte e lazer</option>
                            <option value="casa/utilidades">Casa e Utilidades</option>
                            <option value="tech/eletro">Tecnologia e Eletrônicos</option>
                            <option value="const/reforma">Construção e Reforma</option>
                            <option value="roupas/acesso">Roupas e acessorios</option>
                            <option value="infantil">Infantil</option>
                            <option value="instru-musicais">Instrumentos musicais</option>
                        </select>
                    </li>
                    <li>
                        <p>Cor</p>
                        <input type="text" name="nome" id="nome">
                    </li>
                    <li>
                        <p>Condições</p>
                        <select name="condicao" id="condicao">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </li>
                    <li>
                        <p>Material</p>
                        <select name="material" id="material">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </li>
                    <li>
                        <p>CEP</p>
                        <input type="number" name="cep" id="cep">
                    </li>
                </ul>
            </form>

            <textarea name="descricao" id="descricao" maxlength="300"
            placeholder="Descreva seu produto (até 300 caracteres)">

        </textarea>
        </div>
    </div>
    </div>
</template>
<style lang="scss">
h1 {
    text-align: center;
    font-size: 25px;
}
.fundo {
    background-color: white;
    padding: 2vw 0;
}

.cadastro-produto {
    display: flex;
    margin-top: 3vw;
    & .img-produto {
        margin: 1.5vw 0 0 6vw;
        width: 25%;
      & button{
        width: 80%;
        height: 58%;
        border-radius: 20px;
        border: none;
        background-color: #E8F1F2;
        font-size: 50px;
      }  

      & button:hover {
        border: 2px solid #244E8A;
        cursor: pointer;
      }

      & p:first-of-type {
        color: #244E8A;
        font-size: 18px;
      }

      & p:last-of-type {
        font-size: 30px;
        color: black;
        font-weight: bold;
        margin-top: 50px;
      }
    }


    & .form-produto {
        width: 80%;
        & ul {
            display: flex;
            flex-wrap: wrap;
            margin: 0;
            & li{
                width: 50%;

                & p{
                    font-size: 18px;
                    font-weight: bold;
                }

                & input, & select {
                    width: 80%;
                    height: 45px;
                    border-radius: 16px;
                    border: 1px solid black;
                    background-color: #F4F4F4;
                    font-size: 18px;
                    padding-left: 10px;
                    margin-bottom: 1.2vw;
                }

                & input:hover, & select:hover {
                    border: 2px solid #244E8A;
                }

                & select {
                    width: 82%;
                    height: 50px;
                    padding-right: 20px;
                }
            }
        }

        & textarea {
            margin: 2vw 0 0 39.5px;
            width: 86%;
            height: 150px;
            background-color: #F4F4F4;
            font-size: 20px;
            padding: 8px 15px;
        }
    }
}
</style>