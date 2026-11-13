<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.transfers.title')"
          :subtitle="t('dashboard.ops.transfers.subtitle')"
          :count="transfers.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.transfers.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <section class="card overflow-hidden">
          <LazyVTable v-if="transfers.length" :headers="headers" :items="transfers">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(items)="{ item }">
              <span class="font-mono text-xs">{{ item.items }}</span>
            </template>
            <template #cell(createdAt)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.createdAt }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.transfers.status.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end gap-2">
                <LazyVButton
                  v-if="item.status === 'draft'"
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.transfers.ship')"
                  @click="setStatus(item.id, 'in_transit')"
                />
                <LazyVButton
                  v-if="item.status === 'in_transit'"
                  size="none"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.transfers.receive')"
                  @click="setStatus(item.id, 'received')"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.transfers.empty')"
            :hint="t('dashboard.ops.transfers.emptyHint')"
            icon="ph:arrows-left-right-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.transfers.create')"
      :subtitle="t('dashboard.ops.transfers.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVSelectInput v-model="form.from" :label="t('dashboard.ops.transfers.from')" :options="locations" />
        <LazyVSelectInput v-model="form.to" :label="t('dashboard.ops.transfers.to')" :options="locations" />
        <p v-if="sameLocation" class="text-xs text-danger">{{ t('dashboard.ops.transfers.sameLocation') }}</p>
        <LazyVInput v-model="form.items" type="number" :label="t('dashboard.ops.common.items')" required />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.transfers.create')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.transfers.title') })

const store = useCatalogTransfersStore()
const { transfers, locations } = storeToRefs(store)
const { setStatus } = store

const isOpen = ref(false)
const form = reactive({ from: '', to: '', items: '' as string | number })

const sameLocation = computed(() => !!form.from && form.from === form.to)

const tones: Record<string, Tone> = { draft: 'neutral', in_transit: 'info', received: 'success' }

const headers = computed(() => [
  { key: 'id', label: t('dashboard.ops.transfers.id') },
  { key: 'from', label: t('dashboard.ops.transfers.from') },
  { key: 'to', label: t('dashboard.ops.transfers.to') },
  { key: 'items', label: t('dashboard.ops.common.items') },
  { key: 'createdAt', label: t('dashboard.ops.common.date') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])

function submit() {
  const items = Number(form.items)
  if (!form.from || !form.to || sameLocation.value || !items) return
  store.add({ from: form.from, to: form.to, items })
  Object.assign(form, { from: '', to: '', items: '' })
  isOpen.value = false
}
</script>
