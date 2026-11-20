<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards v-model="variant" label="Layout" :options="variantOptions" />
    </lazy-setting-group>

    <lazy-setting-group title="Carousel" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-range
          v-model="peek"
          label="Side peek"
          :min="0"
          :max="40"
          unit="%"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="loop" label="Infinite loop" />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Card style">
      <lazy-setting-radio-cards
        v-model="cardStyle"
        label="Design"
        :options="cardStyleOptions"
      />
    </lazy-setting-group>

    <lazy-setting-category-picker v-model="category" label="Source category" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, num, bool } = useSectionSettingsForm();
const variant = str("variant", "scroll");
const variantOptions = [
  { value: "scroll", label: "Scroll", icon: "ph:arrows-left-right-bold", description: "Row of product cards" },
  { value: "spotlight", label: "Spotlight", icon: "ph:slideshow-bold", description: "Wide slides" },
  { value: "minimal", label: "Minimal", icon: "ph:image-bold", description: "Image tiles with name" },
];

const heading = str("heading", "You may also like");
const peek = num("peek_pct", 12);
const loop = bool("loop", true);
const category = str("category_id", "");
const cardStyle = str("card_style", "shop");

const cardStyleOptions = [
  {
    value: "shop",
    label: "Shop",
    icon: "ph:shopping-bag-bold",
    description: "Category · stars · add button",
  },
  {
    value: "sale",
    label: "Sale",
    icon: "ph:tag-bold",
    description: "Discount badge + wishlist",
  },
  {
    value: "horizontal",
    label: "Horizontal",
    icon: "ph:list-bold",
    description: "Small image · details right",
  },
  {
    value: "editorial",
    label: "Editorial",
    icon: "ph:article-bold",
    description: "Image top · CTA button",
  },
];
</script>