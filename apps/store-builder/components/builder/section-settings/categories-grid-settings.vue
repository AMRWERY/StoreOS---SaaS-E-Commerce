<template>
  <div class="space-y-6">
    <lazy-setting-group title="Categories" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-range
          v-model="columns"
          label="Columns"
          :min="2"
          :max="4"
          :step="1"
        />
      </div>
      <div class="mt-4">
        <lazy-setting-toggle v-model="showCount" label="Show product counts" />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Card style">
      <lazy-setting-radio-cards
        v-model="cardStyle"
        label="Design"
        :options="cardStyleOptions"
      />
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, num, bool } = useSectionSettingsForm();

const heading = str("heading", "Shop by room");
const columns = num("columns", 3);
const showCount = bool("show_count", true);
const cardStyle = str("card_style", "overlay");

const cardStyleOptions = [
  {
    value: "overlay",
    label: "Overlay",
    icon: "ph:image-bold",
    description: "Label on image",
  },
  {
    value: "below",
    label: "Below",
    icon: "ph:text-align-center-bold",
    description: "Label under image",
  },
  {
    value: "pill",
    label: "Pill",
    icon: "ph:tag-bold",
    description: "Colored box + label",
  },
  {
    value: "split",
    label: "Split",
    icon: "ph:columns-bold",
    description: "Color | image halves",
  },
];
</script>