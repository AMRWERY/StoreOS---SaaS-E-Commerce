<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-6xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.loyalty.title')"
          :subtitle="t('dashboard.ops.loyalty.subtitle')"
          :count="members.length"
        >
          <LazyVSwitchButton v-model="enabled" :label="t('dashboard.ops.loyalty.enable')" />
        </ops-page-header>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.loyalty.stats.members')"
            :value="members.length"
            iconName="ph:users-three-bold"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.loyalty.stats.outstanding')"
            :value="outstandingPoints.toLocaleString('en-US')"
            iconName="ph:star-four-bold"
            iconColor="text-warning"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.loyalty.stats.liability')"
            :value="money(liability)"
            iconName="ph:wallet-bold"
            iconColor="text-info"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.loyalty.stats.referrals')"
            :value="referral.count"
            iconName="ph:share-network-bold"
            iconColor="text-success"
            valueColor="font-mono"
          />
        </div>

        <div :class="['grid grid-cols-1 lg:grid-cols-3 gap-6 transition-opacity', enabled ? '' : 'opacity-50']">
          <section class="card space-y-4 p-5 lg:col-span-1">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.loyalty.rules.title') }}</h2>
            <LazyVInput
              type="number"
              :label="t('dashboard.ops.loyalty.rules.pointsPerEgp')"
              :model-value="rules.pointsPerEgp"
              :disabled="!enabled"
              @update:model-value="rules.pointsPerEgp = Number($event) || 0"
            />
            <LazyVInput
              type="number"
              :label="t('dashboard.ops.loyalty.rules.signupBonus')"
              :model-value="rules.signupBonus"
              :disabled="!enabled"
              @update:model-value="rules.signupBonus = Number($event) || 0"
            />
            <LazyVInput
              type="number"
              :label="t('dashboard.ops.loyalty.rules.reviewBonus')"
              :model-value="rules.reviewBonus"
              :disabled="!enabled"
              @update:model-value="rules.reviewBonus = Number($event) || 0"
            />
            <LazyVInput
              type="number"
              :label="t('dashboard.ops.loyalty.rules.redeem')"
              :model-value="rules.redeemPointsPerEgp"
              :disabled="!enabled"
              @update:model-value="rules.redeemPointsPerEgp = Number($event) || 0"
            />
            <p class="text-[11px] text-tx-muted">
              {{ t('dashboard.ops.loyalty.rules.redeemHint', { n: rules.redeemPointsPerEgp }) }}
            </p>
          </section>

          <section class="card overflow-hidden lg:col-span-2">
            <div class="border-b border-border-subtle px-5 py-3">
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.loyalty.tiers.title') }}</h2>
            </div>
            <LazyVTable v-if="tiers.length" :headers="tierHeaders" :items="tiers">
              <template #cell(tier)="{ item }">
                <status-pill :tone="tierTones[item.id]">{{ t(`dashboard.ops.loyalty.tier.${item.id}`) }}</status-pill>
              </template>
              <template #cell(threshold)="{ item }">
                <span class="font-mono text-sm">{{ money(item.threshold) }}</span>
              </template>
              <template #cell(perks)="{ item }">
                <span class="font-mono text-xs text-tx-secondary">
                  {{ t('dashboard.ops.loyalty.tiers.perk', { discount: item.discountPct, mult: item.multiplier }) }}
                </span>
              </template>
            </LazyVTable>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.loyalty.tiers.empty')"
              :hint="t('dashboard.ops.loyalty.tiers.emptyHint')"
              icon="ph:medal-bold"
            />
          </section>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section class="card overflow-hidden lg:col-span-2">
            <div class="border-b border-border-subtle px-5 py-3">
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.loyalty.members.title') }}</h2>
            </div>
            <LazyVTable v-if="members.length" :headers="memberHeaders" :items="members">
              <template #cell(name)="{ item }">
                <div>
                  <p class="text-sm font-semibold">{{ item.name }}</p>
                  <p class="font-mono text-[10px] text-tx-muted">{{ item.id }}</p>
                </div>
              </template>
              <template #cell(tier)="{ item }">
                <status-pill :tone="tierTones[item.tier]">{{ t(`dashboard.ops.loyalty.tier.${item.tier}`) }}</status-pill>
              </template>
              <template #cell(points)="{ item }">
                <span class="font-mono text-sm font-semibold">{{ item.points.toLocaleString('en-US') }}</span>
              </template>
              <template #cell(orders)="{ item }">
                <span class="font-mono text-sm">{{ item.orders }}</span>
              </template>
            </LazyVTable>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.loyalty.members.empty')"
              :hint="t('dashboard.ops.loyalty.members.emptyHint')"
              icon="ph:users-three-bold"
            />
          </section>

          <section class="card space-y-4 p-5">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.loyalty.referral.title') }}</h2>
              <LazyVSwitchButton v-model="referral.enabled" />
            </div>
            <div :class="['space-y-4 transition-opacity', referral.enabled ? '' : 'opacity-50']">
              <LazyVInput
                type="number"
                :label="t('dashboard.ops.loyalty.referral.referrer')"
                :model-value="referral.referrerReward"
                :disabled="!referral.enabled"
                @update:model-value="referral.referrerReward = Number($event) || 0"
              />
              <LazyVInput
                type="number"
                :label="t('dashboard.ops.loyalty.referral.referee')"
                :model-value="referral.refereeReward"
                :disabled="!referral.enabled"
                @update:model-value="referral.refereeReward = Number($event) || 0"
              />
              <div class="space-y-2">
                <label class="text-[10px] font-bold tracking-wider text-tx-secondary">
                  {{ t('dashboard.ops.loyalty.referral.link') }}
                </label>
                <div class="flex items-center gap-2">
                  <code class="min-w-0 flex-1 truncate rounded-md border border-border-subtle bg-bg-elevated px-3 py-2 font-mono text-[11px] text-tx-secondary" dir="ltr">
                    {{ referral.link }}
                  </code>
                  <LazyVButton
                    variant="secondary"
                    size="sm"
                    :icon="copied ? 'ph:check-bold' : 'ph:copy-bold'"
                    iconPosition="left"
                    :label="copied ? t('dashboard.ops.loyalty.referral.copied') : t('dashboard.ops.loyalty.referral.copy')"
                    @click="copyLink"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.loyalty.title') })

