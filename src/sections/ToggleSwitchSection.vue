<script setup lang="ts">
import { ref } from "vue";
import ToggleSwitch from "../components/interactions/ToggleSwitch.vue";

const isEnabled = ref(false);
</script>
<template>
  <div class="col-span-12 md:col-span-6">
    <ToggleSwitch v-model="isEnabled" label="Demo Toggle" />
  </div>
</template>
