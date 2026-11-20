<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-group title="First tile" default-open>
      <lazy-setting-text v-model="headline" label="Headline" />

      <div class="mt-4">
        <lazy-setting-link-picker
          :url="ctaUrl"
          :label="ctaLabel"
          @update:url="ctaUrl = $event"
          @update:label="ctaLabel = $event"
        />
      </div>
      <div class="mt-4">
        <image-upload-field v-model="imageUrl" label="Side visual" />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Second tile" default-open>
      <lazy-setting-text v-model="headline2" label="Headline" />

      <div class="mt-4">
        <lazy-setting-link-picker
          :url="cta2Url"
          :label="cta2Label"
          @update:url="cta2Url = $event"
          @update:label="cta2Label = $event"
        />
      </div>
      <div class="mt-4">
        <image-upload-field v-model="image2Url" label="Second visual" />
      </div>
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { str } = useSectionSettingsForm();

const variant = str("variant", "tiles");
const headline = str("headline", "Member early access");
const ctaUrl = str("cta_url", "/collections/new");
const ctaLabel = str("cta_label", "Shop now");
const imageUrl = str("image_url", "");
const headline2 = str("headline2", "Sale items");
const cta2Url = str("cta2_url", "/collections/sale");
const cta2Label = str("cta2_label", "View sale");
const image2Url = str("image2_url", "");

const variantOptions = [
  {
    value: "tiles",
    label: "Tiles",
    icon: "ph:square-split-horizontal-bold",
    description: "Two equal solid tiles",
  },
  {
    value: "images",
    label: "Images",
    icon: "ph:images-bold",
    description: "Two image tiles, text at the bottom",
  },
  {
    value: "asymmetric",
    label: "Asymmetric",
    icon: "ph:layout-bold",
    description: "Wide tile beside a narrow one, rounded",
  },
];
</script>
