<script setup lang="ts">
import Tooltip from "../components/interactions/Tooltip.vue";
</script>

<template>
  <div
    class="col-span-12 md:col-span-6 border border-border p-4 rounded-lg mb-4"
  >
    <div class="h-full flex items-center justify-center gap-3">
      <Tooltip>
        <template #trigger>
          <button
            class="rounded-md border border-border px-3 py-2 text-sm hover:bg-bg-elevate"
          >
            Hover me
          </button>
        </template>

        Tooltip message
      </Tooltip>
    </div>
  </div>
</template>
