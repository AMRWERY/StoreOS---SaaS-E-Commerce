<template>
  <div class="min-h-screen flex flex-col bg-bg-base text-tx-primary">
    <header class="border-b border-border-subtle bg-bg-primary">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <nuxt-link-locale to="/" class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center"><Icon name="lucide:shopping-bag" class="w-4 h-4" /></span>
          <span class="text-base font-semibold tracking-tight">{{ t('shop.brand') }}</span>
        </nuxt-link-locale>
        <span class="inline-flex items-center gap-1.5 text-xs text-tx-muted"><Icon name="lucide:lock" class="w-3.5 h-3.5" />{{ t('shop.checkout.secure') }}</span>
      </div>
    </header>
    <main class="flex-1"><slot /></main>
    <footer class="border-t border-border-subtle py-6">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-tx-muted">
        <nuxt-link-locale to="/pages/returns" class="hover:text-tx-primary">{{ t('shop.footer.returnsPolicy') }}</nuxt-link-locale>
        <nuxt-link-locale to="/pages/shipping" class="hover:text-tx-primary">{{ t('shop.footer.shippingPolicy') }}</nuxt-link-locale>
        <nuxt-link-locale to="/pages/privacy" class="hover:text-tx-primary">{{ t('shop.footer.privacy') }}</nuxt-link-locale>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
</script>
