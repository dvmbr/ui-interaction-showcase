<script setup lang="ts">
import { provide, ref } from "vue";
import ShowcaseHome from "./pages/ShowcaseHome.vue";
import ToastStack from "./components/ui/ToastStack.vue";

const toastRef = ref<InstanceType<typeof ToastStack> | null>(null);

// provide simple global function
provide("toast", (msg: string) => {
  toastRef.value?.push(msg);
});
</script>

<template>
  <ShowcaseHome />
  <ToastStack ref="toastRef" />
</template>
