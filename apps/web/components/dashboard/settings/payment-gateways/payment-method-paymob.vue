<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="lg:w-1/3">
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/10">
              <Icon name="ph:bank-duotone" class="text-orange-400 text-2xl" />
            </div>
            <div>
              <h3 class="text-base font-bold">Paymob</h3>
              <span class="text-[8px] font-black text-gray-600 tracking-widest">Region: MEA</span>
            </div>
          </div>
          <p class="text-xs text-gray-500 leading-relaxed font-medium">
            Local payment orchestrator supporting cards, wallets, and
            installments across the MENA region.
          </p>
        </div>

        <div class="lg:w-2/3 space-y-6">
          <VInput type="password" label="Api_Key_Production" modelValue="sk_prod_18471289fh128h41h2" readonly
            inputClass="bg-black tracking-widest" />

          <div class="grid grid-cols-2 gap-6">
            <VInput label="Integration_Id" modelValue="128492" readonly inputClass="bg-black text-gray-400" />
            <VInput label="Iframe_Id" modelValue="849201" readonly inputClass="bg-black text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>

</script>