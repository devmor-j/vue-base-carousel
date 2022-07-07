<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  totalItems: number;
  cycle?: boolean;
  continuous?: boolean;
}>();

const ITEM = Object.freeze({
  firstItem: 0,
  lastItem: props.totalItems - 1,
});

const state = reactive({
  currentItem: ITEM.firstItem,
  cycleId: 0,
});

function changeItem(direction: "next" | "prev", step = 1) {
  if (direction === "next") {
    if (state.currentItem >= ITEM.lastItem) {
      // in last slide
      if (props.continuous === true) {
        state.currentItem = ITEM.firstItem;
      }
      return;
    }

    // not in last slide
    state.currentItem += step;

    return;
  }

  if (direction === "prev") {
    if (state.currentItem <= 0) {
      // in first slide
      if (props.continuous === true) {
        state.currentItem = ITEM.lastItem;
      }
      return;
    }

    // not in first slide
    state.currentItem -= step;

    return;
  }
}

onMounted(() => {
  if (props.cycle === true) {
    state.cycleId = setInterval(() => {
      changeItem("next");
    }, 500);
  }
});

onUnmounted(() => {
  clearInterval(state.cycleId);
});
</script>

<template>
  <div class="carousel">
    <slot :current="state.currentItem"></slot>
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
