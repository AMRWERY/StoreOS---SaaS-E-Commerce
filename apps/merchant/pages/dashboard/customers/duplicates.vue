<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.duplicates.title')"
          :subtitle="t('dashboard.ops.duplicates.subtitle')"
          :count="openCount"
        />

        <section class="card overflow-hidden">
          <LazyVTable v-if="groups.length" :headers="headers" :items="groups">
            <template #cell(customers)="{ item }">
              <div class="space-y-0.5">
                <p class="text-sm font-semibold">{{ item.records[0].name }}</p>
                <p class="text-xs text-tx-secondary">{{ item.records[1].name }}</p>
              </div>
            </template>
            <template #cell(reason)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.duplicates.reasons.${item.reason}`) }}</span>
            </template>
            <template #cell(confidence)="{ item }">
              <status-pill :tone="item.confidence >= 90 ? 'danger' : 'warning'">
                <span class="font-mono">{{ item.confidence }}%</span>
              </status-pill>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="statusTones[item.status]">
                {{ t(`dashboard.ops.duplicates.statuses.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div v-if="item.status === 'open'" class="flex gap-1 justify-end">
                <LazyVButton variant="secondary" :label="t('dashboard.ops.duplicates.review')" @click="openReview(item.id)" />
                <LazyVButton variant="ghost" :label="t('dashboard.ops.duplicates.notDuplicates')" @click="store.setStatus(item.id, 'dismissed')" />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.duplicates.empty')"
            :hint="t('dashboard.ops.duplicates.emptyHint')"
            icon="ph:users-three-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      width="lg"
      :title="t('dashboard.ops.duplicates.compareTitle')"
      :subtitle="t('dashboard.ops.duplicates.compareSubtitle')"
    >
      <div v-if="active" class="space-y-5 p-1">
        <div class="grid grid-cols-[90px_1fr_1fr] gap-2 text-eyebrow">
          <span></span>
          <span class="font-mono">{{ active.records[0].id }}</span>
          <span class="font-mono">{{ active.records[1].id }}</span>
        </div>
        <div v-for="f in fields" :key="f" class="grid grid-cols-[90px_1fr_1fr] gap-2 items-stretch">
          <span class="text-xs text-tx-muted self-center">{{ t(`dashboard.ops.duplicates.fields.${f}`) }}</span>
          <label
            v-for="(rec, idx) in active.records"
            :key="rec.id"
            class="flex items-start gap-2 rounded-md border px-2 py-2 text-xs cursor-pointer transition-colors"
            :class="choice[f] === idx ? 'border-brand bg-brand-dim' : 'border-border-subtle bg-bg-elevated'"
          >
            <input v-model="choice[f]" type="radio" class="accent-brand mt-0.5" :name="`dup-${f}`" :value="idx" />
            <span :class="f === 'phone' || f === 'email' ? 'font-mono break-all' : ''">{{ rec[f] }}</span>
          </label>
        </div>
        <p class="text-xs text-tx-secondary">
          {{ t('dashboard.ops.duplicates.combined') }}:
          <span class="font-mono">{{ active.records[0].orders + active.records[1].orders }}</span>
          {{ t('dashboard.ops.duplicates.orders') }},
          <span class="font-mono">{{ money(active.records[0].spent + active.records[1].spent) }}</span>
        </p>
        <LazyVButton class="w-full" :label="t('dashboard.ops.duplicates.merge')" @click="confirmOpen = true" />
      </div>
    </LazyVSidePanel>

    <LazyVDialog v-model="confirmOpen" :title="t('dashboard.ops.duplicates.confirmTitle')">
      <p class="text-sm text-tx-secondary">{{ t('dashboard.ops.duplicates.confirmBody') }}</p>
      <template #footer>
        <div class="flex justify-end gap-2">
          <LazyVButton variant="secondary" :label="t('dashboard.ops.catxCommon.cancel')" @click="confirmOpen = false" />
          <LazyVButton :label="t('dashboard.ops.duplicates.merge')" @click="doMerge" />
        </div>
      </template>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
import type { DuplicateField } from '@/types/catalogDepth'
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.duplicates.title') })

const store = useCatxDuplicatesStore()
const { groups } = storeToRefs(store)

const panelOpen = ref(false)
const confirmOpen = ref(false)
const activeId = ref<string | null>(null)

const fields: DuplicateField[] = ['name', 'email', 'phone', 'address']
const choice = reactive<Record<DuplicateField, number>>({ name: 0, email: 0, phone: 0, address: 0 })

const statusTones: Record<string, Tone> = { open: 'warning', merged: 'success', dismissed: 'neutral' }

const active = computed(() => groups.value.find((g) => g.id === activeId.value))
const openCount = computed(() => groups.value.filter((g) => g.status === 'open').length)

function openReview(id: string) {
  activeId.value = id
  fields.forEach((f) => (choice[f] = 0))
  panelOpen.value = true
}

function doMerge() {
  if (activeId.value) store.setStatus(activeId.value, 'merged')
  confirmOpen.value = false
  panelOpen.value = false
}

const headers = computed(() => [
  { key: 'customers', label: t('dashboard.ops.duplicates.cols.customers') },
  { key: 'reason', label: t('dashboard.ops.duplicates.cols.reason') },
  { key: 'confidence', label: t('dashboard.ops.duplicates.cols.confidence') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '' },
])
</script>
