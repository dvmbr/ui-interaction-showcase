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
  <main class="min-h-screen bg-bg-deep text-text-main">
    <div class="mx-auto max-w-5xl px-6 py-10">
      <header class="mb-6">
        <h1 class="text-2xl font-semibold tracking-tight">
          UI Interaction Showcase
        </h1>
        <p class="mt-2 text-text-muted text-sm leading-6">
          Micro-interactions with semantic colors and state-driven feedback.
        </p>
      </header>

      <section class="grid grid-cols-12 gap-4">
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
      </section>
    </div>
  </main>
</template>
