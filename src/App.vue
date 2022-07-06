<script setup lang="ts">
import { reactive } from "vue";
import BaseCarousel from "@/components/BaseCarousel.vue";

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
