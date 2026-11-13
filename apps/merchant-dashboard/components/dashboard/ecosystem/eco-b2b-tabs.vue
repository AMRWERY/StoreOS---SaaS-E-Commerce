<template>
  <nav class="flex items-center gap-6 border-b border-border-subtle overflow-x-auto hide-scrollbar" :aria-label="t('dashboard.ops.b2b.title')">
    <nuxt-link-locale
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      :class="[
        'pb-3 text-xs font-bold tracking-wider whitespace-nowrap relative transition-colors',
        isActive(link.to) ? 'text-tx-primary' : 'text-tx-secondary hover:text-tx-primary',
      ]"
    >
      {{ t(`dashboard.ops.b2b.tabs.${link.key}`) }}
      <span v-if="isActive(link.to)" class="absolute bottom-0 start-0 w-full h-0.5 bg-brand"></span>
    </nuxt-link-locale>
  </nav>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()

const links = [
  { key: 'companies', to: '/dashboard/b2b/companies' },
  { key: 'priceLists', to: '/dashboard/b2b/price-lists' },
  { key: 'quotes', to: '/dashboard/b2b/quotes' },
]

const isActive = (to: string) => route.path.endsWith(to)
</script>
