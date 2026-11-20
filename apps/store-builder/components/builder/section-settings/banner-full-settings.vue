<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-group title="Banner" default-open>
      <lazy-setting-text v-model="title" label="Title" />

      <div class="mt-4">
        <lazy-setting-text v-model="subtitle" label="Subtitle" />
      </div>

      <div class="mt-4">
        <lazy-setting-text v-model="ctaText" label="Button text" />
      </div>

      <div class="mt-4">
        <lazy-setting-text v-model="ctaUrl" label="Button link" />
      </div>

      <div class="mt-4">
        <lazy-setting-color v-model="overlay" label="Overlay tint" />
      </div>

      <div class="mt-4">
        <lazy-setting-range
          v-model="overlayOpacity"
          label="Overlay strength"
          :min="0"
          :max="90"
          :step="5"
          unit="%"
        />
      </div>
    </lazy-setting-group>

    <image-upload-field v-model="imageUrl" label="Background" hint="Wide image" />
  </div>
</template>

<script lang="ts" setup>
const { str, num } = useSectionSettingsForm();

const variant = str("variant", "overlay");
const title = str("title", "Free shipping over $50");
const subtitle = str("subtitle", "");
const ctaText = str("cta_text", "Shop now");
const ctaUrl = str("cta_url", "");
const overlay = str("overlay", "#000000");
const overlayOpacity = num("overlay_opacity", 45);
const imageUrl = str("image_url", "");

const variantOptions = [
  {
    value: "overlay",
    label: "Overlay",
    icon: "ph:image-bold",
    description: "Centered text over a wide image",
  },
  {
    value: "strip",
    label: "Strip",
    icon: "ph:minus-bold",
    description: "Slim promo bar with button",
  },
  {
    value: "card",
    label: "Card",
    icon: "ph:cards-bold",
    description: "Image with an inset text card",
  },
];
</script>
