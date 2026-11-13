<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.taxes.title')"
          :subtitle="t('dashboard.ops.taxes.subtitle')"
        >
          <LazyVButton :label="t('dashboard.ops.common.save')" />
        </ops-page-header>

        <LazyVAlertBanner variant="info" icon="ph:receipt-bold" :dismissible="false">
          {{ t('dashboard.ops.taxes.etaNotice') }}
        </LazyVAlertBanner>

        <section class="card p-4 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.taxes.vat') }}</h2>
              <p class="text-[11px] text-tx-muted mt-1">{{ t('dashboard.ops.taxes.vatHint') }}</p>
            </div>
            <LazyVSwitchButton v-model="vatEnabled" :label="t('dashboard.ops.taxes.enabled')" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <LazyVInput
              :modelValue="String(defaultRate)"
              type="number"
              :label="t('dashboard.ops.taxes.defaultRate')"
              :disabled="!vatEnabled"
              inputClass="font-mono"
              @update:modelValue="(v: string | number | boolean) => (defaultRate = Number(v))"
            />
            <LazyVSwitchButton v-model="pricesIncludeTax" :label="t('dashboard.ops.taxes.pricesInclude')" />
          </div>
          <p class="text-[11px] text-tx-secondary">
            {{ t('dashboard.ops.taxes.example') }}
            <span class="font-mono text-tx-primary">{{ money(sample) }}</span>
            <span class="font-mono"> ({{ pricesIncludeTax ? t('dashboard.ops.taxes.inclTax') : t('dashboard.ops.taxes.exclTax') }})</span>
          </p>
        </section>

        <section class="card overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.taxes.regions') }}</h2>
            <LazyVButton
              size="none"
              variant="secondary"
              className="px-3 py-1.5 text-[11px]"
              icon="ph:plus-bold"
              :label="t('dashboard.ops.taxes.addRegion')"
              @click="addOverride"
            />
          </div>
          <LazyVTable v-if="overrides.length" :headers="headers" :items="overrides">
            <template #cell(region)="{ item }">
              <span class="text-sm font-medium">{{ item.region }}</span>
            </template>
            <template #cell(governorates)="{ item }">
              <span class="text-xs text-tx-secondary">{{ item.governorates }}</span>
            </template>
            <template #cell(rate)="{ item }">
              <span class="font-mono text-sm">{{ item.rate }}%</span>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.common.delete')"
                  @click="removeOverride(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.taxes.noRegions')"
            :hint="t('dashboard.ops.taxes.noRegionsHint')"
            icon="ph:map-trifold-bold"
          />
        </section>

        <section class="card p-4 space-y-3">
          <div>
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.taxes.exempt') }}</h2>
            <p class="text-[11px] text-tx-muted mt-1">{{ t('dashboard.ops.taxes.exemptHint') }}</p>
          </div>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li
              v-for="c in exemptCategories"
              :key="c.id"
              class="flex items-center justify-between bg-bg-elevated border border-border-subtle rounded-md px-3 py-2"
            >
              <span class="text-sm">{{ t(`dashboard.ops.taxes.categories.${c.id}`) }}</span>
              <LazyVSwitchButton v-model="c.exempt" />
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.taxes.title') })

const store = useStoreTaxesStore()
const { vatEnabled, defaultRate, pricesIncludeTax, overrides, exemptCategories } = storeToRefs(store)
const { addOverride, removeOverride } = store

const sample = computed(() => {
  const base = 1000
  if (!vatEnabled.value) return base
  return pricesIncludeTax.value ? base : base * (1 + defaultRate.value / 100)
})

const headers = computed(() => [
  { key: 'region', label: t('dashboard.ops.taxes.region') },
  { key: 'governorates', label: t('dashboard.ops.taxes.governorates') },
  { key: 'rate', label: t('dashboard.ops.taxes.rate') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
