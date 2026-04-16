<template>
  <div>
    <div class="bg-bg-primary border-t border-border-subtle py-24">
      <div class="max-w-7xl mx-auto px-12 md:px-24 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
        <div v-for="feat in [
          { icon: 'ph:truck-fill', label: 'Fast Transit', desc: 'Direct logistics hub' },
          { icon: 'ph:seal-check-fill', label: 'Auth Verified', desc: '100% genuine units' },
          { icon: 'ph:arrows-counter-clockwise-bold', label: 'Refund Node', desc: 'Hassle-free logic' },
          { icon: 'ph:chat-dots-fill', label: 'Support 24h', desc: 'Direct comms' }
        ]" :key="feat.label" class="flex items-center gap-6 group">
          <div
            class="h-14 w-14 rounded-2xl bg-bg-base border border-border-subtle flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand/5 group-hover:border-brand/20">
            <Icon :name="feat.icon" class="w-6 h-6 text-brand" />
          </div>
          <div>
            <h4 class="text-[12px] font-black text-tx-primary tracking-widest">{{ feat.label }}</h4>
            <p class="text-[11px] text-tx-muted tracking-tighter mt-1 opacity-80">{{ feat.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>