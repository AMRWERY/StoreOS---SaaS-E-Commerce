<!--
  Saved filter views as chips + a small "save current view" input.

  Usage:
    <ops-saved-views
      v-model="activeViewId"          // id of the applied view, or '' for none
      :views="views"                  // OpsSavedView[] ({ id, name, filters })
      @save="(name) => ..."           // user typed a name and pressed Save
      @apply="(view) => ..."          // a chip was clicked (also updates v-model)
      @delete="(id) => ..."           // the x on a chip was clicked
    />
-->
<template>
  <div class="flex flex-wrap items-center gap-2">
    <span class="text-[10px] font-bold text-tx-muted tracking-widest">
      {{ t('dashboard.ops.savedViews.title') }}
    </span>

    <span
      v-for="v in views"
      :key="v.id"
      class="inline-flex items-center rounded-full border text-[11px] transition-colors"
      :class="
        modelValue === v.id
          ? 'bg-brand-dim border-brand text-brand'
          : 'bg-bg-elevated border-border-subtle text-tx-secondary hover:border-border-default'
      "
    >
      <button type="button" class="ps-3 pe-1.5 py-1 font-semibold" @click="apply(v)">{{ v.name }}</button>
      <button
        type="button"
        class="pe-2 ps-0.5 py-1 text-tx-muted hover:text-danger"
        :aria-label="t('dashboard.ops.common.delete')"
        @click="emit('delete', v.id)"
      >
        <Icon name="ph:x-bold" class="text-[10px]" />
      </button>
    </span>

    <span v-if="!views.length" class="text-[11px] text-tx-muted">{{ t('dashboard.ops.savedViews.empty') }}</span>

    <LazyVDropdownMenu align="start" width="w-64">
      <template #trigger>
        <span
          class="inline-flex items-center gap-1 rounded-full border border-dashed border-border-default px-3 py-1 text-[11px] text-tx-secondary hover:text-tx-primary"
        >
          <Icon name="ph:bookmark-simple-bold" />
          {{ t('dashboard.ops.savedViews.save') }}
        </span>
      </template>
      <template #default="{ close }">
        <div class="space-y-2 p-1">
          <LazyVInput v-model="name" :placeholder="t('dashboard.ops.savedViews.namePlaceholder')" />
          <LazyVButton
            size="none"
            className="px-3 py-1.5 text-xs w-full"
            :disabled="!name.trim()"
            :label="t('dashboard.ops.savedViews.saveCurrent')"
            @click="submit(close)"
          />
        </div>
      </template>
    </LazyVDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import type { OpsSavedView } from '@/types/platformTools'

defineProps<{
  modelValue: string
  views: OpsSavedView[]
}>()

const emit = defineEmits<{
  'update:modelValue': [id: string]
  save: [name: string]
  apply: [view: OpsSavedView]
  delete: [id: string]
}>()

const { t } = useI18n()
const name = ref('')

function apply(v: OpsSavedView) {
  emit('update:modelValue', v.id)
  emit('apply', v)
}

function submit(close: () => void) {
  emit('save', name.value.trim())
  name.value = ''
  close()
}
</script>
