  <script setup>
  import { reactive, ref } from 'vue';
  import { computed } from 'vue'
  import { Carousel, Slide, Navigation } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  const produtos = reactive([
    { id: 1, nome: 'barraca', preco: 30, estrelas: 4, likes: 20, liked: false, status: 'estoque', categoria: 'trilha', recente: 'novo' },
    { id: 2, nome: 'saco de dormir', preco: 25, estrelas: 5, likes: 4, liked: false, status: 'estoque', categoria: 'camping', recente: 'novo' },
    { id: 3, nome: 'lanterna', preco: 10, estrelas: 4, likes: 14, liked: false, status: 'promocoes', categoria: 'trilha', recente: 'antigo' },
    { id: 4, nome: 'fogareiro', preco: 40, estrelas: 3, likes: 12, liked: false, status: 'fora', categoria: 'camping', recente: 'novo' },
    { id: 5, nome: 'mochila', preco: 50, estrelas: 5, likes: 10, liked: false, status: 'fora', categoria: 'trilha', recente: 'antigo' },
    { id: 6, nome: 'mochila', preco: 50, estrelas: 5, likes: 10, liked: false, status: 'estoque', categoria: 'camping', recente: 'novo' },
    { id: 7, nome: 'mochila', preco: 50, estrelas: 5, likes: 10, liked: false, status: 'estoque', categoria: 'camping', recente: 'antigo' },
    { id: 8, nome: 'mochila', preco: 50, estrelas: 5, likes: 10, liked: false, status: 'estoque', categoria: 'trilha', recente: 'antigo' },
    { id: 9, nome: 'mochila', preco: 50, estrelas: 5, likes: 10, liked: false, status: 'estoque', categoria: 'camping', recente: 'novo' },


  ])

  const filtroStatus = ref('')
  const filtroCategoria = ref('')
  const filtroRecente = ref('')


  const liked = ref(false)
  const likes = ref(0)
  function toggleLike(produto) {
    produto.liked = !produto.liked
    produto.likes += produto.liked ? 1 : -1
  }

  const imagesSingle1 = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    url: `https://picsum.photos/400/300?random=${index + 100}`,
  }))
  const configSingle1 = {
    itemsToShow: 1,
    gap: 5,
    snapAlign: 'center',
    breakpointMode: 'carousel',
  }



  const mostrar = reactive({
    recente: false,
    categoria: false,
    status: false,
  })

  function toggle(campo) {
    if (mostrar[campo]) {
      mostrar[campo] = false
    } else {

      for (const key in mostrar) mostrar[key] = false
      mostrar[campo] = true
    }
  }

  const produtosFiltrados = computed(() => {
    return produtos.filter(p => {
      const statusOk = !filtroStatus.value || p.status === filtroStatus.value
      const categoriaOk = !filtroCategoria.value || p.categoria === filtroCategoria.value
      const recenteOk = !filtroRecente.value || p.recente === filtroRecente.value
      return statusOk && categoriaOk && recenteOk
    })
  })
