<template>
  <div class="flex-1 min-w-0 flex flex-col items-center justify-center py-6">

    <!-- Brand Logo -->
    <div class="mb-10 flex items-center gap-3 group cursor-pointer">
      <div
        class="w-10 h-10 bg-bg-primary border border-border-subtle rounded-[10px] flex items-center justify-center shadow-xl transition-all group-hover:border-brand/50">
        <Icon name="ph:cube-fill" class="w-6 h-6 text-brand" />
      </div>
      <span class="text-xl font-bold tracking-tighter text-tx-primary">
        Store<span class="text-brand">OS</span>
      </span>
    </div>

    <!-- Tracking Card -->
    <div
      class="w-full max-w-[520px] bg-bg-primary border border-border-subtle rounded-[20px] p-10 shadow-2xl relative overflow-hidden">

      <div class="absolute -top-24 -end-24 w-48 h-48 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold tracking-tight mb-3 text-white">Track Your Order</h1>
        <p class="text-[13px] text-tx-muted leading-relaxed max-w-[300px] mx-auto">
          Enter your details below to see the real-time status of your shipment.
        </p>
      </div>

      <form class="space-y-8" @submit.prevent="handleSubmit(); $emit('submit-order')">

        <!-- Order Number -->
        <div class="space-y-3">
          <label class="text-[10px] font-black tracking-[0.25em] text-tx-secondary">Order Number</label>
          <div class="relative group">
            <div
              class="absolute start-4 top-1/2 -translate-y-1/2 text-tx-muted group-focus-within:text-brand transition-colors pointer-events-none">
              <Icon name="ph:ticket-fill" class="w-4 h-4" />
            </div>
            <input v-model="orderNumber" type="text" placeholder="e.g. SOS-12345-890"
              class="w-full bg-bg-elevated border border-border-default rounded-[10px] ps-11 pe-5 py-4 text-[14px] font-medium focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all placeholder:text-[#262640]" />
          </div>
        </div>

        <!-- Contact Info -->
        <div class="space-y-3">
          <label class="text-[10px] font-black tracking-[0.25em] text-tx-secondary">Email or Phone Number</label>
          <div class="relative group">
            <div
              class="absolute start-4 top-1/2 -translate-y-1/2 text-tx-muted group-focus-within:text-brand transition-colors pointer-events-none">
              <Icon name="ph:at-fill" class="w-4 h-4" />
            </div>
            <input v-model="contactInfo" type="text" placeholder="alex@example.com"
              class="w-full bg-bg-elevated border border-border-default rounded-[10px] ps-11 pe-5 py-4 text-[14px] font-medium focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all placeholder:text-[#262640]" />
          </div>
        </div>

        <LazyVButton variant="none" type="submit"
          className="w-full bg-brand hover:bg-brand-hover text-white py-4 rounded-[12px] font-bold text-[14px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(99,102,241,0.2)] active:scale-[0.98] mt-4">
          Track Order
          <Icon name="ph:arrow-right-bold" class="w-5 h-5" />
        </LazyVButton>
      </form>

      <!-- Footer Info -->
      <div class="mt-14 grid grid-cols-2 gap-6 border-t border-border-subtle pt-10">
        <div class="flex items-start gap-3 group">
          <div
            class="w-8 h-8 rounded-[8px] bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-brand/30 transition-colors">
            <Icon name="ph:chat-dots-fill" class="w-4 h-4 text-tx-muted group-hover:text-brand transition-colors" />
          </div>
          <div>
            <h4 class="text-[11px] font-bold text-tx-secondary tracking-widest">Need help?</h4>
            <p class="text-[10px] text-tx-muted mt-0.5">Support is active 24/7</p>
          </div>
        </div>
        <div class="flex items-start gap-3 group">
          <div
            class="w-8 h-8 rounded-[8px] bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[#10B981]/30 transition-colors">
            <Icon name="ph:shield-check-fill"
              class="w-4 h-4 text-tx-muted group-hover:text-[#10B981] transition-colors" />
          </div>
          <div>
            <h4 class="text-[11px] font-bold text-tx-secondary tracking-widest">Secure Portal</h4>
            <p class="text-[10px] text-tx-muted mt-0.5 tracking-tighter">End-to-end encrypted</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 w-full max-w-[520px] h-px bg-gradient-to-r from-transparent via-[#1C1C30] to-transparent" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineEmits<{ 'submit-order': [] }>()

const orderNumber = ref('')
const contactInfo = ref('')

const handleSubmit = () => {
  // tracking / validation logic here
}
</script>

<style scoped>
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px var(--bg-elevated) inset !important;
  -webkit-text-fill-color: var(--text-primary) !important;
}
</style>
