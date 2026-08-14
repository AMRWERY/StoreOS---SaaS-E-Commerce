<template>
  <div
    class="relative flex items-center justify-between gap-4 px-4 py-2.5 bg-indigo-700 text-white text-xs font-medium"
  >
    <!-- Left: preview notice -->
    <div class="flex items-center gap-3 min-w-0">
      <div
        class="shrink-0 flex items-center gap-1.5 font-black tracking-wide text-[10px] uppercase"
      >
        <Icon name="lucide:eye" class="w-3.5 h-3.5" />
        <span>{{ t("auth.guest.badge") }}</span>
      </div>
      <div class="hidden sm:block w-px h-3 bg-white/20" />
      <p class="truncate text-white/90">
        {{ t("auth.guest.bannerText") }}
      </p>
    </div>

    <!-- Right: actions -->
    <div class="flex items-center gap-2 shrink-0">
      <nuxt-link-locale
        to="/auth/register"
        class="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 px-3 py-1 rounded-md font-bold text-[11px] tracking-wide transition-all"
      >
        <Icon name="lucide:sparkles" class="w-3.5 h-3.5" />
        {{ t("auth.guest.createAccount") }}
      </nuxt-link-locale>
      <nuxt-link-locale
        to="/auth/login"
        class="hidden sm:block px-3 py-1 rounded-md font-bold text-[11px] tracking-wide text-white/70 hover:text-white transition-colors"
      >
        {{ t("auth.guest.signIn") }}
      </nuxt-link-locale>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>