</script>


  <template>

    <section v-if="produtos.length === 0">
      <div class="curtidas">
        <h1>aluga<span>ê</span></h1>
        <p>Você não possui curtidas ainda</p>
        <button>Adicionar Produtos <span class="mdi mdi-arrow-right"></span>
        </button>
      </div>
    </section>
    <section v-else class="favorito">
      <section class="itens">
        <h1>Itens (2)</h1>
        <p>classificar por:</p>
        <form>
          <div class="cinza">
            <label for="recente">Adicionado recentemente</label>
            <button type="button" @click="toggle('recente')"><span class="mdi mdi-chevron-down"></span></button>
          </div>
          <div v-if="mostrar.recente" class="escolham">
            <ul>
              <li><input type="radio" id="r1" name="recente" value="novo" v-model="filtroRecente"><label for="r1">Mais
                  novos</label></li>
              <li><input type="radio" id="r2" name="recente" value="antigo" v-model="filtroRecente"><label
                  for="r2">Mais antigos</label></li>
            </ul>
          </div>
          <div class="cinza">
            <label for="categoria">Categoria</label>
            <button type="button" @click="toggle('categoria')"><span class="mdi mdi-chevron-down"></span></button>
          </div>
          <div v-if="mostrar.categoria" class="escolham">
            <ul>
              <li><input type="radio" id="c1" name="categoria" value="camping" v-model="filtroCategoria"><label
                  for="c1">Camping</label></li>
              <li><input type="radio" id="c2" name="categoria" value="trilha" v-model="filtroCategoria"><label
                  for="c2">Trilha</label></li>
            </ul>

          </div>
          <div class="cinza">
            <label for="status">Status</label>
            <button type="button" @click="toggle('status')">
              <span class="mdi mdi-chevron-down"></span>
            </button>
          </div>
          <div v-if="mostrar.status" class="escolher">
            <ul>
              <li><input type="radio" id="estoque" name="status-filtro" value="estoque" v-model="filtroStatus"><label
                  for="estoque">Em
                  estoque</label></li>
              <li><input type="radio" id="promocoes" name="status-filtro" value="promocoes"
                  v-model="filtroStatus"><label for="promocoes">Promoções</label></li>
              <li><input type="radio" id="fora" name="status-filtro" value="fora" v-model="filtroStatus"><label
                  for="fora">Fora
                  de
                  estoque</label></li>
            </ul>
          </div>

        </form>
      </section>
      <section class="favoritos">
        <div class="cima">
          <div>
            <h1>Favoritos</h1>
            <p>ache seus itens salvos e fique pronto para aluga-los</p>
          </div>
          <div class="search-box">
            <input type="text" placeholder="procure seus favoritos">
            <button type="submit">
              <span class="mdi mdi-magnify"></span>
            </button>
          </div>

        </div>
        <div class="listaFavoritos">
          <ul>
            <li v-for="produto in produtosFiltrados" :key="produto.id">
              <div class="produto">
                <button class="like-btn" @click="toggleLike(produto)">
                  <span :class="produto.liked ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"></span>
                  {{ produto.likes }}
                </button>

                <div class="imagem">
                  <Carousel v-bind="configSingle1" class="carroProduto">
                    <Slide v-for="image in imagesSingle1" :key="image.id">
                      <img :src="image.url" alt="image" />
                    </Slide>
                    <template #addons>
                      <Navigation />
                    </template>
                  </Carousel>
                </div>

                <h1>{{ produto.nome }}</h1>

                <div class="info">
                  <strong>R${{ produto.preco }}/dia</strong>
                  <p>{{ produto.estrelas }} <span class="mdi mdi-star"></span></p>
                </div>
                <button class="alugar">Alugar</button>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </section>
  </template>
<style scoped>
/* sem curtidasss  */
.curtidas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  text-align: center;
}

.curtidas h1 {
  color: #000;
  font-family: Poppins, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0 0 2.2vw 0;
}

.curtidas h1 span {
  color: #244E8A;
  font-family: Poppins, sans-serif;
  font-weight: 700;
}

.curtidas p {
  color: #000;
  font-family: Poppins, sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 550;
  line-height: normal;
  margin: 0 0 15px 0;
}

.curtidas button {
  all: unset;
  cursor: pointer;
  background-color: #244E8A;
  border-radius: 6px;
  width: 180px;
  height: 30px;
  color: #fff;
}

/*    */
.favorito {
  display: flex;
}

.itens {
  border: 1px solid #000;
  width: 400px;
  height: 450px;
  border-radius: 10px;
  margin: 2vw 0 0 2vw;
}

.itens h1 {
  color: #000;
  font-family: Poppins, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 1.8vw 0 1.2vw 2vw;
}

.itens p {
  margin: 0 0 0 2vw;
  color: #CDCDCD;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 550;
  line-height: normal;
}


.itens form div.cinza {
  border: 1px solid #000;
  width: 320px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  margin: 5px 0 20px 2vw;
  background-color: #d9d9d9;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.itens form label {
  color: #000;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0 0 0 1.5vw;


}





