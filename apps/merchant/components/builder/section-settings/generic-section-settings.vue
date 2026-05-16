<template>
  <div class="space-y-6">
    <SettingGroup title="Block" default-open>
      <SettingText v-model="caption" label="Internal label" placeholder="Visible only in builder" />
      <div class="mt-4">
        <SettingTextarea v-model="notes" label="Notes" />
      </div>
    </SettingGroup>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str } = useSectionSettingsForm()
const caption = str('builder_label', '')
const notes = str('builder_notes', '')
</script>