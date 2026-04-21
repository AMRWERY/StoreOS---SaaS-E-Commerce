<template>
  <aside class="lg:col-span-4 bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 space-y-8">
    <div class="flex items-center gap-3">
      <Icon name="ph:sliders-horizontal-bold" class="text-brand text-lg" />
      <h3 class="text-sm font-bold">{{ $t('dashboard.profile.preferences') }}</h3>
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <label class="text-[10px] font-bold text-tx-secondary tracking-wider">{{ $t('dashboard.profile.language') }}</label>
        <div class="relative">
          <select
            class="w-full bg-black border border-border-default rounded-xl px-5 py-3 text-sm appearance-none outline-none">
            <option>English (US)</option>
          </select>
          <Icon name="ph:caret-down-bold" class="absolute end-4 top-1/2 -translate-y-1/2 text-tx-muted" />
        </div>
      </div>
      <div class="space-y-2">
        <label class="text-[10px] font-bold text-tx-secondary tracking-wider">{{ $t('dashboard.profile.timezone') }}</label>
        <div class="relative">
          <select
            class="w-full bg-black border border-border-default rounded-xl px-5 py-3 text-sm appearance-none outline-none">
            <option>(GMT+09:00) Tokyo, Japan</option>
          </select>
          <Icon name="ph:caret-down-bold" class="absolute end-4 top-1/2 -translate-y-1/2 text-tx-muted" />
        </div>
      </div>
      <div class="space-y-3 pt-4 border-t border-border-subtle">
        <label class="text-[10px] font-bold text-tx-secondary tracking-wider">{{ $t('dashboard.profile.interfaceTheme') }}</label>
        <div class="flex items-center justify-between p-4 bg-black rounded-xl border border-border-subtle opacity-60">
          <div class="flex items-center gap-3 text-xs font-bold text-tx-secondary">
            <Icon name="ph:moon-stars-fill" />
            {{ $t('dashboard.profile.darkMode') }}
          </div>
          <Icon name="ph:lock-key-fill" class="text-tx-muted" />
        </div>
        <p class="text-[8px] font-bold text-tx-muted italic">* {{ $t('dashboard.profile.lockedToBrand') }}</p>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>

</script>