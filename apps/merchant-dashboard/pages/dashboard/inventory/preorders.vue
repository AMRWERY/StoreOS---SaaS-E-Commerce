<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.preorders.title')"
          :subtitle="t('dashboard.ops.preorders.subtitle')"
          :count="items.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.preorders.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <section class="card px-4 py-3.5 space-y-4">
          <h2 class="text-eyebrow">{{ t('dashboard.ops.preorders.settings') }}</h2>
          <LazyVSwitchButton v-model="allowBackorders" :label="t('dashboard.ops.preorders.allowBackorders')" />
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LazyVTextareaInput
              v-model="preorderMessage"
              :rows="3"
              :label="t('dashboard.ops.preorders.message')"
              class="md:col-span-2"
            />
            <LazyVInput v-model="expectedShipDate" type="date" :label="t('dashboard.ops.preorders.expectedShip')" class="font-mono" />
          </div>
        </section>

        <section class="card overflow-hidden">
          <LazyVTable v-if="items.length" :headers="headers" :items="items">
            <template #cell(product)="{ item }">
              <span class="text-sm font-semibold">{{ item.product }}</span>
            </template>
            <template #cell(mode)="{ item }">
              <status-pill :tone="item.mode === 'preorder' ? 'purple' : 'info'">
                {{ t(`dashboard.ops.preorders.modes.${item.mode}`) }}
              </status-pill>
            </template>
            <template #cell(limit)="{ item }">
              <span class="font-mono text-sm">{{ item.limit }}</span>
            </template>
            <template #cell(sold)="{ item }">
              <span class="font-mono text-sm">{{ item.sold }}</span>
            </template>
            <template #cell(expectedDate)="{ item }">
              <span class="font-mono text-xs">{{ item.expectedDate }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.preorders.statuses.${item.status}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.preorders.empty')"
            :hint="t('dashboard.ops.preorders.emptyHint')"
            icon="ph:clock-countdown-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.preorders.create')"
      :subtitle="t('dashboard.ops.preorders.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.product" :label="t('dashboard.ops.preorders.product')" required />
        <LazyVSelectInput v-model="form.mode" :label="t('dashboard.ops.preorders.mode')" :options="modeOptions" />
        <LazyVInput v-model="form.limit" type="number" :label="t('dashboard.ops.preorders.limit')" class="font-mono" />
        <LazyVInput v-model="form.expectedDate" type="date" :label="t('dashboard.ops.preorders.expectedDate')" class="font-mono" />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.preorders.create')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { PreorderMode } from '@/types/catalogDepth'
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.preorders.title') })

const store = useCatxPreordersStore()
const { items, allowBackorders, preorderMessage, expectedShipDate } = storeToRefs(store)

const isOpen = ref(false)
const form = reactive<{ product: string; mode: PreorderMode; limit: string | number; expectedDate: string }>({
  product: '',
  mode: 'preorder',
  limit: 100,
  expectedDate: '',
})

const tones: Record<string, Tone> = { active: 'success', paused: 'warning', ended: 'neutral' }

const modes: PreorderMode[] = ['preorder', 'backorder']
const modeOptions = computed(() => modes.map((v) => ({ value: v, label: t(`dashboard.ops.preorders.modes.${v}`) })))

const headers = computed(() => [
  { key: 'product', label: t('dashboard.ops.preorders.product') },
  { key: 'mode', label: t('dashboard.ops.preorders.mode') },
  { key: 'limit', label: t('dashboard.ops.preorders.limit') },
  { key: 'sold', label: t('dashboard.ops.preorders.sold') },
  { key: 'expectedDate', label: t('dashboard.ops.preorders.expectedDate') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])

function submit() {
  if (!form.product.trim() || !form.expectedDate) return
  store.add({
    product: form.product.trim(),
    mode: form.mode,
    limit: Number(form.limit) || 0,
    expectedDate: form.expectedDate,
  })
  form.product = ''
  form.expectedDate = ''
  isOpen.value = false
}
</script>
