<template>
  <div class="space-y-2">
    <label class="block text-[10px] font-bold tracking-wider text-tx-secondary">{{ label }}</label>
    <div class="relative">
      <Icon name="ph:magnifying-glass-bold"
        class="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-tx-muted" />
      <input v-model="query" type="search" :placeholder="placeholder"
        class="w-full rounded-md border border-border-subtle bg-bg-elevated py-2 ps-9 pe-3 text-[12px] text-tx-primary outline-none focus:border-brand">
    </div>
    <ul class="max-h-36 space-y-1 overflow-y-auto rounded-md border border-border-subtle bg-bg-base p-2">
      <li v-for="p in filtered" :key="p.id"
        class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-[11px] transition-colors hover:bg-bg-elevated"
        :class="modelValue === p.id ? 'bg-brand-dim/40 text-brand' : 'text-tx-secondary'"
        @click="$emit('update:modelValue', p.id)">
        <span class="size-8 shrink-0 rounded bg-bg-overlay" />
        <span class="min-w-0 flex-1 truncate font-medium">{{ p.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
  }>(),
  { label: 'Products', placeholder: 'Search products…' },
)

defineEmits<{
  'update:modelValue': [value: string]
}>()

const query = ref('')

const demo = [
  { id: 'prod_1', title: 'Oak dining table' },
  { id: 'prod_2', title: 'Linen throw blanket' },
  { id: 'prod_3', title: 'Ceramic vase set' },
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q)
    return demo
  return demo.filter(p => p.title.toLowerCase().includes(q))
})
</script>