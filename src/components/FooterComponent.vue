<script setup>

</script>
<template>
    <div class="pai">
        <div class="tom1"></div>
        <div class="tom2"></div>
        <div class="tom3"></div>
    </div>

    <footer>
        <nav>
            <h1>Aluga<span>ê</span></h1>
            <ul class="nav">
                <li><a href="#">Home</a></li>
                <li><a href="#">Contato</a></li>
                <li><a href="#">Sobre</a></li>
            </ul>
            <p>Continue por dentro:</p>
            <ul class="icons">
                <li><span class="mdi mdi-instagram"></span></li>
                <li class="circle"></li>
                <li><span class="mdi mdi-gmail"></span></li>
                <li class="circle"></li>
                <li><span class="mdi mdi-facebook"></span></li>
            </ul>

            <p>&copy; 2025 Aluga<span>ê</span>. Todos os direitos reservados.</p>

        </nav>
    </footer>
</template>
<style scoped>
.pai {
  position: relative; /* referência para os filhos absolutos */
  height: 130px;      /* altura para que as faixas fiquem visíveis */
  width: 100%;
  overflow: hidden;
}
.tom1,
.tom2,
.tom3 {
    display: flex;
    width: 100%;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
}

.tom1 {
    background-color: #1D2D51;
    position: absolute;
    height: 100px;
    top: 0px;
}

.tom2 {
    background-color: #244E8A;
    position: absolute;
    height: 50px;
    top: 40px;
}

.tom3 {
    background-color: #386CBE;
    position: absolute;
    height: 50px;
    top: 80px;
}

.nav li a:hover {
    color: #244E8A;
    transition: 0.5s;
}

.icons li:hover {
    color: #244E8A;
    transition: 0.5s;
}


footer {
    padding: 20px;
    text-align: center;
    background-color: #E0E5EF;
    border-top: 20px;
}

footer h1 {
    font-weight: bolder;
    font-size: 54px;
    color: black;
    padding-top: 8.5vw;
}

footer p:first-of-type {
    font-size: 20px;
    display: block;
    color: black;
}

footer p:last-child {
    font-size: 30px;
    color: black;
}

footer ul.nav {
    padding: 0;
    margin: 10px 0 35px 0;
    display: flex;
    justify-content: center;
    gap: 30px;
    font-size: 30px;
}

footer ul.nav li a {
    color: black;
}

footer ul.icons {
    gap: 25px;
    margin: 15px 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.icons li {
    cursor: pointer;

}

footer ul.icons span {
    font-size: 45px;
}

footer .circle {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: black;
}


footer h1 span,
footer p span{
    color: #244E8A;
}

@media (max-width: 600px) {
    footer {
        padding-bottom: 29vw;
        padding: 25vw 0 29vw 0;
    }

    footer h1 {
        position: absolute;
        bottom: 40vw;
        left: 35vw;
        font-size: 40px;
    }

    footer p:last-child {
        font-size: 20px;
        border-top: 2px solid #244E8A;
        padding-top: 2.5vw;
    }

    footer p:first-of-type {
        display: none;
    }

    footer ul.icons {
        margin: 6vw 0 0 0;
    }

    footer ul.nav {
        margin-bottom: 4vw;
        flex-wrap: wrap
    }

    footer ul.nav li {
        flex: 0 0 45%;
    }
}
</style>
