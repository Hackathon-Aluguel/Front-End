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
                <p>R$ <input type="number" name="preco" id="preco"></p>
                <button class="cadastrar">Cadastrar</button>
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
                                <option value="" disabled selected>Selecione...</option>
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
                            <p>Condição</p>
                            <select name="condicao" id="condicao">
                                <option value="" disabled selected>Selecione...</option>
                                <option value="novo">Novo</option>
                                <option value="seminovo">Seminovo</option>
                                <option value="usado">Usado</option>
                                <option value="recondicionado">Recondicionado</option>
                                <option value="defeituoso">Defeituoso</option>
                            </select>
                        </li>
                        <li>
                            <p>Quantidade em estoque</p>
                            <input type="number" name="quant_estoque" id="quant_estoque">
                        </li>
                        <li>
                            <ul class="endereco">
                                <li>
                                    <p>Rua</p>
                                    <input type="text" name="rua" id="rua">
                                </li>
                                <li>
                                    <p>Número</p>
                                    <input type="number" name="numero" id="numero">
                                </li>
                            </ul>
                        </li>
                    </ul>
                </form>

                <textarea name="descricao" id="descricao" maxlength="300"
                    placeholder="Descreva seu produto (até 300 caracteres). "></textarea>
                <p><small>Obs: coloque informações relevantes como: Marca/Fabricante, Modelo/Código, peso/dimensões,
                        cor, material, etc.</small></p>

            </div>
        </div>
    </div>
</template>
<style lang="scss" >
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

        & button:not(.cadastrar) {
            width: 80%;
            height: 58%;
            border-radius: 20px;
            border: none;
            background-color: #E8F1F2;
            font-size: 50px;
        }

        & button:hover:not(.cadastrar) {
            border: 2px solid #244E8A;
            cursor: pointer;
        }

        & button:focus:not(.cadastrar) {
            border: 2px solid #244E8A;
            outline: none;
        }

        & .cadastrar {
            width: 80%;
            height: 50px;
            border-radius: 2px;
            border: none;
            background-color: #244E8A;
            color: white;
            font-size: 20px;
            margin-top: 1.6vw;
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
            display: flex;
            align-items: center;
            & input {
                width: 66%;
                margin-left: 10px;
                font-size: 18px;
            }
        }
    }


    & .form-produto {
        width: 80%;

        & ul {
            display: flex;
            flex-wrap: wrap;
            margin: 0;

            & li {
                width: 50%;

                & p {
                    font-size: 18px;
                    font-weight: bold;
                }

                & input,
                & select {
                    width: 80%;
                    height: 45px;
                    border-radius: 8px;
                    border: 1px solid black;
                    background-color: #F4F4F4;
                    font-size: 18px;
                    padding-left: 10px;
                    margin-bottom: 1.2vw;
                }

                & input:hover,
                & select:hover {
                    border: 2px solid #244E8A;
                }

                & input:focus,
                & select:focus {
                    border: 2px solid #244E8A;
                    outline: none;
                }

                & select {
                    width: 82%;
                    height: 50px;
                    padding-right: 20px;
                }

                & ul{
                    display: flex;
                    padding: 0;
                    width: 88.8%; 
                }
            }
        }

        & textarea {
            margin: 2vw 0 0 39.5px;
            width: 86%;
            height: 150px;
            background-color: #F4F4F4;
            font-size: 18px;
            padding: 8px 15px;
            border-radius: 8px;
        }

        & textarea:focus,
        & textarea:hover {
            border: 2px solid #244E8A;
            outline: none;
        }

        & small {
            margin-left: 39.5px;
            color: gray;
            font-size: 14px;
        }
    }

}
</style>