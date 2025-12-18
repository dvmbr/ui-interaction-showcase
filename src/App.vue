<script setup lang="ts">
import { provide, ref } from "vue";
import ShowcaseHome from "./pages/ShowcaseHome.vue";
import ToastStack from "./components/ui/ToastStack.vue";
import { TOAST_KEY } from "./composables/useToast";

const toastRef = ref<InstanceType<typeof ToastStack> | null>(null);

provide(TOAST_KEY, (msg: string) => {
  toastRef.value?.push(msg);
});
</script>

<template>
  <ShowcaseHome />
  <ToastStack ref="toastRef" />
</template>
