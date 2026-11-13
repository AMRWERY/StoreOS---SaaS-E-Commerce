<template>
  <div class="space-y-6">
    <lazy-setting-group title="Banner" default-open>
      <lazy-setting-text v-model="title" label="Title" />

      <div class="mt-4">
        <lazy-setting-text v-model="subtitle" label="Subtitle" />
      </div>

      <div class="mt-4">
        <lazy-setting-color v-model="overlay" label="Overlay tint" />
      </div>
    </lazy-setting-group>

    <lazy-setting-image label="Background" hint="Wide image" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str } = useSectionSettingsForm();

const title = str("title", "Free shipping over $50");
const subtitle = str("subtitle", "");
const overlay = str("overlay", "#000000");
</script>