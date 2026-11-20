<template>
  <div class="space-y-6">
    <lazy-setting-group title="Newsletter" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-text v-model="subheading" label="Subheading" />
      </div>
      <div class="mt-4">
        <lazy-setting-text v-model="placeholder" label="Input placeholder" />
      </div>

      <div class="mt-4">
        <lazy-setting-text v-model="buttonLabel" label="Button label" />
      </div>

      <div class="mt-4">
        <lazy-setting-text v-model="successMessage" label="Success message" />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="gdpr" label="Show GDPR note" />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Design">
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
      <div class="mt-4">
        <lazy-setting-select
          v-model="bgStyle"
          label="Background"
          :options="[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]"
        />
      </div>
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, bool } = useSectionSettingsForm();

const heading = str("heading", "Join the list");
const subheading = str("subheading", "Get the latest news and exclusive offers.");
const placeholder = str("placeholder", "Email address");
const buttonLabel = str("button_label", "Subscribe");
const successMessage = str("success_message", "Thanks for subscribing! Check your inbox.");
const gdpr = bool("gdpr_note", true);
const variant = str("variant", "centered");
const bgStyle = str("bg_style", "light");

const variantOptions = [
  { value: "centered", label: "Centered", icon: "ph:text-align-center-bold", description: "Stacked, centered" },
  { value: "split", label: "Split", icon: "ph:columns-bold", description: "Text beside form" },
  { value: "card", label: "Card", icon: "ph:frame-corners-bold", description: "Boxed signup" },
];
</script>
