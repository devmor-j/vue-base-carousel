<script setup lang="ts">
import { reactive } from "vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import BaseCarousel from "./components/BaseCarousel.vue";
import BaseCarouselItem from "./components/BaseCarouselItem.vue";
import BaseImage from "./components/BaseImage.vue";

const state = reactive({
  images: [
    { path: "/images/1.jpg" },
    { path: "/images/2.jpg" },
    { path: "/images/3.jpg" },
    { path: "/images/4.jpg" },
    { path: "/images/5.jpg" },
  ],
});
</script>

<template>
  <main>
    <ImageCarousel :images="state.images"> </ImageCarousel>

    <BaseCarousel v-slot="{ current }" :total-items="state.images.length">
      <BaseCarouselItem v-for="(item, i) in state.images" :key="i">
        <BaseImage :src="item.path" v-show="current === i"></BaseImage>
      </BaseCarouselItem>
    </BaseCarousel>
  </main>
</template>

<style scoped>
@import "./assets/base.css";

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
