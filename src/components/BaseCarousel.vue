<script setup lang="ts">
import { reactive } from "vue";
import CarouselItem from "@/components/CarouselItem.vue";

const state = reactive({
  current: 0,
});

const props = defineProps<{
  items: Array<{
    path: string;
  }>;
}>();

function changeItem(direction: "next" | "prev", step = 1) {
  if (direction === "next") {
    if (state.current >= props.items.length - 1) return;
    state.current += step;
  } else if (direction === "prev") {
    if (state.current <= 0) return;
    state.current -= step;
  }
}
</script>

<template>
  <div class="carousel">
    <div v-for="(item, i) in items" :key="item.path">
      <transition name="fade" mode="out-in" appear>
        <CarouselItem :item="item" v-show="state.current === i"></CarouselItem>
      </transition>
    </div>
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
