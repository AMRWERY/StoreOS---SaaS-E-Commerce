<template>
  <div class="min-h-screen flex flex-col bg-bg-base text-tx-primary">
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-full focus:bg-brand focus:text-white focus:px-4 focus:py-2">{{ t('shop.common.skipToContent') }}</a>
    <shop-announcement-bar />
    <shop-header />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <shop-footer />
    <cart-drawer />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
</script>
