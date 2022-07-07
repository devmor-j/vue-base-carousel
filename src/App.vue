<script setup lang="ts">
import { reactive } from "vue";
import BaseCarousel from "@/components/BaseCarousel.vue";
import SlotCarousel from "./components/SlotCarousel.vue";
import SlotCarouselItem from "./components/SlotCarouselItem.vue";
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
    <BaseCarousel :items="state.images"> </BaseCarousel>

    <SlotCarousel v-slot="{ current }" :total-items="state.images.length - 1">
      <SlotCarouselItem v-for="(item, i) in state.images" :key="i">
        <BaseImage :src="item.path" v-show="current === i"></BaseImage>
      </SlotCarouselItem>
    </SlotCarousel>
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
