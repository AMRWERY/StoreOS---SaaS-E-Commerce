<template>
  <div class="lg:col-span-6 space-y-14">

    <!-- (01) Contact Information -->
    <section class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="text-[#6366F1] font-bold text-sm">(01)</span>
        <h2 class="text-xl font-bold tracking-tight">{{ $t('storefront.checkout.contactInformation') }}</h2>
      </div>
      <VInput v-model="form.emailOrPhone" :label="$t('storefront.checkout.emailOrPhone')"
        labelClass="text-[10px] font-black tracking-[0.2em] text-[#50506A]"
        inputClass="!w-full !bg-[#0D0D18] !border-[#1C1C30] !rounded-[8px] !px-5 !py-4 !text-[13px] focus:!border-[#6366F1] !outline-none !transition-all !placeholder:text-[#262640]" />
    </section>

    <!-- (02) Shipping Address -->
    <section class="space-y-8">
      <div class="flex items-center gap-3">
        <span class="text-[#6366F1] font-bold text-sm">(02)</span>
        <h2 class="text-xl font-bold tracking-tight">{{ $t('storefront.checkout.shippingAddress') }}</h2>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <VInput v-model="form.firstName" :label="$t('storefront.checkout.firstName')"
          labelClass="text-[10px] font-black tracking-[0.2em] text-[#50506A]"
          inputClass="!w-full !bg-[#0D0D18] !border-[#1C1C30] !rounded-[8px] !px-5 !py-4 !text-[13px] focus:!border-[#6366F1] !outline-none !transition-all" />
        <VInput v-model="form.lastName" :label="$t('storefront.checkout.lastName')"
          labelClass="text-[10px] font-black tracking-[0.2em] text-[#50506A]"
          inputClass="!w-full !bg-[#0D0D18] !border-[#1C1C30] !rounded-[8px] !px-5 !py-4 !text-[13px] focus:!border-[#6366F1] !outline-none !transition-all" />
      </div>

      <VInput v-model="form.address" :label="$t('storefront.checkout.streetAddress')"
        labelClass="text-[10px] font-black tracking-[0.2em] text-[#50506A]"
        inputClass="!w-full !bg-[#0D0D18] !border-[#1C1C30] !rounded-[8px] !px-5 !py-4 !text-[13px] focus:!border-[#6366F1] !outline-none !transition-all" />

      <div class="grid grid-cols-2 gap-4">
        <VInput v-model="form.city" :label="$t('storefront.checkout.city')"
          labelClass="text-[10px] font-black tracking-[0.2em] text-[#50506A]"
          inputClass="!w-full !bg-[#0D0D18] !border-[#1C1C30] !rounded-[8px] !px-5 !py-4 !text-[13px] focus:!border-[#6366F1] !outline-none !transition-all" />
        <div class="space-y-2">
          <label class="text-[10px] font-black tracking-[0.2em] text-[#50506A]">{{ $t('storefront.checkout.governorate') }}</label>
          <div class="relative">
            <select v-model="form.governorate"
              class="w-full bg-[#0D0D18] border border-[#1C1C30] rounded-[8px] px-5 py-4 text-[13px] appearance-none outline-none focus:border-[#6366F1] transition-all text-[#F0F0FF]">
              <option v-for="g in governorates" :key="g" :value="g">{{ g }}</option>
            </select>
            <Icon name="ph:caret-down"
              class="absolute end-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#50506A] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>

    <!-- (03) Shipping Method -->
    <section class="space-y-6">
      <div class="flex items-center gap-3">
        <span class="text-[#6366F1] font-bold text-sm">(03)</span>
        <h2 class="text-xl font-bold tracking-tight">{{ $t('storefront.checkout.shippingMethod') }}</h2>
      </div>

      <div class="space-y-3">
        <div v-for="method in shippingMethods" :key="method.id"
          class="relative border-2 p-6 rounded-[12px] cursor-pointer transition-all flex items-center justify-between"
          :class="form.selectedMethod === method.id
            ? 'bg-[#0D0D18] border-[#6366F1] shadow-[0_0_20px_rgba(99,102,241,0.1)]'
            : 'bg-transparent border-[#1C1C30] hover:border-[#262640]'" @click="form.selectedMethod = method.id">
          <div class="flex items-center gap-5">
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
              :class="form.selectedMethod === method.id ? 'border-[#6366F1]' : 'border-[#262640]'">
              <div v-if="form.selectedMethod === method.id" class="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
            </div>
            <div>
              <p class="text-[14px] font-bold">{{ method.name }}</p>
              <p class="text-[11px] text-[#50506A] font-medium">{{ method.time }}</p>
            </div>
          </div>
          <p class="text-sm font-bold text-[#8888AA]">EGP {{ method.price }}</p>
        </div>
      </div>
    </section>

    <!-- Continue Button -->
    <VButton variant="none"
      className="w-full bg-[#6366F1] hover:bg-[#818CF8] text-white py-5 rounded-[12px] font-bold text-[14px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(99,102,241,0.2)] active:scale-[0.99]"
      @click="$emit('continue')">
      {{ $t('storefront.checkout.submitOrder') }}
      <Icon name="ph:shopping-cart-bold" class="w-5 h-5" />
    </VButton>
  </div>
</template>

<script lang="ts" setup>
const form = defineModel<{
  emailOrPhone: string
  firstName: string
  lastName: string
  address: string
  city: string
  governorate: string
  selectedMethod: string
}>({ required: true })

defineEmits<{ continue: [] }>()

const shippingMethods = [
  { id: 'standard', name: 'Standard Delivery', time: '3-5 Business Days', price: '30.00' },
  { id: 'express', name: 'Express Terminal', time: '24-48 Hours Priority', price: '60.00' },
]

const governorates = ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan']
</script>

<style scoped>
select {
  background-image: none;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #0D0D18 inset !important;
  -webkit-text-fill-color: #F0F0FF !important;
}
</style>
