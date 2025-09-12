import { defineStore } from 'pinia'
import authService from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(username, password) {
      const response = await authService.login(username, password)
      this.token = response.token
      localStorage.setItem('token', response.token)
      this.user = response.user
    },

    async register(username, password) {
      const response = await authService.register(username, password)
      this.token = response.token
      localStorage.setItem('token', response.token)
      this.user = response.user
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
