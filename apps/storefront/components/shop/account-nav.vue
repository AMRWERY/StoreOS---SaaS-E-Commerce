<template>
  <nav class="flex lg:flex-col gap-1 overflow-x-auto" :aria-label="t('shop.account.nav')">
    <nuxt-link-locale v-for="l in links" :key="l.to" :to="l.to"
      :class="['flex items-center gap-3 rounded-xl px-4 py-3 text-sm whitespace-nowrap transition-colors duration-200', isActive(l.to) ? 'bg-bg-elevated text-tx-primary font-medium' : 'text-tx-secondary hover:text-tx-primary']">
      <Icon :name="l.icon" class="w-4 h-4" />
      {{ t(l.label) }}
    </nuxt-link-locale>
    <button type="button" class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-tx-secondary hover:text-danger transition-colors duration-200 whitespace-nowrap" @click="logout">
      <Icon name="lucide:log-out" class="w-4 h-4" />
      {{ t('shop.account.logout') }}
    </button>
  </nav>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const router = useRouter()
const account = useShopAccountStore()

const links = [
  { to: '/account', label: 'shop.account.overview', icon: 'lucide:layout-grid' },
  { to: '/account/orders', label: 'shop.account.orders', icon: 'lucide:package' },
  { to: '/account/addresses', label: 'shop.account.addresses', icon: 'lucide:map-pin' },
  { to: '/account/profile', label: 'shop.account.profile', icon: 'lucide:user' },
]

const isActive = (to: string) => {
  const target = localePath(to)
  return to === '/account' ? route.path === target : route.path.startsWith(target)
}

function logout() {
  account.logout()
  router.push(localePath('/'))
}
</script>
