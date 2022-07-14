<script setup lang="ts">
import { reactive, onMounted } from "vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import BaseCarousel from "@/components/BaseCarousel.vue";
import BaseCarouselItem from "@/components/BaseCarouselItem.vue";
import getDogs from "@/services/dogApi";

type carouselImage = {
  path: string;
  alt?: string;
};

const state = reactive({
  carouselStaticImages: [
    // [ ] rename path to src
    { path: "/images/1.jpg", alt: "aerial view island" },
    { path: "/images/2.jpg", alt: "annular eclipse sunset" },
    { path: "/images/3.jpg", alt: "top view container ship" },
    { path: "/images/4.jpg", alt: "Fanjing Stairs" },
    { path: "/images/5.jpg", alt: "meteor on sky" },
  ],
  carouselAsyncImages: [] as Array<carouselImage>,
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

onMounted(async () => {
  (await getDogs(5)).forEach((dog) => {
    state.carouselAsyncImages.push({ path: dog.message });
  });
});
</script>

<template>
  <main>
    <h2>ImageCarousel: 5 <em>static</em> images</h2>

    <ImageCarousel :images="state.carouselStaticImages" />

    <h2>
      ImageCarousel: 5 <em>async</em> images (calls
      <a href="https://dog.ceo/dog-api/" target="_blank">dog api</a>)
    </h2>

    <ImageCarousel :images="state.carouselAsyncImages" />

    <h2>BaseCarousel: Have full control over your own HTML</h2>

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
  width: min(100%, 48rem);
  margin-inline: auto;
  flex-direction: column;
  gap: 1rem;
  margin-block: 5rem;
  justify-content: center;
  min-height: 75vh;
  padding-inline: 0.5rem;
}
</style>
