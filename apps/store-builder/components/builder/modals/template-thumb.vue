<template>
  <!-- Mini wireframe of a page: one bar per block -->
  <div
    class="flex h-20 w-14 shrink-0 flex-col gap-0.5 overflow-hidden rounded-md border border-border-subtle bg-white p-1"
    aria-hidden="true"
  >
    <template v-for="(kind, i) in kinds" :key="i">
      <div v-if="kind === 'hero'" class="h-5 shrink-0 rounded-sm bg-neutral-800" />
      <div v-else-if="kind === 'grid'" class="grid shrink-0 grid-cols-3 gap-px">
        <i v-for="n in 3" :key="n" class="block h-3 rounded-[1px] bg-neutral-300" />
      </div>
      <div v-else-if="kind === 'text'" class="shrink-0 space-y-px py-px">
        <i class="block h-[2px] w-3/4 rounded bg-neutral-400" />
        <i class="block h-[2px] w-full rounded bg-neutral-200" />
      </div>
      <div v-else-if="kind === 'form'" class="shrink-0 space-y-px">
        <i class="block h-1.5 rounded-[1px] border border-neutral-300" />
        <i class="block h-1.5 w-1/2 rounded-[1px] bg-indigo-400" />
      </div>
      <div v-else-if="kind === 'band'" class="h-2.5 shrink-0 rounded-sm bg-indigo-400" />
      <div v-else class="h-3 shrink-0 rounded-sm bg-neutral-200" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { SectionType } from "@/types/sections";

const props = defineProps<{ types: SectionType[] }>();

const KIND: Partial<Record<SectionType, string>> = {
  hero_banner: "hero", hero_slideshow: "hero", hero_split: "hero", hero_video: "hero",
  banner_full: "hero", collection_header: "hero",
  products_grid: "grid", products_carousel: "grid", categories_grid: "grid",
  related_products: "grid", collection_products: "grid", search_results: "grid",
  flash_sale: "grid", image_gallery: "grid", social_feed: "grid", blog_posts: "grid",
  team_members: "grid", features_grid: "grid", bundle_deal: "grid",
  rich_text: "text", image_text: "text", faq_accordion: "text", columns_text: "text",
  tabs_content: "text", product_tabs: "text", quote_block: "text", steps_process: "text",
  contact_form: "form", newsletter_form: "form", order_tracking: "form",
  cart_items: "form", product_detail: "form",
  cta_banner: "band", announcement_bar: "band", countdown_timer: "band",
  coupon_banner: "band", marquee_text: "band", stats_counter: "band",
};

// Show at most 7 bars so tall templates still fit the thumbnail.
const kinds = computed(() =>
  props.types.slice(0, 7).map((t) => KIND[t] ?? "other"),
);
</script>
