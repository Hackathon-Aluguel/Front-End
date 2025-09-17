<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ref, reactive, computed } from 'vue'

const avaliacoes = [
  {
    id: 1,
    nome: 'Pietro',
    texto:
      'Não sabia sobre esse site, depois que conheci ele consegui fazer minhas coisas sem precisar gastar muito',
  },
  {
    id: 2,
    nome: 'Mariana',
    texto: 'Consegui alugar o que eu precisava de forma rápida e prática, super recomendo!',
  },
  {
    id: 3,
    nome: 'Lucas',
    texto: 'Achei muito útil, economizei dinheiro e ainda conheci um serviço confiável.',
  },
  {
    id: 4,
    nome: 'Beatriz',
    texto: 'Experiência excelente, o atendimento foi ótimo e o processo bem simples.',
  },
  {
    id: 5,
    nome: 'Rafael',
    texto:
      'Já usei várias vezes e sempre deu tudo certo, muito melhor do que comprar algo que vou usar pouco.',
  },
  {
    id: 6,
    nome: 'Carolina',
    texto: 'Adorei a ideia, é sustentável e ajuda bastante no dia a dia.',
  },
  {
    id: 7,
    nome: 'Fernanda',
    texto: 'Me surpreendi com a qualidade do serviço, certamente vou usar de novo.',
  },
  {
    id: 8,
    nome: 'João',
    texto: 'Muito prático, facilitou bastante minha vida em um momento que eu precisava.',
  },
]

// Carousel configuration
const config = {
  height: 200,
  itemsToShow: 1,
  gap: 5,
  snapAlign: 'center',
  breakpointMode: 'carousel',
  breakpoints: {
    300: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    400: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    500: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
  },
}

