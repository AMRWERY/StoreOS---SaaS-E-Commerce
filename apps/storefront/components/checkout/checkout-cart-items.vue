<template>
  <main class="space-y-6">
    <div class="flex items-baseline justify-between">
      <h1 class="text-4xl font-bold tracking-tight">Shopping Cart</h1>
      <span class="text-[#50506A] text-[12px] font-semibold uppercase tracking-widest">
        {{ items.length }} Items
      </span>
    </div>

    <div class="bg-[#0D0D18] border border-[#1C1C30] rounded-[12px] divide-y divide-[#1C1C30] overflow-hidden">
      <div v-for="item in items" :key="item.id"
        class="p-5 flex items-center gap-4 group hover:bg-[#141422] transition-colors">
        <!-- Product Image -->
        <div class="w-20 h-20 rounded-[8px] overflow-hidden bg-black border border-[#1C1C30] shrink-0">
          <img :src="item.image"
            class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:grayscale-0 grayscale-[20%] transition-all duration-500" />
        </div>

        <!-- Product Details (flex-1 takes all available space) -->
        <div class="flex-1 min-w-0">
          <!-- Name + Price row -->
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="min-w-0">
              <h3
                class="text-[14px] font-bold text-white group-hover:text-[#6366F1] transition-colors leading-tight truncate">
                {{ item.name }}
              </h3>
              <p class="text-[10px] text-[#50506A] mt-0.5 uppercase font-semibold tracking-tighter truncate">
                {{ item.meta }}
              </p>
            </div>
            <p class="text-[#6366F1] font-bold text-[15px] tracking-tighter shrink-0">
              <span class="text-[11px] opacity-60 me-0.5">$</span>{{ (item.price * item.quantity).toFixed(2) }}
            </p>
          </div>

          <!-- Qty Controls + Remove row -->
          <div class="flex items-center gap-3">
            <div class="bg-black border border-[#1C1C30] rounded-[6px] flex items-center">
              <VButton variant="none"
                className="w-7 h-7 flex items-center justify-center text-[#50506A] hover:text-white transition-colors"
                @click="$emit('update-qty', item.id, -1)">
                <Icon name="ph:minus" class="w-3 h-3" />
              </VButton>
              <span class="w-7 text-center font-bold text-[12px] text-white select-none">{{ item.quantity }}</span>
              <VButton variant="none"
                className="w-7 h-7 flex items-center justify-center text-[#50506A] hover:text-white transition-colors"
                @click="$emit('update-qty', item.id, 1)">
                <Icon name="ph:plus" class="w-3 h-3" />
              </VButton>
            </div>

            <VButton variant="none"
              className="text-[9px] font-black uppercase tracking-widest text-[#50506A] hover:text-[#EF4444] transition-colors flex items-center gap-1"
              @click="$emit('remove-item', item.id)">
              <Icon name="ph:x" class="w-3 h-3" />
              Remove
            </VButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust Badges -->
    <div class="flex flex-wrap gap-8 pt-2 opacity-40 hover:opacity-100 transition-opacity">
      <div v-for="trust in trustBadges" :key="trust.text" class="flex items-center gap-2">
        <Icon :name="trust.icon" class="w-4 h-4 text-[#8888AA]" />
        <span class="text-[9px] font-black uppercase tracking-[0.2em] text-[#8888AA]">{{ trust.text }}</span>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
defineProps<{
  items: Array<{
    id: number
    name: string
    meta: string
    price: number
    quantity: number
    image: string
  }>
}>()

defineEmits<{
  'update-qty': [id: number, delta: number]
  'remove-item': [id: number]
}>()

const trustBadges = [
  { icon: 'ph:shield-check-fill', text: 'Secure 256-bit SSL' },
  { icon: 'ph:seal-check-fill', text: 'Verified Merchant' },
  { icon: 'ph:arrows-counter-clockwise', text: '30-Day Returns' },
]
</script>