<script setup lang="ts">
import { computed } from "vue";

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
    <h3 class="text-lg font-medium mb-2">Interactive Card</h3>

    <p :class="['text-sm', descriptionClass]">
      {{ descriptionText }}
    </p>
  </div>
</template>
