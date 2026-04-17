<template>
  <div>
    <div class="flex items-center justify-center p-6 text-tx-primary">
      <div class="w-full max-w-2xl bg-bg-primary border border-border-subtle rounded-2xl p-5 shadow-2xl">
        <!-- Progress Bar -->
        <div class="mb-8">
          <VProgressBar :progress="progress" :height="8" color="blue" trackVariant="slate" :showHeader="true"
            :headerLeft="`Step ${step} of ${totalSteps}`" :headerRight="`${Math.round(progress)}%`" :showLabel="false"
            :shadow="false" />
        </div>

        <div class="bg-bg-base flex items-center justify-center p-6 text-tx-primary">
          <div class="w-full max-w-2xl">

            <!-- Header -->
            <div class="text-center mb-10">
              <h1 class="text-3xl md:text-4xl font-bold mb-3 tracking-tight">How will customers pay?</h1>
              <p class="text-tx-secondary text-sm">Choose the payment methods you'd like to offer at checkout.</p>
            </div>

            <!-- Payment Methods List -->
            <div class="space-y-4 mb-12">
              <!-- Cash on Delivery (Selected/Active State) -->
              <div class="p-5 rounded-xl border-2 transition-all flex items-center gap-4 cursor-pointer"
                :class="codEnabled ? 'bg-bg-elevated border-brand/50' : 'bg-bg-primary border-border-subtle opacity-60'"
                @click="codEnabled = !codEnabled">
                <div class="w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center shrink-0">
                  <Icon name="ph:bank-duotone" class="text-brand text-2xl" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-sm">Cash on Delivery</h3>
                  <p class="text-xs text-tx-secondary">Collect physical payment upon delivery</p>
                </div>
                <!-- Custom Toggle Switch -->
                <div class="w-12 h-6 rounded-full p-1 transition-colors duration-200 relative"
                  :class="codEnabled ? 'bg-brand' : 'bg-bg-elevated border border-border-default'">
                  <div class="w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm"
                    :class="codEnabled ? 'translate-x-6' : 'translate-x-0'"></div>
                </div>
              </div>

              <!-- Stripe -->
              <div class="p-5 rounded-xl bg-bg-primary border border-border-subtle flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0">
                  <Icon name="ph:credit-card-duotone" class="text-tx-secondary text-2xl" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-sm">Stripe</h3>
                  <p class="text-xs text-tx-secondary">Cards, Apple Pay, and Google Pay</p>
                </div>
                <VButton variant="none"
                  className="bg-brand hover:bg-brand-hover px-5 py-2 rounded-md text-xs font-bold transition-all">
                  Connect
                </VButton>
              </div>

              <!-- Paymob -->
              <div class="p-5 rounded-xl bg-bg-primary border border-border-subtle flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0">
                  <Icon name="ph:wallet-duotone" class="text-tx-secondary text-2xl" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-sm">Paymob</h3>
                  <p class="text-xs text-tx-secondary">Local Egyptian payment gateway</p>
                </div>
                <VButton variant="none"
                  className="bg-brand hover:bg-brand-hover px-5 py-2 rounded-md text-xs font-bold transition-all">
                  Connect
                </VButton>
              </div>

              <!-- Vodafone Cash (Expanded with input) -->
              <div class="p-5 rounded-xl bg-bg-primary border border-border-subtle space-y-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                    <Icon name="ph:device-mobile-camera-duotone" class="text-red-500 text-2xl" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <h3 class="font-bold text-sm">Vodafone Cash</h3>
                      <span
                        class="bg-bg-elevated text-[9px] font-black px-2 py-0.5 rounded text-tx-secondary tracking-wider">Manual</span>
                    </div>
                    <p class="text-xs text-tx-secondary">Manual mobile wallet transfers</p>
                  </div>
                </div>

                <VInput v-model="walletNumber" label="Wallet Phone Number" placeholder="01X XXXX XXXX"
                  inputClass="bg-bg-elevated border-border-subtle rounded-md ps-16 pe-3 py-2 focus:border-brand transition-colors placeholder:text-tx-muted">
                  <template #prefix>
                    <div
                      class="absolute start-3 top-1/2 -translate-y-1/2 text-tx-secondary font-bold text-sm border-e border-border-default pe-3">
                      +20
                    </div>
                  </template>
                </VInput>
              </div>
            </div>

            <!-- Footer Navigation -->
            <div class="flex items-center justify-between">
              <VButton variant="ghost" className="group border-none !px-0 !py-0 hover:!bg-transparent"
                @click="$emit('prev')">
                <Icon name="ph:arrow-start-bold" class="group-hover:-translate-x-1 transition-transform w-4 h-4" />
                Back
              </VButton>
              <VButton className="!px-8" label="Continue to Shipping" @click="handleContinue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  progress: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 3,
  },
  totalSteps: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits<{ next: []; prev: [] }>();

const codEnabled = ref(true)
const walletNumber = ref('')

const handleContinue = () => {
  emit('next')
}
</script>