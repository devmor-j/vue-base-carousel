<script setup lang="ts">
import BaseImage from "@/components/BaseImage.vue";
defineProps<{
  item: {
    path: string;
  };
}>();
</script>

<template>
  <BaseImage :src="item.path" :draggable="false"></BaseImage>
</template>

<style scoped></style>
