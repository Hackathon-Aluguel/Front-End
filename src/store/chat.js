import { defineStore } from 'pinia'
import chatService from '../services/chatService'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    currentChat: null,
  }),

  actions: {
    async loadMessages(chatroomName) {
      try {
        const response = await chatService.getMessages(chatroomName)
        this.messages = response.data
        this.currentChat = chatroomName
      } catch (err) {
        console.error('Erro ao carregar mensagens', err)
      }
    },

    async sendMessage(chatroomName, body) {
      try {
        const response = await chatService.sendMessage(chatroomName, body)
        this.messages.push(response.data)
      } catch (err) {
        console.error('Erro ao enviar mensagem', err)
      }
    }
  }
})
