<template>
  <div>
    <platform-page-header :title="t('platform.config.title')" :subtitle="t('platform.config.subtitle')" />

    <section class="card overflow-hidden">
      <div class="border-b border-border-subtle px-4 pt-3.5">
        <v-tabs v-model="tab" :tabs="tabs" />
      </div>

      <!-- General -->
      <div v-if="tab === 'general'" class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <v-input v-model="config.general.name" :label="t('platform.config.general.name')" />
        <v-input v-model="config.general.supportEmail" type="email" :label="t('platform.config.general.supportEmail')" />
        <v-select-input v-model="config.general.locale" :label="t('platform.config.general.locale')" :options="localeOptions" />
        <v-select-input v-model="config.general.currency" :label="t('platform.config.general.currency')" :options="currencyOptions" />
        <v-input
          :model-value="config.general.trialDays"
          type="number"
          :label="t('platform.config.general.trialDays')"
          input-class="font-mono"
          @update:model-value="(v: string | number | boolean) => (config.general.trialDays = Number(v))"
        />
      </div>

      <!-- Fees & limits -->
      <div v-else-if="tab === 'fees'" class="space-y-6 p-4">
        <div>
          <h3 class="mb-3 text-sm font-bold">{{ t('platform.config.fees.planFees') }}</h3>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-5">
            <v-input
              v-for="plan in feePlans"
              :key="plan"
              :model-value="config.planFees[plan]"
              type="number"
              :label="`${t(`platform.plan.${plan}`)} (%)`"
              input-class="font-mono"
              @update:model-value="(v: string | number | boolean) => (config.planFees[plan] = Number(v))"
            />
            <v-input
              :model-value="config.codFee"
              type="number"
              :label="t('platform.config.fees.codFee')"
              input-class="font-mono"
              @update:model-value="(v: string | number | boolean) => (config.codFee = Number(v))"
            />
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-sm font-bold">{{ t('platform.config.fees.rateLimits') }}</h3>
          <div class="overflow-hidden rounded-md border border-border-subtle">
            <v-table v-if="config.rateLimits.length" :headers="rateHeaders" :items="config.rateLimits">
              <template #cell(key)="{ item }">
                <span class="text-xs text-tx-secondary">{{ t(`platform.config.rateKeys.${item.key}`) }}</span>
              </template>
              <template #cell(perMinute)="{ item }">
                <input
                  :value="item.perMinute"
                  type="number"
                  min="1"
                  class="w-24 rounded-md border border-border-subtle bg-bg-elevated px-2 py-1 text-end font-mono text-xs text-tx-primary outline-none focus:border-brand"
                  @input="item.perMinute = Number(($event.target as HTMLInputElement).value)"
                />
              </template>
            </v-table>
            <platform-empty-state v-else :title="t('platform.config.fees.rateEmpty')" icon="ph:gauge" />
          </div>
        </div>
      </div>

      <!-- Providers -->
      <div v-else-if="tab === 'providers'">
        <v-table v-if="config.providers.length" :headers="providerHeaders" :items="config.providers">
          <template #cell(name)="{ item }">
            <span class="text-xs font-semibold text-tx-primary">{{ item.name }}</span>
          </template>
          <template #cell(kind)="{ item }">
            <platform-status-pill :label="t(`platform.config.providers.kind.${item.kind}`)" :tone="item.kind === 'payment' ? 'info' : 'purple'" />
          </template>
          <template #cell(enabled)="{ item }">
            <v-switch-button
              :model-value="item.enabled"
              :label="item.enabled ? t('platform.config.providers.enabled') : t('platform.config.providers.disabled')"
              @update:model-value="(v: boolean) => (item.enabled = v)"
            />
          </template>
        </v-table>
        <platform-empty-state v-else :title="t('platform.config.providers.empty')" icon="ph:plugs" />
      </div>

      <!-- Maintenance -->
      <div v-else class="space-y-4 p-4">
        <div
          class="flex flex-wrap items-center justify-between gap-3 rounded-md border px-4 py-3"
          :class="config.maintenance.enabled ? 'border-warning bg-warning-dim' : 'border-border-subtle bg-bg-base'"
        >
          <div class="min-w-0">
            <p class="text-xs font-semibold text-tx-primary">{{ t('platform.config.maintenance.mode') }}</p>
            <p class="mt-0.5 text-[11px] text-tx-muted">{{ t('platform.config.maintenance.modeHint') }}</p>
          </div>
          <v-switch-button
            :model-value="config.maintenance.enabled"
            :label="config.maintenance.enabled ? t('platform.config.maintenance.on') : t('platform.config.maintenance.off')"
            @update:model-value="askMaintenance"
          />
        </div>
        <v-textarea-input v-model="config.maintenance.messageEn" :label="t('platform.config.maintenance.messageEn')" :rows="2" />
        <v-textarea-input v-model="config.maintenance.messageAr" :label="t('platform.config.maintenance.messageAr')" :rows="2" dir="rtl" textarea-class="text-start" />
      </div>

      <div class="flex items-center justify-end gap-3 border-t border-border-subtle px-4 py-3">
        <span v-if="savedTab === tab" class="text-[11px] text-success">{{ t('platform.config.saved') }}</span>
        <v-button :label="t('platform.common.save')" @click="savedTab = tab" />
      </div>
    </section>

    <v-dialog v-model="confirmOpen" :title="pendingValue ? t('platform.config.maintenance.enableTitle') : t('platform.config.maintenance.disableTitle')">
      <p class="text-xs text-tx-secondary">
        {{ pendingValue ? t('platform.config.maintenance.enableBody') : t('platform.config.maintenance.disableBody') }}
      </p>
      <template #footer>
        <v-button variant="secondary" :label="t('platform.common.cancel')" @click="confirmOpen = false" />
        <v-button :label="t('platform.common.confirm')" @click="confirmMaintenance" />
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { ConfigPlan } from '@/types/platformOps'

definePageMeta({ layout: 'platform' })

const { t } = useI18n()

useSeoMeta({ title: t('platform.config.title'), robots: 'noindex, nofollow' })

const config = usePlatformConfigStore()

const tab = ref('general')
const savedTab = ref('')
watch(tab, () => {
  savedTab.value = ''
})

const tabs = computed(() => [
  { name: t('platform.config.tabs.general'), value: 'general' },
  { name: t('platform.config.tabs.fees'), value: 'fees' },
  { name: t('platform.config.tabs.providers'), value: 'providers' },
  { name: t('platform.config.tabs.maintenance'), value: 'maintenance' },
])

const feePlans: ConfigPlan[] = ['free', 'starter', 'growth', 'enterprise']

const localeOptions = computed(() => [
  { value: 'en', label: t('platform.config.locales.en') },
  { value: 'ar', label: t('platform.config.locales.ar') },
])
const currencyOptions = ['EGP', 'SAR', 'AED', 'USD']

const rateHeaders = computed(() => [
  { label: t('platform.config.fees.endpoint'), key: 'key' },
  { label: t('platform.config.fees.perMinute'), key: 'perMinute', align: 'end' as const },
])
const providerHeaders = computed(() => [
  { label: t('platform.common.name'), key: 'name' },
  { label: t('platform.config.providers.type'), key: 'kind' },
  { label: t('platform.common.status'), key: 'enabled' },
])

const confirmOpen = ref(false)
const pendingValue = ref(false)

const askMaintenance = (value: boolean) => {
  pendingValue.value = value
  confirmOpen.value = true
}
const confirmMaintenance = () => {
  config.maintenance.enabled = pendingValue.value
  confirmOpen.value = false
}
</script>
