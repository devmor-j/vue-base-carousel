<script setup lang="ts">
import { reactive } from "vue";
import BaseImage from "@/components/BaseImage.vue";

const state = reactive({
  images: [
    { path: "/images/1.jpg" },
    { path: "/images/2.jpg" },
    { path: "/images/3.jpg" },
    { path: "/images/4.jpg" },
    { path: "/images/5.jpg" },
  ],
  current: 0,
});

function changeItem(direction: "next" | "prev", step = 1) {
  if (direction === "next") {
    if (state.current >= state.images.length - 1) return;
    state.current += step;
  } else if (direction === "prev") {
    if (state.current <= 0) return;
    state.current -= step;
  }
}
</script>

<template>
  <h2>{{ state.current }}</h2>
  <main>
    <div class="carousel">
      <div v-for="(image, i) in state.images" :key="image.path">
        <transition name="fade" mode="out-in" appear>
          <BaseImage
            :src="image.path"
            :draggable="false"
            v-show="state.current === i"
          ></BaseImage>
        </transition>
      </div>

      <button @click="changeItem('prev')" class="arrow prev">&#65513;</button>
      <button @click="changeItem('next')" class="arrow next">&#65515;</button>
    </div>
  </main>
</template>

<style scoped>
@import "./assets/base.css";

main {
  display: flex;
  justify-content: center;
}

.carousel {
  max-width: min(100%, 40rem);
  position: relative;
  overflow: hidden;
}

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
