<script setup lang="ts">
import BaseImage from "@/components/BaseImage.vue";
defineProps<{
  image: {
    path: string;
  };
}>();
</script>

<template>
  <transition name="fade" mode="out-in" appear>
    <BaseImage :src="image.path" :draggable="false"></BaseImage>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: var(--transition-duration);
  transition-property: opacity, transform;
}

.fade-leave-active {
  position: absolute;
  inset: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(2.5%);
}
</style>
