import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { user as globalUser } from '@/stores/user.js'

import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)

// Reconstrói globalUser ao iniciar a aplicação
const storedEmail = localStorage.getItem('globalUser_email')
const storedAvatar = localStorage.getItem('globalUser_avatar')

if (storedEmail) {
  globalUser.value = {
    email: storedEmail,
    avatar: storedAvatar || '/images/avatar.png'
  }
}

app.mount('#app')
