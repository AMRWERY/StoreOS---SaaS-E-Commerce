<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-group title="Embed" default-open>
      <lazy-setting-text v-model="title" label="Title" />
      <div class="mt-4">
        <lazy-setting-text v-model="caption" label="Caption" />
      </div>
      <div class="mt-4">
        <lazy-setting-text
          v-model="embedUrl"
          label="Video URL (YouTube or Vimeo, https)"
          input-type="url"
          placeholder="https://www.youtube.com/watch?v=…"
        />
      </div>
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
const { str, bool } = useSectionSettingsForm();

const variant = str("variant", "standard");
const title = str("title", "");
const caption = str("caption", "");
const embedUrl = str("embed_url", "");
const ratio = str("ratio", "16:9");
const lazy = bool("lazy_load", true);

const variantOptions = [
  {
    value: "standard",
    label: "Standard",
    icon: "ph:play-circle-bold",
    description: "Centered, rounded player",
  },
  {
    value: "wide",
    label: "Wide",
    icon: "ph:rectangle-bold",
    description: "Edge-to-edge player",
  },
  {
    value: "poster",
    label: "Poster",
    icon: "ph:image-bold",
    description: "Thumbnail, click to play, text beside",
  },
];
</script>
