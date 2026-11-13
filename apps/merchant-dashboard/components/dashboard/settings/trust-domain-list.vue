<template>
  <div class="space-y-2">
    <p class="text-[10px] font-bold text-tx-secondary tracking-wider">
      {{ title }}
    </p>

    <ul v-if="list.length" class="space-y-1">
      <li
        v-for="d in list"
        :key="d"
        class="flex items-center justify-between gap-2 rounded-md border border-border-subtle bg-bg-elevated px-2 py-1.5"
      >
        <span class="font-mono text-[11px] break-all">{{ d }}</span>
        <button
          type="button"
          class="text-tx-muted hover:text-danger transition-colors shrink-0"
          :aria-label="t('dashboard.ops.common.delete')"
          @click="emit('remove', d)"
        >
          <Icon name="ph:x-bold" />
        </button>
      </li>
    </ul>
    <p v-else class="text-[11px] text-tx-muted">{{ emptyText }}</p>

    <div class="flex items-end gap-2">
      <div class="flex-1">
        <LazyVInput
          v-model="draft"
          placeholder="https://cdn.example.com"
          inputClass="font-mono"
        />
      </div>
      <LazyVButton
        size="none"
        variant="secondary"
        icon="ph:plus-bold"
        className="px-3 py-2 text-xs"
        :label="addLabel"
        @click="submit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  list: string[]
  emptyText: string
  addLabel: string
}>()

const emit = defineEmits<{
  add: [value: string]
  remove: [value: string]
}>()

const { t } = useI18n()

const draft = ref<string | number | boolean | undefined>('')

function submit() {
  const value = String(draft.value ?? '').trim()
  if (!value) return
  emit('add', value)
  draft.value = ''
}
</script>
