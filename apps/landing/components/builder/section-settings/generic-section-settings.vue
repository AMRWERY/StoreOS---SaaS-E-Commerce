<template>
  <div class="space-y-6">
    <lazy-setting-group title="Block" default-open>
      <lazy-setting-text
        v-model="caption"
        label="Internal label"
        placeholder="Visible only in builder"
      />
      <div class="mt-4">
        <lazy-setting-textarea v-model="notes" label="Notes" />
      </div>
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str } = useSectionSettingsForm();

const caption = str("builder_label", "");
const notes = str("builder_notes", "");
</script>