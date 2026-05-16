﻿<template>
  <div>
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-bg-overlay backdrop-blur-sm z-50"
        @click="$emit('close')"
      ></div>
    </Transition>

    <!-- Slide-over Drawer -->
    <Transition
      enter-active-class="transform transition ease-in-out duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed inset-y-0 end-0 w-full max-w-[460px] bg-bg-primary border-s border-border-default shadow-2xl flex flex-col z-50"
      >
        <!-- Header -->
        <div
          class="px-4 py-3.5 border-b border-border-subtle flex justify-between items-center bg-bg-base"
        >
          <div>
            <h2 class="text-xl font-bold text-tx-primary tracking-tight">
              {{ t("dashboard.coupons.createNewCoupon") }}
            </h2>
            <p class="text-[10px] text-tx-muted font-bold tracking-widest mt-1">
              {{ t("dashboard.coupons.configureSettings") }}
            </p>
          </div>
          <LazyVButton
            @click="$emit('close')"
            variant="none"
            className="text-tx-muted hover:text-tx-primary transition-colors"
          >
            <Icon name="ph:x-bold" class="text-xl" />
          </LazyVButton>
        </div>

        <div
          class="flex-1 px-4 py-3.5 overflow-y-auto hide-scrollbar space-y-10"
        >
          <!-- Coupon Code Input -->
          <div class="space-y-3">
            <label
              class="text-[10px] font-black text-tx-muted tracking-widest"
              >{{ t("dashboard.coupons.couponCode") }}</label
            >
            <div class="relative group">
              <LazyVInput
                v-model="form.code"
                placeholder="e.g. SUMMER24"
                inputClass="bg-bg-primary border border-border-default rounded-xl px-5 py-4 text-sm font-bold tracking-widest focus:border-brand outline-none transition pe-14"
              />
              <button
                @click="generateCode"
                class="absolute end-4 top-1/2 -translate-y-1/2 text-tx-muted hover:text-brand transition-colors"
                type="button"
              >
                <Icon name="ph:arrows-clockwise-bold" class="text-xl" />
              </button>
            </div>
          </div>

          <!-- Discount Type Segmented Control -->
          <div class="space-y-3">
            <label
              class="text-[10px] font-black text-tx-muted tracking-widest"
              >{{ t("dashboard.coupons.discountType") }}</label
            >
            <div
              class="bg-bg-primary p-1.5 rounded-2xl flex border border-border-subtle"
            >
              <button
                v-for="type in discountTypes"
                :key="type.value"
                @click="form.discountType = type.value"
                class="flex-1 py-3.5 text-xs font-bold tracking-tight rounded-xl transition-all duration-300"
                :class="
                  form.discountType === type.value
                    ? 'bg-bg-elevated text-brand shadow-xl border border-border-subtle'
                    : 'text-tx-secondary hover:text-tx-secondary'
                "
              >
                {{ type.label }}
              </button>
            </div>
          </div>

          <!-- Value Input -->
          <LazyVInput
            v-model="form.value"
            :label="
              form.discountType === 'percentage'
                ? t('dashboard.coupons.percentage')
                : t('dashboard.coupons.fixedAmount')
            "
            placeholder="0.00"
            :type="form.discountType === 'percentage' ? 'text' : 'number'"
          >
            <template #prefix v-if="form.discountType === 'percentage'">
              <span
                class="absolute end-5 top-1/2 -translate-y-1/2 text-tx-muted font-bold"
                >%</span
              >
            </template>
          </LazyVInput>

          <!-- Min Order & Max Uses -->
          <div class="grid grid-cols-2 gap-6">
            <LazyVInput
              v-model="form.minOrder"
              :label="t('dashboard.coupons.minOrder')"
              :placeholder="t('dashboard.coupons.optional')"
            />
            <LazyVInput
              v-model="form.maxUses"
              :label="t('dashboard.coupons.maxRedemption')"
              :placeholder="t('dashboard.coupons.unlimited')"
            />
          </div>

          <!-- Date Selection Design -->
          <div class="space-y-4">
            <!-- Starts -->
            <LazyVDatePicker v-model="form.startDate" label="Starts">
              <template #trigger="{ selectedDate }">
                <div class="space-y-2">
                  <label
                    class="text-[10px] font-black text-tx-muted tracking-widest"
                    >{{ t("dashboard.coupons.starts") }}</label
                  >
                  <div class="relative group cursor-pointer">
                    <Icon
                      name="ph:calendar-blank-bold"
                      class="absolute start-5 top-1/2 -translate-y-1/2 text-xl text-brand"
                    />
                    <input
                      readonly
                      :value="
                        selectedDate ||
                        t('dashboard.coupons.immediateActivation')
                      "
                      class="w-full bg-bg-primary border border-border-subtle rounded-2xl ps-14 pe-5 py-4 text-sm font-bold text-tx-primary outline-none group-hover:border-border-default transition-colors"
                    />
                  </div>
                </div>
              </template>
            </LazyVDatePicker>

            <!-- Expires -->
            <LazyVDatePicker v-model="form.expiryDate" label="Expires">
              <template #trigger="{ selectedDate }">
                <div class="space-y-2">
                  <label
                    class="text-[10px] font-black text-tx-muted tracking-widest"
                    >{{ t("dashboard.coupons.expires") }}</label
                  >
                  <div class="relative group cursor-pointer">
                    <Icon
                      name="ph:calendar-x-bold"
                      class="absolute start-5 top-1/2 -translate-y-1/2 text-xl text-accent"
                    />
                    <input
                      readonly
                      :value="selectedDate || 'Dec 31, 2026'"
                      class="w-full bg-bg-primary border border-border-subtle rounded-2xl ps-14 pe-5 py-4 text-sm font-bold text-tx-primary outline-none group-hover:border-border-default transition-colors"
                    />
                  </div>
                </div>
              </template>
            </LazyVDatePicker>
          </div>
        </div>

        <!-- Footer Action -->
        <div
          class="px-4 py-3.5 border-t border-border-subtle bg-bg-primary flex flex-col gap-4"
        >
          <LazyVButton
            className="w-full bg-brand hover:bg-brand-hover text-tx-primary py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
            variant="none"
            @click="$emit('create')"
          >
            <Icon name="ph:check-circle-bold" class="text-lg" />
            {{ t("dashboard.coupons.createCoupon") }}
          </LazyVButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close", "create"]);

const form = ref({
  code: "",
  discountType: "percentage",
  value: "",
  minOrder: "",
  maxUses: "",
  startDate: "", // Added startDate
  expiryDate: "",
});

const { t } = useI18n();

const discountTypes = computed(() => [
  { label: t("dashboard.coupons.percentage"), value: "percentage" },
  { label: t("dashboard.coupons.fixedAmount"), value: "fixed" },
]);

const generateCode = () => {
  form.value.code = Math.random().toString(36).substring(2, 8).toUpperCase();
};
</script>