<template>
  <div>
    <div class="flex items-center justify-center p-6 text-white">
      <div class="w-full max-w-2xl bg-[#0c0c0e] border border-white/5 rounded-3xl p-10 md:p-12 shadow-2xl">
        <!-- Progress Bar -->
        <div class="mb-8">
          <VProgressBar :progress="progress" :height="8" color="blue" trackVariant="slate" :showHeader="true"
            :headerLeft="`Step ${step} of ${totalSteps}`" :headerRight="`${Math.round(progress)}%`" :showLabel="false"
            :shadow="false" />
        </div>

        <div class="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white">
          <div class="w-full max-w-2xl">

            <!-- Header -->
            <div class="text-center mb-10">
              <h1 class="text-3xl md:text-4xl font-bold mb-3 tracking-tight">How will customers pay?</h1>
              <p class="text-gray-500 text-sm">Choose the payment methods you'd like to offer at checkout.</p>
            </div>

            <!-- Payment Methods List -->
            <div class="space-y-4 mb-12">
              <!-- Cash on Delivery (Selected/Active State) -->
              <div class="p-5 rounded-2xl border-2 transition-all flex items-center gap-4 cursor-pointer"
                :class="codEnabled ? 'bg-[#0f0f15] border-indigo-500/50' : 'bg-[#0c0c0e] border-white/5 opacity-60'"
                @click="codEnabled = !codEnabled">
                <div class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <icon name="ph:bank-duotone" class="text-indigo-500 text-2xl" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-sm">Cash on Delivery</h3>
                  <p class="text-xs text-gray-500">Collect physical payment upon delivery</p>
                </div>
                <!-- Custom Toggle Switch -->
                <div class="w-12 h-6 rounded-full p-1 transition-colors duration-200 relative"
                  :class="codEnabled ? 'bg-indigo-600' : 'bg-gray-800'">
                  <div class="w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm"
                    :class="codEnabled ? 'translate-x-6' : 'translate-x-0'"></div>
                </div>
              </div>

              <!-- Stripe -->
              <div class="p-5 rounded-2xl bg-[#0c0c0e] border border-white/5 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <icon name="ph:credit-card-duotone" class="text-gray-400 text-2xl" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-sm">Stripe</h3>
                  <p class="text-xs text-gray-500">Cards, Apple Pay, and Google Pay</p>
                </div>
                <VButton variant="none"
                  className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-xs font-bold transition-all">
                  Connect
                </VButton>
              </div>

              <!-- Paymob -->
              <div class="p-5 rounded-2xl bg-[#0c0c0e] border border-white/5 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <icon name="ph:wallet-duotone" class="text-gray-400 text-2xl" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-sm">Paymob</h3>
                  <p class="text-xs text-gray-500">Local Egyptian payment gateway</p>
                </div>
                <VButton variant="none"
                  className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-xs font-bold transition-all">
                  Connect
                </VButton>
              </div>

              <!-- Vodafone Cash (Expanded with input) -->
              <div class="p-6 rounded-2xl bg-[#0c0c0e] border border-white/5 space-y-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                    <icon name="ph:device-mobile-camera-duotone" class="text-red-500 text-2xl" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <h3 class="font-bold text-sm">Vodafone Cash</h3>
                      <span
                        class="bg-white/5 text-[9px] font-black px-2 py-0.5 rounded text-gray-500 tracking-wider">Manual</span>
                    </div>
                    <p class="text-xs text-gray-500">Manual mobile wallet transfers</p>
                  </div>
                </div>

                <VInput v-model="walletNumber" label="Wallet Phone Number" placeholder="01X XXXX XXXX"
                  inputClass="bg-black border-white/5 rounded-xl ps-16 pe-5 py-4 focus:border-indigo-500/50 transition-colors placeholder:text-gray-800">
                  <template #prefix>
                    <div
                      class="absolute start-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm border-e border-white/10 pe-3">
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
                <icon name="ph:arrow-start-bold" class="group-hover:-translate-x-1 transition-transform w-4 h-4" />
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