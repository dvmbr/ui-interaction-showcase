<script setup lang="ts">
import { ref } from "vue";

type Toast = { id: number; message: string };

const toasts = ref<Toast[]>([]);
let id = 0;

function push(message: string) {
  const toastId = ++id;
  toasts.value.push({ id: toastId, message });

  window.setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== toastId);
  }, 1400);
}

// expose for global use
defineExpose({ push });
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <div
      v-for="t in toasts"
      :key="t.id"
      class="rounded-md border border-border bg-bg-deep/80 px-3 py-2 text-sm text-text-main shadow-lg"
    >
      {{ t.message }}
    </div>
  </div>
</template>
