<template>
  <div class="space-y-6">
    <SettingGroup title="Divider" default-open>
      <SettingSelect v-model="style" label="Style" :options="[
        { value: 'solid', label: 'Solid' },
        { value: 'dashed', label: 'Dashed' },
        { value: 'gradient', label: 'Gradient' },
      ]" />
      <div class="mt-4">
        <SettingRange v-model="thickness" label="Thickness" :min="1" :max="8" :step="1" unit="px" />
      </div>
      <div class="mt-4">
        <SettingColor v-model="color" label="Color" />
      </div>
    </SettingGroup>
  </div>
</template>

<script lang="ts" setup>
const { str, num } = useSectionSettingsForm()
const style = str('style', 'solid')
const thickness = num('thickness', 1)
const color = str('color', '#e5e5e5')
</script>