import './assets/main.css';
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'


import './assets/main.css';
import '@mdi/font/css/materialdesignicons.css';


const app = createApp(App)


app.use(createPinia())

app.mount('#app')
