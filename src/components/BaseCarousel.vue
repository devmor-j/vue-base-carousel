<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  totalItems: number;
  cycle?: boolean;
  continuous?: boolean;
}>();

// enum item object, freezed with no prototype
const ITEM = Object.freeze(
  Object.assign(Object.create(null), {
    FirstItem: 0,
    LastItem: props.totalItems - 1,
  })
);

const state = reactive({
  currentItem: ITEM.FirstItem,
  cycleId: 0,
});

function changeItem(direction: "next" | "prev", step = 1) {
  if (direction === "next") {
    if (state.currentItem >= ITEM.LastItem) {
      // in last slide
      if (props.continuous === true) {
        state.currentItem = ITEM.FirstItem;
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
        state.currentItem = ITEM.LastItem;
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

const prevArrow = ref<HTMLButtonElement>();
const nextArrow = ref<HTMLButtonElement>();
const carousel = ref<HTMLDivElement>();

function onKeyDown(event: KeyboardEvent) {
  if (event.key === "ArrowRight") {
    nextArrow.value?.focus();
    changeItem("next");
    carousel.value?.focus();
  }

  if (event.key === "ArrowLeft") {
    prevArrow.value?.focus();
    changeItem("prev");
    carousel.value?.focus();
  }

  if (event.key === "Escape") {
    (event.target as HTMLDivElement).blur();
  }

  if (event.key === "f") {
    // when fullscreen mode is not available
    if (document?.fullscreenEnabled !== true) return;

    if ("requestFullscreen" in document.documentElement) {
      if (document.fullscreenElement === null) {
        carousel.value?.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else if ("webkitRequestFullscreen" in document.documentElement) {
      // "webkitRequestFullscreen" is to support safari browser
      // typescript warns that "webkitRequestFullscreen" not exists on "document"
      // to suppress that warning we define two types

      type RequestFullscreen = {
        webkitRequestFullscreen: typeof document.documentElement.requestFullscreen;
      };
      type ExitFullscreen = {
        webkitExitFullscreen: typeof document.exitFullscreen;
      };

      if (document.fullscreenElement === null) {
        (
          event.target as typeof event.target & RequestFullscreen
        ).webkitRequestFullscreen();
      } else {
        (document as typeof document & ExitFullscreen).webkitExitFullscreen();
      }
    }
  }
}
</script>

<template>
  <div
    class="carousel"
    @keydown="onKeyDown($event)"
    ref="carousel"
    tabindex="-1"
  >
    <slot :current="state.currentItem"></slot>
    <button @click="changeItem('prev')" ref="prevArrow" class="arrow prev">
      &#65513;
    </button>
    <button @click="changeItem('next')" ref="nextArrow" class="arrow next">
      &#65515;
    </button>
  </div>
</template>

<style scoped>
.carousel {
  --transition-duration: 0.2s;
  --carousel-outline-alpha: 0.15;
  max-width: min(100%, 40rem);
  margin: auto;
  position: relative;
  overflow: hidden;
  user-select: none;
  box-shadow: 0 0 18px rgb(0 0 0 / 0.25);
  transition-duration: var(--transition-duration);
  transition-property: transform;
}

.carousel:focus {
  outline: 2px solid rgb(255 255 255 / var(--carousel-outline-alpha));
  transform: scale(1.025);
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
