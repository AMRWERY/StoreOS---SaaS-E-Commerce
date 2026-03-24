<template>
  <div>
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/5 pt-16">
      <div class="lg:col-span-4">
        <h3 class="font-bold text-lg mb-2">Network & Access</h3>
        <p class="text-xs text-gray-500 leading-relaxed">Control how users reach your storefront and manage custom
          domains.</p>
      </div>
      <div class="lg:col-span-8 space-y-8">
        <div class="space-y-2">
          <label class="text-[10px] font-bold text-gray-500 tracking-wider">System URL</label>
          <div class="flex items-center">
            <input :value="modelValue.systemUrl" readonly type="text"
              class="flex-1 bg-[#161618] border border-white/5 rounded-l-lg px-4 py-3 text-sm text-gray-500 outline-none" />
            <button
              class="bg-white/5 hover:bg-white/10 border-y border-e border-white/10 px-5 py-3 rounded-r-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors">
              <icon name="ph:copy-bold" /> Copy
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-end gap-3">
            <VInput v-model="modelValue.customDomain" label="Custom Domain" placeholder="e.g. shop.hyperlink.com"
              class="flex-1" />
            <VButton variant="secondary" size="none" className="px-8 py-3 mb-[2px]">
              Connect
            </VButton>
          </div>
          <div class="flex items-center gap-2 pt-2">
            <icon name="ph:info-bold" class="text-orange-500 text-sm" />
            <p class="text-[10px] text-gray-500">DNS settings are required after connecting. <a href="#"
                class="text-indigo-400 hover:underline">Read Guide</a></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: any
}>();
</script>