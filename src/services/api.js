import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: { 'Content-Type': 'application/json' }
});

// Adiciona token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor para lidar com 401 e renovar token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // evita loop infinito

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken
          });

          // salva o novo access token
          localStorage.setItem('access_token', res.data.access);

          // refaz a requisição original com o token novo
          originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (e) {
          console.error('Refresh token expirado ou inválido. Usuário precisa logar novamente.');
          // opcional: redirecionar para login
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