const store = useMktLoyaltyStore()
const { enabled, rules, referral, tiers, members } = storeToRefs(store)

const outstandingPoints = computed(() => members.value.reduce((s, m) => s + m.points, 0))
const liability = computed(() =>
  rules.value.redeemPointsPerEgp ? Math.round(outstandingPoints.value / rules.value.redeemPointsPerEgp) : 0,
)

const tierTones: Record<string, Tone> = { silver: 'neutral', gold: 'warning', vip: 'purple' }

const tierHeaders = computed(() => [
  { key: 'tier', label: t('dashboard.ops.loyalty.tiers.cols.tier') },
  { key: 'threshold', label: t('dashboard.ops.loyalty.tiers.cols.threshold') },
  { key: 'perks', label: t('dashboard.ops.loyalty.tiers.cols.perks') },
])
const memberHeaders = computed(() => [
  { key: 'name', label: t('dashboard.ops.loyalty.members.cols.member') },
  { key: 'tier', label: t('dashboard.ops.loyalty.tiers.cols.tier') },
  { key: 'points', label: t('dashboard.ops.loyalty.members.cols.points') },
  { key: 'orders', label: t('dashboard.ops.loyalty.members.cols.orders') },
])

const copied = ref(false)
async function copyLink() {
  try {
    await navigator.clipboard.writeText(referral.value.link)
  } catch {
    // clipboard unavailable: still show feedback in this mock
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>
