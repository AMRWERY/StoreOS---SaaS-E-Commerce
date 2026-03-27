<template>
  <section class="lg:col-span-4 bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 space-y-8">
    <div class="flex items-center gap-3">
      <Icon name="ph:shield-check-bold" class="text-indigo-500 text-lg" />
      <h3 class="text-sm font-bold">Security</h3>
    </div>
    <div class="space-y-5">
      <VInput label="Current Password" type="password" modelValue="********"
        inputClass="bg-black border-white/10 rounded-xl px-5 py-3" />
      <VInput label="New Password" type="password" inputClass="bg-black border-white/10 rounded-xl px-5 py-3" />
      <VInput label="Confirm New Password" type="password" inputClass="bg-black border-white/10 rounded-xl px-5 py-3"
        class="pb-6 border-b border-white/5" />

      <div class="flex items-center justify-between pt-2">
        <div>
          <p class="text-xs font-bold">Two-Factor Authentication</p>
          <p class="text-[9px] text-gray-600 mt-0.5">Recommended for account safety</p>
        </div>
        <VSwitchButton v-model="twoFactor" />
      </div>

      <div class="flex justify-between items-center">
        <button class="text-[10px] font-bold text-indigo-400 flex items-center gap-2 hover:underline">
          <Icon name="ph:key-bold" /> Setup Backup Codes
        </button>
        <span class="text-[8px] text-gray-800 font-bold">Updated: 2023.11.14</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const twoFactor = ref(false);
</script>