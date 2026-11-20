<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards v-model="variant" label="Layout" :options="variantOptions" />
    </lazy-setting-group>

    <lazy-setting-group title="Gallery" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-range
          v-model="columns"
          label="Columns"
          :min="2"
          :max="4"
          :step="1"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="lightbox" label="Open in lightbox" />
      </div>
    </lazy-setting-group>

    <lazy-setting-image label="Cover image" hint="Add to gallery" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, num, bool } = useSectionSettingsForm();
const variant = str("variant", "grid");
const variantOptions = [
  { value: "grid", label: "Grid", icon: "ph:squares-four-bold", description: "Even squares" },
  { value: "masonry", label: "Masonry", icon: "ph:layout-bold", description: "Mixed heights" },
  { value: "featured", label: "Featured", icon: "ph:image-bold", description: "One large + thumbnails" },
];

const heading = str("heading", "Gallery");
const columns = num("columns", 3);
const lightbox = bool("lightbox", true);
</script>