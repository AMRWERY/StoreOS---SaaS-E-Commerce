<template>
  <div class="lg:col-span-6 space-y-14">
    <!-- (01) Contact Information -->
    <section class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="text-brand font-bold text-sm">(01)</span>
        <h2 class="text-xl font-bold tracking-tight">
          {{ t("storefront.checkout.contactInformation") }}
        </h2>
      </div>
      <LazyVInput
        v-model="form.emailOrPhone"
        :label="t('storefront.checkout.emailOrPhone')"
        labelClass="text-[10px] font-black tracking-[0.2em] text-tx-muted"
        inputClass="!w-full !bg-bg-primary !border-border-subtle !rounded-[8px] !px-5 !py-4 !text-[13px] focus:!border-brand !outline-none !transition-all !placeholder:text-tx-muted"
      />
    </section>

    <!-- (02) Shipping Address -->
    <section class="space-y-8">
      <div class="flex items-center gap-3">
        <span class="text-brand font-bold text-sm">(02)</span>
        <h2 class="text-xl font-bold tracking-tight">
          {{ t("storefront.checkout.shippingAddress") }}
        </h2>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <LazyVInput
          v-model="form.firstName"
          :label="t('storefront.checkout.firstName')"
          labelClass="text-[10px] font-black tracking-[0.2em] text-tx-muted"
          inputClass="!w-full !bg-bg-primary !border-border-subtle !rounded-[8px] !px-5 !py-4 !text-[13px] focus:!border-brand !outline-none !transition-all"
        />
        <LazyVInput
          v-model="form.lastName"
          :label="t('storefront.checkout.lastName')"
          labelClass="text-[10px] font-black tracking-[0.2em] text-tx-muted"
          inputClass="!w-full !bg-bg-primary !border-border-subtle !rounded-[8px] !px-5 !py-4 !text-[13px] focus:!border-brand !outline-none !transition-all"
        />
      </div>

      <LazyVInput
        v-model="form.address"
        :label="t('storefront.checkout.streetAddress')"
        labelClass="text-[10px] font-black tracking-[0.2em] text-tx-muted"
        inputClass="!w-full !bg-bg-primary !border-border-subtle !rounded-[8px] !px-5 !py-4 !text-[13px] focus:!border-brand !outline-none !transition-all"
      />

      <div class="grid grid-cols-2 gap-4">
        <LazyVInput
          v-model="form.city"
          :label="t('storefront.checkout.city')"
          labelClass="text-[10px] font-black tracking-[0.2em] text-tx-muted"
          inputClass="!w-full !bg-bg-primary !border-border-subtle !rounded-[8px] !px-5 !py-4 !text-[13px] focus:!border-brand !outline-none !transition-all"
        />
        <div class="space-y-2">
          <label
            class="text-[10px] font-black tracking-[0.2em] text-tx-muted"
            >{{ t("storefront.checkout.governorate") }}</label
          >
          <div class="relative">
            <select
              v-model="form.governorate"
              class="w-full bg-bg-primary border border-border-subtle rounded-[8px] px-5 py-4 text-[13px] appearance-none outline-none focus:border-brand transition-all text-tx-primary"
            >
              <option v-for="g in governorates" :key="g" :value="g">
                {{ g }}
              </option>
            </select>
            <Icon
              name="ph:caret-down"
              class="absolute end-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tx-muted pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- (03) Shipping Method -->
    <section class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="text-brand font-bold text-sm">(03)</span>
        <h2 class="text-xl font-bold tracking-tight">
          {{ t("storefront.checkout.shippingMethod") }}
        </h2>
      </div>

      <div class="space-y-3">
        <div
          v-for="method in shippingMethods"
          :key="method.id"
          class="relative border-2 p-6 rounded-[12px] cursor-pointer transition-all flex items-center justify-between"
          :class="
            form.selectedMethod === method.id
              ? 'bg-bg-primary border-brand shadow-[0_0_20px_rgba(99,102,241,0.1)]'
              : 'bg-transparent border-border-subtle hover:border-border-default'
          "
          @click="form.selectedMethod = method.id"
        >
          <div class="flex items-center gap-5">
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              :class="
                form.selectedMethod === method.id
                  ? 'border-brand'
                  : 'border-border-default'
              "
            >
              <div
                v-if="form.selectedMethod === method.id"
                class="w-2.5 h-2.5 rounded-full bg-brand"
              />
            </div>
            <div>
              <p class="text-[14px] font-bold">{{ method.name }}</p>
              <p class="text-[11px] text-tx-muted font-medium">
                {{ method.time }}
              </p>
            </div>
          </div>
          <p class="text-sm font-bold text-tx-secondary">
            EGP {{ method.price }}
          </p>
        </div>
      </div>
    </section>

    <!-- Continue Button -->
    <LazyVButton
      variant="none"
      className="w-full bg-brand hover:bg-brand-hover text-white py-5 rounded-[12px] font-bold text-[14px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(99,102,241,0.2)] active:scale-[0.99]"
      @click="$emit('continue')"
    >
      {{ t("storefront.checkout.submitOrder") }}
      <Icon name="ph:shopping-cart-bold" class="w-5 h-5" />
    </LazyVButton>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const form = defineModel<{
  emailOrPhone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  governorate: string;
  selectedMethod: string;
}>({ required: true });

defineEmits<{ continue: [] }>();

const shippingMethods = [
  {
    id: "standard",
    name: "Standard Delivery",
    time: "3-5 Business Days",
    price: "30.00",
  },
  {
    id: "express",
    name: "Express Terminal",
    time: "24-48 Hours Priority",
    price: "60.00",
  },
];

const governorates = ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan"];
</script>

<style scoped>
select {
  background-image: none;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px var(--bg-primary) inset !important;
  -webkit-text-fill-color: var(--text-primary) !important;
}
</style>
