<template>
  <div class="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto space-y-24">
    <editorial-featured-card v-for="hero in featured" :key="hero.id" :article="hero" />

    <section v-if="articles.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <editorial-article-card v-for="article in articles" :key="article.id" :article="article" />
    </section>

    <p v-if="!featured.length && !articles.length" class="text-center text-tx-muted py-16 text-sm">
      No entries for this filter.
    </p>

    <div class="flex flex-col items-center gap-8 py-10 border-t border-border-subtle">
      <component :is="VButton" variant="none" type="button"
        className="bg-bg-elevated border border-border-default hover:border-brand/50 text-tx-primary px-12 py-4 rounded-[12px] font-bold text-[12px] tracking-[0.3em] transition-all active:scale-95"
        @click="$emit('load-more')">
        Decrypt Next Batch
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import type { EditorialArticle } from '@/types/editorial'

defineProps<{
  featured: EditorialArticle[]
  articles: EditorialArticle[]
}>()

defineEmits<{
  'load-more': []
}>()

const VButton = resolveComponent('VButton')
</script>