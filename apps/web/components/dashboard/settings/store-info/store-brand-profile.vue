<template>
  <div>
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div class="lg:col-span-4">
        <h3 class="font-bold text-lg mb-2">
          {{ t("dashboard.settings.storeInfo.brandProfile") }}
        </h3>
        <p class="text-xs text-tx-secondary leading-relaxed">
          {{ t("dashboard.settings.storeInfo.brandProfileDesc") }}
        </p>
      </div>
      <div class="lg:col-span-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VInput
            v-model="modelValue.name"
            :label="t('dashboard.settings.storeInfo.storeName')"
            :placeholder="
              t('dashboard.settings.storeInfo.storeNamePlaceholder')
            "
          />
          <VInput
            v-model="modelValue.legalName"
            :label="t('dashboard.settings.storeInfo.legalName')"
            :placeholder="
              t('dashboard.settings.storeInfo.legalNamePlaceholder')
            "
          />
        </div>

        <div class="space-y-2">
          <label
            class="text-[10px] font-bold text-tx-secondary tracking-wider"
            >{{ t("dashboard.settings.storeInfo.storeDescription") }}</label
          >
          <textarea
            v-model="modelValue.description"
            rows="4"
            class="w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-sm focus:border-orange-500/50 hover:border-border-default outline-none transition-all duration-200 resize-none"
          ></textarea>
        </div>

        <VFileUpload
          :label="t('dashboard.settings.storeInfo.storeLogo')"
          :title="t('dashboard.settings.storeInfo.storeLogo')"
          :subtitle="t('dashboard.settings.storeInfo.storeLogoSubtitle')"
          icon="ph:image-square-bold"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineProps<{
  modelValue: any;
}>();
</script>