<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-group title="Countdown" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />

      <div class="mt-4">
        <lazy-setting-text
          v-model="endDate"
          label="End date (ISO)"
          placeholder="2026-12-31T23:59:00Z"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="showDays" label="Show days" />
      </div>

      <div class="mt-4">
        <lazy-setting-text v-model="ctaText" label="Button text" />
      </div>

      <div class="mt-4">
        <lazy-setting-text v-model="ctaUrl" label="Button link" />
      </div>
    </lazy-setting-group>

    <lazy-setting-color v-model="accent" label="Accent" />
  </div>
</template>

<script lang="ts" setup>
const { str, bool } = useSectionSettingsForm();

const variant = str("variant", "boxes");
const heading = str("heading", "Sale ends soon");
const endDate = str("end_at", "");
const showDays = bool("show_days", true);
const ctaText = str("cta_text", "");
const ctaUrl = str("cta_url", "");
const accent = str("accent", "#f97316");

const variantOptions = [
  {
    value: "boxes",
    label: "Boxes",
    icon: "ph:timer-bold",
    description: "Dark band with big digits",
  },
  {
    value: "inline",
    label: "Inline",
    icon: "ph:minus-bold",
    description: "Compact single-line bar",
  },
  {
    value: "cards",
    label: "Cards",
    icon: "ph:cards-bold",
    description: "Light rounded tiles with accent digits",
  },
];
</script>
