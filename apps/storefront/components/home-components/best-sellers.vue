<template>
  <div>
    <section class="py-24 px-12 md:px-24 max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-16">
        <div>
          <h2 class="text-4xl font-bold text-tx-primary tracking-tighter">Best Sellers</h2>
          <p class="text-[11px] font-mono text-brand tracking-[0.2em] mt-2 font-black">Top Performers / Week
            12</p>
        </div>
        <div class="flex gap-4">
          <button
            class="rounded-xl border border-border-subtle p-3 hover:bg-bg-elevated transition-colors shadow-sm active:scale-95">
            <Icon name="ph:arrow-left" class="w-5 h-5 text-tx-secondary" />
          </button>
          <button
            class="rounded-xl border border-border-subtle p-3 hover:bg-bg-elevated transition-colors shadow-sm active:scale-95">
            <Icon name="ph:arrow-right" class="w-5 h-5 text-tx-secondary" />
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="product in products" :key="product.id" class="group flex flex-col h-full">
          <div
            class="relative overflow-hidden rounded-[20px] bg-bg-primary border border-border-subtle shadow-sm transition-all duration-700 hover:shadow-2xl hover:shadow-brand/5">
            <img :src="product.image"
              class="h-[200px] w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />
            <div class="absolute inset-0 bg-brand/0 transition-colors group-hover:bg-brand/5"></div>
          </div>
          <div class="mt-4 flex-1 flex flex-col space-y-1 px-1">
            <p class="text-[9px] font-black text-tx-muted tracking-[0.25em]">{{ product.category }}</p>
            <h3 class="text-[16px] font-bold text-tx-secondary group-hover:text-brand transition-colors tracking-tight">
              {{ product.name }}</h3>
            <p class="mt-auto font-mono text-tx-primary font-black text-[18px] tracking-tighter pt-2">EGP {{
              product.price.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  products: Array<any>;
}>();
</script>
