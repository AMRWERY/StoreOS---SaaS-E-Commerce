<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards v-model="variant" label="Layout" :options="variantOptions" />
    </lazy-setting-group>

    <lazy-setting-group title="Text block" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-textarea v-model="body" label="Body" :rows="6" />
      </div>

      <div class="mt-4">
        <lazy-setting-select
          v-model="align"
          label="Alignment"
          :options="[
            { value: 'start', label: 'Start' },
            { value: 'center', label: 'Center' },
            { value: 'end', label: 'End' },
          ]"
        />
      </div>
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str } = useSectionSettingsForm();
const variant = str("variant", "plain");
const variantOptions = [
  { value: "plain", label: "Plain", icon: "ph:text-aa-bold", description: "Simple text" },
  { value: "card", label: "Card", icon: "ph:article-bold", description: "Boxed panel" },
  { value: "columns", label: "Columns", icon: "ph:columns-bold", description: "Two text columns" },
];

const heading = str("heading", "");
const body = str("body", "");
const align = str("align", "start");
</script>