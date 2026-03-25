<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Heatmap -->
      <div class="lg:col-span-8 bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h3 class="font-bold text-lg mb-1">Sales Velocity Heatmap</h3>
            <p class="text-xs text-gray-600 font-medium">Density of orders by day and hour</p>
          </div>
          <div class="flex items-center gap-3"><span class="text-[8px] font-black text-gray-700">Less</span>
            <div class="flex gap-1">
              <div v-for="op in [5, 20, 60, 100]" :key="op" class="w-4 h-2 bg-indigo-500 rounded-sm"
                :style="{ opacity: op + '%' }"></div>
            </div><span class="text-[8px] font-black text-gray-700">More</span>
          </div>
        </div>
        <ClientOnly>
          <div class="space-y-1">
            <div v-for="(row, day) in heatmap" :key="day" class="flex gap-1">
              <div v-for="(cls, hour) in row" :key="hour" class="flex-1 aspect-square rounded-[1px]" :class="cls" />
            </div>
          </div>
          <template #fallback>
            <div class="space-y-1">
              <div v-for="day in 7" :key="day" class="flex gap-1">
                <div v-for="hour in 24" :key="hour" class="flex-1 aspect-square rounded-[1px] bg-white/[0.02]" />
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Insight Box -->
      <div
        class="lg:col-span-4 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
        <div class="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6">
          <icon name="ph:lightbulb-bold" class="text-indigo-400 text-2xl" />
        </div>
        <h4 class="text-sm font-bold text-white mb-2">Peak Operational Window</h4>
        <p class="text-xs text-gray-500 leading-relaxed max-w-[240px]">
          Your business hits peak activity on <span class="text-indigo-400 font-bold">Tuesday at 7:00 PM</span>.
          Consider increasing support staff or flash sales.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const heatmap = Array.from({ length: 7 }, () =>
  Array.from({ length: 24 }, () => {
    const r = Math.random()
    return r > 0.7 ? 'bg-indigo-500' : r > 0.4 ? 'bg-indigo-500/20' : 'bg-white/[0.02]'
  }),
)
</script>