const imagesSingle1 = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/400/300?random=${index + 100}`,
}))

const configMulti1 = {
  itemsToShow: 4,
  snapAlign: 'start',
  breakpointMode: 'carousel',
  breakpoints: {
    300: { itemsToShow: 1 },
    600: { itemsToShow: 2 },
    900: { itemsToShow: 3 },
    1200: { itemsToShow: 4 },
  },
}

const produtos = reactive([
  { id: 1, nome: 'barraca', preco: 30, estrelas: 4, likes: 20, liked: false },
  { id: 2, nome: 'saco de dormir', preco: 25, estrelas: 5, likes: 4, liked: false },
  { id: 3, nome: 'lanterna', preco: 10, estrelas: 4, likes: 14, liked: false },
  { id: 4, nome: 'fogareiro', preco: 40, estrelas: 3, likes: 12, liked: false },
  { id: 5, nome: 'mochila', preco: 50, estrelas: 5, likes: 10, liked: false },
])
function toggleLike(produto) {
  produto.liked = !produto.liked
  produto.likes += produto.liked ? 1 : -1
}

const dragExterno = ref(true)

const denunciaFinal = ref([])

function salvarDenuncia() {
  denunciaFinal.value = [...opcoesSelecionadas.value]
  op.value = false
  mostrarDenuncia3.value = false
  mostrarDenuncia2.value = false
  mostrarDenuncia.value = false
  denuncia1.value = false
  denuncia2.value = false
  denuncia3.value = false
  denuncia4.value = false
  denuncia5.value = false
  spam.value = false
  abAs.value = false
  odioViolencia.value = false
  rouboGolpeFraude.value = false
  autoMutilacao.value = false
  cartoesRoubados.value = false
  produtosIlegais.value = false
  linksIlegais.value = false
  dadosPrivados.value = false
  outraCoisa.value = false
  encorajando_Automultilacao.value = false
  autoMutilacaoDenuncia.value = false
  fotoRosto.value = false
  fotoIntima.value = false
  endereco.value = false
  nomeLegal.value = false
  infoCartao.value = false
  mostrarInfoPrivada.value = false
  mostrarOutros.value = false
  envioRelatorio.value = true
  alert('Denúncia enviada com sucesso!')
}

const proximoP3 = computed(() => {
  return (
    denuncia1.value ||
    denuncia2.value ||
    denuncia3.value ||
    denuncia4.value ||
    denuncia5.value ||
    spam.value ||
    abAs.value ||
    odioViolencia.value ||
    rouboGolpeFraude.value ||
    autoMutilacao.value ||
    cartoesRoubados.value ||
    produtosIlegais.value ||
    linksIlegais.value ||
    dadosPrivados.value ||
    outraCoisa.value ||
    encorajando_Automultilacao.value ||
    autoMutilacaoDenuncia.value
  )
})

const mostrarDenuncia = ref(false)
function abrirDenuncia() {
  mostrarDenuncia.value = true
}

const mostrarDenuncia2 = ref(false)
function abrirDenuncia2() {
  mostrarDenuncia2.value = true
  mostrarDenuncia.value = false
}

const mostrarDenuncia3 = ref(false)
function abrirDenuncia3() {
  mostrarDenuncia3.value = true
  mostrarDenuncia2.value = false
}

const mostrarOutros = ref(false)
function abrirOutros() {
  mostrarOutros.value = true
  mostrarDenuncia3.value = false
  spam.value = false
  abAs.value = false
  odioViolencia.value = false
  rouboGolpeFraude.value = false
}
const mostrarSuiciAutoulti = ref(false)
function abrirSuiciAutoMulti() {
  mostrarSuiciAutoulti.value = true
  mostrarOutros.value = false
}
const mostrarInfoPrivada = ref(false)
function abrirInfoPrivada() {
  mostrarInfoPrivada.value = true
  mostrarOutros.value = false
}
function abrirResumo() {
  op.value = true
  mostrarInfoPrivada.value = false
  telaAnterior.value = 'infoPrivada'
  autoMutilacao.value = false
  cartoesRoubados.value = false
  produtosIlegais.value = false
  linksIlegais.value = false
}

const denuncia1 = ref(false)
const denuncia2 = ref(false)
const denuncia3 = ref(false)
const denuncia4 = ref(false)
const denuncia5 = ref(false)
const spam = ref(false)
const abAs = ref(false)
const odioViolencia = ref(false)
const rouboGolpeFraude = ref(false)
const autoMutilacao = ref(false)
const encorajando_Automultilacao = ref(false)
const autoMutilacaoDenuncia = ref(false)
const cartoesRoubados = ref(false)
const produtosIlegais = ref(false)
const linksIlegais = ref(false)
const dadosPrivados = ref(false)
const outraCoisa = ref(false)
const fotoRosto = ref(false)
const fotoIntima = ref(false)
const endereco = ref(false)
const nomeLegal = ref(false)
const infoCartao = ref(false)

function voltarPag() {
  mostrarDenuncia2.value = false
  mostrarDenuncia.value = true
  denuncia1.value = false
  denuncia2.value = false
  denuncia3.value = false
  denuncia4.value = false
  denuncia5.value = false
}
function voltarPag2() {
  mostrarDenuncia3.value = false
  mostrarDenuncia2.value = true
  spam.value = false
  abAs.value = false
  odioViolencia.value = false
  rouboGolpeFraude.value = false
  outraCoisa.value = false

}
function voltarPagOutros() {
  mostrarOutros.value = false
  outraCoisa.value = false
  mostrarDenuncia3.value = true
  autoMutilacao.value = false
  cartoesRoubados.value = false
  produtosIlegais.value = false
  linksIlegais.value = false
  dadosPrivados.value = false
}
function voltarPagSuiciAutoMulti() {
  mostrarSuiciAutoulti.value = false
  mostrarOutros.value = true
  encorajando_Automultilacao.value = false
  autoMutilacaoDenuncia.value = false
}
function voltarPagInfoPrivada() {
  mostrarInfoPrivada.value = false
  mostrarOutros.value = true
  fotoRosto.value = false
  fotoIntima.value = false
  endereco.value = false
  nomeLegal.value = false
  infoCartao.value = false
  dadosPrivados.value = false
}
const envioRelatorio = ref(false)
function opcao(tipo) {
  // Cria a aba padrao de enviar relatorio
  spam.value = false
  abAs.value = false
  odioViolencia.value = false
  rouboGolpeFraude.value = false
  autoMutilacao.value = false
  cartoesRoubados.value = false
  produtosIlegais.value = false
  linksIlegais.value = false
  encorajando_Automultilacao.value = false
  autoMutilacaoDenuncia.value = false
  envioRelatorio.value = false

  telaAnterior.value = 'outros'
  if (tipo === 'spam') spam.value = true
  if (tipo === 'abAs') abAs.value = true
  if (tipo === 'odioViolencia') odioViolencia.value = true
  if (tipo === 'rouboGolpeFraude') rouboGolpeFraude.value = true
  if (tipo === 'autoMutilacao') autoMutilacao.value = true
  if (tipo === 'cartoesRoubados') cartoesRoubados.value = true
  if (tipo === 'produtosIlegais') produtosIlegais.value = true
  if (tipo === 'linksIlegais') linksIlegais.value = true
  if (tipo === 'encorajando_Automultilacao') encorajando_Automultilacao.value = true
  if (tipo === 'autoMutilacaoDenuncia') autoMutilacaoDenuncia.value = true
  if (tipo === 'envioRelatorio') envioRelatorio.value = true

  // abre resumo
  op.value = true
  telaAnterior.value = mostrarDenuncia3.value
    ? 'denuncia3'
    : mostrarOutros.value
      ? 'outros'
      : mostrarSuiciAutoulti.value
        ? 'suiciAuto'
        : ''
  mostrarDenuncia3.value = false
  mostrarOutros.value = false
  mostrarSuiciAutoulti.value = false
}

const op = ref(false)

const opcoesSelecionadas = computed(() => {
  //Add todas as opções selecionadas em uma lista ao finaol do relatorio
  const lista = []
  if (denuncia1.value) lista.push('Foto de perfil inapropriada')
  if (denuncia2.value) lista.push('Foto do produto enganosa')
  if (denuncia3.value) lista.push('Informações falsas no perfil')
  if (denuncia4.value) lista.push('Descrição do produto ou perfil imprópria')
  if (denuncia5.value) lista.push('Outro comportamento inadequado')
  if (spam.value) lista.push('Spam')
  if (abAs.value) lista.push('Abuso ou assédio')
  if (outraCoisa.value) lista.push('Outra coisa')
  if (odioViolencia.value) lista.push('Discurso de ódio ou glorificação da violência')
  if (rouboGolpeFraude.value) lista.push('Roubo de identidade, golpe ou fraude')

  if (autoMutilacao.value) lista.push('O Perfil menciona automutilação ou suicídio')
  if (encorajando_Automultilacao.value) lista.push('Encorajando automutilação ou suicídio')
  if (autoMutilacaoDenuncia.value) lista.push('Automutilação ou suicídio')

  if (cartoesRoubados.value)
    lista.push('Venda ou distribuição de contas/cartões de crédito roubados')
  if (produtosIlegais.value) lista.push('Venda de drogas ou produtos ilegais')
  if (linksIlegais.value)
    lista.push('Compartilhamento de links maliciosos ou atividades ilegais digitais')
  if (dadosPrivados.value) lista.push('O perfil expõe informações de identidade privada')
  
  if (fotoRosto.value) lista.push('Foto do rosto')
  if (fotoIntima.value) lista.push('Foto íntima, particular')
  if (endereco.value) lista.push('Endereço IP')
  if (nomeLegal.value) lista.push('Nome legal')
  if (infoCartao.value) lista.push('Informações do cartão de crédito')
  

  return lista
})

function fecharModal() {
  op.value = false
  mostrarDenuncia3.value = false
  mostrarDenuncia2.value = false
  mostrarDenuncia.value = false
  denuncia1.value = false
  denuncia2.value = false
  denuncia3.value = false
  denuncia4.value = false
  denuncia5.value = false
  spam.value = false
  abAs.value = false
  odioViolencia.value = false
  rouboGolpeFraude.value = false
  autoMutilacao.value = false
  cartoesRoubados.value = false
  produtosIlegais.value = false
  linksIlegais.value = false
  dadosPrivados.value = false
  outraCoisa.value = false
  encorajando_Automultilacao.value = false
  autoMutilacaoDenuncia.value = false
  fotoRosto.value = false
  fotoIntima.value = false
  endereco.value = false
  nomeLegal.value = false
  infoCartao.value = false
  mostrarInfoPrivada.value = false
  mostrarOutros.value = false
}

const telaAnterior = ref('') // Pode ser: 'denuncia3', 'outros', 'suiciAuto'
function voltarResumo() {
  op.value = false

  if (telaAnterior.value === 'denuncia3') mostrarDenuncia3.value = true
  else if (telaAnterior.value === 'outros') mostrarOutros.value = true
  else if (telaAnterior.value === 'suiciAuto') mostrarSuiciAutoulti.value = true
  else if (telaAnterior.value === 'infoPrivada') mostrarInfoPrivada.value = true
}
</script>

<template>
  <section class="infos">
    <div class="p1">
      <div class="superior">
        <ul>
          <li>
            <img
              src="https://s2.glbimg.com/CZ7vt10tkQki58E3X37KbSrW8PA=/620x430/e.glbimg.com/og/ed/f/original/2022/04/11/dall_e_ia.png"
              alt="Foto de Perfil"
            />
          </li>
          <li>
            <h1>Nome</h1>
            <p><span class="mdi mdi-map-marker"></span> Cidade - estado</p>
            <button>Mandar mensagem <span class="mdi mdi-send"></span></button>
          </li>
        </ul>
      </div>
      <div class="inferior">
        <div>
          <p class="num">23</p>
          <!-- Número Avaliações -->
          <p>avaliações</p>
        </div>
        <div class="meio">
          <p class="num">5,0 <span class="mdi mdi-star"></span></p>
          <!-- Total de estrelas -->
          <p>estrelas</p>
        </div>
        <div>
          <p class="num">2</p>
          <!-- Tempo alugando -->
          <p>ano alugando</p>
        </div>
      </div>
    </div>
    <div class="p2">
      <h2>Sobre "Nome da pessoa"</h2>
      <p>
        <span class="mdi mdi-notebook"></span>Onde estudei: Escola Municipal Dr Sadalla Amin Ghanem
      </p>
      <p><span class="mdi mdi-briefcase-account-outline"></span>Trabalho: Garoto de programa</p>
      <p class="off"><span class="mdi mdi-heart"></span>Curto muito: pintar boobie goods</p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed hic iste id recusandae!
        Eveniet, repudiandae aliquid earum fugiat adipisci cupiditate placeat enim ex doloremque
        culpa incidunt optio molestiae quaerat accusantium!
      </p>
    </div>
  </section>

  <section class="avaliacao">
    <h2>Avaliações de "Nome da pessoa"</h2>

    <div class="carousel__wrapper">
      <Carousel v-bind="config">
        <Slide v-for="avaliacao in avaliacoes" :key="avaliacao.id">
          <ul>
            <li>
              <img
                src="https://s2.glbimg.com/CZ7vt10tkQki58E3X37KbSrW8PA=/620x430/e.glbimg.com/og/ed/f/original/2022/04/11/dall_e_ia.png"
                alt="Foto de Perfil"
                style="height: 50px; width: 50px; border-radius: 30px"
              />
            </li>
            <li>
              <h2>Nome pessoa</h2>
            </li>
          </ul>
          <div class="textos_Inferiores">
            <p>Estrelinhas Obs: Ver depois!</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores facilis officia
              iusto. Quod animi voluptates rerum? Exercitationem ut dolores ipsum modi at possimus
              adipisci officia rerum cupiditate rem, aliquam molestiae.
            </p>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>

  <section class="produto_Usuario">
    <h2>Produtos de "Nome da pessoa"</h2>
    <div class="carousel2">
      <Carousel v-bind="configMulti1" :mouseDrag="dragExterno">
        <Slide v-for="produto in produtos" v-bind:key="produto.id">
          <div class="produto">
            <button class="like-btn" @click="toggleLike(produto)">
              <span :class="produto.liked ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"></span>
              {{ produto.likes }}
            </button>

            <div class="imagem" @mouseenter="dragExterno = false" @mouseleave="dragExterno = true">
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
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>
  <section class="denuncia">
    <button @click="abrirDenuncia">
      <span class="mdi mdi-flag"></span>
      Denunciar "Nome da Pessoa"
    </button>
  </section>
  <div v-if="mostrarDenuncia" class="modal">
    <div>
      <button @click="fecharModal" class="x">X</button>
      <h1>Denunciar Perfil do Usuário</h1>
      <p class="h1">
        Denuncias nos ajudam a manter o Alugaê seguro - o usuário não será notificado de que você o
        denunciou.
      </p>
      <p class="select">Usuário Selecionado</p>
      <div class="userDenuncia">
        <img
          src="https://s2.glbimg.com/CZ7vt10tkQki58E3X37KbSrW8PA=/620x430/e.glbimg.com/og/ed/f/original/2022/04/11/dall_e_ia.png"
          alt="Imagem de perfil do usuário"
        />
        <h1>Nome da pessoa</h1>
      </div>
      <div class="proximaP">
        <button @click="abrirDenuncia2">Próximo</button>
      </div>
    </div>
  </div>

  <div v-if="mostrarDenuncia2" class="modal">
    <div>
      <button @click="fecharModal" class="x">X</button>
      <h2>Qual a sua denúncia?</h2>
      <p class="h2">Selecione os elementos que você quer denunciar no perfil deste usuário.</p>
      <ul class="opcoesDenuncia">
        <li>
          <div>
            <input type="checkbox" id="foto" name="foto" v-model="denuncia1" />
          </div>
          <div>
            <label for="foto">Foto de perfil inapropriada</label>
            <label for="foto">Nudez, violência ou conteúdo ofensivo</label>
          </div>
        </li>
        <li>
          <div>
            <input type="checkbox" id="fotoProd" name="fotoProd" v-model="denuncia2" />
          </div>
          <div>
            <label for="fotoProd">Foto do produto enganosa</label>
            <label for="fotoProd">Imagem não condiz com o item anunciado</label>
          </div>
        </li>
        <li>
          <div>
            <input type="checkbox" id="infoFalsa" name="infoFalsa" v-model="denuncia3" />
          </div>
          <div>
            <label for="infoFalsa">Informações falsas no perfil</label>
            <label for="infoFalsa">Nome, idade ou localização incorretos</label>
          </div>
        </li>
        <li>
          <div>
            <input type="checkbox" id="descritores" name="descritores" v-model="denuncia4" />
          </div>
          <div>
            <label for="descritores">Descrição do produto ou perfil imprópria</label>
            <label for="descritores">Texto com palavrões, ódio ou discriminação</label>
          </div>
        </li>
        <li>
          <div>
            <input type="checkbox" id="outro" name="outro" v-model="denuncia5" />
          </div>
          <div>
            <label for="outro">Outros problemas no perfil</label>
            <label for="outro">Assédio, golpe ou spam</label>
          </div>
        </li>
      </ul>
      <div class="enviar">
        <button @click="voltarPag">Voltar</button>
        <button @click="abrirDenuncia3" v-if="proximoP3">Próximo</button>
      </div>
    </div>
  </div>

  <div v-if="mostrarDenuncia3" class="modal">
    <div>
      <button @click="fecharModal" class="x">X</button>
      <h2>O que está acontecendo?</h2>
      <p class="h3">Selecione a opção que melhor descreve o problema</p>

      <ul class="parteDenuncia3">
        <li>
          <button @click="opcao('spam')">Spam</button><span class="mdi mdi-arrow-right"></span>
        </li>
        <li>
          <button @click="opcao('abAs')">Abuso ou assédio</button
          ><span class="mdi mdi-arrow-right"></span>
        </li>
        <li>
          <button @click="opcao('odioViolencia')">
            Discurso de ódio ou glorificação da violência</button
          ><span class="mdi mdi-arrow-right"></span>
        </li>
        <li>
          <button @click="opcao('rouboGolpeFraude')">Golpe, fraude ou roubo de identidade</button
          ><span class="mdi mdi-arrow-right"></span>
        </li>
        <li>
          <button
            @click="abrirOutros(); outraCoisa = true">
            Outra coisa</button><span class="mdi mdi-arrow-right"></span>
        </li>
      </ul>
      <div class="enviar">
        <button @click="voltarPag2">Voltar</button>
      </div>
    </div>
  </div>

  <!--Opções da Denuncia3-->
  <div class="modal" v-if="op">
    <div>
      <button @click="fecharModal" class="x">X</button>
      <h2>Resumo da denúncia</h2>
      <p>Revise sua denúncia antes de enviar</p>
      <p>
        Ao enviar esta denúncia, você confirma que ela é verdadeira e feira de boa fé. Pedimos que
        siga nossas diretrizes da comunidade e não faã denúncias falsas ou repetidas.
      </p>
      <h3>Denunciar categoria</h3>
      <ul class="parteDenuncia4">
        <li v-for="(opcao, index) in opcoesSelecionadas" :key="index">{{ opcao }}</li>
      </ul>
      <div class="enviar">
        <button @click="voltarResumo">Voltar</button>
        <button @click="salvarDenuncia" class="envioFinal">Enviar denúncia</button>
      </div>
    </div>
  </div>

  <!--Opções de Outros-->
  <div class="modal" v-if="mostrarOutros">
    <div>
      <button @click="fecharModal" class="x">X</button>
      <h2>Outros problemas</h2>

      <ul class="parteDenuncia3">
        <li>
          <button @click="abrirSuiciAutoMulti(); autoMutilacao = true">O perfil menciona automutilação ou suicídio</button>
          <span class="mdi mdi-arrow-right"></span>
        </li>
        <li>
          <button @click="opcao('cartoesRoubados')">
            Venda ou distribuição de contas/cartões de crédito roubados
          </button>
          <span class="mdi mdi-arrow-right"></span>
        </li>
        <li>
          <button @click="opcao('produtosIlegais')">Venda de drogas ou produtos ilegais</button>
          <span class="mdi mdi-arrow-right"></span>
        </li>
        <li>
          <button @click="opcao('linksIlegais')">
            Compartilhamento de links maliciosos ou atividades ilegais digitais
          </button>
          <span class="mdi mdi-arrow-right"></span>
        </li>
        <li>
          <button
            @click="abrirInfoPrivada(); dadosPrivados = true">
            O perfil expõe informações de identidade privada
          </button>
          <span class="mdi mdi-arrow-right"></span>
        </li>
      </ul>

      <div class="enviar">
        <button @click="voltarPagOutros">Voltar</button>
      </div>
    </div>
  </div>

  <!--Opcoes da opção suícidio-->
  <div class="modal" v-if="mostrarSuiciAutoulti">
    <div>
      <button @click="fecharModal" class="x">X</button>
      <h2>Como esta pessoa está falando sobre automutilação?</h2>
      <div class="atencao">
        <p><span class="mdi mdi-exclamation"></span></p>
        <p>Se hover perigo imediato, chame os serviços de emergência assim que possível.</p>
      </div>

      <ul class="parteDenuncia3">
        <li>
          <button @click="opcao('autoMutilacaoDenuncia')">
            Me preocupo que a pessoa esteja tentando se automutilar ou suicidar
          </button>
          <span class="mdi mdi-arrow-right"></span>
        </li>
        <li>
          <button @click="opcao('encorajando_Automultilacao')">
            Essa pessoa está encorajando outros a se automutilarem ou suicidarem
          </button>
          <span class="mdi mdi-arrow-right"></span>
        </li>
      </ul>

      <div class="enviar">
        <button @click="voltarPagSuiciAutoMulti">Voltar</button>
      </div>
    </div>
  </div>
  <!--Informações de identidade privada Página-->
  <div v-if="mostrarInfoPrivada" class="modal">
    <div>
      <button @click="fecharModal" class="x">X</button>
      <h2>Informação privada</h2>
      <p class="h2">Selecione os elementos que você quer denunciar no perfil deste usuário.</p>
      <ul class="opcoesDenuncia">
        <li>
          <div>
            <input type="checkbox" id="fotoRosto" v-model="fotoRosto" />
          </div>
          <div>
            <label for="fotoRosto">Foto do rosto</label>
          </div>
        </li>
        <li>
          <div>
            <input type="checkbox" id="fotoIntima" v-model="fotoIntima" />
          </div>
          <div>
            <label for="fotoIntima">Foto íntima, particular</label>
          </div>
        </li>
        <li>
          <div>
            <input type="checkbox" id="enderecoIP" v-model="endereco" />
          </div>
          <div>
            <label for="enderecoIP">Endereço IP</label>
          </div>
        </li>
        <li>
          <div>
            <input type="checkbox" id="nomeLegal" v-model="nomeLegal" />
          </div>
          <div>
            <label for="nomeLegal">Nome legal</label>
          </div>
        </li>
        <li>
          <div>
            <input type="checkbox" id="infoCartaoCredito" v-model="infoCartao" />
          </div>
          <div>
            <label for="infoCartaoCredito">Informações do cartão de crédito</label>
          </div>
        </li>
      </ul>
      <div class="enviar">
        <button @click="voltarPagInfoPrivada">Voltar</button>
        <button @click="abrirResumo">Próximo</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.infos {
  display: flex;
  gap: 9vw;
  margin: 0 5vw;
  margin-top: 5vw;
  padding-bottom: 5vw;
  border-bottom: solid 2px #d3d1d1;

  & .p1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 340px;
    width: 35%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    border-radius: 20px;

    & .superior {
      & ul {
        display: flex;
        list-style: none;
        padding: 0;

        & img {
          height: 215px;
          width: 220px;
          background-color: #1d2d51;
          border-radius: 120px;
          margin-right: 1vw;
        }

        & h1 {
          margin-top: 1.5vw;
          margin-bottom: 0vw;
          font-weight: bold;
          font-size: 30px;
          color: black;
        }

        & p {
          margin: 0.2vw 0 1.5vw 0;
          color: #cdcdcd;
        }

        & button {
          padding: 16px 15px 12px 15px;
          font-size: 15px;
          background-color: #1d2d51;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          display: block;
          margin: 0 auto;
          display: flex;
          gap: 8px;

          & span {
            font-size: 20px;
          }
        }
      }
    }

    & .inferior {
      display: flex;
      gap: 2vw;
      justify-content: center;

      & .num {
        font-size: 30px;
        font-weight: bold;
      }

      & div:first-of-type {
        margin-left: 2vw;
      }

      & div.meio {
        display: block;
        border-left: 1px solid #cdcdcd;
        border-right: 1px solid #cdcdcd;
      }

      & div.meio p {
        margin-left: 1.5vw;
        margin-right: 1.5vw;
      }

      & p {
        color: black;
        margin: 0;
      }
    }
  }

  & .p2 {
    & h2 {
      font-size: 25px;
      color: black;
      font-weight: bold;
      margin-bottom: 20px;
    }

    & p {
      color: black;
    }

    & p:not(p.off) {
      margin-bottom: 6px;
    }

    & p.off {
      margin-bottom: 35px;
    }

    & p:last-of-type {
      width: 500px;
    }

    & span {
      margin: 0 8px;
      font-size: 18px;
    }
  }
}

.avaliacao {
  margin: 0 5vw;
  margin-top: 5vw;
  border-bottom: solid 2px #d3d1d1;

  & h2 {
    font-size: 25px;
    color: black;
    font-weight: bold;
    margin-bottom: 20px;
  }

  & .carousel__wrapper {
    padding: 20px;
    width: 100%;
    height: 330px;
    display: block;

    & ul {
      display: flex;
      list-style: none;
      padding: 0;

      & img {
        margin-right: 20px;
      }

      & h2 {
        font-size: 20px;
        margin-top: 8px;
      }
    }

    & .textos_Inferiores {
      & p:first-of-type {
        margin-bottom: 10px;
      }

      & p:last-of-type {
        overflow: auto;
        max-height: 100px;
      }
    }
  }

  & .carousel__slide {
    display: block;
    min-width: 530px;
  }

  & .carousel__slide:not(:last-of-type) {
    padding: 0 40px;
    border-right: solid 2px #d3d1d1;
  }

  .carousel__slide:last-of-type {
    padding-left: 40px;
  }
}

.produto_Usuario {
  margin-bottom: 7vw;

  & h2 {
    margin: 2vw 5vw 0 5vw;
    font-size: 25px;
    color: black;
    font-weight: bold;
    margin-bottom: 20px;
  }
}

.carro3 h2.secundaria {
  display: block;
  /* garante que o width funcione */
  margin: 1vw auto;
  /* centraliza horizontalmente com auto */

  color: #cdcdcd;
  font-size: 20px;
  width: 30%;
}

div.produto {
  max-width: 18vw;
  /* largura de cada produto */
  font-size: 1.1rem;
  /* tamanho maior do texto */
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border: 1px solid #244e84;
  text-align: center;
}

.carousel2 {
  margin: 0 6vw 0 6vw;
}

div.produto img {
  width: 93%;
  position: relative;
  /* necessário para o botão ficar relativo à imagem */
  border-radius: 8px;
  height: 87%;
  object-fit: cover;
}

div.produto .like-btn {
  position: absolute;
  top: 1.3vw;
  right: 2.9vw;
  z-index: 10;
  /* garante que fique acima do carousel/imagem */
  background: #244e84;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

section.carro3 div.produto h1 {
  margin: 0 0 0 14px;
  color: black;
}

div.produto div.info {
  display: flex;
  justify-content: space-between;
  margin: 15px 15px 3px 14px;
}

div.produto button.alugar {
  width: 93%;
  height: 40px;
  background-color: #244e84;
  color: white;
  border: none;
  border-radius: 18px;
  margin-bottom: 10px;
  font-size: 1vw;
}

div.produto p span {
  color: #ffd700;
}

div.produto h1 {
  text-align: left;
  padding: 0 25px;
  display: block;
}

strong {
  padding-left: 10px;
}

.info p {
  padding-right: 10px;
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
  /* cantos arredondados */
  cursor: pointer;
  margin: 0 auto;
  /* centraliza horizontalmente */
  margin-top: 3vw;
}

/* QUARTOOOOO CARROSSELLLLLL */
.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

section.carro4 {
  display: flex;
  justify-content: space-between;
  margin: 5vw 3vw 0 0;
}

div.carouselDuo {
  max-width: 50%;
}

div.carouselDuo .produto .imagem {
  position: relative;
  /* faz o botão se posicionar sobre a imagem */
}

.like-btn2 {
  top: 2vw;
  /* ajuste próximo ao topo */
  right: 0.5vw;
  /* ajuste próximo à direita */
  z-index: 10;
  background: white;
  border: none;
  border-radius: 20px;
  padding: 0.5vw 1vw;
  display: flex;
  align-items: center;
  gap: 0.5vw;
  cursor: pointer;
  box-shadow: 0 0.2vw 0.5vw rgba(0, 0, 0, 0.2);
}

section.carro4 div.produto .like-btn2 {
  position: absolute;
  top: 1.8vw;
  right: 1.3vw;
  z-index: 10;
  background: #244e84;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.carousel__next,
.carousel__prev {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.carousel2:hover > .carousel > .carousel__next,
.carousel2:hover > .carousel > .carousel__prev,
.carousel__wrapper .carousel__next,
.carousel__wrapper .carousel__prev {
  opacity: 1;
  pointer-events: auto;
}

div.produto:hover .carousel__next,
div.produto:hover .carousel__prev,
div.produto .imagem:hover .carousel__next,
div.produto .imagem:hover .carousel__prev,
.carousel__icon {
  opacity: 1;
  pointer-events: auto;
}

.carousel4 {
  resize: horizontal;
  border: 2px dashed gray;
  overflow: auto;
}

section.carro4 div.esquerda {
  margin: 5vw 0 0 8vw;
}

section.carro4 div.esquerda img {
  height: 90%;
}

.denuncia {
  margin: 0;
  padding: 0;

  & button {
    padding: 15px 10px;
    font-size: 18px;
    background-color: #1d2d51;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    margin: 2vw 5vw 5vw 5vw;
  }

  & span {
    margin-right: 3px;
    font-size: 22px;
  }
}

.modal {
  background-color: #1d2d51;
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  & button.x {
    font-size: 20px;
    position: absolute;
    border: none;
    background-color: #1d2d51;
    color: white;
    cursor: pointer;
    right: 69.8vh;
    top: 17.6vh;
  }

  & h1 {
    font-size: 33px;
    margin: 0;
  }

  & p.h1 {
    margin: 10px 0 30px 0;
  }

  & p.h2 {
    margin: 10px 0 30px 0;
  }

  & h2 {
    font-size: 25px;
    margin-bottom: 10px;
    margin: 0;
  }

  & .opcoesDenuncia {
    padding: 0;
    & li {
      display: flex;
      margin-bottom: 30px;
      align-items: center;

      & input {
        transform: scale(2);
        margin-right: 20px;
      }

      & input[type='checkbox'] {
        -webkit-appearance: none;
        background-color: #1d2d51;
        margin-top: 1vh;
        width: 15px;
        height: 15px;
        border-radius: 3px;
        border: 1px solid rgb(110, 108, 108);
      }

      & input[type='checkbox']:checked {
        background-color: #386cbe;
      }

      & input[type='checkbox']:checked::after {
        content: '✔';
        color: white;
        position: absolute;
        left: 0.1vh;
        top: -0.1vh;
        font-size: 14px;
      }

      & label:first-child {
        font-size: 20px;
        display: flex;
      }
    }
  }
}

.modal > div {
  background: #1d2d51;
  border: #244e84 solid 0.1px;
  padding: 30px;
  padding-top: 50px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.enviar {
  & button {
    padding: 16px 15px 12px 15px;
    font-size: 17px;
    background-color: #1d2d51;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    display: block;
    margin: 0 auto;
    display: flex;
    gap: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  & button.ativo {
    background-color: #386cbe;
    /* azul mais vivo */
    cursor: pointer;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  }
}
//Botão de abrir denúncia
.denuncia {
  margin: 0;
  padding: 0;

  & button {
    padding: 15px 10px;
    font-size: 18px;
    background-color: #1d2d51;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    margin: 2vw 5vw 5vw 5vw;
  }

  & span {
    margin-right: 3px;
    font-size: 22px;
  }
}

.modal {
  background-color: #1d2d51;
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  & button.x {
    font-size: 20px;
    position: absolute;
    border: none;
    background-color: #1d2d51;
    color: white;
    cursor: pointer;
    right: 2vh;
    top: 2vh;
  }

  & h1 {
    font-size: 33px;
    margin: Envia 0;
  }

  & p.h1 {
    margin: 10px 0 80px 0;
  }

  & p.select {
    margin: 0;
    margin-bottom: 5px;
    font-weight: bold;
  }

  & .userDenuncia {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
    border: 1px solid #244e84;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 3vw;

    & img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }

    & h1 {
      font-size: 22px;
      margin: 0;
    }
  }

  & p.h2 {
    margin: 10px 0 30px 0;
  }

  & p.h3 {
    margin: 10px 0 40px 0;
  }

  & h2 {
    font-size: 25px;
    margin-bottom: 10px;
    margin: 0;
  }

  & .opcoesDenuncia {
    padding: 0;

    & li {
      display: flex;
      margin-bottom: 30px;
      align-items: center;

      & input {
        transform: scale(2);
        margin-right: 20px;
      }

      & input[type='checkbox'] {
        -webkit-appearance: none;
        background-color: #1d2d51;
        position: relative;
        margin-top: 1vh;
        width: 15px;
        height: 15px;
        border-radius: 3px;
        border: 1px solid rgb(110, 108, 108);
      }

      & input[type='checkbox']:checked {
        background-color: #386cbe;
      }

      & input[type='checkbox']:checked::after {
        content: '✔';
        color: white;
        position: absolute;
        left: 0.1vh;
        top: -0.387vh;
        font-size: 14px;
      }

      & label:first-child {
        font-size: 20px;
        display: flex;
      }
    }
  }

  & .atencao {
    border: #386cbe solid 0.1px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    & span {
      border: 1px solid #386cbe;
      color: #386cbe;
      border-radius: 50%;
      margin-right: 8px;
    }
    & p:not(:first-child) {
      margin: 0;
      padding: 10px 10px 10px 8px;
    }
    & p:first-child {
      padding-left: 10px;
    }
  }

  & .parteDenuncia3 {
    padding: 0;

    & li {
      display: flex;
      align-items: center;
      border: 1px solid #244e84;
      padding: 20px 15px;
      font-size: 18px;
      display: flex;
      justify-content: space-between;

      & button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        flex-grow: 1;
        text-align: left;
      }

      & span {
        font-size: 24px;
      }
    }

    & li:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    & li:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    & li:hover {
      background-color: #244e84;
    }
  }

  .parteDenuncia4 {
    & li:not(:last-child) {
      margin-bottom: 10px;
    }

    & li {
      list-style: disc;
      margin-bottom: 2vw;
    }

    & li::marker {
      color: #386cbe;
    }
  }

  & .enviar {
    display: flex;
    justify-content: space-between;
    border-top: #244e84 solid 0.1px;
    padding-top: 2vw;

    & button {
      padding: 16px 15px 12px 15px;
      font-size: 17px;
      background-color: #386cbe;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      width: 48%;
    }

    & .envioFinal {
      background-color: rgb(250, 46, 46);
    }
  }
}

.modal > div {
  background: #1d2d51;
  border: #244e84 solid 0.1px;
  padding: 30px;
  padding-top: 50px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  position: relative;
}

.proximaP {
  & button {
    padding: 16px 15px 12px 15px;
    font-size: 17px;
    background-color: #386cbe;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    display: block;
    margin: 0 auto;
    display: flex;
    gap: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
}
</style>
