<template>
  <aside
    class="w-full max-w-full rounded-xl border border-border-subtle bg-bg-primary shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
    aria-label="Section settings">
    <div class="flex items-start justify-between gap-3 border-b border-border-subtle px-5 py-4">
      <div class="min-w-0 flex-1">
        <h2 class="text-sm font-bold tracking-wide text-tx-primary">
          Section settings
        </h2>
        <p class="mt-1.5 text-[10px] font-bold tracking-[0.2em] text-tx-muted">
          {{ subtitle }}
        </p>
      </div>
      <component :is="UiButton" variant="none" type="button"
        class-name="hidden size-9 shrink-0 items-center justify-center rounded-lg border border-border-subtle text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary xl:inline-flex"
        title="Collapse panel" aria-expanded="true" @click="$emit('collapse')">
        <Icon name="ph:caret-double-right-bold" class="text-lg rtl:rotate-180" />
      </component>
    </div>

    <div class="max-h-[min(60vh,520px)] space-y-6 overflow-y-auto px-5 py-5 xl:max-h-[calc(100vh-14rem)]">
      <p v-if="!selected" class="text-[13px] leading-relaxed text-tx-secondary">
        Select a section in the list or in the preview to edit its settings.
      </p>
      <component :is="activeForm" v-else />
    </div>

    <div class="border-t border-border-subtle p-4">
      <component :is="UiButton" variant="none" type="button"
        class-name="flex w-full items-center justify-center gap-2 rounded-lg bg-bg-elevated py-3 text-[10px] font-black tracking-[0.2em] text-tx-primary ring-1 ring-border-subtle transition-colors hover:bg-bg-overlay hover:ring-border-default">
        <Icon name="ph:gear-six-bold" class="text-lg text-tx-secondary" />
        Advanced settings
      </component>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import type { Component } from 'vue'
import type { SectionType } from '@/types/sections'
import { SECTION_TYPE_LABELS } from '@/types/sections'
import HeroBannerSettings from '@/components/builder/section-settings/hero-banner-settings.vue'
import HeroSlideshowSettings from '@/components/builder/section-settings/hero-slideshow-settings.vue'
import HeroSplitSettings from '@/components/builder/section-settings/hero-split-settings.vue'
import HeroVideoSettings from '@/components/builder/section-settings/hero-video-settings.vue'
import ProductsGridSettings from '@/components/builder/section-settings/products-grid-settings.vue'
import ProductsCarouselSettings from '@/components/builder/section-settings/products-carousel-settings.vue'
import ProductFeaturedSettings from '@/components/builder/section-settings/product-featured-settings.vue'
import CategoriesGridSettings from '@/components/builder/section-settings/categories-grid-settings.vue'
import RichTextSettings from '@/components/builder/section-settings/rich-text-settings.vue'
import ImageTextSettings from '@/components/builder/section-settings/image-text-settings.vue'
import ImageGallerySettings from '@/components/builder/section-settings/image-gallery-settings.vue'
import BannerFullSettings from '@/components/builder/section-settings/banner-full-settings.vue'
import BannerSplitSettings from '@/components/builder/section-settings/banner-split-settings.vue'
import CountdownTimerSettings from '@/components/builder/section-settings/countdown-timer-settings.vue'
import TestimonialsSettings from '@/components/builder/section-settings/testimonials-settings.vue'
import TrustBadgesSettings from '@/components/builder/section-settings/trust-badges-settings.vue'
import LogoBarSettings from '@/components/builder/section-settings/logo-bar-settings.vue'
import FAQSettings from '@/components/builder/section-settings/faq-settings.vue'
import NewsletterFormSettings from '@/components/builder/section-settings/newsletter-form-settings.vue'
import ContactFormSettings from '@/components/builder/section-settings/contact-form-settings.vue'
import VideoEmbedSettings from '@/components/builder/section-settings/video-embed-settings.vue'
import SpacerSettings from '@/components/builder/section-settings/spacer-settings.vue'
import DividerSettings from '@/components/builder/section-settings/divider-settings.vue'
import CustomHTMLSettings from '@/components/builder/section-settings/custom-html-settings.vue'
import GenericSectionSettings from '@/components/builder/section-settings/generic-section-settings.vue'

defineEmits<{
  collapse: []
}>()

const UiButton = resolveComponent('VButton')
const store = useBuilderStore()

const formByType: Partial<Record<SectionType, Component>> = {
  hero_banner: HeroBannerSettings,
  hero_slideshow: HeroSlideshowSettings,
  hero_split: HeroSplitSettings,
  hero_video: HeroVideoSettings,
  products_grid: ProductsGridSettings,
  products_carousel: ProductsCarouselSettings,
  product_featured: ProductFeaturedSettings,
  categories_grid: CategoriesGridSettings,
  rich_text: RichTextSettings,
  image_text: ImageTextSettings,
  image_gallery: ImageGallerySettings,
  banner_full: BannerFullSettings,
  banner_split: BannerSplitSettings,
  countdown_timer: CountdownTimerSettings,
  testimonials: TestimonialsSettings,
  trust_badges: TrustBadgesSettings,
  logo_bar: LogoBarSettings,
  faq_accordion: FAQSettings,
  newsletter_form: NewsletterFormSettings,
  contact_form: ContactFormSettings,
  video_embed: VideoEmbedSettings,
  spacer: SpacerSettings,
  divider: DividerSettings,
  custom_html: CustomHTMLSettings,
}

const selected = computed(() => store.selectedSection)

const activeForm = computed(() => {
  const s = selected.value
  if (!s)
    return null
  return formByType[s.type] ?? GenericSectionSettings
})

const subtitle = computed(() => {
  const s = selected.value
  if (!s)
    return 'No section selected'
  return `Editing: ${SECTION_TYPE_LABELS[s.type]}`
})
</script>