<script setup lang="ts">
import BaseCarousel from "@/components/BaseCarousel.vue";
import ImageCarouselItem from "@/components/ImageCarouselItem.vue";

defineProps<{
  images: Array<{
    src: string;
    alt?: string;
  }>;
}>();
</script>

<template>
  <BaseCarousel v-slot="{ current }" :total-items="images.length">
    <ImageCarouselItem
      v-for="(image, i) in images"
      :key="image.src"
      :image="image"
      v-show="current === i"
    />
  </BaseCarousel>
</template>
