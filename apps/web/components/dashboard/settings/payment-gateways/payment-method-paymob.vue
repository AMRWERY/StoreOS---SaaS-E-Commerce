<template>
  <div>
    <section
      class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5"
    >
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="lg:w-1/3">
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-12 h-12 rounded-2xl bg-accent-dim flex items-center justify-center border border-accent/10"
            >
              <Icon name="ph:bank-duotone" class="text-accent text-2xl" />
            </div>
            <div>
              <h3 class="text-base font-bold">
                {{ t("dashboard.settings.payment.paymob") }}
              </h3>
              <span
                class="text-[8px] font-black text-tx-muted tracking-widest"
                >{{ t("dashboard.settings.payment.paymobRegion") }}</span
              >
            </div>
          </div>
          <p class="text-xs text-tx-secondary leading-relaxed font-medium">
            {{ t("dashboard.settings.payment.paymobDesc") }}
          </p>
        </div>

        <div class="lg:w-2/3 space-y-6">
          <LazyVInput
            type="password"
            label="Api_Key_Production"
            modelValue="sk_prod_18471289fh128h41h2"
            readonly
            inputClass="bg-bg-primary tracking-widest"
          />

          <div class="grid grid-cols-2 gap-6">
            <LazyVInput
              label="Integration_Id"
              modelValue="128492"
              readonly
              inputClass="bg-bg-primary text-tx-secondary"
            />
            <LazyVInput
              label="Iframe_Id"
              modelValue="849201"
              readonly
              inputClass="bg-bg-primary text-tx-secondary"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>