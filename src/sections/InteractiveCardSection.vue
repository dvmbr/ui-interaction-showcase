<script setup lang="ts">
import { ref } from "vue";
import InteractiveCard from "../components/interactions/InteractiveCard.vue";
import type { CardState } from "../composables/useInteractiveCard";

const cardStateError = ref<CardState>("error");

function onCardAction(payload: { state: CardState; intent: "run" }) {
  if (payload.intent !== "run") return;

  if (cardStateError.value === "error") {
    cardStateError.value = "success";
  }
}

function rollbackToError() {
  cardStateError.value = "error";
}
</script>
<template>
  <div class="col-span-12 md:col-span-6">
    <InteractiveCard />
  </div>

  <div class="col-span-12 md:col-span-6 flex flex-col">
    <InteractiveCard :state="cardStateError" @action="onCardAction" />
    <button
      v-if="cardStateError === 'success'"
      class="text-sm text-text-muted underline hover:text-primary ml-auto mr-2"
      @click="rollbackToError"
    >
      Rollback to error
    </button>
  </div>

  <div class="col-span-12 md:col-span-6">
    <InteractiveCard state="warning" />
  </div>

  <div class="col-span-12 md:col-span-6">
    <InteractiveCard state="success" />
  </div>
</template>
