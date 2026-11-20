<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards v-model="variant" label="Layout" :options="variantOptions" />
    </lazy-setting-group>

    <lazy-setting-group title="Testimonials" default-open>
      <lazy-setting-text v-model="heading" label="Section heading" />
      <div class="mt-4">
        <lazy-setting-textarea
          v-model="quote"
          label="Featured quote"
          :rows="3"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-text v-model="author" label="Author" />
      </div>

      <div class="mt-4">
        <lazy-setting-range
          v-model="columns"
          label="Columns"
          :min="1"
          :max="3"
          :step="1"
        />
      </div>
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, num } = useSectionSettingsForm();
const variant = str("variant", "cards");
const variantOptions = [
  { value: "cards", label: "Cards", icon: "ph:squares-four-bold", description: "Grid of quotes" },
  { value: "slider", label: "Slider", icon: "ph:slideshow-bold", description: "Rotating quotes" },
  { value: "single", label: "Single", icon: "ph:quotes-bold", description: "One large quote" },
];

const heading = str("heading", "Loved by customers");
const quote = str("quote", "");
const author = str("author", "");
const columns = num("columns", 2);
</script>