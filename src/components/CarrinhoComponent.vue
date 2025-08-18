<script setup>
import { reactive } from 'vue'
const produtos = reactive([
  {
    id: 1,
    nome: 'barraca',
    preco: 30,
    estrelas: 4,
    likes: 20,
    liked: false,
    periodoInicial: '28/08/2025',
    periodoFinal: '30/08/2025',
    imagem: 'https://picsum.photos/400/300?random=100',
  },
  {
    id: 2,
    nome: 'saco de dormir',
    preco: 25,
    estrelas: 5,
    likes: 4,
    liked: false,
    periodoInicial: '20/08/2025',
    periodoFinal: '22/08/2025',
    imagem: 'https://picsum.photos/400/300?random=101',
  },
  {
    id: 3,
    nome: 'lanterna',
    preco: 10,
    estrelas: 4,
    likes: 14,
    liked: false,
    periodoInicial: '21/08/2025',
    periodoFinal: '23/08/2025',
    imagem: 'https://picsum.photos/400/300?random=102',
  },
  {
    id: 4,
    nome: 'fogareiro',
    preco: 40,
    estrelas: 3,
    likes: 12,
    liked: false,
    periodoInicial: '19/08/2025',
    periodoFinal: '21/08/2025',
    imagem: 'https://picsum.photos/400/300?random=103',
  },
  {
    id: 5,
    nome: 'mochila',
    preco: 50,
    estrelas: 5,
    likes: 10,
    liked: false,
    periodoInicial: '25/08/2025',
    periodoFinal: '28/08/2025',
    imagem: 'https://picsum.photos/400/300?random=104',
  },
])

const imagesSingle = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/400/300?random=${index + 100}`,
}))
</script>

<template>
  <section>
    <div class="carrinho">
      <h1>
        Carrinho <span>({{ produtos.length }} produtos)</span>
      </h1>
      <ul class="titulos">
        <li>Produto</li>
        <li>Periodo</li>
        <li>Preço</li>
      </ul>
      <div class="carrinhoProduto">
        <ul>
          <li v-for="produto in produtos" :key="produto.id">
            <img :src="produto.imagem" :alt="produto.nome" width="200" />
            <p>{{ produto.nome }} - R$ {{ produto.preco }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div>
        oi tudo bom
    </div>
  </section>
</template>

<style scoped>
section {
    display: flex;
}
ul {
    list-style: none;
}
section div.carrinho {
    border: 1px solid #CDCDCD;
    border-radius: 1vw;
}
section div.carrinho h1 {
    color: black;
    font-size: 1.4vw;
    font-weight: bold;
}
section div.carrinho h1 span {
    color: #CDCDCD;
}
section div.carrinho ul.titulos {
    display: flex;
    justify-content: space-between;
}
</style>
