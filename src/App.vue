<script setup lang="ts">
import { reactive } from "vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import BaseCarousel from "./components/BaseCarousel.vue";
import BaseCarouselItem from "./components/BaseCarouselItem.vue";
import BaseImage from "./components/BaseImage.vue";

const state = reactive({
  images: [
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

    <BaseCarousel v-slot="{ current }" :total-items="state.images.length">
      <BaseCarouselItem
        v-for="(item, i) in state.images"
        :key="i"
        :aria-label="`slide ${i + 1} of ${state.images.length}`"
        :aria-hidden="current !== i"
      >
        <BaseImage :src="item.path" :alt="item.alt" v-show="current === i" />
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
