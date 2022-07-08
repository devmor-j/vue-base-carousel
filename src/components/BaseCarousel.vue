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
  fullscreenPadding?: boolean;
  transitionDuration?: string;
  maxWidth?: string;
  prevButton?: string;
  nextButton?: string;
  dotButton?: string;
  hideDots?: boolean;
  overlayDots?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  cycle: false,
  continuous: true,
  transitionDuration: "0.2s",
  maxWidth: "40rem",
  prevButton: "&#65513;",
  nextButton: "&#65515;",
  dotButton: "&#149;",
  overlayDots: false,
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

const carouselEl = ref<HTMLElement>();
const prevArrowEl = ref<HTMLButtonElement>();
const nextArrowEl = ref<HTMLButtonElement>();
const paginationEl = ref<HTMLElement>();

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
  // no fullscreen when double click on next and prev buttons or pagination's
  if (
    event.target === prevArrowEl.value ||
    event.target === nextArrowEl.value ||
    event.composedPath()[1] === paginationEl.value
  )
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

/* ====================================================== */
/*    FEAT: Pagination Dots to Navigate Specific Items    */
/* ====================================================== */

function onDotClick(index: number): void {
  // if already there, do nothing
  if (index === state.currentItem) return;

  // find direction and calculate step size
  if (index > state.currentItem) {
    changeItem("next", index - state.currentItem);
    return;
  }
  if (index < state.currentItem) {
    changeItem("prev", state.currentItem - index);
    return;
  }
}
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
      v-html="props.prevButton"
    ></button>

    <button
      v-if="hideArrows === false"
      @click="changeItem('next')"
      ref="nextArrowEl"
      class="arrow next"
      aria-label="go to next item"
      v-html="props.nextButton"
    ></button>

    <div class="pagination" ref="paginationEl" v-if="hideDots === false">
      <button
        v-for="(_, i) in props.totalItems"
        :key="`pagination-dot-${i}`"
        @click="onDotClick(i)"
        v-html="props.dotButton"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.carousel {
  --transition-duration: v-bind(props.transitionDuration);
  --carousel-max-width: v-bind(props.maxWidth);
  --carousel-outline-alpha: 0.25;
  --arrow-font-size: calc(1.75rem + 0.5vw);
  --arrow-padding-inline: calc(1rem + 1vw);
  max-width: min(100%, var(--carousel-max-width));
  margin-inline: auto;
  position: relative;
  overflow: hidden;
  user-select: none;
  box-shadow: 0 0 18px rgb(0 0 0 / 0.25);
  transition-duration: var(--transition-duration);
  transition-property: transform;
  padding-block-end: v-bind(
    props.overlayDots===false ? "calc(2rem + 2ex + 2vh + 2px)": "unset"
  );
}

.carousel:fullscreen {
  /* padding-inline: calc(1rem + 1.05 * (2px + var(--arrow-font-size) + var(--arrow-padding-inline))); */
  padding-inline: v-bind(
    props.fullscreenPadding===true ?
      "calc(1rem + 1.05 * (2px + var(--arrow-font-size) + var(--arrow-padding-inline)))":
      "unset"
  );
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
  --arrow-background-alpha: 0.2;
  --arrow-color-alpha: 0.5;
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
    255 255 255 / min(1, calc(1.5 * var(--arrow-background-alpha)))
  );
  color: rgb(0 0 0 / min(1, calc(1.5 * var(--arrow-color-alpha))));
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
  background: rgb(0 0 0 / min(1, calc(1.5 * var(--arrow-background-alpha))));
  color: rgb(255 255 255 / min(1, calc(1.5 * var(--arrow-color-alpha))));
}

.carousel:hover:not(:fullscreen) .arrow {
  opacity: 1;
}

.carousel:fullscreen .arrow:hover {
  opacity: 1;
}

@media (prefers-color-scheme: dark) {
  .prev {
    background: linear-gradient(
      to left,
      transparent,
      rgb(255 255 255 / var(--arrow-background-alpha))
    );
  }

  .next {
    background: linear-gradient(
      to right,
      transparent,
      rgb(255 255 255 / var(--arrow-background-alpha))
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

  .arrow:active {
    background: rgb(
      255 255 255 / min(1, calc(1.5 * var(--arrow-background-alpha)))
    );
    color: rgb(0 0 0 / min(1, calc(1.5 * var(--arrow-color-alpha))));
  }
}

.pagination {
  --dot-font-size: calc(1.75rem + 0.5vw);
  --dot-color-alpha: 0.5;
  color: rgb(255 255 255 / var(--dot-color-alpha));
  /* border: 2px solid red; */
  max-width: fit-content;
  margin-inline: auto;
  padding-block: 0.5rem;
  padding-inline: 0.5rem;
  border-radius: 100vmax;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

.pagination > button {
  font-size: var(--dot-font-size);
  cursor: pointer;
  border: none;
  border-radius: 100vmax;
  line-height: 1;
  min-width: calc(1ex + 1.25rem);
  margin: calc(0.25rem + 0.25vw);
  padding: 0.125rem;
  background: radial-gradient(black, transparent 25%);
  color: inherit;
  transition-duration: var(--transition-duration);
  transition-property: transform, background, opacity;
  opacity: 0;
  user-select: none;
}

.carousel:hover:not(:fullscreen) .pagination > button {
  opacity: 1;
}

.carousel:fullscreen .pagination {
  padding-block: 2rem;
}

.pagination:focus-within > button {
  opacity: 1;
}

.pagination:hover > button {
  opacity: 1;
}

.pagination > button:active {
  background: radial-gradient(white, transparent 25%);
  transform: scale(2);
}
</style>
