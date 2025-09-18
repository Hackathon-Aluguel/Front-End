<script setup>
import ChatMessage from './ChatMessage.vue';

defineProps({
  message: { type: Object, required: true }
})
</script>


<template>
  <div>
    <span v-if="message.body"><ChatMessage /> </span>
    <template v-else-if="message.file">
      <img v-if="message.is_image" :src="message.file" class="image-msg" />
      <a v-else :href="message.file" download>{{ message.filename }}</a>
    </template>
  </div>
</template>



<style scoped>
.image-msg {
  max-width: 288px;
  min-width: 32px;
}
a {
  font-style: italic;
  text-decoration: underline;
  cursor: pointer;
}
</style>
