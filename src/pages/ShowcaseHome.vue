<script setup lang="ts">
import InteractiveCardSection from "../sections/InteractiveCardSection.vue";
import ToggleSwitchSection from "../sections/ToggleSwitchSection.vue";
import ModalDialogSection from "../sections/ModalDialogSection.vue";
import TabsNavSection from "../sections/TabsNavSection.vue";
import AccordionItemSection from "../sections/AccordionItemSection.vue";
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
        <InteractiveCardSection />
        <ToggleSwitchSection />
        <ModalDialogSection />
        <TabsNavSection />
        <AccordionItemSection />
      </section>
    </div>
  </main>
</template>
