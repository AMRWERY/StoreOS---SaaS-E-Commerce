<template>
  <div class="space-y-6">
    <SettingGroup title="Slideshow" default-open>
      <SettingText v-model="heading" label="Eyebrow" />
      <div class="mt-4">
        <SettingRange v-model="interval" label="Slide interval" :min="2" :max="12" unit="s" />
      </div>
      <div class="mt-4">
        <SettingToggle v-model="autoplay" label="Autoplay" />
      </div>
    </SettingGroup>
    <SettingImage label="Fallback image" hint="Add slides in library" />
  </div>
</template>

<script lang="ts" setup>
const { str, num, bool } = useSectionSettingsForm()
const heading = str('eyebrow', 'New collection')
const interval = num('interval_sec', 5)
const autoplay = bool('autoplay', true)
</script>