<template>
  <div>
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border-subtle pt-16">
      <div class="lg:col-span-4">
        <h3 class="font-bold text-lg mb-2">Network & Access</h3>
        <p class="text-xs text-tx-secondary leading-relaxed">Control how users reach your storefront and manage custom
          domains.</p>
      </div>
      <div class="lg:col-span-8 space-y-8">
        <div class="space-y-2">
          <label class="text-[10px] font-bold text-tx-secondary tracking-wider">System URL</label>
          <div class="flex items-center">
            <input :value="modelValue.systemUrl" readonly type="text"
              class="flex-1 bg-bg-primary border border-border-subtle rounded-l-lg px-4 py-3 text-sm text-tx-secondary outline-none" />
            <button
              class="bg-bg-elevated hover:bg-bg-elevated border-y border-e border-border-default px-5 py-3 rounded-r-lg text-[10px] font-black tracking-widest flex items-center gap-2 transition-colors">
              <Icon name="ph:copy-bold" /> Copy
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
            <Icon name="ph:info-bold" class="text-accent text-sm" />
            <p class="text-[10px] text-tx-secondary">DNS settings are required after connecting. <nuxt-link-locale to=""
                class="text-brand hover:underline">Read Guide</nuxt-link-locale></p>
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