.favoritos {
  margin: 2vw 0 0 2vw;
  border-radius: 8px;
  width: 100%;
  max-width: 1144px;
  height: 812px;
  border: 1px solid #000;
  overflow-x: auto;
  padding: 10px;
  box-sizing: border-box;

}

div.listaFavoritos {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;

}

.listaFavoritos::-webkit-scrollbar {
  height: 8px;
}

.listaFavoritos::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

.listaFavoritos::-webkit-scrollbar-thumb {
  background: #244e84;
  border-radius: 5px;
}

.search-box {
  display: flex;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #CDCDCD;
  background: #FFF;
  border-radius: 20px;
  padding: 5px 10px;
  width: 250px;
}

.search-box input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  padding: 5px;
  border-radius: 20px;
}

.search-box input::placeholder {
  color: #aaa;

}

.search-box button {
  background: #1e3a8a;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 14px;
}

.cima {
  margin: 1.4vw 0 0 3.5vw;
  display: flex;
}

.cima h1 {
  color: #000;
  font-family: Poppins, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 10px;
  padding: 10px 0 0;
}



.cima p {
  color: #CDCDCD;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 8px 0 0 0;
}

.search-box {
  margin: 0 0 0 20vw;
}

.itens form span.mdi {
  font-size: 40px;
}

.itens form button {
  all: unset;
  cursor: pointer;
  margin: 0 1.5vw 0 0;
}

/* produtossssssssssssss */
div.produto {
  max-width: 16vw;
  font-size: 1.1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border: 1px solid #244e84;
  text-align: center;
  position: relative;
}

.carousel2 {
  margin: 0 4vw 2px 4vw;
}

div.produto img {
  width: 100%;
  position: relative;
  border-radius: 8px;
  width: 90%;
  height: 80%;
  object-fit: cover;
}

div.produto .like-btn {
  position: absolute;
  top: 25px;
  z-index: 5;
  right: 18px;
  background: #244e84;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 3px 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

div.produto h1 {
  display: flex;
  justify-content: center;
  color: black;
  height: auto;
  text-align: left;
  font-size: 30px;
  font-family: Poppins, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0 2px 0 0;
}

div.produto div.info {
  display: flex;
  justify-content: space-between;
  margin: 3px 15px 3px 14px;
}

div.produto button.alugar {
  width: 90%;
  height: 40px;
  background-color: #244e84;
  color: white;
  border: none;
  border-radius: 14px;
  margin: 10px 0 10px 0;
  font-size: 1vw;
}

div.produto p span {
  color: #ffd700;
}

.carousel2 .carousel {
  --vc-nav-background: transparent;
  --vc-nav-color: black;
  --vc-nav-size: 40px;
  --vc-nav-margin: 30px;
}

.carousel2 .carousel.carroProduto {
  --vc-nav-background: white;
  --vc-nav-color: #244e84;
  --vc-nav-size: 40px;
}

.carro3 button.perto {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #1d2d51;
  border: none;
  color: white;
  width: 15vw;
  height: 8vh;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 3vw;
}

div.listaFavoritos ul {
  margin: 2vw 0 0 2.3vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  list-style: none;
  padding: 0;

}

div.escolher {
  display: flex;
  border: 1px solid #000;
  width: 320px;
  height: 110px;
  flex-shrink: 0;
  border-radius: 8px;
  margin: 5px 0 20px 2vw;
  background-color: #d9d9d9;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}



div.escolher ul li {
  display: flex;
  margin: 12px 0 0 0;
  align-items: center;
}

div.escolham {
  display: flex;
  border: 1px solid #000;
  width: 320px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 8px;
  margin: 5px 0 20px 2vw;
  background-color: #d9d9d9;
  align-items: center;
  border: none;
  display: flex;

  justify-content: space-between;
}

div.escolham ul li {
  display: flex;
  margin: 10px 0 0 0;
  align-items: center;
}

input[type="radio"] {
  width: 20px;
height: 20px;
  accent-color: #244e84;
}

input[type="radio"]:checked+label {
  color: #244e84;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
</style>
