<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from "vue";
import useFullscreen from "@/composables/useFullscreen";

/* ====================================================== */
/*                          PROPS                         */
/* ====================================================== */

type Props = {
  totalItems: number;
  cycle?: boolean | number;
  continuous?: boolean;
  autofocus?: boolean;
  hideArrows?: boolean;
  transitionDuration?: string;
  maxWidth?: string;
};

const props = withDefaults(defineProps<Props>(), {
  cycle: false,
  continuous: true,
  transitionDuration: "0.2s",
  maxWidth: "40rem",
});

/* ====================================================== */
/*                          STATE                         */
/* ====================================================== */

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

/* ====================================================== */
/*               FEAT: Change Carousel Item               */
/* ====================================================== */

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

/* ====================================================== */
/*           FEAT: Cycle Through Carousel items           */
/* ====================================================== */

onMounted(() => {
  if (props.cycle !== false) {
    const isCycleNumber = typeof props.cycle === "number";
    if (isCycleNumber && props.cycle < 0) {
      console.warn(
        "on BaseCarousel Component: to set the cycle period, pass a positive number without 'ms' unit"
      );
    }

    const cycleAsNumber = Number(Math.abs(props.cycle as number));

    state.cycleId = setInterval(
      () => {
        changeItem("next");
      },
      isCycleNumber ? cycleAsNumber : 1000
    );
  }
});

onUnmounted(() => {
  clearInterval(state.cycleId);
});

/* ====================================================== */
/*        FEAT: Reference Elements To Control Focus       */
/* ====================================================== */

const prevArrowEl = ref<HTMLButtonElement>();
const nextArrowEl = ref<HTMLButtonElement>();
const carouselEl = ref<HTMLElement>();

/* ====================================================== */
/*          FEAT: Carousel Reactions To Keyboard          */
/* ====================================================== */

function onKeyDown(event: KeyboardEvent) {
  if (event.key === "ArrowRight") {
    nextArrowEl.value?.focus();
    changeItem("next");
    carouselEl.value?.focus();
  }

  if (event.key === "ArrowLeft") {
    prevArrowEl.value?.focus();
    changeItem("prev");
    carouselEl.value?.focus();
  }

  if (event.key === "Escape") {
    (event.target as HTMLElement).blur();
  }

  if (event.key === "f" && event.ctrlKey === false) {
    const { toggleFullscreen } = useFullscreen();
    toggleFullscreen(event, carouselEl.value as HTMLElement);
  }
}

/* ====================================================== */
/*     FEAT: Carousel Reactions To Mouse Double Click     */
/* ====================================================== */

function onDoubleClick(event: MouseEvent) {
  if (event.target === prevArrowEl.value || event.target === nextArrowEl.value)
    return;

  const { toggleFullscreen } = useFullscreen();
  toggleFullscreen(event, carouselEl.value as HTMLElement);
}

/* ====================================================== */
/*           FEAT: Carousel Can be Auto-focused           */
/* ====================================================== */

onMounted(() => {
  if (props.autofocus === true) {
    carouselEl.value?.focus();
  }
});
</script>

<template>
  <section
    class="carousel"
    @keydown="onKeyDown($event)"
    @dblclick.stop="onDoubleClick($event)"
    ref="carouselEl"
    tabindex="-1"
    aria-label="carousel"
    role="region"
  >
    <slot :current="state.currentItem"></slot>

    <button
      v-if="hideArrows === false"
      @click="changeItem('prev')"
      ref="prevArrowEl"
      class="arrow prev"
      aria-label="go to prev item"
    >
      &#65513;
    </button>

    <button
      v-if="hideArrows === false"
      @click="changeItem('next')"
      ref="nextArrowEl"
      class="arrow next"
      aria-label="go to next item"
    >
      &#65515;
    </button>
  </section>
</template>

<style scoped>
.carousel {
  --transition-duration: v-bind(props.transitionDuration);
  --carousel-max-width: v-bind(props.maxWidth);
  --carousel-outline-alpha: 0.25;
  max-width: min(100%, var(--carousel-max-width));
  margin: auto;
  position: relative;
  overflow: hidden;
  user-select: none;
  box-shadow: 0 0 18px rgb(0 0 0 / 0.25);
  transition-duration: var(--transition-duration);
  transition-property: transform;
}

.carousel:focus-within {
  outline: 2px solid rgb(255 255 255 / var(--carousel-outline-alpha));
  transform: scale(1.025);
}

@media (prefers-color-scheme: dark) {
  .carousel:fullscreen {
    color: white;
    background-color: black;
  }
}

@media (prefers-color-scheme: light) {
  .carousel:fullscreen {
    color: black;
    background-color: white;
  }
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
