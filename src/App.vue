<script setup lang="ts">
import { reactive } from "vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import BaseCarousel from "./components/BaseCarousel.vue";
import BaseCarouselItem from "./components/BaseCarouselItem.vue";
// import BaseImage from "./components/BaseImage.vue";

const state = reactive({
  carouselImages: [
    // [ ] rename path to src
    { path: "/images/1.jpg", alt: "aerial view island" },
    { path: "/images/2.jpg", alt: "annular eclipse sunset" },
    { path: "/images/3.jpg", alt: "top view container ship" },
    { path: "/images/4.jpg", alt: "Fanjing Stairs" },
    { path: "/images/5.jpg", alt: "meteor on sky" },
  ],
  carouselContent: [
    {
      heading: "Heading",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, perferendis?",
      button: "Button",
    },
    {
      heading: "Heading",
      paragraph:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt pariatur magnam molestiae?",
      button: "Button",
    },
    {
      heading: "Heading",
      paragraph:
        "Dolorem placeat fugiat reprehenderit earum praesentium porro, ipsam nulla similique.",
      button: "Button",
    },
    {
      heading: "Heading",
      paragraph:
        "Tempora tenetur eligendi consectetur architecto quas nihil, dolorum itaque aperiam.",
      button: "Button",
    },
    {
      heading: "Heading",
      paragraph:
        "Cumque, impedit? Recusandae distinctio et cumque laudantium quo quasi maiores.",
      button: "Button",
    },
  ],
});
</script>

<template>
  <main>
    <ImageCarousel :images="state.carouselImages" />

    <BaseCarousel
      v-slot="{ current }"
      :total-items="state.carouselContent.length"
      :fullscreen-padding="true"
      autofocus
    >
      <BaseCarouselItem
        v-for="(item, i) in state.carouselContent"
        :key="`base-carousel-item-${i}`"
        v-show="current === i"
        :aria-hidden="current !== i"
        :aria-label="`slide ${i + 1} of ${state.carouselContent.length}`"
        padding="1rem"
      >
        <h2>{{ item.heading }} {{ i + 1 }}</h2>
        <p>{{ item.paragraph }}</p>
        <button>{{ item.button }} {{ i + 1 }}</button>
      </BaseCarouselItem>
    </BaseCarousel>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
  min-height: 75vh;
  padding-inline: 0.5rem;
}
</style>
