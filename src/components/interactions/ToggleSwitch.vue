<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  label?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function toggle() {
  emit("update:modelValue", !props.modelValue);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggle();
  }
}
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 rounded-lg border border-border bg-bg-surface p-4"
  >
    <div class="min-w-0">
      <p class="text-sm text-text-muted">
        {{ label ?? "Toggle" }}
      </p>
      <p class="mt-1 text-base text-text-main">
        {{ modelValue ? "On" : "Off" }}
      </p>
    </div>

    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :class="[
        'relative h-8 w-14 rounded-full border transition duration-200 ease-ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
        modelValue
          ? 'border-success bg-success/20'
          : 'border-border bg-bg-deep/40',
      ]"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span
        :class="[
          'absolute top-1/2 left-1/2 -translate-y-1/2 h-6 w-6 rounded-full transition duration-200 ease-ease-out',
          modelValue
            ? 'translate-x-0 bg-success'
            : '-translate-x-full bg-text-main',
        ]"
      />
    </button>
  </div>
</template>
