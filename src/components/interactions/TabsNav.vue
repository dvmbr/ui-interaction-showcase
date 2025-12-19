<script setup lang="ts" generic="T extends readonly string[]">
const props = defineProps<{
  tabs: T;
  modelValue: T[number];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: T[number]): void;
}>();

function select(tab: T[number]) {
  if (tab !== props.modelValue) {
    emit("update:modelValue", tab);
  }
}

const tabTextClass = (tab: typeof props.modelValue) => {
  return tab === props.modelValue
    ? "text-text-main"
    : "text-text-muted hover:text-text-main";
};

const indicatorOffsetClass = () => {
  const index = props.tabs.indexOf(props.modelValue);

  if (index === 0) return "left-1";
  if (index === props.tabs.length - 1) return "-left-1";
  return "left-0";
};
</script>

<template>
  <div class="relative rounded-lg border border-border bg-bg-surface p-1">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-1">
      <button
        v-for="tab in tabs"
        :key="tab"
        type="button"
        class="relative z-10 rounded-md px-3 py-2 text-sm transition duration-200 ease-ease-out"
        :class="tabTextClass(tab)"
        @click="select(tab)"
      >
        {{ tab }}
      </button>
    </div>

    <!-- indicator -->
    <div
      class="pointer-events-none absolute inset-y-1 rounded-md bg-bg-elevate transition-all duration-200 ease-ease-out"
      :class="indicatorOffsetClass()"
      :style="{
        width: `${100 / tabs.length}%`,
        transform: `translateX(${tabs.indexOf(modelValue) * 100}%)`,
      }"
    />
  </div>
</template>
