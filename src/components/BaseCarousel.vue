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
  --arrow-font-size: calc(1.75rem + 0.5vw);
  --arrow-background-alpha: 0.25;
  --arrow-color-alpha: 0.5;
  --arrow-padding-inline: calc(1rem + 1vw);
  user-select: none;
  font-size: var(--arrow-font-size);
  position: absolute;
  color: rgb(255 255 255 / var(--arrow-color-alpha));
  top: 0;
  bottom: 0;
  border: none;
  padding-inline: var(--arrow-padding-inline);
  opacity: 0;
  transition-duration: calc(1.5 * var(--transition-duration));
  transition-property: opacity, background, color, font-size;
}

.prev {
  left: 0;
  background: linear-gradient(
    to left,
    transparent,
    rgb(0 0 0 / var(--arrow-background-alpha))
  );
}

.next {
  right: 0;
  background: linear-gradient(
    to right,
    transparent,
    rgb(0 0 0 / var(--arrow-background-alpha))
  );
}

.arrow:focus,
.arrow:focus-within {
  opacity: 1;
  font-size: calc(1.5 * var(--arrow-font-size));
  background-color: rgb(
    0 0 0 / min(1, calc(1.5 * var(--arrow-background-alpha)))
  );
  color: rgb(255 255 255 / min(1, calc(1.5 * var(--arrow-color-alpha))));
}

.next.arrow:focus,
.next.arrow:focus-within {
  border-inline-end: 1px dashed rgb(255 255 255 / var(--arrow-color-alpha));
}

.prev.arrow:focus,
.prev.arrow:focus-within {
  border-inline-start: 1px dashed rgb(255 255 255 / var(--arrow-color-alpha));
}

.arrow:active {
  background: rgb(
    255 255 255 / min(1, calc(1.5 * var(--arrow-background-alpha)))
  );
  color: rgb(0 0 0 / min(1, calc(1.5 * var(--arrow-color-alpha))));
}

.carousel:hover .arrow {
  opacity: 1;
}
</style>
