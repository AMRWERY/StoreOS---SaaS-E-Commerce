<template>
  <div class="space-y-6">
    <lazy-setting-group title="Contact form" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />

      <div class="mt-4">
        <lazy-setting-text v-model="subheadline" label="Subheading" />
      </div>

      <div class="mt-4">
        <lazy-setting-text v-model="submitLabel" label="Submit button" />
      </div>

      <div class="mt-4">
        <lazy-setting-text v-model="successMessage" label="Success message" />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="phoneField" label="Include phone field" />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Design">
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-text
      v-model="recipient"
      label="Recipient email"
      input-type="email"
    />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, bool } = useSectionSettingsForm();

const heading = str("heading", "We would love to hear from you");
const subheadline = str("subheadline", "");
const submitLabel = str("submit_label", "Send message");
const successMessage = str("success_message", "Message sent. Thank you!");
const recipient = str("recipient", "hello@store.com");
const phoneField = bool("phone_field", false);
const variant = str("variant", "stacked");

const variantOptions = [
  { value: "stacked", label: "Stacked", icon: "ph:rows-bold", description: "Single centered form" },
  { value: "split", label: "Split", icon: "ph:columns-bold", description: "Intro beside form" },
  { value: "card", label: "Card", icon: "ph:frame-corners-bold", description: "Boxed form" },
];
</script>
