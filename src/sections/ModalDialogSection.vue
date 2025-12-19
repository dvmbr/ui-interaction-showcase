<script setup lang="ts">
import { ref } from "vue";
import ModalDialog from "../components/interactions/ModalDialog.vue";
const isModalOpen = ref(false);
</script>
<template>
  <div class="col-span-12 md:col-span-6">
    <div class="rounded-lg border border-border bg-bg-surface p-4">
      <p class="mb-3 text-sm text-text-muted">Modal interaction demo</p>
      <button
        class="rounded-md border border-border px-3 py-2 text-sm hover:bg-bg-elevate"
        @click="isModalOpen = true"
      >
        Open Modal
      </button>
    </div>

    <ModalDialog v-model="isModalOpen" title="Example Modal" />
  </div>
</template>
