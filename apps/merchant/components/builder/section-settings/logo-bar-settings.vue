<template>
  <div class="space-y-6">
    <lazy-setting-group title="Logo bar" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-range
          v-model="logos"
          label="Logo slots"
          :min="4"
          :max="12"
          :step="1"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="grayscale" label="Grayscale logos" />
      </div>
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, num, bool } = useSectionSettingsForm();

const heading = str("heading", "As featured in");
const logos = num("logo_count", 6);
const grayscale = bool("grayscale", true);
</script>