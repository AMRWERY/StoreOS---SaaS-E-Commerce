<template>
  <div class="h-full">
    <section class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 text-start h-full">
      <div class="flex justify-between items-center mb-8">
        <h3 class="font-bold">Top Products</h3>
        <Icon name="ph:dots-three-outline-fill"
          class="text-tx-muted cursor-pointer hover:text-tx-primary transition-colors" />
      </div>
      <div class="space-y-6">
        <div v-for="(prod, i) in products" :key="prod" class="flex items-center gap-4 group cursor-pointer">
          <div
            class="w-12 h-12 bg-bg-elevated rounded-xl overflow-hidden shrink-0 border border-border-subtle group-hover:border-border-default transition-colors">
            <img :src="`https://picsum.photos/100/100?sig=${i + 20}`"
              class="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold truncate group-hover:text-brand transition-colors">{{ prod }}</h4>
            <p class="text-[10px] text-tx-muted font-bold mt-0.5 tracking-tight">{{ (32 - i * 4) }} SOLD TODAY
            </p>
          </div>
          <span class="text-xs font-black text-tx-muted group-hover:text-brand/50 transition-colors">#0{{ i + 1
            }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const products = ['HyperGlide Sneakers', 'Zenith Watch Pro', 'AeroFlow Headphones']
</script>