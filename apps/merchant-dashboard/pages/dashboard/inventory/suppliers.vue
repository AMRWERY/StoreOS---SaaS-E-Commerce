<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.suppliers.title')"
          :subtitle="t('dashboard.ops.suppliers.subtitle')"
          :count="suppliers.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.suppliers.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <section class="card overflow-hidden">
          <LazyVTable v-if="suppliers.length" :headers="headers" :items="suppliers">
            <template #cell(name)="{ item }">
              <span class="text-sm font-semibold">{{ item.name }}</span>
            </template>
            <template #cell(phone)="{ item }">
              <span class="font-mono text-xs" dir="ltr">{{ item.phone }}</span>
            </template>
            <template #cell(leadDays)="{ item }">
              <span class="font-mono text-xs">{{ item.leadDays }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.suppliers.status.${item.status}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.suppliers.empty')"
            :hint="t('dashboard.ops.suppliers.emptyHint')"
            icon="ph:storefront-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.suppliers.create')"
      :subtitle="t('dashboard.ops.suppliers.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.name" :label="t('dashboard.ops.suppliers.name')" required />
        <LazyVInput v-model="form.contact" :label="t('dashboard.ops.suppliers.contact')" required />
        <LazyVInput v-model="form.phone" :label="t('dashboard.ops.suppliers.phone')" required />
        <LazyVInput v-model="form.city" :label="t('dashboard.ops.suppliers.city')" required />
        <LazyVInput v-model="form.leadDays" type="number" :label="t('dashboard.ops.suppliers.leadDays')" required />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.suppliers.create')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.suppliers.title') })

const store = useCatalogSuppliersStore()
const { suppliers } = storeToRefs(store)

const isOpen = ref(false)
const form = reactive({ name: '', contact: '', phone: '', city: '', leadDays: '' as string | number })

const tones: Record<string, Tone> = { active: 'success', inactive: 'neutral' }

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.suppliers.name') },
  { key: 'contact', label: t('dashboard.ops.suppliers.contact') },
  { key: 'phone', label: t('dashboard.ops.suppliers.phone') },
  { key: 'city', label: t('dashboard.ops.suppliers.city') },
  { key: 'leadDays', label: t('dashboard.ops.suppliers.leadDays') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])

function submit() {
  const leadDays = Number(form.leadDays)
  if (!form.name.trim() || !form.contact.trim() || !form.phone.trim() || !form.city.trim() || !leadDays) return
  store.add({
    name: form.name.trim(),
    contact: form.contact.trim(),
    phone: form.phone.trim(),
    city: form.city.trim(),
    leadDays,
  })
  Object.assign(form, { name: '', contact: '', phone: '', city: '', leadDays: '' })
  isOpen.value = false
}
</script>
