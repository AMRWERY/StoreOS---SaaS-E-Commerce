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
            class="w-full bg-bg-primary border border-border-default rounded-xl px-5 py-3 text-sm appearance-none outline-none">
            <option>English (US)</option>
          </select>
          <Icon name="ph:caret-down-bold" class="absolute end-4 top-1/2 -translate-y-1/2 text-tx-muted" />
        </div>
      </div>
      <div class="space-y-2">
        <label class="text-[10px] font-bold text-tx-secondary tracking-wider">{{ $t('dashboard.profile.timezone') }}</label>
        <div class="relative">
          <select
            class="w-full bg-bg-primary border border-border-default rounded-xl px-5 py-3 text-sm appearance-none outline-none">
            <option>(GMT+09:00) Tokyo, Japan</option>
          </select>
          <Icon name="ph:caret-down-bold" class="absolute end-4 top-1/2 -translate-y-1/2 text-tx-muted" />
        </div>
      </div>
      <div class="space-y-3 pt-4 border-t border-border-subtle">
        <label class="text-[10px] font-bold text-tx-secondary tracking-wider">{{ $t('dashboard.profile.interfaceTheme') }}</label>
        <div class="flex items-center justify-between p-4 bg-bg-primary rounded-xl border border-border-subtle">
          <div class="flex items-center gap-3 text-xs font-bold text-tx-secondary">
            <Icon :name="isDark ? 'ph:moon-stars-fill' : 'ph:sun-bold'" />
            {{ isDark ? $t('dashboard.profile.darkMode') : $t('dashboard.profile.lightMode') }}
          </div>
          <button
            type="button"
            class="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border border-border-default bg-bg-elevated transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            role="switch"
            :aria-checked="!isDark"
            :aria-label="isDark ? $t('nav.useLightTheme') : $t('nav.useDarkTheme')"
            @click="toggleTheme"
          >
            <span
              class="pointer-events-none absolute top-0.5 h-6 w-6 rounded-full bg-brand shadow transition-transform duration-200 ease-out"
              :class="isDark ? 'start-0.5' : 'end-0.5'"
            />
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const { isDark, toggleTheme } = useAppTheme();
</script>
