import { createRouter, createWebHistory } from 'vue-router'

// Páginas principais
import Home from '@/components/HomeComponent.vue'
import Login from '@/components/LoginComponent.vue'
import Signup from '@/components/SignupComponent.vue'
import Produto from '@/components/ProdutoComponent.vue'
import MeusProdutos from '@/components/ListarProdutoComponent.vue'
import Perfil from '@/components/PerfilComponent.vue'
import Mapa from '@/components/MapaComponent.vue'
import Carrinho from '@/components/CarrinhoComponent.vue'
import Cadastrar from '@/components/CadastrarProdutoComponent.vue'
// Módulo Chat
import Start from '@/views/Start.vue'

// Perfil
import Profile from '@/views/Profile.vue'
import ProfileEdit from '@/views/ProfileEdit.vue'
import ProfileSettings from '@/views/ProfileSettings.vue'

// Erros
import NotFound from '@/views/NotFound.vue'

//Forgot Password e Reset Password
import ForgotPassword from '@/components/ForgotPassword.vue'
import ResetPassword from '@/components/ResetPassword.vue'

const routes = [
  // Home principal do site
  {
    path: '/',
    name: 'home',
    component: Home,
  },

  // Autenticação
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Signup,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
  },
   {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
  },
  {
    path: '/produto/:id',
    name: 'Produto',
    component: Produto,
    props: true
  },
  {
    path: '/perfil/:id',
    name: 'perfil',
    component: Perfil,
  },
  {
    path: '/mapa',
    name: 'mapa',
    component: Mapa,
  },
  {
    path: '/carrinho',
    name: 'carrinho',
    component: Carrinho,
  },
  {
    path: '/meusprodutos',
    name: 'meusprodutos',
    component: MeusProdutos,
  },
  {
    path: '/cadastrar',
    name: 'cadastrar',
    component: Cadastrar,
  },
  // Chat
  {
    path: '/chat',
    name: 'chat-start',
    component: Start,
  },
  {
    path: '/chat/:chatroomName',
    name: 'chat-room',
    component: () => import('@/views/Chat.vue'),
    props: true,
  },

  // Perfil e configurações
  {
    path: '/profile/:username',
    name: 'profile',
    component: Profile,
    props: true,
  },
  {
    path: '/profile/:username/edit',
    name: 'profile-edit',
    component: ProfileEdit,
  },
  {
    path: '/settings',
    name: 'profile-settings',
    component: ProfileSettings,
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
  },
  {
    path: '/social/callback',
    name: 'SocialCallback',
    component: () => import('@/views/SocialCallback.vue'),
  }

  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
