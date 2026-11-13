<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.expressCheckout.title')"
          :subtitle="t('dashboard.ops.expressCheckout.subtitle')"
        >
          <LazyVButton :label="t('common.save')" />
        </ops-page-header>

        <LazyVAlertBanner v-if="testMode" variant="warning" icon="ph:flask-bold" :dismissible="false">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <span>{{ t('dashboard.ops.expressCheckout.testBanner') }}</span>
            <LazyVButton
              size="none"
              variant="secondary"
              className="px-3 py-1 text-[11px]"
              :label="t('dashboard.ops.expressCheckout.goLive')"
              @click="testMode = false"
            />
          </div>
        </LazyVAlertBanner>

        <section v-for="group in groups" :key="group.kind" class="space-y-3">
          <div>
            <h2 class="text-sm font-semibold">{{ t(`dashboard.ops.expressCheckout.groups.${group.kind}.title`) }}</h2>
            <p class="text-[11px] text-tx-muted mt-1">{{ t(`dashboard.ops.expressCheckout.groups.${group.kind}.hint`) }}</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article v-for="p in group.items" :key="p.id" class="card p-4 space-y-4">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div
                    class="w-9 h-9 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center shrink-0"
                  >
                    <Icon :name="p.icon" class="text-lg text-tx-secondary" />
                  </div>
                  <div class="min-w-0">
                    <h3 class="text-sm font-semibold truncate">{{ t(`dashboard.ops.expressCheckout.providers.${p.id}`) }}</h3>
                    <status-pill :tone="connectionTones[p.connection]">
                      {{ t(`dashboard.ops.expressCheckout.connection.${p.connection}`) }}
                    </status-pill>
                  </div>
                </div>
                <LazyVButton
                  v-if="p.connection === 'not_connected'"
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.expressCheckout.connect')"
                  @click="connect(p.id)"
                />
                <LazyVSwitchButton v-else v-model="p.enabled" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <LazyVInput
                  :modelValue="String(p.minAmount)"
                  type="number"
                  inputClass="font-mono"
                  :disabled="p.connection !== 'connected'"
                  :label="t('dashboard.ops.expressCheckout.minAmount')"
                  @update:modelValue="(v: string | number | boolean) => (p.minAmount = Number(v))"
                />
                <LazyVInput
                  :modelValue="String(p.maxAmount)"
                  type="number"
                  inputClass="font-mono"
                  :disabled="p.connection !== 'connected'"
                  :label="t('dashboard.ops.expressCheckout.maxAmount')"
                  @update:modelValue="(v: string | number | boolean) => (p.maxAmount = Number(v))"
                />
              </div>

              <div v-if="p.plans.length" class="space-y-2">
                <p class="text-[10px] font-bold text-tx-secondary tracking-wider">
                  {{ t('dashboard.ops.expressCheckout.plans') }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="m in p.plans"
                    :key="m"
                    type="button"
                    :class="[
                      'px-3 py-1 rounded-full text-[11px] font-mono font-semibold border transition-colors',
                      p.enabledPlans.includes(m)
                        ? 'bg-brand-dim text-brand border-brand/30'
                        : 'bg-bg-elevated text-tx-muted border-border-subtle hover:border-border-default',
                    ]"
                    @click="togglePlan(p.id, m)"
                  >
                    {{ t('dashboard.ops.expressCheckout.months', { n: m }) }}
                  </button>
                </div>
              </div>

              <p class="text-[11px] text-tx-secondary flex items-center justify-between border-t border-border-subtle pt-3">
                <span>{{ t('dashboard.ops.expressCheckout.fee') }}</span>
                <span class="font-mono text-tx-primary">{{ p.feePercent }}%</span>
              </p>
            </article>
          </div>
        </section>

        <section class="card p-4 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-start gap-3 max-w-xl">
            <Icon name="ph:lightning-bold" class="text-xl text-brand mt-0.5 shrink-0" />
            <div>
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.expressCheckout.oneClick.title') }}</h2>
              <p class="text-[11px] text-tx-muted mt-1">{{ t('dashboard.ops.expressCheckout.oneClick.hint') }}</p>
            </div>
          </div>
          <LazyVSwitchButton v-model="oneClick" :label="t('common.enabled')" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { WalletProviderKind } from '@/types/checkoutExtras'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.expressCheckout.title') })

const store = useChkWalletsStore()
const { testMode, oneClick } = storeToRefs(store)
const { byKind, connect, togglePlan } = store

const kinds: WalletProviderKind[] = ['express', 'wallet', 'bnpl']
const groups = computed(() => kinds.map((kind) => ({ kind, items: byKind(kind) })))

const connectionTones: Record<string, Tone> = { connected: 'success', not_connected: 'neutral', pending: 'warning' }
</script>
