<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-group title="Hero copy" default-open>
      <lazy-setting-text v-model="headline" label="Headline" />
      <div class="mt-4">
        <lazy-setting-textarea v-model="subheadline" label="Subheadline" />
      </div>
      <div class="mt-4">
        <lazy-setting-text v-model="buttonText" label="Button text" />
      </div>
      <div class="mt-4">
        <lazy-setting-text
          v-model="ctaUrl"
          label="Button link"
          placeholder="/collections/new"
        />
      </div>
      <div class="mt-4">
        <lazy-setting-text
          v-model="secondCtaText"
          label="Second button text"
        />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Layout">
      <lazy-setting-select
        v-model="alignment"
        label="Text alignment"
        :options="[
          { value: 'left', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'End' },
        ]"
      />
      <div class="mt-4">
        <lazy-setting-select
          v-model="height"
          label="Height"
          :options="[
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
          ]"
        />
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

    <image-upload-field
      v-model="imageUrl"
      label="Background image"
      hint="Replace image"
    />
  </div>
</template>

<script lang="ts" setup>
const { str, num } = useSectionSettingsForm();

const variant = str("variant", "cover");
const headline = str("headline", "Welcome to our store");
const subheadline = str("subheadline", "Discover products made for you.");
const buttonText = str("buttonText", "Shop now");
const ctaUrl = str("cta_url", "");
const secondCtaText = str("second_cta_text", "");
const alignment = str("alignment", "left");
const height = str("height", "md");
const overlayOpacity = num("overlay_opacity", 55);
const imageUrl = str("image_url", "");

const variantOptions = [
  {
    value: "cover",
    label: "Cover",
    icon: "ph:image-bold",
    description: "Text over a full-bleed image",
  },
  {
    value: "card",
    label: "Card",
    icon: "ph:cards-bold",
    description: "Floating text card on the image",
  },
  {
    value: "stacked",
    label: "Stacked",
    icon: "ph:rows-bold",
    description: "Image on top, text below",
  },
];
</script>
