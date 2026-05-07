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
          <div class="space-y-2">
            <label
              class="text-[10px] font-bold text-tx-secondary tracking-wider"
              >{{ t("dashboard.settings.storeInfo.currency") }}</label
            >
            <div class="relative">
              <select
                v-model="modelValue.currency"
                class="w-full bg-bg-primary border border-border-subtle rounded-lg px-5 py-3.5 text-sm outline-none appearance-none hover:border-border-default focus:border-orange-500/50 transition-all"
              >
                <option>JPY (¥) - Japanese Yen</option>
              </select>
              <Icon
                name="ph:caret-up-down-bold"
                class="absolute end-5 top-1/2 -translate-y-1/2 text-tx-muted"
              />
            </div>
          </div>
          <div class="space-y-2">
            <label
              class="text-[10px] font-bold text-tx-secondary tracking-wider"
              >{{ t("dashboard.settings.storeInfo.timezone") }}</label
            >
            <div class="relative">
              <select
                v-model="modelValue.timezone"
                class="w-full bg-bg-primary border border-border-subtle rounded-lg px-5 py-3.5 text-sm outline-none appearance-none hover:border-border-default focus:border-orange-500/50 transition-all"
              >
                <option>(GMT+09:00) Tokyo</option>
              </select>
              <Icon
                name="ph:caret-up-down-bold"
                class="absolute end-5 top-1/2 -translate-y-1/2 text-tx-muted"
              />
            </div>
          </div>
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
              <button
                @click="modelValue.unitSystem = 'Metric'"
                :class="
                  modelValue.unitSystem === 'Metric'
                    ? 'bg-bg-elevated text-tx-primary'
                    : 'text-tx-muted'
                "
                class="flex-1 py-2 text-[10px] font-black tracking-widest rounded-lg transition-all"
              >
                {{ t("dashboard.settings.storeInfo.metric") }}
              </button>
              <button
                @click="modelValue.unitSystem = 'Imperial'"
                :class="
                  modelValue.unitSystem === 'Imperial'
                    ? 'bg-bg-elevated text-tx-primary'
                    : 'text-tx-muted'
                "
                class="flex-1 py-2 text-[10px] font-black tracking-widest rounded-lg transition-all"
              >
                {{ t("dashboard.settings.storeInfo.imperial") }}
              </button>
            </div>
          </div>
          <div class="space-y-2">
            <label
              class="text-[10px] font-bold text-tx-secondary tracking-wider"
              >{{ t("dashboard.settings.storeInfo.defaultLanguage") }}</label
            >
            <div class="relative">
              <select
                v-model="modelValue.language"
                class="w-full bg-bg-primary border border-border-subtle rounded-lg px-5 py-3.5 text-sm outline-none appearance-none hover:border-border-default focus:border-orange-500/50 transition-all"
              >
                <option>English (International)</option>
              </select>
              <Icon
                name="ph:caret-up-down-bold"
                class="absolute end-5 top-1/2 -translate-y-1/2 text-tx-muted"
              />
            </div>
          </div>
        </div>
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