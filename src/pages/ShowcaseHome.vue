<script setup lang="ts">
import { ref } from "vue";
import InteractiveCard from "../components/interactions/InteractiveCard.vue";
import type { CardState } from "../composables/useInteractiveCard";
import ToggleSwitch from "../components/interactions/ToggleSwitch.vue";
import ModalDialog from "../components/interactions/ModalDialog.vue";
import TabsNav from "../components/interactions/TabsNav.vue";
import AccordionItem from "../components/interactions/AccordionItem.vue";

const cardStateError = ref<CardState>("error");
const isEnabled = ref(false);
const isModalOpen = ref(false);

const tabs = ["Overview", "Details", "Settings"] as const;
const activeTab = ref<(typeof tabs)[number]>(tabs[0]);

function onCardAction(payload: { state: CardState; intent: "run" }) {
  if (payload.intent !== "run") return;

  if (cardStateError.value === "error") {
    cardStateError.value = "success";
  }
}

function rollbackToError() {
  cardStateError.value = "error";
}

type AccordionData = {
  id: string;
  title: string;
  body: string;
};

const items: AccordionData[] = [
  {
    id: "a1",
    title: "Why parent-owned state?",
    body: "The parent decides which item is open. Each item is dumb and predictable.",
  },
  {
    id: "a2",
    title: "Why no JS height measurement?",
    body: "For a small showcase, max-height transitions are simpler and good enough.",
  },
  {
    id: "a3",
    title: "What does single-open mean?",
    body: "Opening one item closes the others automatically.",
  },
];

// Single-open policy -> only one index can be open at a time
const openIndex = ref<number | null>(0);

function setOpen(i: number, nextOpen: boolean) {
  // nextOpen: true -> open this item (close others)
  // nextOpen: false -> close this item (no items open)
  openIndex.value = nextOpen
    ? i
    : openIndex.value === i
    ? null
    : openIndex.value;
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

        <div class="col-span-12 md:col-span-6">
          <ToggleSwitch v-model="isEnabled" label="Demo Toggle" />
        </div>

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

        <div class="col-span-12 border border-border p-4 rounded-lg mb-4">
          <h2 class="text-lg font-medium text-text-main mb-2">
            Accordion (Single-open)
          </h2>
          <p class="text-sm text-text-muted mb-4">
            Only one item can be open at a time. Opening a new item closes the
            previous one.
          </p>

          <div class="space-y-2">
            <AccordionItem
              v-for="(item, i) in items"
              :key="item.id"
              :title="item.title"
              :model-value="openIndex === i"
              @update:modelValue="(open) => setOpen(i, open)"
            >
              <!-- If your AccordionItem doesn't support slots yet, ignore this block -->
              <template #default>
                <div class="px-4 py-3 text-sm text-text-muted">
                  {{ item.body }}
                </div>
              </template>
            </AccordionItem>

            <!-- If your AccordionItem currently has fixed body text, 
              just remove the slot section above and keep the v-model logic. -->
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
