<template>
  <div class="space-y-6">
    <lazy-setting-group title="Newsletter" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-text v-model="placeholder" label="Input placeholder" />
      </div>

      <div class="mt-4">
        <lazy-setting-text v-model="buttonLabel" label="Button label" />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="gdpr" label="Show GDPR note" />
      </div>
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, bool } = useSectionSettingsForm();

const heading = str("heading", "Join the list");
const placeholder = str("placeholder", "Email address");
const buttonLabel = str("button_label", "Subscribe");
const gdpr = bool("gdpr_note", true);
</script>