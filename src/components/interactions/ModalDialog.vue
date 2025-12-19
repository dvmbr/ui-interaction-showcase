<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const props = defineProps<{
  modelValue: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function close() {
  emit("update:modelValue", false);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    emit("update:modelValue", false);
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
      @click.self="close()"
    >
      <div
        class="w-full max-w-md rounded-lg border border-border bg-bg-surface p-6"
        role="dialog"
        aria-modal="true"
      >
        <header class="mb-4">
          <h2 class="text-lg font-medium text-text-main">
            {{ title ?? "Modal Dialog" }}
          </h2>
        </header>

        <div class="text-sm text-text-muted">
          This modal demonstrates parent-controlled state and event-driven
          closing behavior.
        </div>

        <div class="mt-6 flex justify-end">
          <button
            class="rounded-md border border-border px-3 py-2 text-sm hover:bg-bg-elevate"
            @click="close()"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
