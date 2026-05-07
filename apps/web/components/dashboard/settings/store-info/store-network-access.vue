<template>
  <div>
    <section
      class="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border-subtle pt-16"
    >
      <div class="lg:col-span-4">
        <h3 class="font-bold text-lg mb-2">
          {{ t("dashboard.settings.networkAccess") }}
        </h3>
        <p class="text-xs text-tx-secondary leading-relaxed">
          {{ t("dashboard.settings.networkAccessDesc") }}
        </p>
      </div>
      <div class="lg:col-span-8 space-y-8">
        <div class="space-y-2">
          <label
            class="text-[10px] font-bold text-tx-secondary tracking-wider"
            >{{ t("dashboard.settings.systemUrl") }}</label
          >
          <div class="flex items-center">
            <input
              :value="modelValue.systemUrl"
              readonly
              type="text"
              class="flex-1 bg-bg-primary border border-border-subtle rounded-s-lg px-4 py-3 text-sm text-tx-secondary outline-none"
            />
            <button
              class="bg-bg-elevated hover:bg-bg-elevated border-y border-e border-border-default px-5 py-3 rounded-e-lg text-[10px] font-black tracking-widest flex items-center gap-2 transition-colors"
            >
              <Icon name="ph:copy-bold" /> {{ t("common.copy") }}
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-end gap-3">
            <LazyVInput
              v-model="modelValue.customDomain"
              :label="t('dashboard.settings.customDomain')"
              placeholder="e.g. shop.hyperlink.com"
              class="flex-1"
            />
            <LazyVButton
              variant="secondary"
              size="none"
              className="px-8 py-3 mb-[2px]"
            >
              {{ t("dashboard.settings.connect") }}
            </LazyVButton>
          </div>
          <div class="flex items-center gap-2 pt-2">
            <Icon name="ph:info-bold" class="text-accent text-sm" />
            <p class="text-[10px] text-tx-secondary">
              {{ t("dashboard.settings.dnsRequired") }}
              <nuxt-link-locale to="" class="text-brand hover:underline">{{
                t("dashboard.settings.readGuide")
              }}</nuxt-link-locale>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
defineProps<{
  modelValue: any;
}>();
</script>