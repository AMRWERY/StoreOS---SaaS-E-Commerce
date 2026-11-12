<template>
  <VSidePanel
    :model-value="isOpen"
    :title="t('dashboard.coupons.createNewCoupon')"
    :subtitle="t('dashboard.coupons.configureSettings')"
    @close="$emit('close')"
  >
    <div class="space-y-10">
      <!-- Coupon Code Input -->
      <div class="space-y-3">
        <label class="text-[10px] font-black text-tx-muted tracking-widest">{{
          t("dashboard.coupons.couponCode")
        }}</label>
        <div class="relative group">
          <LazyVInput
            v-model="form.code"
            :placeholder="t('dashboard.coupons.couponCodePlaceholder')"
            inputClass="bg-bg-primary border border-border-default rounded-xl px-5 py-4 text-sm font-bold tracking-widest focus:border-brand outline-none transition pe-14"
          />
          <LazyVButton
            @click="generateCode"
            variant="none"
            className="absolute end-4 top-1/2 -translate-y-1/2 text-tx-muted hover:text-brand transition-colors"
          >
            <Icon
              name="ph:arrows-clockwise-bold"
              class="text-xl icon-spin-hover"
            />
          </LazyVButton>
        </div>
      </div>

      <!-- Discount Type Segmented Control -->
      <div class="space-y-3">
        <label class="text-[10px] font-black text-tx-muted tracking-widest">{{
          t("dashboard.coupons.discountType")
        }}</label>
        <div
          class="bg-bg-primary p-1.5 rounded-2xl flex border border-border-subtle"
        >
          <LazyVButton
            v-for="type in discountTypes"
            :key="type.value"
            @click="form.discountType = type.value"
            variant="none"
            :className="`flex-1 py-3.5 text-xs font-bold tracking-tight rounded-xl transition-all duration-300 ${
              form.discountType === type.value
                ? 'bg-bg-elevated text-brand shadow-xl border border-border-subtle'
                : 'text-tx-secondary hover:text-tx-secondary'
            }`"
          >
            {{ type.label }}
          </LazyVButton>
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
        <LazyVDatePicker v-model="form.startDate" :label="t('dashboard.coupons.starts')">
          <template #trigger="{ selectedDate }">
            <LazyVInput
              readonly
              :label="t('dashboard.coupons.starts')"
              :modelValue="
                selectedDate || t('dashboard.coupons.immediateActivation')
              "
              inputClass="!w-full !bg-bg-primary !border-border-subtle !rounded-2xl !ps-14 !pe-5 !py-4 !text-sm !font-bold !text-tx-primary !cursor-pointer group-hover:!border-border-default !transition-colors"
            >
              <template #prefix>
                <Icon
                  name="ph:calendar-blank-bold"
                  class="absolute start-5 top-1/2 -translate-y-1/2 text-xl text-brand"
                />
              </template>
            </LazyVInput>
          </template>
        </LazyVDatePicker>

        <!-- Expires -->
        <LazyVDatePicker v-model="form.expiryDate" :label="t('dashboard.coupons.expires')">
          <template #trigger="{ selectedDate }">
            <LazyVInput
              readonly
              :label="t('dashboard.coupons.expires')"
              :modelValue="selectedDate || 'Dec 31, 2026'"
              inputClass="!w-full !bg-bg-primary !border-border-subtle !rounded-2xl !ps-14 !pe-5 !py-4 !text-sm !font-bold !text-tx-primary !cursor-pointer group-hover:!border-border-default !transition-colors"
            >
              <template #prefix>
                <Icon
                  name="ph:calendar-x-bold"
                  class="absolute start-5 top-1/2 -translate-y-1/2 text-xl text-accent"
                />
              </template>
            </LazyVInput>
          </template>
        </LazyVDatePicker>
      </div>
    </div>

    <template #footer>
      <LazyVButton
        className="w-full bg-brand hover:bg-brand-hover text-tx-primary py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
        variant="none"
        @click="$emit('create')"
      >
        <Icon name="ph:check-circle-bold" class="text-lg" />
        {{ t("dashboard.coupons.createCoupon") }}
      </LazyVButton>
    </template>
  </VSidePanel>
</template>

<script lang="ts" setup>
defineProps<{
  isOpen: boolean;
}>();

defineEmits(["close", "create"]);

const form = ref({
  code: "",
  discountType: "percentage",
  value: "",
  minOrder: "",
  maxUses: "",
  startDate: "",
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
