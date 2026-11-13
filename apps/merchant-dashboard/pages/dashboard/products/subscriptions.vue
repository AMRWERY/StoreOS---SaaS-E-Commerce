<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.subscriptions.title')"
          :subtitle="t('dashboard.ops.subscriptions.subtitle')"
          :count="plans.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.subscriptions.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.subscriptions.stats.mrr')"
            :value="money(mrr)"
            iconName="ph:repeat-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.subscriptions.stats.active')"
            :value="activeCount"
            iconName="ph:users-bold"
            iconColor="text-info"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.subscriptions.stats.churned')"
            :value="cancelledCount"
            iconName="ph:user-minus-bold"
            iconColor="text-danger"
          />
        </div>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.subscriptions.plans') }}</h2>
          </div>
          <LazyVTable v-if="plans.length" :headers="planHeaders" :items="plans">
            <template #cell(name)="{ item }">
              <span class="text-sm font-semibold">{{ item.name }}</span>
            </template>
            <template #cell(interval)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.subscriptions.intervals.${item.interval}`) }}</span>
            </template>
            <template #cell(discount)="{ item }">
              <span class="font-mono text-sm">{{ item.discount }}%</span>
            </template>
            <template #cell(products)="{ item }">
              <span class="font-mono text-sm">{{ item.products }}</span>
            </template>
            <template #cell(subscribers)="{ item }">
              <span class="font-mono text-sm">{{ item.subscribers }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.subscriptions.emptyPlans')"
            :hint="t('dashboard.ops.subscriptions.emptyPlansHint')"
            icon="ph:repeat-bold"
          />
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.subscriptions.subscribers') }}</h2>
          </div>
          <LazyVTable v-if="subscribers.length" :headers="subHeaders" :items="subscribers">
            <template #cell(customer)="{ item }">
              <span class="text-sm font-semibold">{{ item.customer }}</span>
            </template>
            <template #cell(plan)="{ item }">
              <span class="text-xs text-tx-secondary">{{ planName(item.planId) }}</span>
            </template>
            <template #cell(nextBilling)="{ item }">
              <span class="font-mono text-xs">{{ item.nextBilling }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="statusTones[item.status]">
                {{ t(`dashboard.ops.subscriptions.statuses.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex gap-1 justify-end">
                <LazyVButton
                  v-if="item.status === 'active'"
                  variant="ghost"
                  :label="t('dashboard.ops.subscriptions.pause')"
                  @click="store.setStatus(item.id, 'paused')"
                />
                <LazyVButton
                  v-if="item.status === 'paused'"
                  variant="ghost"
                  :label="t('dashboard.ops.subscriptions.resume')"
                  @click="store.setStatus(item.id, 'active')"
                />
                <LazyVButton
                  v-if="item.status !== 'cancelled'"
                  variant="ghost"
                  className="text-danger"
                  :label="t('dashboard.ops.catxCommon.cancel')"
                  @click="store.setStatus(item.id, 'cancelled')"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.subscriptions.emptySubs')"
            icon="ph:users-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.subscriptions.create')"
      :subtitle="t('dashboard.ops.subscriptions.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.name" :label="t('dashboard.ops.subscriptions.name')" required />
        <LazyVSelectInput v-model="form.interval" :label="t('dashboard.ops.subscriptions.interval')" :options="intervalOptions" />
        <LazyVInput v-model="form.discount" type="number" :label="t('dashboard.ops.subscriptions.discount')" class="font-mono" />
        <LazyVInput v-model="form.price" type="number" :label="t('dashboard.ops.subscriptions.price')" class="font-mono" />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.subscriptions.create')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { PlanInterval } from '@/types/catalogDepth'
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.subscriptions.title') })

const store = useCatxSubscriptionsStore()
const { plans, subscribers, mrr } = storeToRefs(store)

const isOpen = ref(false)
const form = reactive<{ name: string; interval: PlanInterval; discount: string | number; price: string | number }>({
  name: '',
  interval: 'monthly',
  discount: 10,
  price: 200,
})

const statusTones: Record<string, Tone> = { active: 'success', paused: 'warning', cancelled: 'danger' }

const activeCount = computed(() => subscribers.value.filter((s) => s.status === 'active').length)
const cancelledCount = computed(() => subscribers.value.filter((s) => s.status === 'cancelled').length)

const intervals: PlanInterval[] = ['weekly', 'monthly', 'quarterly']
const intervalOptions = computed(() =>
  intervals.map((v) => ({ value: v, label: t(`dashboard.ops.subscriptions.intervals.${v}`) })),
)

const planName = (id: string) => plans.value.find((p) => p.id === id)?.name ?? '-'

const planHeaders = computed(() => [
  { key: 'name', label: t('dashboard.ops.subscriptions.name') },
  { key: 'interval', label: t('dashboard.ops.subscriptions.interval') },
  { key: 'discount', label: t('dashboard.ops.subscriptions.discount') },
  { key: 'products', label: t('dashboard.ops.subscriptions.productsCount') },
  { key: 'subscribers', label: t('dashboard.ops.subscriptions.subscribers') },
])

const subHeaders = computed(() => [
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'plan', label: t('dashboard.ops.subscriptions.plan') },
  { key: 'nextBilling', label: t('dashboard.ops.subscriptions.nextBilling') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '' },
])

function submit() {
  if (!form.name.trim()) return
  store.addPlan({
    name: form.name.trim(),
    interval: form.interval,
    discount: Number(form.discount) || 0,
    price: Number(form.price) || 0,
  })
  form.name = ''
  isOpen.value = false
}
</script>
