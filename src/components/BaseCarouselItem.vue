<script setup lang="ts">
// [ ] add padding prop for ImageCarouselItem
type Props = {
  padding?: string;
};

const props = withDefaults(defineProps<Props>(), {
  padding: "0rem",
});
</script>

<template>
  <transition name="fade" mode="out-in" appear>
    <div class="wrapper">
      <slot></slot>
    </div>
  </transition>
</template>

<style scoped>
.wrapper {
  --item-padding: v-bind(props.padding ?? "unset");
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: var(--item-padding);
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
  /* transform: translateX(2.5%); */
  /* transform: scale(0.975); */
  transform: scale(1.025);
}
</style>
