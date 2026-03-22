<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
      <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
        <h2 class="font-bold flex items-center gap-2">
          <icon name="ph:squares-four-bold" class="text-indigo-500" /> Inventory List
        </h2>
        <div class="flex items-center gap-4">
          <span class="text-[10px] font-bold text-gray-600">Showing {{ items.length }} items</span>
        </div>
      </div>
      <table class="w-full text-start">
        <thead class="text-[9px] font-black text-gray-600 tracking-widest border-b border-white/5 bg-black/40">
          <tr>
            <th class="px-6 py-4">Product Details</th>
            <th class="px-6 py-4">Category</th>
            <th class="px-6 py-4">Current Stock</th>
            <th class="px-6 py-4">Incoming</th>
            <th class="px-6 py-4">Threshold</th>
            <th class="px-6 py-4">Last Updated</th>
            <th class="px-6 py-4 text-center">Quick Adjust</th>
            <th class="px-6 py-4 text-end">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/[0.03]">
          <tr v-for="item in items" :key="item.id" class="group hover:bg-white/[0.02] transition-colors">
            <td class="px-6 py-4 flex items-center gap-4">
              <div class="relative w-11 h-11 rounded-lg overflow-hidden border border-white/5 bg-black">
                <img :src="item.image"
                  class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
              </div>
              <div class="min-w-0">
                <h4 class="text-sm font-bold truncate">{{ item.name }}</h4>
                <p class="text-[10px] text-gray-500 font-bold tracking-widest mt-0.5">SKU: {{ item.sku }}</p>
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                class="text-[10px] font-black text-gray-500 uppercase tracking-wider bg-white/5 px-2 py-1 rounded">{{
                  item.category }}</span>
            </td>
            <td class="px-6 py-4">
              <div v-if="item.current === 0" class="text-[11px] font-black tracking-widest text-red-500">OUT OF STOCK
              </div>
              <div v-else-if="item.current <= item.threshold"
                class="text-[11px] font-black tracking-widest text-amber-500">LOW: {{ item.current }}</div>
              <div v-else class="text-[11px] font-black tracking-widest text-emerald-500">{{ item.current }}</div>
            </td>
            <td class="px-6 py-4">
              <span v-if="item.incoming > 0" class="text-sm font-bold text-indigo-400">+{{ item.incoming }}</span>
              <span v-else class="text-sm font-bold text-gray-600">-</span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2 group/edit cursor-pointer w-fit">
                <span class="text-sm font-bold text-gray-400 group-hover/edit:text-white transition-colors">{{
                  item.threshold }}</span>
                <icon name="ph:pencil-simple-bold"
                  class="text-gray-600 opacity-0 group-hover/edit:opacity-100 transition-all group-hover/edit:text-indigo-400" />
              </div>
            </td>
            <td class="px-6 py-4 text-[10px] font-bold text-gray-600 tracking-wider">{{ item.lastUpdated }}</td>
            <td class="px-6 py-4 text-center">
              <div
                class="inline-flex items-center bg-black border border-white/10 rounded-lg overflow-hidden group-hover:border-white/20 transition-colors">
                <button class="px-2.5 py-1.5 hover:bg-white/10 hover:text-white text-gray-500 transition-colors"
                  @click="$emit('quick-adjust', item, -1)">
                  <icon name="ph:minus-bold" class="text-[10px]" />
                </button>
                <span class="text-xs font-bold px-2 min-w-[32px] text-center">{{ item.current }}</span>
                <button class="px-2.5 py-1.5 hover:bg-white/10 hover:text-white text-gray-500 transition-colors"
                  @click="$emit('quick-adjust', item, 1)">
                  <icon name="ph:plus-bold" class="text-[10px]" />
                </button>
              </div>
            </td>
            <td class="px-6 py-4 text-end">
              <div class="flex items-center justify-end gap-1 text-gray-500">
                <button
                  class="hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors border border-transparent hover:border-white/10"
                  title="View History">
                  <icon name="ph:clock-counter-clockwise-bold" class="w-4 h-4" />
                </button>
                <button @click="$emit('adjust', item)"
                  class="hover:text-indigo-400 hover:bg-indigo-500/10 p-2 rounded-lg transition-colors border border-transparent hover:border-indigo-500/20"
                  title="Adjust Stock">
                  <icon name="ph:sliders-horizontal-bold" class="w-4 h-4" />
                </button>
                <button
                  class="hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors border border-transparent hover:border-white/10">
                  <icon name="ph:dots-three-bold" class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  items: any[]
}>()

defineEmits(['adjust', 'quick-adjust'])
</script>