<script setup lang="ts">
import { ref } from "vue";
import TabsNav from "../components/interactions/TabsNav.vue";

const tabs = ["Overview", "Details", "Settings"] as const;
const activeTab = ref<(typeof tabs)[number]>(tabs[0]);
</script>
<template>
  <div
    class="col-span-12 md:col-span-6 border border-border p-4 rounded-lg mb-4"
  >
    <TabsNav v-model="activeTab" :tabs="tabs" />

    <div
      class="mt-3 rounded-lg border border-border bg-bg-surface p-4 text-sm text-text-muted"
    >
      Active tab: <span class="text-text-main">{{ activeTab }}</span>
    </div>
  </div>
</template>
