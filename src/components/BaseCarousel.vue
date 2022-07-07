<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  totalItems: number;
}>();

const state = reactive({
  current: 0,
});

function changeItem(direction: "next" | "prev", step = 1) {
  if (direction === "next") {
    if (state.current >= props.totalItems - 1) return;
    state.current += step;
  } else if (direction === "prev") {
    if (state.current <= 0) return;
    state.current -= step;
  }
}
</script>

<template>
  <div class="carousel">
    <slot :current="state.current"></slot>
    <button @click="changeItem('prev')" class="arrow prev">&#65513;</button>
    <button @click="changeItem('next')" class="arrow next">&#65515;</button>
  </div>
</template>

<style scoped>
.carousel {
  --transition-duration: 0.2s;
  max-width: min(100%, 40rem);
  margin: auto;
  position: relative;
  overflow: hidden;
  user-select: none;
}

.arrow {
  user-select: none;
  font-size: 2rem;
}
</style>
