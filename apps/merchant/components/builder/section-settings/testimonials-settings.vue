<template>
  <div class="space-y-6">
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

const heading = str("heading", "Loved by customers");
const quote = str("quote", "");
const author = str("author", "");
const columns = num("columns", 2);
</script>