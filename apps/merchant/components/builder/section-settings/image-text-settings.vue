<template>
  <div class="space-y-6">
    <lazy-setting-group title="Content" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-textarea v-model="body" label="Body" />
      </div>
    </lazy-setting-group>

    <lazy-setting-image label="Image" hint="Upload" />

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

const heading = str("heading", "Our story");
const body = str("body", "");
const layout = str("layout", "image-start");
</script>