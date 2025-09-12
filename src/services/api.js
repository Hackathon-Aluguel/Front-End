import axios from 'axios'

// cria uma instância do axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json'
  },
  //withCredentials: true,
})

// adiciona o token em toda requisição automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
