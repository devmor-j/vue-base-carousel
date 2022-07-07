<script setup lang="ts"></script>

<template>
  <transition name="fade" mode="out-in" appear>
    <div class="wrapper">
      <slot></slot>
    </div>
  </transition>
</template>

<style scoped>
.wrapper {
  width: 100%;
  overflow: hidden;
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
