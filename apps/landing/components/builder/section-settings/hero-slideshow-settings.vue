<template>
  <div class="space-y-6">
    <lazy-setting-group title="Slideshow" default-open>
      <lazy-setting-text v-model="heading" label="Eyebrow" />
      <div class="mt-4">
        <lazy-setting-range
          v-model="interval"
          label="Slide interval"
          :min="2"
          :max="12"
          unit="s"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="autoplay" label="Autoplay" />
      </div>
    </lazy-setting-group>

    <lazy-setting-image label="Fallback image" hint="Add slides in library" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, num, bool } = useSectionSettingsForm();

const heading = str("eyebrow", "New collection");
const interval = num("interval_sec", 5);
const autoplay = bool("autoplay", true);
</script>