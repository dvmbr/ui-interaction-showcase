<script setup lang="ts">
import { ref } from "vue";
import AccordionItem from "../components/interactions/AccordionItem.vue";

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
        :is-open="openIndex === i"
        @update:is-open="(open) => setOpen(i, open)"
      >
        <!-- If your AccordionItem doesn't support slots yet, ignore this block -->
        <template #default>
          <div class="px-4 py-3 text-sm text-text-muted">
            {{ item.body }}
          </div>
        </template>
      </AccordionItem>
    </div>
  </div>
</template>
