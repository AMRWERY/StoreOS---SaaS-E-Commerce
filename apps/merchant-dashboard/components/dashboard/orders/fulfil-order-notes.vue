<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <LazyVTextareaInput
        v-model="draft"
        :rows="3"
        :placeholder="t('dashboard.ops.orderTimeline.notePlaceholder')"
      />
      <div class="flex justify-end">
        <LazyVButton
          size="none"
          className="px-3 py-1.5 text-[11px]"
          :disabled="!draft.trim()"
          :label="t('dashboard.ops.orderTimeline.addNote')"
          @click="submit"
        />
      </div>
    </div>

    <ul v-if="notes.length" class="space-y-3">
      <li v-for="n in notes" :key="n.id" class="flex gap-3">
        <span class="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
        <div class="min-w-0">
          <p class="text-xs leading-relaxed text-tx-secondary">{{ n.text }}</p>
          <p class="mt-1 text-[10px] text-tx-muted">
            <span class="text-brand font-semibold">{{ n.author === 'system' ? t('dashboard.ops.orderTimeline.system') : n.author }}</span>
            <span class="mx-1.5">•</span>
            <span class="font-mono">{{ n.at }}</span>
          </p>
        </div>
      </li>
    </ul>
    <ops-empty-state
      v-else
      :title="t('dashboard.ops.orderTimeline.notesEmpty')"
      :hint="t('dashboard.ops.orderTimeline.notesEmptyHint')"
      icon="ph:notebook-bold"
    />
  </div>
</template>

<script lang="ts" setup>
import type { OrderNote } from '@/types/fulfillment'

defineProps<{ notes: OrderNote[] }>()
const emit = defineEmits<{ add: [text: string] }>()

const { t } = useI18n()
const draft = ref('')

function submit() {
  const text = draft.value.trim()
  if (!text) return
  emit('add', text)
  draft.value = ''
}
</script>
