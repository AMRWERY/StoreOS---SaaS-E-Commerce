<template>
  <div>
    <section
      class="bg-orange-950/20 border border-accent/10 rounded-2xl px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-start gap-5 max-w-2xl">
        <div class="mt-1">
          <Icon name="ph:warning-octagon-bold" class="text-accent text-2xl" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-accent">
            {{ t("dashboard.settings.payment.safetyLock") }}
          </h4>
          <p class="text-xs text-accent/60 leading-relaxed font-medium mt-1">
            {{ t("dashboard.settings.payment.safetyLockDesc") }}
          </p>
        </div>
      </div>
      <LazyVButton variant="outline"
        className="bg-transparent border border-accent/30 text-accent/70 hover:text-accent hover:border-orange-500/50 px-5 py-2.5 rounded-lg text-[10px] font-black tracking-widest transition-all">
        {{ t("dashboard.settings.payment.disableProtocol") }}
      </LazyVButton>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
</script>