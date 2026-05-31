<template>
  <div :class="section.is_hidden ? 'hidden' : ''">
    <lazy-section-hero-banner v-if="section.type === 'hero_banner'" :section="section" />
    <lazy-section-hero-slideshow v-else-if="section.type === 'hero_slideshow'" :section="section" />
    <lazy-section-hero-split v-else-if="section.type === 'hero_split'" :section="section" />
    <lazy-section-hero-video v-else-if="section.type === 'hero_video'" :section="section" />
    <lazy-section-products-grid v-else-if="section.type === 'products_grid'" :section="section" />
    <lazy-section-products-carousel v-else-if="section.type === 'products_carousel'" :section="section" />
    <lazy-section-product-featured v-else-if="section.type === 'product_featured'" :section="section" />
    <lazy-section-categories-grid v-else-if="section.type === 'categories_grid'" :section="section" />
    <lazy-section-rich-text v-else-if="section.type === 'rich_text'" :section="section" />
    <lazy-section-image-text v-else-if="section.type === 'image_text'" :section="section" />
    <lazy-section-image-gallery v-else-if="section.type === 'image_gallery'" :section="section" />
    <lazy-section-banner-full v-else-if="section.type === 'banner_full'" :section="section" />
    <lazy-section-banner-split v-else-if="section.type === 'banner_split'" :section="section" />
    <lazy-section-countdown-timer v-else-if="section.type === 'countdown_timer'" :section="section" />
    <lazy-section-testimonials v-else-if="section.type === 'testimonials'" :section="section" />
    <lazy-section-trust-badges v-else-if="section.type === 'trust_badges'" :section="section" />
    <lazy-section-logo-bar v-else-if="section.type === 'logo_bar'" :section="section" />
    <lazy-section-faq v-else-if="section.type === 'faq_accordion'" :section="section" />
    <lazy-section-newsletter-form v-else-if="section.type === 'newsletter_form'" :section="section" />
    <lazy-section-contact-form v-else-if="section.type === 'contact_form'" :section="section" />
    <lazy-section-video-embed v-else-if="section.type === 'video_embed'" :section="section" />
    <lazy-section-spacer v-else-if="section.type === 'spacer'" :section="section" />
    <lazy-section-divider v-else-if="section.type === 'divider'" :section="section" />
    <lazy-section-custom-html v-else-if="section.type === 'custom_html'" :section="section" />
    <div v-else class="flex min-h-[72px] items-center gap-3 border-t border-neutral-200 px-8 py-5">
      <Icon name="ph:squares-four-bold" class="text-xl text-neutral-400" />
      <span class="text-sm font-medium text-neutral-500">{{ section.type }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

defineProps<{ section: PageSection }>()
</script>