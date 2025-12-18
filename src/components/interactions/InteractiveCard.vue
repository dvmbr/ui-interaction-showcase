<script setup lang="ts">
import { computed, ref } from "vue";
import { inject } from "vue";

type CardState = "default" | "error" | "warning" | "success";

const props = defineProps<{
  state?: CardState;
}>();

const normalizedState = computed<CardState>(() => props.state ?? "default");

const variantClass = computed(() => {
  switch (normalizedState.value) {
    case "error":
      return "border-error text-error";
    case "warning":
      return "border-warning text-warning";
    case "success":
      return "border-success text-success";
    default:
      return "border-border text-text-main";
  }
});

const descriptionClass = computed(() => {
  return normalizedState.value === "default" ? "text-text-muted" : "";
});

const descriptionText = computed(() => {
  switch (normalizedState.value) {
    case "error":
      return "Something went wrong.";
    case "warning":
      return "Needs attention.";
    case "success":
      return "Action completed successfully.";
    default:
      return "Hover or focus to see interaction feedback.";
  }
});

/* 
- Pressed feedback for "Action" button
- Pointer events ensure consistent behavior across mouse/touch
*/
const isPressed = ref(false);

function onDown() {
  isPressed.value = true;
}

function onUp() {
  isPressed.value = false;
}

const actionLabel = computed(() => {
  switch (normalizedState.value) {
    case "error":
      return "Retry";
    case "warning":
      return "Review";
    case "success":
      return "Done";
    default:
      return "Action";
  }
});

const actionButtonClass = computed(() => {
  switch (normalizedState.value) {
    case "error":
      return "border-error/40 hover:border-error/70";
    case "warning":
      return "border-warning/40 hover:border-warning/70";
    case "success":
      return "border-success/40 hover:border-success/70";
    default:
      return "border-border hover:border-secondary/60";
  }
});

const toast = inject<(msg: string) => void>("toast");

function onActionClick() {
  switch (normalizedState.value) {
    case "error":
      toast?.("Retry triggered.");
      break;
    case "warning":
      toast?.("Review opened.");
      break;
    case "success":
      toast?.("Done.");
      break;
    default:
      toast?.("Action triggered.");
      break;
  }
}
const isLoading = ref(false);

async function simulateAsync() {
  isLoading.value = true;

  try {
    await new Promise<void>((resolve) => window.setTimeout(resolve, 800));

    // success toast (state에 맞게 메시지 유지)
    onActionClick();
  } finally {
    isLoading.value = false;
    onUp();
  }
}
</script>

<template>
  <div
    :class="[
      'bg-bg-surface rounded-lg border p-4 transition duration-200 ease-ease-out',
      'hover:bg-bg-elevate hover:-translate-y-0.5 hover:shadow-lg',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
      variantClass,
    ]"
    tabindex="0"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <h3 class="text-lg font-medium mb-1">Interactive Card</h3>
        <p :class="['text-sm', descriptionClass]">
          {{ descriptionText }}
        </p>
      </div>

      <button
        type="button"
        :class="[
          'shrink-0 rounded-md border px-3 py-2 text-sm transition duration-200 ease-ease-out',
          'bg-bg-deep/40 hover:bg-bg-deep/60',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
          'disabled:opacity-60 disabled:pointer-events-none',
          actionButtonClass,
          isPressed && 'scale-[0.98]',
        ]"
        :disabled="isLoading"
        @pointerdown="onDown"
        @pointerup="onUp"
        @pointercancel="onUp"
        @blur="onUp"
        @click="simulateAsync"
      >
        <span v-if="isLoading" class="inline-flex items-center gap-2">
          <span
            class="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          />
          Loading
        </span>
        <span v-else>
          {{ actionLabel }}
        </span>
      </button>
    </div>
  </div>
</template>
