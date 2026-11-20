<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

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

    <lazy-setting-repeater
      v-model="slides"
      label="Slides"
      :new-item="{ image_url: '', headline: 'New slide', subheadline: '', cta_text: 'Shop now', cta_url: '' }"
    >
      <template #default="{ item }">
        <lazy-setting-text
          :model-value="String(item.headline ?? '')"
          label="Headline"
          @update:model-value="(v: string) => updateSlide(item, 'headline', v)"
        />
        <div class="mt-2">
          <lazy-setting-text
            :model-value="String(item.subheadline ?? '')"
            label="Subheadline"
            @update:model-value="(v: string) => updateSlide(item, 'subheadline', v)"
          />
        </div>
        <div class="mt-2">
          <lazy-setting-text
            :model-value="String(item.cta_text ?? '')"
            label="Button text"
            @update:model-value="(v: string) => updateSlide(item, 'cta_text', v)"
          />
        </div>
        <div class="mt-2">
          <lazy-setting-text
            :model-value="String(item.cta_url ?? '')"
            label="Button link"
            @update:model-value="(v: string) => updateSlide(item, 'cta_url', v)"
          />
        </div>
        <div class="mt-2">
          <image-upload-field
            :model-value="String(item.image_url ?? '')"
            label="Image"
            @update:model-value="(v: string) => updateSlide(item, 'image_url', v)"
          />
        </div>
      </template>
    </lazy-setting-repeater>

    <image-upload-field
      v-model="fallbackImage"
      label="Fallback image (used when there are no slides)"
    />
  </div>
</template>

<script lang="ts" setup>
const { str, num, bool, patch, section } = useSectionSettingsForm();

const variant = str("variant", "fade");
const heading = str("eyebrow", "New collection");
const interval = num("interval_sec", 5);
const autoplay = bool("autoplay", true);
const fallbackImage = str("image_url", "");

const variantOptions = [
  {
    value: "fade",
    label: "Fade",
    icon: "ph:image-bold",
    description: "Full-bleed cross-fade, text at the start",
  },
  {
    value: "split",
    label: "Split",
    icon: "ph:columns-bold",
    description: "Text panel beside the slide image",
  },
  {
    value: "centered",
    label: "Centered",
    icon: "ph:align-center-horizontal-bold",
    description: "Centered text with side arrows",
  },
];

const slides = computed({
  get: () => {
    const raw = section.value?.settings.slides;
    return Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
  },
  set: (v: Record<string, unknown>[]) => patch({ slides: v }),
});

const updateSlide = (row: Record<string, unknown>, key: string, v: string) => {
  const next = slides.value.map((it) => (it === row ? { ...it, [key]: v } : it));
  patch({ slides: next });
};
</script>
