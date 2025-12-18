<script setup lang="ts">
import { computed } from "vue";
import { useInteractiveCard } from "./useInteractiveCard";
import { useToast } from "../../composables/useToast";

type CardState = "default" | "error" | "warning" | "success";

const props = defineProps<{
  state?: CardState;
}>();

const normalizedState = computed<CardState>(() => props.state ?? "default");
const { showToast } = useToast();

const {
  actionButtonClass,
  descriptionClass,
  descriptionText,
  variantClass,
  actionLabel,
  isPressed,
  isLoading,
  onDown,
  onUp,
  runAction,
} = useInteractiveCard({ state: normalizedState, showToast });

const emit = defineEmits<{
  (e: "action", payload: { state: CardState; intent: "run" }): void;
}>();

async function handleActionClick() {
  await runAction();
  emit("action", { state: normalizedState.value, intent: "run" });
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
        @click="handleActionClick"
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
