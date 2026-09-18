<template>
  <div>
    <section
      class="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border-subtle pt-16"
    >
      <div class="lg:col-span-4">
        <h3 class="font-bold text-lg mb-2">
          {{ t("dashboard.settings.storeInfo.localization") }}
        </h3>
        <p class="text-xs text-tx-secondary leading-relaxed">
          {{ t("dashboard.settings.storeInfo.localizationDesc") }}
        </p>
      </div>
      <div class="lg:col-span-8 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LazyVSelectInput
            v-model="modelValue.currency"
            :label="t('dashboard.settings.storeInfo.currency')"
            :options="['JPY (¥) - Japanese Yen']"
            selectClass="!bg-bg-primary !border-border-subtle !rounded-lg !px-5 !py-3.5 !text-sm hover:!border-border-default focus:!border-orange-500/50"
          />

          <LazyVSelectInput
            v-model="modelValue.timezone"
            :label="t('dashboard.settings.storeInfo.timezone')"
            :options="['(GMT+09:00) Tokyo']"
            selectClass="!bg-bg-primary !border-border-subtle !rounded-lg !px-5 !py-3.5 !text-sm hover:!border-border-default focus:!border-orange-500/50"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <label
              class="text-[10px] font-bold text-tx-secondary tracking-wider"
              >{{ t("dashboard.settings.storeInfo.unitSystem") }}</label
            >
            <div
              class="bg-bg-primary p-1 rounded-xl flex border border-border-default"
            >
              <LazyVButton
                variant="none"
                @click="modelValue.unitSystem = 'Metric'"
                :className="
                  [
                    'flex-1 py-2 text-[10px] font-black tracking-widest rounded-lg transition-all',
                    modelValue.unitSystem === 'Metric'
                      ? 'bg-bg-elevated text-tx-primary'
                      : 'text-tx-muted',
                  ].join(' ')
                "
              >
                {{ t("dashboard.settings.storeInfo.metric") }}
              </LazyVButton>

              <LazyVButton
                variant="none"
                @click="modelValue.unitSystem = 'Imperial'"
                :className="
                  [
                    'flex-1 py-2 text-[10px] font-black tracking-widest rounded-lg transition-all',
                    modelValue.unitSystem === 'Imperial'
                      ? 'bg-bg-elevated text-tx-primary'
                      : 'text-tx-muted',
                  ].join(' ')
                "
              >
                {{ t("dashboard.settings.storeInfo.imperial") }}
              </LazyVButton>
            </div>
          </div>

          <LazyVSelectInput
            v-model="modelValue.language"
            :label="t('dashboard.settings.storeInfo.defaultLanguage')"
            :options="['English (International)']"
            selectClass="!bg-bg-primary !border-border-subtle !rounded-lg !px-5 !py-3.5 !text-sm hover:!border-border-default focus:!border-orange-500/50"
          />
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