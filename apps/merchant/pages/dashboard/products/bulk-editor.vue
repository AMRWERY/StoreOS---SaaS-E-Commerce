<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-7xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.bulkEditor.title')"
          :subtitle="t('dashboard.ops.bulkEditor.subtitle')"
          :count="rows.length"
        >
          <span class="text-xs font-mono text-tx-secondary">
            {{ t('dashboard.ops.bulkEditor.unsaved', { n: dirtyCount }) }}
          </span>
          <LazyVButton
            variant="ghost"
            icon="ph:arrow-u-up-left-bold"
            iconPosition="left"
            :label="t('dashboard.ops.bulkEditor.undo')"
            :disabled="!history.length"
            @click="store.undo()"
          />
          <LazyVButton
            variant="secondary"
            :label="t('dashboard.ops.bulkEditor.discard')"
            :disabled="!dirtyCount"
            @click="store.discard()"
          />
          <LazyVButton
            icon="ph:floppy-disk-bold"
            iconPosition="left"
            :label="t('dashboard.ops.common.save')"
            :disabled="!dirtyCount"
            @click="store.save()"
          />
        </ops-page-header>

        <section class="card px-4 py-3.5 space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.bulkEditor.bulkSet') }}</h2>
            <span class="text-xs font-mono text-tx-muted">
              {{ t('dashboard.ops.bulkEditor.selected', { n: selected.length }) }}
            </span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div class="flex items-end gap-2">
              <LazyVInput v-model="percent" type="number" :label="t('dashboard.ops.bulkEditor.percent')" class="font-mono flex-1" />
              <LazyVButton variant="secondary" label="+%" :disabled="!selected.length" @click="applyPercent(1)" />
              <LazyVButton variant="secondary" label="-%" :disabled="!selected.length" @click="applyPercent(-1)" />
            </div>
            <div class="flex items-end gap-2">
              <LazyVSelectInput v-model="bulkStatus" :label="t('dashboard.ops.bulkEditor.setStatus')" :options="statusOptions" class="flex-1" />
              <LazyVButton variant="secondary" :label="t('dashboard.ops.bulkEditor.apply')" :disabled="!selected.length" @click="applyStatus" />
            </div>
            <div class="flex items-end gap-2">
              <LazyVInput v-model="bulkTag" :label="t('dashboard.ops.bulkEditor.addTag')" class="flex-1" />
              <LazyVButton variant="secondary" :label="t('dashboard.ops.bulkEditor.apply')" :disabled="!selected.length || !bulkTag.trim()" @click="applyTag" />
            </div>
          </div>
        </section>

        <section class="card overflow-hidden">
          <LazyVTable v-if="rows.length" :headers="headers" :items="rows">
            <template #cell(select)="{ item }">
              <input
                type="checkbox"
                class="accent-brand"
                :checked="selected.includes(item.id)"
                :aria-label="t('dashboard.ops.bulkEditor.selectRow')"
                @change="toggle(item.id)"
              />
            </template>
            <template #cell(title)="{ item }">
              <input :aria-label="t('dashboard.ops.bulkEditor.cols.title')" :class="cellClass(item.id, 'title')" :value="item.title" @change="onText(item.id, 'title', $event)" />
            </template>
            <template #cell(sku)="{ item }">
              <input :aria-label="t('dashboard.ops.bulkEditor.cols.sku')" :class="[cellClass(item.id, 'sku'), 'font-mono']" :value="item.sku" @change="onText(item.id, 'sku', $event)" />
            </template>
            <template #cell(price)="{ item }">
              <input :aria-label="t('dashboard.ops.bulkEditor.cols.price')" type="number" min="0" :class="[cellClass(item.id, 'price'), 'font-mono']" :value="item.price" @change="onNum(item.id, 'price', $event)" />
            </template>
            <template #cell(compareAt)="{ item }">
              <input :aria-label="t('dashboard.ops.bulkEditor.cols.compareAt')" type="number" min="0" :class="[cellClass(item.id, 'compareAt'), 'font-mono']" :value="item.compareAt" @change="onNum(item.id, 'compareAt', $event)" />
            </template>
            <template #cell(stock)="{ item }">
              <input :aria-label="t('dashboard.ops.bulkEditor.cols.stock')" type="number" min="0" :class="[cellClass(item.id, 'stock'), 'font-mono']" :value="item.stock" @change="onNum(item.id, 'stock', $event)" />
            </template>
            <template #cell(status)="{ item }">
              <select :aria-label="t('dashboard.ops.common.statusLabel')" :class="cellClass(item.id, 'status')" :value="item.status" @change="onText(item.id, 'status', $event)">
                <option v-for="o in statusOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </template>
            <template #cell(tags)="{ item }">
              <input :aria-label="t('dashboard.ops.bulkEditor.cols.tags')" :class="cellClass(item.id, 'tags')" :value="item.tags" @change="onText(item.id, 'tags', $event)" />
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.bulkEditor.empty')"
            :hint="t('dashboard.ops.bulkEditor.emptyHint')"
            icon="ph:table-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CatxEditableField, CatxProductStatus } from '@/types/catalogDepth'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.bulkEditor.title') })

