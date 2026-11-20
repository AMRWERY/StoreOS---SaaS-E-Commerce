<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-group title="Copy" default-open>
      <lazy-setting-text v-model="headline" label="Headline" />
      <div class="mt-4">
        <lazy-setting-text v-model="subheadline" label="Subheadline" />
      </div>
      <div class="mt-4">
        <lazy-setting-text v-model="ctaText" label="Button text" />
      </div>
      <div class="mt-4">
        <lazy-setting-text v-model="ctaUrl" label="Button link" />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Video" default-open>
      <lazy-setting-text
        v-model="videoUrl"
        label="Video URL (YouTube or Vimeo, https)"
        input-type="url"
        placeholder="https://www.youtube.com/watch?v=…"
      />
      <div class="mt-4">
        <lazy-setting-toggle v-model="autoplay" label="Autoplay (muted)" />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="showControls" label="Show controls" />
      </div>
    </lazy-setting-group>

    <image-upload-field v-model="poster" label="Poster image" />
  </div>
</template>

<script lang="ts" setup>
const { str, bool } = useSectionSettingsForm();

const variant = str("variant", "fullbleed");
const headline = str("headline", "");
const subheadline = str("subheadline", "");
const ctaText = str("cta_text", "");
const ctaUrl = str("cta_url", "");
const videoUrl = str("video_url", "");
const poster = str("poster_url", "");
const autoplay = bool("autoplay", true);
const showControls = bool("show_controls", false);

const variantOptions = [
  {
    value: "fullbleed",
    label: "Full-bleed",
    icon: "ph:video-bold",
    description: "Video background with centered text",
  },
  {
    value: "framed",
    label: "Framed",
    icon: "ph:columns-bold",
    description: "Text beside a framed video",
  },
  {
    value: "poster",
    label: "Poster",
    icon: "ph:play-circle-bold",
    description: "Poster image, click to play",
  },
];
</script>
