<template>
  <div>
    <div
      class="min-h-screen text-[#e1e1e1] pb-20 selection:bg-indigo-500/30 overflow-x-hidden"
    >
      <!-- 1. Breadcrumbs & Header -->
      <header class="max-w-6xl mx-auto mb-12">
        <VBreadcrumb :items="breadcrumbItems" />

        <h1 class="text-4xl font-bold tracking-tight mb-4">Payment Gateways</h1>
        <p class="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Configure your transaction pipelines. Ensure API keys are rotated
          every 90 days for maximum security protocol compliance.
        </p>
      </header>

      <div class="max-w-6xl mx-auto space-y-6">
        <!-- 2. Top Row: COD & Stripe -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Cash on Delivery -->
          <section
            class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 flex flex-col justify-between"
          >
            <div class="flex justify-between items-start mb-10">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10"
                >
                  <icon
                    name="ph:money-duotone"
                    class="text-indigo-400 text-2xl"
                  />
                </div>
                <div>
                  <h3 class="text-base font-bold">Cash on Delivery</h3>
                  <div class="flex items-center gap-1.5 mt-1">
                    <div
                      class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"
                    ></div>
                    <span
                      class="text-[9px] font-black text-emerald-500 uppercase tracking-widest"
                      >Status: Active</span
                    >
                  </div>
                </div>
              </div>
              <!-- Toggle -->
              <button
                @click="codActive = !codActive"
                class="w-11 h-6 rounded-full transition-colors relative p-1"
                :class="codActive ? 'bg-indigo-600' : 'bg-white/10'"
              >
                <div
                  class="w-4 h-4 bg-white rounded-full transition-transform"
                  :class="codActive ? 'translate-x-5' : 'translate-x-0'"
                ></div>
              </button>
            </div>

            <div class="bg-black/40 border border-white/5 rounded-xl p-5 mb-6">
              <p
                class="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2"
              >
                Settlement_Type
              </p>
              <p class="text-sm font-bold text-gray-300">
                Immediate Physical Exchange
              </p>
            </div>

            <div
              class="flex justify-between text-[9px] font-black text-gray-700 uppercase tracking-widest"
            >
              <span>Fee: 0.00%</span>
              <span>Limit: $5,000.00</span>
            </div>
          </section>

          <!-- Stripe -->
          <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
            <div class="flex justify-between items-start mb-10">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5"
                >
                  <icon
                    name="ph:stripe-logo-duotone"
                    class="text-gray-400 text-2xl"
                  />
                </div>
                <div>
                  <h3 class="text-base font-bold">Stripe</h3>
                  <p class="text-xs text-gray-500 mt-1">
                    Global credit & debit cards
                  </p>
                </div>
              </div>
              <span
                class="text-[8px] font-black text-orange-500/60 border border-orange-500/20 px-2 py-0.5 rounded uppercase tracking-widest"
                >Disconnected</span
              >
            </div>

            <button
              class="w-full bg-[#818cf8] hover:bg-[#6366f1] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              <icon name="ph:link-bold" class="text-base" />
              Connect Stripe Account
            </button>
            <p
              class="text-center text-[8px] font-bold text-gray-700 uppercase tracking-[0.2em] mt-4"
            >
              Redirects to stripe connect auth
            </p>
          </section>
        </div>

        <!-- 3. Paymob Section -->
        <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
          <div class="flex flex-col lg:flex-row gap-12">
            <div class="lg:w-1/3">
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/10"
                >
                  <icon
                    name="ph:bank-duotone"
                    class="text-orange-400 text-2xl"
                  />
                </div>
                <div>
                  <h3 class="text-base font-bold">Paymob</h3>
                  <span
                    class="text-[8px] font-black text-gray-600 uppercase tracking-widest"
                    >Region: MEA</span
                  >
                </div>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed font-medium">
                Local payment orchestrator supporting cards, wallets, and
                installments across the MENA region.
              </p>
            </div>

            <div class="lg:w-2/3 space-y-6">
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-gray-600 uppercase tracking-widest"
                  >Api_Key_Production</label
                >
                <div class="relative group">
                  <input
                    :type="showPaymobKey ? 'text' : 'password'"
                    value="••••••••••••••••••••••••"
                    readonly
                    class="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-mono tracking-widest outline-none group-focus-within:border-indigo-500/50 transition-colors"
                  />
                  <button
                    @click="showPaymobKey = !showPaymobKey"
                    class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                  >
                    <icon
                      :name="
                        showPaymobKey ? 'ph:eye-slash-bold' : 'ph:eye-bold'
                      "
                    />
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label
                    class="text-[10px] font-black text-gray-600 uppercase tracking-widest"
                    >Integration_Id</label
                  >
                  <input
                    type="text"
                    value="128492"
                    readonly
                    class="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-sm font-mono text-gray-400 outline-none"
                  />
                </div>
                <div class="space-y-2">
                  <label
                    class="text-[10px] font-black text-gray-600 uppercase tracking-widest"
                    >Iframe_Id</label
                  >
                  <input
                    type="text"
                    value="849201"
                    readonly
                    class="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-sm font-mono text-gray-400 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. Vodafone Cash Section -->
        <section
          class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 flex flex-col lg:flex-row items-center gap-12"
        >
          <div class="flex items-center gap-6 lg:w-1/3 shrink-0">
            <div
              class="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/10"
            >
              <icon name="ph:broadcast-bold" class="text-red-500 text-2xl" />
            </div>
            <div>
              <h3 class="text-base font-bold">Vodafone Cash</h3>
              <p class="text-xs text-gray-500 font-medium">
                Direct mobile wallet transfer
              </p>
            </div>
          </div>
          <div class="flex-1 w-full flex flex-col md:flex-row items-end gap-4">
            <div class="flex-1 space-y-2 w-full">
              <label
                class="text-[10px] font-black text-gray-600 uppercase tracking-widest"
                >Collection_Wallet_Number</label
              >
              <div
                class="flex items-center bg-black border border-white/10 rounded-xl px-5 py-4 group focus-within:border-indigo-500/50 transition-colors"
              >
                <span
                  class="text-gray-500 font-bold me-3 border-e border-white/10 pe-3"
                  >+20</span
                >
                <input
                  type="text"
                  value="10 1234 5678"
                  readonly
                  class="bg-transparent text-sm font-bold w-full outline-none"
                />
              </div>
            </div>
            <button
              class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest text-gray-300 transition-colors"
            >
              Verify
            </button>
          </div>
        </section>

        <!-- 5. Safety Alert Section -->
        <section
          class="bg-orange-950/20 border border-orange-500/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div class="flex items-start gap-5 max-w-2xl">
            <div class="mt-1">
              <icon
                name="ph:warning-octagon-bold"
                class="text-orange-500 text-2xl"
              />
            </div>
            <div>
              <h4 class="text-sm font-bold text-orange-200">
                Transaction Safety Lock
              </h4>
              <p
                class="text-xs text-orange-500/60 leading-relaxed font-medium mt-1"
              >
                When enabled, all incoming payments will be held in escrow for
                24 hours to mitigate fraud vectors.
              </p>
            </div>
          </div>
          <button
            class="bg-transparent border border-orange-500/30 text-orange-500/70 hover:text-orange-400 hover:border-orange-500/50 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Disable_Protocol_X
          </button>
        </section>
      </div>

      <!-- 6. Fixed Status Bar -->
      <footer
        class="fixed bottom-0 start-0 w-full h-8 bg-black border-t border-white/10 px-6 flex items-center justify-between z-50 overflow-hidden"
      >
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span
              class="text-[9px] font-bold text-emerald-500/80 uppercase tracking-widest"
              >Gateway_Sync: {{ systemStats.sync }}</span
            >
          </div>
          <span
            class="text-[9px] font-bold text-gray-700 uppercase tracking-widest"
            >Latency: {{ systemStats.latency }}</span
          >
        </div>
        <div class="flex items-center gap-6">
          <span
            class="text-[9px] font-bold text-gray-700 uppercase tracking-widest"
            >Region: {{ systemStats.region }}</span
          >
          <span
            class="text-[9px] font-black text-indigo-500/60 uppercase tracking-widest"
            >OS_Version: {{ systemStats.version }}</span
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
const codActive = ref(true);
const showPaymobKey = ref(false);

const breadcrumbItems = [
  { label: "System", to: "/dashboard/settings" },
  { label: "Configuration", to: "/dashboard/settings" },
  { label: "Payments", active: true },
];

// --- Mock Data ---
const systemStats = {
  sync: "OK",
  latency: "42ms",
  region: "US-EAST-1",
  version: "2.4.0-STABLE",
};

definePageMeta({
  layout: "dashboard",
});

useHead({
  titleTemplate: () => "Settings - Payment Gateways",
});
</script>