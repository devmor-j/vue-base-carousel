<script setup lang="ts">
type Props = {
  src: string;
  alt?: string;
  draggable?: boolean;
  width?: string; // ex: "unset", "50%", "100%", "100vw"
};

const props = withDefaults(defineProps<Props>(), {
  width: "100%",
});
</script>

<template>
  <div class="wrapper">
    <img :src="src" :alt="alt" :draggable="draggable" />
  </div>
</template>

<style scoped>
.wrapper {
  overflow: hidden;
}

img {
  width: v-bind(props.width);
  max-width: 100%;
  transition-duration: var(--transition-duration);
  transition-property: transform;
  display: block;
  max-height: 100vh;
  margin-inline: auto;
  object-fit: contain;
}

img:hover {
  transform: scale(1.025);
}
</style>
