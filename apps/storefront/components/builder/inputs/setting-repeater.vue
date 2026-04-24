<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between gap-2">
      <label class="text-[10px] font-bold tracking-wider text-tx-secondary">{{ label }}</label>
      <button type="button"
        class="rounded-md border border-dashed border-border-subtle px-2 py-1 text-[10px] font-bold tracking-wider text-brand transition-colors hover:bg-brand/15"
        @click="add">
        + Add
      </button>
    </div>
    <ul class="space-y-2">
      <li v-for="(item, i) in modelValue" :key="i"
        class="flex items-start gap-2 rounded-lg border border-border-subtle bg-bg-elevated/50 p-3">
        <div class="min-w-0 flex-1">
          <slot :item="item" :index="i" />
        </div>
        <button type="button" class="shrink-0 rounded p-1 text-tx-muted hover:bg-bg-overlay hover:text-red-400"
          title="Remove" @click="remove(i)">
          <Icon name="ph:trash-bold" class="text-base" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: Record<string, unknown>[]
  label: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown>[]]
}>()

function add() {
  emit('update:modelValue', [...props.modelValue, { title: 'New item', subtitle: '' }])
}

function remove(i: number) {
  const next = props.modelValue.filter((_, j) => j !== i)
  emit('update:modelValue', next)
}
</script>