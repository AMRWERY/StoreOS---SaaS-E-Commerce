<template>
  <nuxt-link-locale :to="`/editorial/${article.id}`"
    class="group flex flex-col bg-bg-primary border border-border-subtle rounded-[20px] overflow-hidden transition-all hover:border-border-default hover:-translate-y-1 h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base">
    <div class="relative aspect-[16/10] overflow-hidden bg-black">
      <img :src="article.image"
        class="w-full h-full object-cover opacity-50 grayscale-[40%] group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-700"
        :alt="article.title" />
      <div class="absolute bottom-5 start-5">
        <span
          class="bg-black/60 backdrop-blur-md border border-white/5 px-3 py-1 rounded-[6px] text-[9px] font-black text-white tracking-widest">
          {{ article.category }}
        </span>
      </div>
    </div>

    <div class="p-8 flex-1 flex flex-col justify-between space-y-8">
      <div class="space-y-4">
        <div class="flex items-center justify-between text-[10px] font-bold text-tx-muted">
          <span>{{ article.date }}</span>
          <span>ID: {{ article.id }}</span>
        </div>
        <h3
          class="text-xl font-bold tracking-tight text-tx-secondary group-hover:text-white transition-colors leading-snug">
          {{ article.title }}
        </h3>
      </div>

      <div class="flex items-center justify-between pt-6 border-t border-border-subtle gap-2 flex-wrap">
        <div class="flex items-center gap-3 text-[11px] font-bold text-tx-muted tracking-widest">
          <Icon name="ph:user-circle-fill" class="w-4 h-4 text-brand shrink-0" />
          {{ article.author }}
        </div>
        <div class="flex items-center gap-2 text-[10px] font-bold text-tx-muted">
          <Icon name="ph:clock" class="w-3.5 h-3.5 shrink-0" />
          {{ article.readTime }}
        </div>
      </div>

      <span
        class="w-full text-center bg-transparent border border-border-subtle group-hover:border-brand/50 text-tx-secondary group-hover:text-tx-primary py-3 rounded-[10px] text-[10px] font-bold tracking-widest transition-all">
        Read entry
      </span>
    </div>
  </nuxt-link-locale>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import type { EditorialArticle } from '@/types/editorial'

defineProps<{ article: EditorialArticle }>()
</script>