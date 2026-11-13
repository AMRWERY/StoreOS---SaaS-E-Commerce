<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.abandonedCart.title')"
          :subtitle="t('dashboard.ops.abandonedCart.subtitle')"
        >
          <LazyVButton
            icon="ph:floppy-disk-bold"
            iconPosition="left"
            :label="t('dashboard.ops.common.save')"
            @click="save"
          />
        </ops-page-header>

        <div
          v-if="saved"
          class="flex items-center gap-3 rounded-md border border-success/30 bg-success-dim px-3 py-2.5 text-xs text-success"
        >
          <Icon name="ph:check-circle-bold" />
          {{ t('dashboard.ops.abandonedCart.saved') }}
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.abandonedCart.stats.abandoned')"
            :value="stats.abandoned"
            iconName="ph:shopping-cart-bold"
            iconColor="text-warning"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.abandonedCart.stats.recovered')"
            :value="stats.recovered"
            iconName="ph:arrow-counter-clockwise-bold"
            iconColor="text-success"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.abandonedCart.stats.rate')"
            :value="`${recoveryRate}%`"
            iconName="ph:percent-bold"
            iconColor="text-info"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.abandonedCart.stats.revenue')"
            :value="money(stats.revenue)"
            iconName="ph:coins-bold"
            iconColor="text-success"
            valueColor="font-mono"
          />
        </div>

        <section class="card p-5">
          <div class="mb-5">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.abandonedCart.flowTitle') }}</h2>
            <p class="mt-1 text-[11px] text-tx-muted">{{ t('dashboard.ops.abandonedCart.flowHint') }}</p>
          </div>

          <ol v-if="steps.length" class="relative space-y-4 ps-8">
            <span class="absolute bottom-2 start-[11px] top-2 w-px bg-border-default" aria-hidden="true" />
            <li v-for="s in steps" :key="s.id" class="relative">
              <span
                :class="[
                  'absolute -start-8 top-3 flex h-6 w-6 items-center justify-center rounded-full border text-sm',
                  s.enabled ? 'border-brand bg-brand-dim text-brand' : 'border-border-default bg-bg-elevated text-tx-muted',
                ]"
              >
                <Icon :name="channelIcons[s.channel]" />
              </span>
              <div :class="['rounded-md border border-border-subtle bg-bg-elevated p-4 transition-opacity', s.enabled ? '' : 'opacity-60']">
                <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-semibold">{{ t(`dashboard.ops.campaigns.channel.${s.channel}`) }}</span>
                    <status-pill tone="info">
                      <span class="font-mono">{{ t('dashboard.ops.abandonedCart.after', { n: s.delayHours }) }}</span>
                    </status-pill>
                    <status-pill v-if="s.couponPct" tone="purple">
                      <span class="font-mono">{{ t('dashboard.ops.abandonedCart.couponBadge', { n: s.couponPct }) }}</span>
                    </status-pill>
                  </div>
                  <LazyVSwitchButton v-model="s.enabled" :label="t('dashboard.ops.abandonedCart.enable')" />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LazyVInput
                    type="number"
                    :label="t('dashboard.ops.abandonedCart.delay')"
                    :model-value="s.delayHours"
                    :disabled="!s.enabled"
                    @update:model-value="s.delayHours = Number($event) || 0"
                  />
                  <LazyVInput
                    type="number"
                    :label="t('dashboard.ops.abandonedCart.coupon')"
                    :model-value="s.couponPct"
                    :disabled="!s.enabled"
                    @update:model-value="s.couponPct = Number($event) || 0"
                  />
                </div>
                <div class="mt-4">
                  <LazyVTextareaInput
                    v-model="s.template"
                    :label="t('dashboard.ops.abandonedCart.template')"
                    :disabled="!s.enabled"
                    :rows="3"
                  />
                  <p class="mt-1.5 font-mono text-[10px] text-tx-muted">{{ t('dashboard.ops.abandonedCart.variables') }}</p>
                </div>
              </div>
            </li>
          </ol>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.abandonedCart.empty')"
            :hint="t('dashboard.ops.abandonedCart.emptyHint')"
            icon="ph:shopping-cart-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.abandonedCart.title') })

const store = useMktAbandonedCartStore()
const { steps, stats } = storeToRefs(store)

const recoveryRate = computed(() =>
  stats.value.abandoned ? Math.round((stats.value.recovered / stats.value.abandoned) * 1000) / 10 : 0,
)

const channelIcons: Record<string, string> = {
  email: 'ph:envelope-simple-bold',
  sms: 'ph:chat-text-bold',
  whatsapp: 'ph:whatsapp-logo-bold',
}

const saved = ref(false)
function save() {
  saved.value = true
  setTimeout(() => (saved.value = false), 3000)
}
</script>
