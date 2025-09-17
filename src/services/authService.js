import api from './api'

export default {
  async login(username, password) {
    const response = await api.post('/api/login/', { username, password })
    return response.data
  },

  async register(username, password) {
    const response = await api.post('/api/register/', { username, password })
    return response.data
  },
}
