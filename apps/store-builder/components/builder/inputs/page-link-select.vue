<template>
  <label class="block">
    <span class="mb-1 block text-[10px] font-semibold text-tx-muted">Link to a page</span>
    <select
      :value="selected"
      class="w-full rounded-md border border-border-subtle bg-bg-base px-2 py-1.5 text-[11px] text-tx-primary outline-none transition-colors focus:border-brand"
      @change="onChange"
    >
      <option value="">Custom URL…</option>
      <option v-for="p in options" :key="p.path" :value="p.path">
        {{ p.label }} ({{ p.path }})
      </option>
    </select>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const store = useBuilderStore();

/** Pages a link can point at (the order-confirmed screen is only reached by placing an order). */
const options = computed(() =>
  store.pages
    .filter((p) => p.type !== "order_confirmed")
    .map((p) => ({
      path: p.type === "home" ? "/" : `/${p.slug}`,
      label: store.pageText(p, "title") || p.title,
    })),
);

const selected = computed(() =>
  options.value.some((o) => o.path === props.modelValue) ? props.modelValue : "",
);

const onChange = (e: Event) => {
  const v = (e.target as HTMLSelectElement).value;
  if (v) emit("update:modelValue", v);
};
</script>