const store = useCatxBulkEditorStore()
const { rows, history, dirtyCount } = storeToRefs(store)

const selected = ref<string[]>([])
const percent = ref<string | number>(10)
const bulkStatus = ref<CatxProductStatus>('active')
const bulkTag = ref('')

const statuses: CatxProductStatus[] = ['active', 'draft', 'archived']
const statusOptions = computed(() =>
  statuses.map((s) => ({ value: s, label: t(`dashboard.ops.bulkEditor.statuses.${s}`) })),
)

const headers = computed(() => [
  { key: 'select', label: '' },
  { key: 'title', label: t('dashboard.ops.bulkEditor.cols.title') },
  { key: 'sku', label: t('dashboard.ops.bulkEditor.cols.sku') },
  { key: 'price', label: t('dashboard.ops.bulkEditor.cols.price') },
  { key: 'compareAt', label: t('dashboard.ops.bulkEditor.cols.compareAt') },
  { key: 'stock', label: t('dashboard.ops.bulkEditor.cols.stock') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'tags', label: t('dashboard.ops.bulkEditor.cols.tags') },
])

function cellClass(id: string, field: CatxEditableField) {
  return [
    'w-full rounded border px-2 py-1 text-xs text-tx-primary outline-none transition-colors focus:border-brand',
    store.isDirty(id, field) ? 'bg-warning-dim border-warning' : 'bg-transparent border-transparent hover:border-border-default',
  ]
}

function toggle(id: string) {
  selected.value = selected.value.includes(id) ? selected.value.filter((x) => x !== id) : [...selected.value, id]
}

function onText(id: string, field: CatxEditableField, e: Event) {
  store.setValue(id, field, (e.target as HTMLInputElement | HTMLSelectElement).value)
}

function onNum(id: string, field: CatxEditableField, e: Event) {
  const n = Number((e.target as HTMLInputElement).value)
  store.setValue(id, field, Number.isFinite(n) ? n : 0)
}

function applyPercent(sign: 1 | -1) {
  const p = Number(percent.value)
  if (!Number.isFinite(p) || p <= 0) return
  for (const row of rows.value.filter((r) => selected.value.includes(r.id))) {
    store.setValue(row.id, 'price', Math.max(0, Math.round(row.price * (1 + (sign * p) / 100))))
  }
}

function applyStatus() {
  for (const id of selected.value) store.setValue(id, 'status', bulkStatus.value)
}

function applyTag() {
  const tag = bulkTag.value.trim()
  if (!tag) return
  for (const row of rows.value.filter((r) => selected.value.includes(r.id))) {
    store.setValue(row.id, 'tags', row.tags ? `${row.tags}, ${tag}` : tag)
  }
  bulkTag.value = ''
}
</script>
