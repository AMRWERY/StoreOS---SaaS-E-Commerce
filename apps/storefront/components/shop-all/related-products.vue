<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="item in relatedProducts" :key="item.id" class="group cursor-pointer h-full">
        <div
          class="h-full flex flex-col rounded-[12px] bg-[#0D0D18] border border-[#1C1C30] p-3 transition-all group-hover:border-[#6366F1]/40 overflow-hidden">
          <!-- Image Wrapper -->
          <div class="relative w-full pt-[100%] rounded-[8px] overflow-hidden bg-black/40 mb-5">
            <img :src="item.img"
              class="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-700 grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105" />
            <div v-if="item.tag"
              class="absolute top-4 start-4 bg-[#F97316] rounded-full px-3 py-0.5 text-[9px] font-black text-white tracking-widest shadow-lg">
              {{ item.tag }}
            </div>
          </div>

          <!-- Information -->
          <div class="flex-1 flex flex-col px-1">
            <p class="text-[10px] font-black text-[#50506A] tracking-[0.2em]">{{ item.cat }}</p>
            <h3
              class="text-[15px] font-medium text-[#8888AA] group-hover:text-[#F0F0FF] transition-colors line-clamp-1">
              {{ item.name }}
            </h3>
            <p class="mt-auto pt-3 text-[#F0F0FF] font-bold text-[16px]">
              <span class="text-[11px] text-[#50506A] me-1">$</span>{{ item.price.toLocaleString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const catalogStore = useCatalogStore()
const { relatedProducts } = storeToRefs(catalogStore)
</script>