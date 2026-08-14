<template>
  <Transition name="banner">
    <div
      v-if="visible"
      class="relative flex items-center justify-between gap-4 px-4 py-2.5 text-white text-xs font-medium"
      :class="urgencyClass"
    >
      <!-- Left: Trial info -->
      <div class="flex items-center gap-3 min-w-0">
        <div class="shrink-0 flex items-center gap-1.5 font-black tracking-wide text-[10px] uppercase">
          <Icon name="lucide:zap" class="w-3.5 h-3.5" />
          <span>{{ planConfig.label }}</span>
        </div>
        <div class="hidden sm:block w-px h-3 bg-white/20" />
        <p class="truncate text-white/90">
          <span v-if="isTrial && trialDaysLeft > 0">
            <strong class="text-white">{{ t("auth.trialBanner.daysLeft", trialDaysLeft) }}</strong>
            {{ t("auth.trialBanner.leftInTrial") }}
            <span class="text-white/80">{{ t("auth.trialBanner.upgradeToKeep") }}</span>
          </span>
          <span v-else-if="isTrial && trialDaysLeft === 0" class="text-orange-200">
            {{ t("auth.trialBanner.expired") }}
          </span>
          <span v-else>
            {{ t("auth.trialBanner.limitedPlan", { plan: planConfig.label }) }}
          </span>
        </p>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2 shrink-0">
        <nuxt-link-locale
          to="/dashboard/settings/billing-and-plan"
          class="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 px-3 py-1 rounded-md font-bold text-[11px] tracking-wide transition-all"
        >
          <Icon name="lucide:arrow-up-circle" class="w-3.5 h-3.5" />
          {{ t("nav.upgrade") }}
        </nuxt-link-locale>
        <button
          v-if="isTrial && trialDaysLeft > 3"
          @click="visible = false"
          class="p-1 text-white/50 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <Icon name="lucide:x" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { planConfig, isTrial, trialDaysLeft } = useAuth()

const visible = ref(true)

const urgencyClass = computed(() => {
  if (isTrial.value && trialDaysLeft.value <= 3) {
    return 'bg-red-600'
  }
  if (isTrial.value && trialDaysLeft.value <= 7) {
    return 'bg-orange-600'
  }
  if (isTrial.value) {
    return 'bg-indigo-700'
  }
  return 'bg-bg-elevated border-b border-border-subtle text-tx-secondary'
})
</script>

<style scoped>
.banner-enter-active,
.banner-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.banner-enter-from,
.banner-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.banner-enter-to,
.banner-leave-from {
  max-height: 60px;
  opacity: 1;
}
</style>
