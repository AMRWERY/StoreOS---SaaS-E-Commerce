<template>
  <div>
    <div class="h-full">
      <section class="bg-bg-primary border border-border-subtle rounded-2xl p-6 text-start h-full">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold">{{ $t('dashboard.home.revenueThisWeek') }}</h3>
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
            <span class="text-[10px] font-bold text-tx-secondary tracking-tighter">OCT 17 - OCT 23</span>
          </div>
        </div>
        <div class="flex items-end justify-between h-40 gap-2 mb-6 px-1">
          <div v-for="(h, i) in [40, 60, 45, 80, 55, 75, 50]" :key="i"
            class="flex-1 rounded-t-lg transition-all duration-500 cursor-pointer"
            :class="[3, 5, 1].includes(i) ? 'bg-brand shadow-lg shadow-brand/20' : 'bg-bg-elevated hover:bg-bg-elevated'"
            :style="{ height: h + '%' }"></div>
        </div>
        <div class="flex justify-between text-[10px] font-bold text-tx-muted px-1">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>