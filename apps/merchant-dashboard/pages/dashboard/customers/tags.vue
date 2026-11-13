<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.customerTags.title')"
          :subtitle="t('dashboard.ops.customerTags.subtitle')"
          :count="tags.length"
        >
          <LazyVButton
            icon="ph:note-pencil-bold"
            iconPosition="left"
            :label="t('dashboard.ops.customerTags.addNote')"
            @click="noteOpen = true"
          />
        </ops-page-header>

        <section class="card px-4 py-3.5 space-y-4">
          <h2 class="text-eyebrow">{{ t('dashboard.ops.customerTags.manager') }}</h2>

          <form class="grid grid-cols-1 md:grid-cols-[1fr_180px_auto] gap-3 items-end" @submit.prevent="createTag">
            <LazyVInput v-model="newName" :label="t('dashboard.ops.customerTags.tagName')" />
            <LazyVSelectInput v-model="newColor" :label="t('dashboard.ops.customerTags.color')" :options="colorOptions" />
            <LazyVButton type="submit" icon="ph:plus-bold" iconPosition="left" :label="t('dashboard.ops.customerTags.create')" />
          </form>

          <ul v-if="tags.length" class="divide-y divide-border-subtle">
            <li v-for="tag in tags" :key="tag.id" class="flex items-center gap-3 py-3">
              <template v-if="editingId === tag.id">
                <LazyVInput v-model="editName" class="flex-1" />
                <LazyVButton variant="secondary" :label="t('dashboard.ops.common.save')" @click="saveRename(tag.id)" />
                <LazyVButton variant="ghost" :label="t('dashboard.ops.catxCommon.cancel')" @click="editingId = null" />
              </template>
              <template v-else>
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold" :class="colorClasses[tag.color]">
                  {{ tag.name }}
                </span>
                <span class="font-mono text-xs text-tx-muted flex-1">
                  {{ tag.customers }} {{ t('dashboard.ops.customerTags.customers') }}
                </span>
                <button
                  type="button"
                  class="text-tx-muted hover:text-brand transition-colors"
                  :aria-label="t('dashboard.ops.customerTags.rename')"
                  @click="startRename(tag.id, tag.name)"
                >
                  <Icon name="ph:pencil-simple-bold" />
                </button>
                <button
                  type="button"
                  class="text-tx-muted hover:text-danger transition-colors"
                  :aria-label="t('dashboard.ops.common.delete')"
                  @click="store.removeTag(tag.id)"
                >
                  <Icon name="ph:trash-bold" />
                </button>
              </template>
            </li>
          </ul>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.customerTags.emptyTags')"
            :hint="t('dashboard.ops.customerTags.emptyTagsHint')"
            icon="ph:tag-bold"
          />
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.customerTags.recentNotes') }}</h2>
          </div>
          <LazyVTable v-if="notes.length" :headers="noteHeaders" :items="notes">
            <template #cell(customer)="{ item }">
              <span class="text-sm font-semibold">{{ item.customer }}</span>
            </template>
            <template #cell(note)="{ item }">
              <span class="text-xs text-tx-secondary">{{ item.note }}</span>
            </template>
            <template #cell(author)="{ item }">
              <span class="text-xs">{{ item.author }}</span>
            </template>
            <template #cell(date)="{ item }">
              <span class="font-mono text-xs">{{ item.date }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.customerTags.emptyNotes')"
            icon="ph:note-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="noteOpen"
      :title="t('dashboard.ops.customerTags.addNote')"
      :subtitle="t('dashboard.ops.customerTags.addNoteSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submitNote">
        <LazyVInput v-model="noteForm.customer" :label="t('dashboard.ops.common.customer')" required />
        <LazyVTextareaInput v-model="noteForm.note" :rows="4" :label="t('dashboard.ops.customerTags.note')" />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.customerTags.addNote')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { CatxTagColor } from '@/types/catalogDepth'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.customerTags.title') })

const store = useCatxCustomerTagsStore()
const { tags, notes } = storeToRefs(store)

const noteOpen = ref(false)
const newName = ref('')
const newColor = ref<CatxTagColor>('brand')
const editingId = ref<string | null>(null)
const editName = ref('')
const noteForm = reactive({ customer: '', note: '' })

const colorClasses: Record<CatxTagColor, string> = {
  brand: 'bg-brand-dim text-brand',
  accent: 'bg-accent/15 text-accent',
  success: 'bg-success-dim text-success',
  warning: 'bg-warning-dim text-warning',
  danger: 'bg-danger-dim text-danger',
  info: 'bg-info-dim text-info',
  purple: 'bg-status-purple/15 text-status-purple',
}

const colors = Object.keys(colorClasses) as CatxTagColor[]
const colorOptions = computed(() => colors.map((c) => ({ value: c, label: t(`dashboard.ops.customerTags.colors.${c}`) })))

const noteHeaders = computed(() => [
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'note', label: t('dashboard.ops.customerTags.note') },
  { key: 'author', label: t('dashboard.ops.customerTags.author') },
  { key: 'date', label: t('dashboard.ops.common.date') },
])

function createTag() {
  if (!newName.value.trim()) return
  store.addTag(newName.value.trim(), newColor.value)
  newName.value = ''
}

function startRename(id: string, name: string) {
  editingId.value = id
  editName.value = name
}

function saveRename(id: string) {
  store.renameTag(id, editName.value)
  editingId.value = null
}

function submitNote() {
  if (!noteForm.customer.trim() || !noteForm.note.trim()) return
  store.addNote(noteForm.customer.trim(), noteForm.note.trim())
  noteForm.customer = ''
  noteForm.note = ''
  noteOpen.value = false
}
</script>
