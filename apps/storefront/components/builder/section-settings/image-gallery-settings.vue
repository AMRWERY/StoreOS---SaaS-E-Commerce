<template>
  <div class="space-y-6">
    <SettingGroup title="Gallery" default-open>
      <SettingText v-model="heading" label="Heading" />
      <div class="mt-4">
        <SettingRange v-model="columns" label="Columns" :min="2" :max="4" :step="1" />
      </div>
      <div class="mt-4">
        <SettingToggle v-model="lightbox" label="Open in lightbox" />
      </div>
    </SettingGroup>
    <SettingImage label="Cover image" hint="Add to gallery" />
  </div>
</template>

<script lang="ts" setup>
const { str, num, bool } = useSectionSettingsForm()
const heading = str('heading', 'Gallery')
const columns = num('columns', 3)
const lightbox = bool('lightbox', true)
</script>