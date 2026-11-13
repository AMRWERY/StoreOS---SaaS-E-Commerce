<template>
  <div class="space-y-6">
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

    <lazy-setting-image label="Feature image" hint="Upload" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str } = useSectionSettingsForm();

const headline = str("headline", "Designed for calm spaces");
const subheadline = str(
  "subheadline",
  "Balanced proportions and natural materials.",
);
const imageSide = str("image_side", "right");
</script>