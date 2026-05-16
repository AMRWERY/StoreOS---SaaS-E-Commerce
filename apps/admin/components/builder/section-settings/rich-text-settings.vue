<template>
  <div class="space-y-6">
    <SettingGroup title="Text block" default-open>
      <SettingText v-model="heading" label="Heading" />
      <div class="mt-4">
        <SettingTextarea v-model="body" label="Body" :rows="6" />
      </div>
      <div class="mt-4">
        <SettingSelect v-model="align" label="Alignment" :options="[
          { value: 'start', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'end', label: 'End' },
        ]" />
      </div>
    </SettingGroup>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str } = useSectionSettingsForm()
const heading = str('heading', '')
const body = str('body', '')
const align = str('align', 'start')
</script>