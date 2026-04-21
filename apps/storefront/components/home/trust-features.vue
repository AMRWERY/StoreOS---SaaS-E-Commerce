<template>
  <div>
    <div class="bg-bg-primary border-t border-border-subtle py-24">
      <div class="max-w-7xl mx-auto px-12 md:px-24 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
        <div v-for="feat in trustFeatures" :key="feat.label" class="flex items-center gap-6 group">
          <div
            class="h-14 w-14 rounded-2xl bg-bg-base border border-border-subtle flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand/5 group-hover:border-brand/20">
            <Icon :name="feat.icon" class="w-6 h-6 text-brand" />
          </div>
          <div>
            <h4 class="text-[12px] font-black text-tx-primary tracking-widest">{{ feat.label }}</h4>
            <p class="text-[11px] text-tx-muted tracking-tighter mt-1 opacity-80">{{ feat.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const trustFeatures = computed(() => [
  { icon: 'ph:truck-fill', label: t('storefront.home.fastTransit'), desc: t('storefront.home.fastTransitDesc') },
  { icon: 'ph:seal-check-fill', label: t('storefront.home.authVerified'), desc: t('storefront.home.authVerifiedDesc') },
  { icon: 'ph:arrows-counter-clockwise-bold', label: t('storefront.home.refundNode'), desc: t('storefront.home.refundNodeDesc') },
  { icon: 'ph:chat-dots-fill', label: t('storefront.home.support24h'), desc: t('storefront.home.support24hDesc') },
])
</script>