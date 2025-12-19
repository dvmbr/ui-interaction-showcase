<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

function toggle() {
  emit("update:isOpen", !props.isOpen);
}
</script>

<template>
  <div class="rounded-lg border border-border bg-bg-surface">
    <button
      type="button"
      class="group flex w-full items-center justify-between px-4 py-3 text-left transition duration-200 ease-ease-out"
      :aria-expanded="isOpen"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="text-sm text-text-main">{{ title }}</span>
      <span
        class="text-xs transition-transform duration-200 ease-ease-out"
        :class="[
          isOpen ? 'rotate-180' : 'rotate-0',
          !isOpen && 'group-hover:translate-y-0.5',
        ]"
      >
        ▼
      </span>
    </button>

    <div
      class="overflow-hidden transition-[max-height,opacity] duration-200 ease-ease-out"
      :class="isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="px-4 py-3 text-sm text-text-muted">
        <slot />
      </div>
    </div>
  </div>
</template>
