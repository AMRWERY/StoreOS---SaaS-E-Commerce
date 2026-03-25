<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 flex flex-col lg:flex-row items-center gap-12">
      <div class="flex items-center gap-6 lg:w-1/3 shrink-0">
        <div class="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/10">
          <Icon name="ph:broadcast-bold" class="text-red-500 text-2xl" />
        </div>
        <div>
          <h3 class="text-base font-bold">Vodafone Cash</h3>
          <p class="text-xs text-gray-500 font-medium">Direct mobile wallet transfer</p>
        </div>
      </div>
      <div class="flex-1 w-full flex flex-col md:flex-row items-end gap-4">
        <div class="flex-1 w-full">
          <VInput label="Collection_Wallet_Number" modelValue="10 1234 5678" readonly
            inputClass="bg-black ps-16 font-mono text-white text-sm">
            <template #prefix>
              <span
                class="absolute start-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold border-e border-white/10 pe-3 text-sm flex items-center">+20</span>
            </template>
          </VInput>
        </div>
        <VButton variant="secondary"
          className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-black tracking-widest text-gray-300 transition-colors">
          Verify
        </VButton>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>

</script>