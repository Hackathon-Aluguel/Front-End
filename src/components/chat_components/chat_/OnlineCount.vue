<template>
  <div class="online-count">
    <span>{{ onlineCount }}</span>
    <div :class="{'green-dot': onlineCount>0, 'gray-dot': onlineCount===0}"></div>
  </div>
</template>

<script setup>
defineProps({
  onlineCount: { type: Number, default: 0 }
})
</script>

<style scoped>
.online-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
}
.green-dot, .gray-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.green-dot { background-color: #22c55e; }
.gray-dot { background-color: #6b7280; }
</style>



