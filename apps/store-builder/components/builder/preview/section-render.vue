<template>
  <div
    :id="anchorId || undefined"
    :class="[
      !editing && section.is_hidden ? 'hidden' : '',
      hideClasses,
      cssClass,
    ]"
    :style="wrapperStyle"
    v-bind="shape"
  >
    <div :class="widthClass">
    <lazy-section-hero-banner
      v-if="section.type === 'hero_banner'"
      :section="localized"
    />

    <lazy-section-hero-slideshow
      v-else-if="section.type === 'hero_slideshow'"
      :section="localized"
    />

    <lazy-section-hero-split
      v-else-if="section.type === 'hero_split'"
      :section="localized"
    />

    <lazy-section-hero-video
      v-else-if="section.type === 'hero_video'"
      :section="localized"
    />

    <lazy-section-products-grid
      v-else-if="section.type === 'products_grid'"
      :section="localized"
    />

    <lazy-section-products-carousel
      v-else-if="section.type === 'products_carousel'"
      :section="localized"
    />

    <lazy-section-product-featured
      v-else-if="section.type === 'product_featured'"
      :section="localized"
    />

    <lazy-section-categories-grid
      v-else-if="section.type === 'categories_grid'"
      :section="localized"
    />

    <lazy-section-rich-text
      v-else-if="section.type === 'rich_text'"
      :section="localized"
    />

    <lazy-section-image-text
      v-else-if="section.type === 'image_text'"
      :section="localized"
    />

    <lazy-section-image-gallery
      v-else-if="section.type === 'image_gallery'"
      :section="localized"
    />

    <lazy-section-banner-full
      v-else-if="section.type === 'banner_full'"
      :section="localized"
    />

    <lazy-section-banner-split
      v-else-if="section.type === 'banner_split'"
      :section="localized"
    />

    <lazy-section-countdown-timer
      v-else-if="section.type === 'countdown_timer'"
      :section="localized"
    />

    <lazy-section-testimonials
      v-else-if="section.type === 'testimonials'"
      :section="localized"
    />

    <lazy-section-trust-badges
      v-else-if="section.type === 'trust_badges'"
      :section="localized"
    />

    <lazy-section-logo-bar
      v-else-if="section.type === 'logo_bar'"
      :section="localized"
    />

    <lazy-section-faq
      v-else-if="section.type === 'faq_accordion'"
      :section="localized"
    />

    <lazy-section-newsletter-form
      v-else-if="section.type === 'newsletter_form'"
      :section="localized"
    />

    <lazy-section-contact-form
      v-else-if="section.type === 'contact_form'"
      :section="localized"
    />

    <lazy-section-video-embed
      v-else-if="section.type === 'video_embed'"
      :section="localized"
    />

    <lazy-section-spacer
      v-else-if="section.type === 'spacer'"
      :section="localized"
    />

    <lazy-section-divider
      v-else-if="section.type === 'divider'"
      :section="localized"
    />

    <lazy-section-custom-html
      v-else-if="section.type === 'custom_html'"
      :section="localized"
    />

    <component
      :is="dynamicComponent"
      v-else-if="dynamicComponent"
      :section="localized"
    />

    <div
      v-else
      class="flex min-h-[72px] items-center gap-3 border-t border-neutral-200 px-8 py-5"
    >
      <Icon name="ph:squares-four-bold" class="text-xl text-neutral-400" />
      <span class="text-sm font-medium text-neutral-500">{{
        section.type
      }}</span>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Component } from "vue";
import { localizeSection } from "@/data/localize";
import { shapeAttrs } from "@/data/shapes";
import { getSectionLoader } from "@/data/section-components";
import type { PageSection } from "@/types/sections";

const builder = useBuilderStore();

const props = defineProps<{
  section: PageSection;
  /** Editor canvas: keep hidden sections visible (the block dims itself). */
  editing?: boolean;
}>();

// New blocks resolve by file name: `product_detail` → section-product-detail.vue
const dynamicCache = new Map<string, Component>();

const dynamicComponent = computed(() => {
  const type = props.section.type;
  const loader = getSectionLoader(type);
  if (!loader) return null;
  if (!dynamicCache.has(type))
    dynamicCache.set(type, defineAsyncComponent(loader as () => Promise<Component>));
  return dynamicCache.get(type)!;
});

/** Translations for the language being viewed are laid over the base settings. */
const localized = computed(() =>
  localizeSection(props.section, builder.contentLocale, builder.defaultLocale),
);

const setting = (key: string) => props.section.settings[key];

const shape = computed(() => shapeAttrs(props.section.settings));

const anchorId = computed(() => String(setting("anchor_id") ?? "").trim());
const cssClass = computed(() => String(setting("css_class") ?? "").trim());

const padTop = computed(() => Number(setting("padding_top") ?? 0));
const padBottom = computed(() => Number(setting("padding_bottom") ?? 0));

const wrapperStyle = computed(() => {
  const style: Record<string, string> = {};
  if (padTop.value > 0) style.paddingTop = `${padTop.value}px`;
  if (padBottom.value > 0) style.paddingBottom = `${padBottom.value}px`;
  if (setting("bg_enabled") && setting("bg_color"))
    style.backgroundColor = String(setting("bg_color"));
  return style;
});

const widthClass = computed(
  () =>
    ({
      wide: "mx-auto max-w-[1280px]",
      boxed: "mx-auto max-w-5xl",
      narrow: "mx-auto max-w-3xl",
    })[String(setting("max_width") ?? "full")] ?? "",
);

const hideClasses = computed(() => [
  setting("hide_mobile") ? "max-md:hidden" : "",
  setting("hide_desktop") ? "md:hidden" : "",
]);
</script>
