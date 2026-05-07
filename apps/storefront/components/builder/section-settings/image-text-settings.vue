<template>
  <div class="space-y-6">
    <SettingGroup title="Content" default-open>
      <SettingText v-model="heading" label="Heading" />
      <div class="mt-4">
        <SettingTextarea v-model="body" label="Body" />
      </div>
    </SettingGroup>
    <SettingImage label="Image" hint="Upload" />
    <SettingSelect v-model="layout" label="Layout" :options="[
      { value: 'image-start', label: 'Image left' },
      { value: 'image-end', label: 'Image right' },
    ]" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str } = useSectionSettingsForm()
const heading = str('heading', 'Our story')
const body = str('body', '')
const layout = str('layout', 'image-start')
</script>