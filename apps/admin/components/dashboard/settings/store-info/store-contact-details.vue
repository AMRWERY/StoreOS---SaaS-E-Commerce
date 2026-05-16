<template>
  <div>
    <section
      class="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border-subtle pt-16"
    >
      <div class="lg:col-span-4">
        <h3 class="font-bold text-lg mb-2">
          {{ t("dashboard.settings.storeInfo.contactDetails") }}
        </h3>
        <p class="text-xs text-tx-secondary leading-relaxed">
          {{ t("dashboard.settings.storeInfo.contactDetailsDesc") }}
        </p>
      </div>
      <div class="lg:col-span-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LazyVInput
            v-model="modelValue.supportEmail"
            type="email"
            :label="t('dashboard.settings.storeInfo.supportEmail')"
            :placeholder="
              t('dashboard.settings.storeInfo.supportEmailPlaceholder')
            "
          />
          <LazyVInput
            v-model="modelValue.phone"
            :label="t('dashboard.settings.storeInfo.phone')"
            :placeholder="t('dashboard.settings.storeInfo.phonePlaceholder')"
          />
        </div>
        <LazyVInput
          v-model="modelValue.address"
          :label="t('dashboard.settings.storeInfo.physicalAddress')"
          :placeholder="
            t('dashboard.settings.storeInfo.physicalAddressPlaceholder')
          "
        />
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <LazyVInput
            v-model="modelValue.city"
            :label="t('dashboard.settings.storeInfo.city')"
            :placeholder="t('dashboard.settings.storeInfo.cityPlaceholder')"
          />
          <LazyVInput
            v-model="modelValue.state"
            :label="t('dashboard.settings.storeInfo.state')"
            :placeholder="t('dashboard.settings.storeInfo.statePlaceholder')"
          />
          <LazyVInput
            v-model="modelValue.zip"
            :label="t('dashboard.settings.storeInfo.zipCode')"
            :placeholder="t('dashboard.settings.storeInfo.zipPlaceholder')"
          />
          <div class="space-y-2">
            <label
              class="text-[10px] font-bold text-tx-secondary tracking-wider"
              >{{ t("dashboard.settings.storeInfo.country") }}</label
            >
            <div class="relative">
              <select
                v-model="modelValue.country"
                class="w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-2.5 text-xs outline-none appearance-none hover:border-border-default focus:border-orange-500/50 transition-all"
              >
                <option>Japan</option>
                <option>USA</option>
              </select>
              <Icon
                name="ph:caret-down-bold"
                class="absolute end-3 top-1/2 -translate-y-1/2 text-tx-muted"
              />
            </div>
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