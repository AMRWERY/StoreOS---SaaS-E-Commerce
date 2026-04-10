<template>
  <nuxt-link-locale :to="`/editorial/${article.id}`"
    class="block group relative bg-[#0D0D18] border border-[#1C1C30] rounded-[24px] overflow-hidden transition-all hover:border-[#6366F1]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080E]">
    <div class="grid grid-cols-1 lg:grid-cols-12">
      <div
        class="lg:col-span-7 relative aspect-video lg:aspect-auto min-h-[240px] lg:min-h-[320px] overflow-hidden bg-black">
        <img :src="article.image"
          class="w-full h-full object-cover opacity-60 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          :alt="article.title" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
      </div>

      <div class="lg:col-span-5 p-10 lg:p-16 flex flex-col justify-between space-y-10">
        <div class="space-y-6">
          <div class="flex items-center gap-4 flex-wrap">
            <span
              class="bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 px-3 py-1 rounded-[6px] text-[10px] font-black tracking-widest">
              {{ article.category }}
            </span>
            <span class="font-mono text-[10px] font-bold text-[#50506A] tracking-tighter">
              Ref: {{ article.id }}
            </span>
          </div>
          <h2
            class="text-3xl lg:text-4xl font-bold tracking-tight leading-tight group-hover:text-white transition-colors text-[#F0F0FF]">
            {{ article.title }}
          </h2>
          <p class="text-[16px] text-[#8888AA] leading-relaxed">
            {{ article.excerpt }}
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex items-center gap-10 border-t border-[#1C1C30] pt-8 flex-wrap">
            <div>
              <p class="text-[9px] font-black text-[#50506A] tracking-widest mb-1">Log Date</p>
              <p class="font-mono text-[13px] font-bold text-[#F0F0FF]">{{ article.date }}</p>
            </div>
            <div>
              <p class="text-[9px] font-black text-[#50506A] tracking-widest mb-1">Time to Sync</p>
              <p class="font-mono text-[13px] font-bold text-[#F0F0FF]">{{ article.readTime }} MIN</p>
            </div>
          </div>

          <span
            class="w-full lg:w-fit inline-flex items-center justify-center gap-3 bg-[#6366F1] group-hover:bg-[#818CF8] text-white px-10 py-4 rounded-[12px] text-[13px] font-bold tracking-[0.2em] transition-all">
            Open Full Protocol
            <Icon name="ph:arrow-right" class="w-5 h-5" />
          </span>
        </div>
      </div>
    </div>
  </nuxt-link-locale>
</template>

<script lang="ts" setup>
import type { EditorialArticle } from '@/types/editorial'

defineProps<{ article: EditorialArticle }>()
</script>