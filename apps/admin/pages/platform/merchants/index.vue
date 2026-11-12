<template>
  <div>
    <platform-page-header :title="t('platform.merchants.title')" :subtitle="t('platform.merchants.subtitle')" />

    <section class="card overflow-hidden">
      <div class="flex flex-col gap-4 border-b border-border-subtle px-4 pt-3.5 md:flex-row md:items-end md:justify-between">
        <v-tabs v-model="tab" :tabs="tabs" />
        <v-search-input
          v-model="query"
          :placeholder="t('platform.merchants.searchPlaceholder')"
          wrapper-class="w-full md:w-72 pb-3"
        />
      </div>

      <v-table v-if="filtered.length" :headers="headers" :items="filtered" table-class="cursor-pointer" @row-click="openMerchant">
        <template #cell(store)="{ item }">
          <p class="text-xs font-semibold text-tx-primary">{{ item.store }}</p>
          <p class="font-mono text-[10px] text-tx-muted">{{ item.id }}</p>
        </template>
        <template #cell(owner)="{ item }">
          <p class="text-xs text-tx-secondary">{{ item.owner }}</p>
          <p class="text-[10px] text-tx-muted">{{ item.city }}</p>
        </template>
        <template #cell(plan)="{ item }">
          <platform-status-pill :label="t(`platform.plan.${item.plan}`)" :tone="tones.plan(item.plan)" />
        </template>
        <template #cell(status)="{ item }">
          <platform-status-pill :label="t(`platform.status.${item.status}`)" :tone="tones.merchantStatus(item.status)" />
        </template>
        <template #cell(gmv)="{ item }">
          <span class="font-mono text-xs text-tx-primary">{{ t('platform.common.egp') }} {{ num(item.gmv) }}</span>
        </template>
        <template #cell(signupDate)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.signupDate }}</span>
        </template>
      </v-table>

      <platform-empty-state
        v-else
        :title="t('platform.merchants.empty')"
        :hint="t('platform.merchants.emptyHint')"
        icon="ph:storefront"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'platform' })

const { t } = useI18n()
const localePath = useLocalePath()
const { num } = usePlatformFormat()
const tones = usePlatformTones()

useSeoMeta({ title: t('platform.merchants.title'), robots: 'noindex, nofollow' })

const store = usePlatformMerchantsStore()

const tab = ref('all')
const query = ref('')

const countOf = (status: string) => store.merchants.filter((m) => m.status === status).length

const tabs = computed(() => [
  { name: t('platform.merchants.tabs.all'), value: 'all', count: store.merchants.length },
  { name: t('platform.merchants.tabs.active'), value: 'active', count: countOf('active') },
  { name: t('platform.merchants.tabs.trial'), value: 'trial', count: countOf('trial') },
  { name: t('platform.merchants.tabs.suspended'), value: 'suspended', count: countOf('suspended') },
])

const headers = computed(() => [
  { label: t('platform.common.store'), key: 'store' },
  { label: t('platform.common.owner'), key: 'owner' },
  { label: t('platform.common.plan'), key: 'plan' },
  { label: t('platform.common.status'), key: 'status' },
  { label: t('platform.common.gmv'), key: 'gmv', align: 'end' as const },
  { label: t('platform.common.signupDate'), key: 'signupDate', align: 'end' as const },
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return store.merchants.filter((m) => {
    if (tab.value !== 'all' && m.status !== tab.value) return false
    if (!q) return true
    return [m.store, m.owner, m.ownerEmail, m.id, m.domain].some((v) => v.toLowerCase().includes(q))
  })
})

const openMerchant = (item: { id: string }) => navigateTo(localePath(`/platform/merchants/${item.id}`))
</script>
