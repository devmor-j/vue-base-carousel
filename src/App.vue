<script setup lang="ts">
import { reactive } from "vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import BaseCarousel from "./components/BaseCarousel.vue";
import BaseCarouselItem from "./components/BaseCarouselItem.vue";
import BaseImage from "./components/BaseImage.vue";

const state = reactive({
  carouselImages: [
    { path: "/images/1.jpg", alt: "aerial view island" },
    { path: "/images/2.jpg", alt: "annular eclipse sunset" },
    { path: "/images/3.jpg", alt: "top view container ship" },
    { path: "/images/4.jpg", alt: "Fanjing Stairs" },
    { path: "/images/5.jpg", alt: "meteor on sky" },
  ],
});
</script>

<template>
  <main>
    <!-- <ImageCarousel :images="state.images" /> -->

    <BaseCarousel
      v-slot="{ current }"
      :total-items="state.carouselImages.length"
    >
      <BaseCarouselItem
        v-for="(item, i) in state.carouselImages"
        :key="i"
        v-show="current === i"
        :aria-hidden="current !== i"
        :aria-label="`slide ${i + 1} of ${state.carouselImages.length}`"
      >
        <BaseImage :src="item.path" :alt="item.alt" />
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
