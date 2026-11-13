<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.giftCards.title')"
          :subtitle="t('dashboard.ops.giftCards.subtitle')"
          :count="giftCards.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.giftCards.issue')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.giftCards.stats.issued')"
            :value="money(issuedTotal)"
            iconName="ph:gift-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.giftCards.stats.outstanding')"
            :value="money(outstanding)"
            iconName="ph:wallet-bold"
            iconColor="text-warning"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.giftCards.stats.active')"
            :value="giftCards.filter((g) => g.status === 'active').length"
            iconName="ph:check-circle-bold"
            iconColor="text-success"
          />
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="giftCards.length" :headers="headers" :items="giftCards">
            <template #cell(code)="{ item }">
              <span class="font-mono text-sm font-semibold tracking-wider text-brand">{{ item.code }}</span>
            </template>
            <template #cell(initial)="{ item }">
              <span class="font-mono text-sm">{{ money(item.initial) }}</span>
            </template>
            <template #cell(balance)="{ item }">
              <span class="font-mono text-sm font-semibold">{{ money(item.balance) }}</span>
            </template>
            <template #cell(expiresAt)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.expiresAt }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.giftCards.status.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <button
                v-if="item.status === 'active'"
                class="text-[11px] font-semibold text-tx-muted hover:text-danger transition-colors"
                @click="disable(item.code)"
              >
                {{ t('dashboard.ops.giftCards.disable') }}
              </button>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.giftCards.empty')"
            :hint="t('dashboard.ops.giftCards.emptyHint')"
            icon="ph:gift-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.giftCards.issue')"
      :subtitle="t('dashboard.ops.giftCards.issueSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.recipient" :label="t('dashboard.ops.giftCards.recipient')" required />
        <LazyVInput v-model="form.initial" type="number" :label="t('dashboard.ops.giftCards.value')" required />
        <LazyVInput v-model="form.expiresAt" type="date" :label="t('dashboard.ops.giftCards.expires')" required />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.giftCards.issue')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.giftCards.title') })

const store = useGiftCardsStore()
const { giftCards } = storeToRefs(store)
const { disable } = store

const isOpen = ref(false)
const form = reactive({ recipient: '', initial: '' as string | number, expiresAt: '' })

const issuedTotal = computed(() => giftCards.value.reduce((s, g) => s + g.initial, 0))
const outstanding = computed(() =>
  giftCards.value.filter((g) => g.status === 'active').reduce((s, g) => s + g.balance, 0),
)

const tones: Record<string, Tone> = {
  active: 'success',
  redeemed: 'neutral',
  expired: 'warning',
  disabled: 'danger',
}

const headers = computed(() => [
  { key: 'code', label: t('dashboard.ops.giftCards.code') },
  { key: 'recipient', label: t('dashboard.ops.giftCards.recipient') },
  { key: 'initial', label: t('dashboard.ops.giftCards.value') },
  { key: 'balance', label: t('dashboard.ops.giftCards.balance') },
  { key: 'expiresAt', label: t('dashboard.ops.giftCards.expires') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])

function submit() {
  const amount = Number(form.initial)
  if (!form.recipient.trim() || !amount || !form.expiresAt) return
  store.issue({ recipient: form.recipient.trim(), initial: amount, expiresAt: form.expiresAt })
  Object.assign(form, { recipient: '', initial: '', expiresAt: '' })
  isOpen.value = false
}
</script>
