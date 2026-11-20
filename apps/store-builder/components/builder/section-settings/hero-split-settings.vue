<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-group title="Split hero" default-open>
      <lazy-setting-text v-model="headline" label="Headline" />
      <div class="mt-4">
        <lazy-setting-textarea
          v-model="subheadline"
          label="Subheadline"
          :rows="3"
        />
      </div>
      <div class="mt-4">
        <lazy-setting-text v-model="ctaText" label="Button text" />
      </div>
      <div class="mt-4">
        <lazy-setting-text
          v-model="ctaUrl"
          label="Button link"
          placeholder="/collections/new"
        />
      </div>
      <div class="mt-4">
        <lazy-setting-select
          v-model="imageSide"
          label="Image side"
          :options="[
            { value: 'right', label: 'Right' },
            { value: 'left', label: 'Left' },
          ]"
        />
      </div>
    </lazy-setting-group>

    <image-upload-field v-model="imageUrl" label="Feature image" />
  </div>
</template>

<script lang="ts" setup>
const { str } = useSectionSettingsForm();

const variant = str("variant", "split");
const headline = str("headline", "Designed for calm spaces");
const subheadline = str(
  "subheadline",
  "Balanced proportions and natural materials.",
);
const ctaText = str("cta_text", "Learn more");
const ctaUrl = str("cta_url", "");
const imageSide = str("image_side", "right");
const imageUrl = str("image_url", "");

const variantOptions = [
  {
    value: "split",
    label: "Split",
    icon: "ph:columns-bold",
    description: "Dark text panel, edge-to-edge image",
  },
  {
    value: "inset",
    label: "Inset",
    icon: "ph:frame-corners-bold",
    description: "Light background, rounded image",
  },
  {
    value: "overlap",
    label: "Overlap",
    icon: "ph:stack-bold",
    description: "Full image with an overlapping text card",
  },
];
</script>
