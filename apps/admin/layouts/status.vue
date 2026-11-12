<template>
  <div class="min-h-screen bg-bg-base font-sans text-tx-primary">
    <header class="border-b border-border-subtle bg-bg-primary">
      <div class="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <div class="flex items-center gap-3">
          <img
            src="/gif/storeose-logo-admin.gif"
            alt="StoreOS"
            class="h-8 w-auto object-contain"
            width="94"
            height="32"
          />
          <span class="text-xs font-semibold text-tx-secondary">{{ t('platform.statusPage.brand') }}</span>
        </div>
        <div class="flex items-center gap-3">
          <LazyThemeToggle />
          <LazyVLocaleSwitch />
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-4 py-8">
      <slot />
    </main>

    <footer class="mx-auto max-w-3xl px-4 pb-8 text-center text-[11px] text-tx-muted">
      {{ t('platform.statusPage.footer') }}
    </footer>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
</script>
