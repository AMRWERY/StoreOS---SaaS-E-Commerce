<template>
  <div>
    <section class="text-start">
      <div class="flex items-center gap-4 mb-6">
        <h3 class="font-bold text-sm tracking-wide">Low Stock Alerts</h3>
        <span
          class="bg-bg-elevated border border-border-subtle text-[10px] font-black px-2 py-0.5 rounded text-tx-secondary tracking-widest">9
          Items Total</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="item in lowStock" :key="item.name"
          class="bg-bg-primary border border-border-subtle rounded-2xl p-3 pe-6 flex items-center gap-4 group hover:border-border-default transition-all">
          <img :src="item.img"
            class="w-14 h-14 rounded-xl object-cover border border-border-subtle grayscale group-hover:grayscale-0 transition-all" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold truncate">{{ item.name }}</h4>
            <div class="flex items-center gap-3 mt-1.5">
              <span
                class="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-danger-dim text-danger whitespace-nowrap">{{
                  item.left }} LEFT</span>
              <VButton variant="none"
                className="text-[10px] font-bold text-brand hover:text-brand transition-colors tracking-widest whitespace-nowrap">Restock</VButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const lowStock = [
  { name: 'X-Optics 50mm Lens', left: 4, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=100&q=80' },
  { name: 'InstaSnap Mini 11', left: 2, img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=100&q=80' },
  { name: 'Aviator Gold Pro', left: 8, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=100&q=80' },
  { name: 'X-Optics 50mm Lens', left: 4, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=100&q=80' },
]
</script>