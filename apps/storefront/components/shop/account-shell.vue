<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <shop-empty-state v-if="!account.isAuthenticated" icon="lucide:user-round" :title="t('shop.account.signInTitle')" :description="t('shop.account.signInDesc')">
      <div class="flex gap-3">
        <v-button to="/auth/login" :label="t('shop.auth.login')" class="rounded-full px-7" />
        <v-button to="/auth/register" variant="secondary" :label="t('shop.auth.register')" class="rounded-full px-7" />
      </div>
    </shop-empty-state>

    <div v-else class="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-12">
      <aside><account-nav /></aside>
      <div class="space-y-8 min-w-0">
        <header class="space-y-1">
          <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight text-tx-primary">{{ title }}</h1>
          <p v-if="subtitle" class="text-sm text-tx-secondary">{{ subtitle }}</p>
        </header>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ title: string; subtitle?: string }>()
const { t } = useI18n()
const account = useShopAccountStore()
</script>
