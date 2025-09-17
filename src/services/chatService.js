import api from './api'

export default {
  getMessages(chatroomName) {
    return api.get(`/api/chat/${chatroomName}/messages/`)
  },

  sendMessage(chatroomName, body) {
    return api.post(`/api/chat/${chatroomName}/send/`, { body })
  },

  uploadFile(chatroomName, file) {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(`/api/chat/${chatroomName}/upload/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

