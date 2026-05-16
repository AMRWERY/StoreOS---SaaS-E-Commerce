<template>
  <div class="space-y-6">
    <SettingGroup title="Logo bar" default-open>
      <SettingText v-model="heading" label="Heading" />
      <div class="mt-4">
        <SettingRange v-model="logos" label="Logo slots" :min="4" :max="12" :step="1" />
      </div>
      <div class="mt-4">
        <SettingToggle v-model="grayscale" label="Grayscale logos" />
      </div>
    </SettingGroup>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str, num, bool } = useSectionSettingsForm()
const heading = str('heading', 'As featured in')
const logos = num('logo_count', 6)
const grayscale = bool('grayscale', true)
</script>