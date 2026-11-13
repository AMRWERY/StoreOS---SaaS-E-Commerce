<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.checkoutSettings.title')"
          :subtitle="t('dashboard.ops.checkoutSettings.subtitle')"
        >
          <span v-if="saved" class="text-[11px] text-success">{{ t('dashboard.ops.checkoutSettings.saved') }}</span>
          <LazyVButton :label="t('dashboard.ops.common.save')" @click="saved = true" />
        </ops-page-header>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-semibold">{{ t('dashboard.ops.checkoutSettings.address') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyVSwitchButton v-model="requireGovernorate" :label="t('dashboard.ops.checkoutSettings.reqGovernorate')" />
            <LazyVSwitchButton v-model="requireCity" :label="t('dashboard.ops.checkoutSettings.reqCity')" />
            <LazyVSwitchButton v-model="requireArea" :label="t('dashboard.ops.checkoutSettings.reqArea')" />
            <LazyVSwitchButton v-model="landmarkField" :label="t('dashboard.ops.checkoutSettings.landmark')" />
            <LazyVSwitchButton v-model="mapPin" :label="t('dashboard.ops.checkoutSettings.mapPin')" />
          </div>
        </section>

        <section class="card p-4 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.checkoutSettings.phone') }}</h2>
              <p class="text-[11px] text-tx-muted mt-1">{{ t('dashboard.ops.checkoutSettings.phoneHint') }}</p>
            </div>
            <LazyVSwitchButton v-model="normalizePhone" :label="t('dashboard.ops.checkoutSettings.normalize')" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <LazyVInput
              v-model="samplePhone"
              :label="t('dashboard.ops.checkoutSettings.sampleInput')"
              inputClass="font-mono"
            />
            <div class="space-y-2">
              <p class="text-[10px] font-bold text-tx-secondary tracking-wider">{{ t('dashboard.ops.checkoutSettings.preview') }}</p>
              <p class="font-mono text-sm bg-bg-elevated border border-border-subtle rounded-md px-3 py-2 min-h-[38px]">
                {{ normalizePhone ? normalize(samplePhone) : samplePhone }}
              </p>
            </div>
          </div>
        </section>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-semibold">{{ t('dashboard.ops.checkoutSettings.cod') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <LazyVSwitchButton v-model="codConfirmation" :label="t('dashboard.ops.checkoutSettings.codConfirm')" />
            <LazyVInput
              v-model="maxCod"
              type="number"
              :label="t('dashboard.ops.checkoutSettings.maxCod')"
              inputClass="font-mono"
            />
            <LazyVSwitchButton v-model="depositHighRisk" :label="t('dashboard.ops.checkoutSettings.deposit')" />
            <LazyVInput
              v-model="depositPercent"
              type="number"
              :label="t('dashboard.ops.checkoutSettings.depositPercent')"
              :disabled="!depositHighRisk"
              inputClass="font-mono"
            />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-bold text-tx-secondary tracking-wider">{{ t('dashboard.ops.checkoutSettings.allowed') }}</p>
              <span class="font-mono text-[11px] text-tx-muted">{{ allowedGovernorates.length }} / {{ all.length }}</span>
            </div>
            <ul class="grid grid-cols-2 md:grid-cols-4 gap-2">
              <li v-for="g in all" :key="g">
                <button
                  type="button"
                  class="w-full flex items-center gap-2 px-3 py-2 rounded-md border text-xs text-start transition-colors duration-200"
                  :class="allowedGovernorates.includes(g)
                    ? 'border-brand bg-brand-dim text-brand'
                    : 'border-border-subtle bg-bg-elevated text-tx-secondary'"
                  @click="toggleGovernorate(g)"
                >
                  <Icon :name="allowedGovernorates.includes(g) ? 'ph:check-square-bold' : 'ph:square-bold'" />
                  {{ t(`dashboard.ops.checkoutSettings.gov.${g}`) }}
                </button>
              </li>
            </ul>
          </div>
        </section>

        <section class="card p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.checkoutSettings.guest') }}</h2>
            <p class="text-[11px] text-tx-muted mt-1">{{ t('dashboard.ops.checkoutSettings.guestHint') }}</p>
          </div>
          <LazyVSwitchButton v-model="guestCheckout" :label="t('dashboard.ops.checkoutSettings.guestLabel')" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EG_GOVERNORATES } from '@/stores/checkoutSettings'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.checkoutSettings.title') })

const store = useCheckoutSettingsStore()
const {
  requireGovernorate, requireCity, requireArea, landmarkField, mapPin, normalizePhone, guestCheckout,
  codConfirmation, maxCod, depositHighRisk, depositPercent, allowedGovernorates,
} = storeToRefs(store)
const { toggleGovernorate, normalize } = store

const all = EG_GOVERNORATES
const samplePhone = ref('010 1234 5678')
const saved = ref(false)
</script>
