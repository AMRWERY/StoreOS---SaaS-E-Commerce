<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.autoDiscounts.title')"
          :subtitle="t('dashboard.ops.autoDiscounts.subtitle')"
          :count="discounts.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.autoDiscounts.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.autoDiscounts.stats.active')"
            :value="discounts.filter((d) => d.status === 'active').length"
            iconName="ph:lightning-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.autoDiscounts.stats.scheduled')"
            :value="discounts.filter((d) => d.status === 'scheduled').length"
            iconName="ph:calendar-bold"
            iconColor="text-info"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.autoDiscounts.stats.combinable')"
            :value="discounts.filter((d) => d.combinable).length"
            iconName="ph:stack-bold"
          />
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="discounts.length" :headers="headers" :items="discounts">
            <template #cell(name)="{ item }">
              <span class="text-sm font-semibold">{{ item.name }}</span>
            </template>
            <template #cell(type)="{ item }">
              <span class="text-xs text-tx-secondary">
                {{ t(`dashboard.ops.autoDiscounts.types.${item.type}`) }}
                <span v-if="item.type === 'percentage'" class="font-mono">{{ item.value }}%</span>
                <span v-else-if="item.type === 'fixed'" class="font-mono">{{ money(item.value) }}</span>
              </span>
            </template>
            <template #cell(eligibility)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.autoDiscounts.eligibilities.${item.eligibility}`) }}</span>
            </template>
            <template #cell(combinable)="{ item }">
              <Icon
                :name="item.combinable ? 'ph:check-circle-bold' : 'ph:minus-circle-bold'"
                :class="item.combinable ? 'text-success' : 'text-tx-muted'"
              />
            </template>
            <template #cell(dates)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.startsAt }} → {{ item.endsAt }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.autoDiscounts.status.${item.status}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.autoDiscounts.empty')"
            :hint="t('dashboard.ops.autoDiscounts.emptyHint')"
            icon="ph:lightning-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.autoDiscounts.create')"
      :subtitle="t('dashboard.ops.autoDiscounts.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.name" :label="t('dashboard.ops.autoDiscounts.name')" required />
        <LazyVSelectInput v-model="form.type" :label="t('dashboard.ops.autoDiscounts.type')" :options="typeOptions" />
        <LazyVInput
          v-if="form.type === 'percentage' || form.type === 'fixed'"
          v-model="form.value"
          type="number"
          :label="t('dashboard.ops.autoDiscounts.value')"
          required
        />
        <LazyVSelectInput
          v-model="form.eligibility"
          :label="t('dashboard.ops.autoDiscounts.eligibility')"
          :options="eligibilityOptions"
        />
        <div class="grid grid-cols-2 gap-3">
          <LazyVInput v-model="form.startsAt" type="date" :label="t('dashboard.ops.autoDiscounts.starts')" required />
          <LazyVInput v-model="form.endsAt" type="date" :label="t('dashboard.ops.autoDiscounts.ends')" required />
        </div>
        <LazyVSwitchButton v-model="form.combinable" :label="t('dashboard.ops.autoDiscounts.combinable')" />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.autoDiscounts.create')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { AutoDiscountEligibility, AutoDiscountType } from '@/types/catalogOps'
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.autoDiscounts.title') })

const store = useCatalogAutoDiscountsStore()
const { discounts } = storeToRefs(store)

const isOpen = ref(false)
const form = reactive({
  name: '',
  type: 'percentage' as AutoDiscountType,
  value: '' as string | number,
  eligibility: 'all' as AutoDiscountEligibility,
  startsAt: '',
  endsAt: '',
  combinable: false,
})

const tones: Record<string, Tone> = {
  active: 'success',
  scheduled: 'info',
  expired: 'neutral',
  draft: 'warning',
}

const typeOptions = computed(() =>
  (['percentage', 'fixed', 'free_shipping', 'bxgy'] as const).map((v) => ({
    value: v,
    label: t(`dashboard.ops.autoDiscounts.types.${v}`),
  })),
)
const eligibilityOptions = computed(() =>
  (['all', 'segment', 'min_subtotal'] as const).map((v) => ({
    value: v,
    label: t(`dashboard.ops.autoDiscounts.eligibilities.${v}`),
  })),
)

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.autoDiscounts.name') },
  { key: 'type', label: t('dashboard.ops.autoDiscounts.type') },
  { key: 'eligibility', label: t('dashboard.ops.autoDiscounts.eligibility') },
  { key: 'combinable', label: t('dashboard.ops.autoDiscounts.combinable') },
  { key: 'dates', label: t('dashboard.ops.autoDiscounts.dates') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])

function submit() {
  if (!form.name.trim() || !form.startsAt || !form.endsAt) return
  store.add({
    name: form.name.trim(),
    type: form.type,
    value: Number(form.value) || 0,
    eligibility: form.eligibility,
    combinable: form.combinable,
    startsAt: form.startsAt,
    endsAt: form.endsAt,
  })
  Object.assign(form, { name: '', type: 'percentage', value: '', eligibility: 'all', startsAt: '', endsAt: '', combinable: false })
  isOpen.value = false
}
</script>
