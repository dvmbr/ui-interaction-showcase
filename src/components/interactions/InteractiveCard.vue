<script setup lang="ts">
defineProps<{
  state?: "default" | "error" | "warning" | "success";
}>();
</script>

<template>
  <div
    :class="[
      'bg-bg-surface rounded-lg border p-4 transition duration-200 ease-ease-out',
      'hover:bg-bg-elevate hover:-translate-y-0.5 hover:shadow-lg',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',

      state === 'error' && 'border-error text-error',
      state === 'warning' && 'border-warning text-warning',
      state === 'success' && 'border-success text-success',
      (!state || state === 'default') && 'border-border text-text-main',
    ]"
    tabindex="0"
  >
    <h3 class="text-lg font-medium mb-2">Interactive Card</h3>

    <p
      :class="['text-sm', (!state || state === 'default') && 'text-text-muted']"
    >
      <span v-if="state === 'error'">Something went wrong.</span>
      <span v-else-if="state === 'warning'">Needs attention.</span>
      <span v-else-if="state === 'success'"
        >Action completed successfully.</span
      >
      <span v-else>Hover or focus to see interaction feedback.</span>
    </p>
  </div>
</template>
