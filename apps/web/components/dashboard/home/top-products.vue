<template>
  <div class="h-full">
    <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6 text-start h-full">
      <div class="flex justify-between items-center mb-8">
        <h3 class="font-bold">Top Products</h3>
        <Icon name="ph:dots-three-outline-fill"
          class="text-gray-600 cursor-pointer hover:text-white transition-colors" />
      </div>
      <div class="space-y-6">
        <div v-for="(prod, i) in products" :key="prod" class="flex items-center gap-4 group cursor-pointer">
          <div
            class="w-12 h-12 bg-white/5 rounded-xl overflow-hidden shrink-0 border border-white/5 group-hover:border-white/10 transition-colors">
            <img :src="`https://picsum.photos/100/100?sig=${i + 20}`"
              class="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold truncate group-hover:text-indigo-400 transition-colors">{{ prod }}</h4>
            <p class="text-[10px] text-gray-600 font-bold mt-0.5 tracking-tight">{{ (32 - i * 4) }} SOLD TODAY
            </p>
          </div>
          <span class="text-xs font-black text-gray-800 group-hover:text-indigo-500/50 transition-colors">#0{{ i + 1
            }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const products = ['HyperGlide Sneakers', 'Zenith Watch Pro', 'AeroFlow Headphones']
</script>