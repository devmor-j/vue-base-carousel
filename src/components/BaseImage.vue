<script setup lang="ts">
defineProps<{
  src: string;
  alt?: string;
  draggable?: boolean;
}>();
</script>

<template>
  <div class="wrapper">
    <img :src="src" :alt="alt" :draggable="draggable" />
  </div>
</template>

<style scoped>
.wrapper {
  overflow: hidden;
}

img {
  max-width: 100%;
  transition-duration: var(--transition-duration);
  transition-property: transform;
}

img:hover {
  transform: scale(1.025);
}
</style>
