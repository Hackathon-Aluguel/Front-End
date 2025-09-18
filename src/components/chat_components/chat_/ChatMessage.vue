<template>
  <li :class="{'mine': isMine}">
    <div class="message-container">
      <div v-if="isMine" class="message mine">
        <MessageContent :message="message" />
      </div>
      <div v-else class="message other">
        <div class="author-avatar">
          <img :src="message.author.avatar" alt="avatar"/>
        </div>
        <MessageContent :message="message" />
        <div class="author-info">
          <span class="name">{{ message.author.name }}</span>
          <span class="username">@{{ message.author.username }}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import MessageContent from './MessageContent.vue'

defineProps({
  message: { type: Object, required: true },
  currentUser: { type: String, required: true }
})

const isMine = computed(() => message.author.username === currentUser)
</script>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
.message.mine {
  background-color: #d1ffd1;
  text-align: right;
  padding: 8px;
  border-radius: 6px;
  max-width: 75%;
  margin-left: auto;
}
.message.other {
  background-color: #f1f1f1;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  gap: 8px;
  max-width: 75%;
}
.author-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.author-info {
  font-size: 0.8rem;
  color: #555;
}
.name { font-weight: bold; }
.username { margin-left: 4px; }
</style>



