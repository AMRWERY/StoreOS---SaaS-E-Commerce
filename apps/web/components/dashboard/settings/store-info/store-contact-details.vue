<template>
  <div>
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border-subtle pt-16">
      <div class="lg:col-span-4">
        <h3 class="font-bold text-lg mb-2">Contact Details</h3>
        <p class="text-xs text-tx-secondary leading-relaxed">Business address and customer support contact information.</p>
      </div>
      <div class="lg:col-span-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VInput v-model="modelValue.supportEmail" type="email" label="Support Email" placeholder="Contact email" />
          <VInput v-model="modelValue.phone" label="Phone" placeholder="Business phone" />
        </div>
        <VInput v-model="modelValue.address" label="Physical Address" placeholder="Store address" />
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <VInput v-model="modelValue.city" label="City" placeholder="City" />
          <VInput v-model="modelValue.state" label="State" placeholder="State" />
          <VInput v-model="modelValue.zip" label="Zip Code" placeholder="Zip" />
          <div class="space-y-2">
            <label class="text-[10px] font-bold text-tx-secondary tracking-wider">Country</label>
            <div class="relative">
              <select v-model="modelValue.country"
                class="w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-2.5 text-xs outline-none appearance-none hover:border-border-default focus:border-orange-500/50 transition-all">
                <option>Japan</option>
                <option>USA</option>
              </select>
              <Icon name="ph:caret-down-bold" class="absolute end-3 top-1/2 -translate-y-1/2 text-tx-muted" />
            </div>
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