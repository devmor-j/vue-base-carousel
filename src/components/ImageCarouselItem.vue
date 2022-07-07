<script setup lang="ts">
import BaseImage from "@/components/BaseImage.vue";
defineProps<{
  image: {
    path: string;
  };
}>();
</script>

<template>
  <BaseImage :src="image.path" :draggable="false"></BaseImage>
</template>

<style scoped></style>
