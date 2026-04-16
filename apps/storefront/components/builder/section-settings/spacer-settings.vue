<template>
  <div class="space-y-6">
    <SettingGroup title="Spacer" default-open>
      <SettingRange v-model="height" label="Height" :min="8" :max="160" unit="px" />
      <div class="mt-4">
        <SettingToggle v-model="mobileHide" label="Hide on mobile" />
      </div>
    </SettingGroup>
  </div>
</template>

<script lang="ts" setup>
const { num, bool } = useSectionSettingsForm()
const height = num('height', 48)
const mobileHide = bool('hide_mobile', false)
</script>