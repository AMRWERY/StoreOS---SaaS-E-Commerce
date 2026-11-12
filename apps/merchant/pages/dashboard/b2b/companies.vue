<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.b2b.companies.title')"
          :subtitle="t('dashboard.ops.b2b.companies.subtitle')"
          :count="companies.length"
        >
          <LazyVButton icon="ph:plus-bold" iconPosition="left" :label="t('dashboard.ops.b2b.companies.add')" @click="isOpen = true" />
        </ops-page-header>

        <eco-b2b-tabs />

        <section class="card overflow-hidden">
          <LazyVTable v-if="companies.length" :headers="headers" :items="companies">
            <template #cell(name)="{ item }">
              <span class="text-sm font-semibold">{{ item.name }}</span>
            </template>
            <template #cell(locations)="{ item }">
              <span class="font-mono text-sm">{{ item.locations }}</span>
            </template>
            <template #cell(buyers)="{ item }">
              <span class="font-mono text-sm">{{ item.buyers }}</span>
            </template>
            <template #cell(terms)="{ item }">
              <status-pill :tone="item.terms === 'net30' ? 'info' : 'neutral'">
                {{ t(`dashboard.ops.b2b.terms.${item.terms}`) }}
              </status-pill>
            </template>
            <template #cell(creditLimit)="{ item }">
              <span class="font-mono text-sm">{{ money(item.creditLimit) }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">{{ t(`dashboard.ops.b2b.status.${item.status}`) }}</status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.b2b.companies.empty')"
            :hint="t('dashboard.ops.b2b.companies.emptyHint')"
            icon="ph:buildings-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.b2b.companies.add')"
      :subtitle="t('dashboard.ops.b2b.companies.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.name" :label="t('dashboard.ops.b2b.companies.name')" required />
        <div class="grid grid-cols-2 gap-4">
          <LazyVInput v-model="form.locations" type="number" :label="t('dashboard.ops.b2b.companies.locations')" />
          <LazyVInput v-model="form.buyers" type="number" :label="t('dashboard.ops.b2b.companies.buyers')" />
        </div>
        <LazyVSelectInput v-model="form.terms" :label="t('dashboard.ops.b2b.companies.terms')" :options="termOptions" />
        <LazyVInput v-model="form.creditLimit" type="number" :label="t('dashboard.ops.b2b.companies.creditLimit')" />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.b2b.companies.add')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.b2b.companies.title') })

const store = useEcoB2bStore()
const { companies } = storeToRefs(store)

const isOpen = ref(false)
const form = reactive({ name: '', locations: '1' as string | number, buyers: '1' as string | number, terms: 'net30', creditLimit: '' as string | number })

const tones: Record<string, Tone> = { active: 'success', pending: 'warning', suspended: 'danger' }

const termOptions = computed(() => [
  { value: 'net30', label: t('dashboard.ops.b2b.terms.net30') },
  { value: 'prepaid', label: t('dashboard.ops.b2b.terms.prepaid') },
])

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.b2b.companies.name') },
  { key: 'locations', label: t('dashboard.ops.b2b.companies.locations') },
  { key: 'buyers', label: t('dashboard.ops.b2b.companies.buyers') },
  { key: 'terms', label: t('dashboard.ops.b2b.companies.terms') },
  { key: 'creditLimit', label: t('dashboard.ops.b2b.companies.creditLimit') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])

function submit() {
  if (!form.name.trim()) return
  store.addCompany({
    name: form.name.trim(),
    locations: Number(form.locations) || 1,
    buyers: Number(form.buyers) || 1,
    terms: form.terms === 'prepaid' ? 'prepaid' : 'net30',
    creditLimit: Number(form.creditLimit) || 0,
  })
  Object.assign(form, { name: '', locations: '1', buyers: '1', terms: 'net30', creditLimit: '' })
  isOpen.value = false
}
</script>
