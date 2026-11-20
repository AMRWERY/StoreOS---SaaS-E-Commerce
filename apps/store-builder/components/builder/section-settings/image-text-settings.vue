<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards v-model="variant" label="Layout" :options="variantOptions" />
    </lazy-setting-group>

    <lazy-setting-group title="Content" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-textarea v-model="body" label="Body" />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Image &amp; button">
      <lazy-setting-text v-model="imageUrl" label="Image URL" placeholder="/img/category-01.png" />
      <div class="mt-4">
        <lazy-setting-text v-model="ctaText" label="Button text" />
      </div>
      <div class="mt-4">
        <lazy-setting-text v-model="ctaUrl" label="Button link" placeholder="/collections/all" />
      </div>
    </lazy-setting-group>

    <lazy-setting-image label="Image" hint="Upload" :preview-url="imageUrl || null" />

    <lazy-setting-select
      v-model="layout"
      label="Layout"
      :options="[
        { value: 'image-start', label: 'Image left' },
        { value: 'image-end', label: 'Image right' },
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str } = useSectionSettingsForm();
const variant = str("variant", "split");
const variantOptions = [
  { value: "split", label: "Split", icon: "ph:columns-bold", description: "Image beside text" },
  { value: "overlay", label: "Overlay", icon: "ph:image-bold", description: "Text card over image" },
  { value: "stacked", label: "Stacked", icon: "ph:rows-bold", description: "Image above text" },
];

const heading = str("heading", "Our story");
const body = str("body", "");
const layout = str("layout", "image-start");
const imageUrl = str("image_url", "");
const ctaText = str("cta_text", "");
const ctaUrl = str("cta_url", "");
</script>