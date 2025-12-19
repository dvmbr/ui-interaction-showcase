<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);

function open() {
  isOpen.value = true;
}
function close() {
  isOpen.value = false;
}
</script>

<template>
  <span
    class="relative inline-flex"
    @mouseenter="open"
    @mouseleave="close"
    @focusin="open"
    @focusout="close"
  >
    <!-- trigger -->
    <slot name="trigger" />

    <!-- tooltip -->
    <transition
      enter-active-class="transition duration-150 ease-ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-ease-out"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 rounded-md border border-border bg-bg-surface p-4 text-xs text-text-main shadow-lg"
        role="tooltip"
      >
        <slot />
      </div>
    </transition>
  </span>
</template>
