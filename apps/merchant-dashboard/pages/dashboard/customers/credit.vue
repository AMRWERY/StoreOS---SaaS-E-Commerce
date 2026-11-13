<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.storeCredit.title')"
          :subtitle="t('dashboard.ops.storeCredit.subtitle')"
          :count="balances.length"
        >
          <LazyVButton
            icon="ph:coins-bold"
            iconPosition="left"
            :label="t('dashboard.ops.storeCredit.adjust')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.storeCredit.stats.outstanding')"
            :value="money(outstanding)"
            iconName="ph:wallet-bold"
            iconColor="text-warning"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.storeCredit.stats.issued')"
            :value="money(issuedThisMonth)"
            iconName="ph:plus-circle-bold"
            iconColor="text-success"
          />
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="balances.length" :headers="balanceHeaders" :items="balances">
            <template #cell(customer)="{ item }">
              <span class="text-sm font-semibold">{{ item.customer }}</span>
            </template>
            <template #cell(balance)="{ item }">
              <span class="font-mono text-sm">{{ money(item.balance) }}</span>
            </template>
            <template #cell(lastActivity)="{ item }">
              <span class="font-mono text-xs">{{ item.lastActivity }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.storeCredit.empty')"
            :hint="t('dashboard.ops.storeCredit.emptyHint')"
            icon="ph:wallet-bold"
          />
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.storeCredit.ledger') }}</h2>
          </div>
          <LazyVTable v-if="ledger.length" :headers="ledgerHeaders" :items="ledger">
            <template #cell(date)="{ item }">
              <span class="font-mono text-xs">{{ item.date }}</span>
            </template>
            <template #cell(customer)="{ item }">
              <span class="text-sm">{{ item.customer }}</span>
            </template>
            <template #cell(type)="{ item }">
              <status-pill :tone="item.type === 'add' ? 'success' : 'danger'">
                {{ t(`dashboard.ops.storeCredit.types.${item.type}`) }}
              </status-pill>
            </template>
            <template #cell(amount)="{ item }">
              <span class="font-mono text-sm" :class="item.type === 'add' ? 'text-success' : 'text-danger'">
                {{ item.type === 'add' ? '+' : '-' }}{{ money(item.amount) }}
              </span>
            </template>
            <template #cell(balanceAfter)="{ item }">
              <span class="font-mono text-sm">{{ money(item.balanceAfter) }}</span>
            </template>
            <template #cell(actor)="{ item }">
              <span class="text-xs text-tx-secondary">{{ item.actor }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.storeCredit.emptyLedger')"
            icon="ph:list-bullets-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.storeCredit.adjust')"
      :subtitle="t('dashboard.ops.storeCredit.adjustSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVSelectInput v-model="form.customerId" :label="t('dashboard.ops.common.customer')" :options="customerOptions" />
        <LazyVSelectInput v-model="form.type" :label="t('dashboard.ops.storeCredit.operation')" :options="typeOptions" />
        <LazyVInput v-model="form.amount" type="number" :label="t('dashboard.ops.common.amount')" class="font-mono" required />
        <LazyVTextareaInput v-model="form.reason" :rows="3" :label="t('dashboard.ops.storeCredit.reason')" />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.storeCredit.apply')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.storeCredit.title') })

const store = useCatxStoreCreditStore()
const { balances, ledger, outstanding, issuedThisMonth } = storeToRefs(store)

const isOpen = ref(false)
const form = reactive<{ customerId: string; type: 'add' | 'deduct'; amount: string | number; reason: string }>({
  customerId: '',
  type: 'add',
  amount: '',
  reason: '',
})

const customerOptions = computed(() => balances.value.map((b) => ({ value: b.id, label: b.customer })))
const typeOptions = computed(() => [
  { value: 'add', label: t('dashboard.ops.storeCredit.types.add') },
  { value: 'deduct', label: t('dashboard.ops.storeCredit.types.deduct') },
])

watchEffect(() => {
  if (!form.customerId && balances.value.length) form.customerId = balances.value[0]!.id
})

const balanceHeaders = computed(() => [
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'balance', label: t('dashboard.ops.storeCredit.balance') },
  { key: 'lastActivity', label: t('dashboard.ops.storeCredit.lastActivity') },
])

const ledgerHeaders = computed(() => [
  { key: 'date', label: t('dashboard.ops.common.date') },
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'type', label: t('dashboard.ops.storeCredit.operation') },
  { key: 'amount', label: t('dashboard.ops.common.amount') },
  { key: 'balanceAfter', label: t('dashboard.ops.storeCredit.balanceAfter') },
  { key: 'actor', label: t('dashboard.ops.storeCredit.actor') },
])

function submit() {
  const amount = Number(form.amount)
  if (!form.customerId || !(amount > 0)) return
  store.adjust(form.customerId, form.type, amount)
  form.amount = ''
  form.reason = ''
  isOpen.value = false
}
</script>
