<template>
  <div class="space-y-6">
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

const heading = str("heading", "");
const body = str("body", "");
const align = str("align", "start");
</script>