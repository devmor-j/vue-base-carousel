<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <transition name="fade" mode="out-in" appear>
      <slot></slot>
    </transition>
  </div>
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
  transform: translateX(2.5%);
}
</style>
