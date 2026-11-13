<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.abandoned.title')"
          :subtitle="t('dashboard.ops.abandoned.subtitle')"
          :count="abandoned.length"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.abandoned.stats.value')"
            :value="money(lostValue)"
            iconName="ph:shopping-cart-simple-bold"
            iconColor="text-warning"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.abandoned.stats.recovered')"
            :value="abandoned.filter((a) => a.recovered).length"
            iconName="ph:arrow-counter-clockwise-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.abandoned.stats.rate')"
            :value="recoveryRate + '%'"
            iconName="ph:percent-bold"
          />
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="abandoned.length" :headers="headers" :items="abandoned">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(contact)="{ item }">
              <span class="font-mono text-xs" dir="ltr">{{ item.contact }}</span>
            </template>
            <template #cell(items)="{ item }">
              <span class="font-mono text-sm">{{ item.items }}</span>
            </template>
            <template #cell(total)="{ item }">
              <span class="font-mono text-sm">{{ money(item.total) }}</span>
            </template>
            <template #cell(stage)="{ item }">
              <status-pill tone="neutral">{{ t(`dashboard.ops.abandoned.stages.${item.stage}`) }}</status-pill>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="item.recovered ? 'success' : 'warning'">
                {{ t(item.recovered ? 'dashboard.ops.abandoned.recovered' : 'dashboard.ops.abandoned.open') }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <LazyVButton
                v-if="!item.recovered"
                size="none"
                variant="secondary"
                className="px-3 py-1 text-[11px]"
                icon="ph:paper-plane-tilt-bold"
                iconPosition="left"
                :label="t('dashboard.ops.abandoned.sendReminder')"
                @click="markRecovered(item.id)"
              />
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.abandoned.empty')"
            :hint="t('dashboard.ops.abandoned.emptyHint')"
            icon="ph:shopping-cart-simple-bold"
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
useSeoPage({ titleTemplate: () => t('dashboard.ops.abandoned.title') })

const store = useDraftOrdersStore()
const { abandoned } = storeToRefs(store)
const { markRecovered } = store

const lostValue = computed(() =>
  abandoned.value.filter((a) => !a.recovered).reduce((s, a) => s + a.total, 0),
)
const recoveryRate = computed(() =>
  abandoned.value.length
    ? Math.round((abandoned.value.filter((a) => a.recovered).length / abandoned.value.length) * 100)
    : 0,
)

const headers = computed(() => [
  { key: 'id', label: t('dashboard.ops.abandoned.id') },
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'contact', label: t('dashboard.ops.abandoned.contact') },
  { key: 'items', label: t('dashboard.ops.common.items'), align: 'center' as const },
  { key: 'total', label: t('dashboard.ops.common.amount') },
  { key: 'stage', label: t('dashboard.ops.abandoned.stage') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
