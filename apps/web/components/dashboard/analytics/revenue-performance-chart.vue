<template>
  <div>
    <section class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h3 class="font-bold text-lg mb-1">Revenue Performance</h3>
          <p class="text-xs text-tx-muted font-medium">Daily volume of sales and order counts</p>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 bg-brand rounded-full"></div>
            <span class="text-[10px] font-black text-tx-secondary tracking-widest">Revenue ($)</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 border border-orange-500 border-dashed bg-accent-dim rounded-full"></div>
            <span class="text-[10px] font-black text-tx-secondary tracking-widest">Orders</span>
          </div>
        </div>
      </div>
      <!-- SVG Chart Area -->
      <div class="h-64 w-full relative">
        <svg class="w-full h-full" preserveAspectRatio="none">
          <!-- Revenue Line -->
          <path d="M0 220 Q 150 200, 300 140 T 600 160 T 900 100 T 1200 40" fill="none" stroke="#6366f1"
            stroke-width="3" stroke-linecap="round" />
          <!-- Orders Line -->
          <path d="M0 240 Q 150 230, 300 210 T 600 220 T 900 180 T 1200 160" fill="none" stroke="#f97316"
            stroke-width="2" stroke-dasharray="4 4" opacity="0.6" />
        </svg>
        <div
          class="flex justify-between mt-8 text-[10px] font-black text-tx-muted tracking-widest border-t border-border-subtle pt-4">
          <span>Oct 17</span><span>Oct 18</span><span>Oct 19</span><span>Oct 20</span><span>Oct 21</span><span>Oct
            22</span><span>Oct 23</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>

</script>