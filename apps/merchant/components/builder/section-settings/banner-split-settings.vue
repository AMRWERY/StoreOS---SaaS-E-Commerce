<template>
  <div class="space-y-6">
    <lazy-setting-group title="Split banner" default-open>
      <lazy-setting-text v-model="headline" label="Headline" />

      <div class="mt-4">
        <lazy-setting-link-picker
          :url="ctaUrl"
          :label="ctaLabel"
          @update:url="ctaUrl = $event"
          @update:label="ctaLabel = $event"
        />
      </div>
    </lazy-setting-group>

    <lazy-setting-image label="Side visual" hint="Upload" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str } = useSectionSettingsForm();

const headline = str("headline", "Member early access");
const ctaUrl = str("cta_url", "/collections/new");
const ctaLabel = str("cta_label", "Shop now");
</script>