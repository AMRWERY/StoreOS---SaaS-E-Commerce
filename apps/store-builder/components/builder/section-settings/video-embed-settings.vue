<template>
  <div class="space-y-6">
    <lazy-setting-group title="Embed" default-open>
      <lazy-setting-text
        v-model="embedUrl"
        label="Embed URL"
        input-type="url"
      />
      <div class="mt-4">
        <lazy-setting-select
          v-model="ratio"
          label="Aspect ratio"
          :options="[
            { value: '16:9', label: '16 : 9' },
            { value: '4:3', label: '4 : 3' },
            { value: '1:1', label: '1 : 1' },
          ]"
        />
      </div>
    </lazy-setting-group>

    <lazy-setting-toggle v-model="lazy" label="Lazy load" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, bool } = useSectionSettingsForm();

const embedUrl = str("embed_url", "");
const ratio = str("ratio", "16:9");
const lazy = bool("lazy_load", true);
</script>