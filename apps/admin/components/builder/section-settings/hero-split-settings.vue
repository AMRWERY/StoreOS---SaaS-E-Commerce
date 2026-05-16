<template>
  <div class="space-y-6">
    <SettingGroup title="Split hero" default-open>
      <SettingText v-model="headline" label="Headline" />
      <div class="mt-4">
        <SettingTextarea v-model="subheadline" label="Subheadline" :rows="3" />
      </div>
      <div class="mt-4">
        <SettingSelect v-model="imageSide" label="Image side" :options="[
          { value: 'right', label: 'Right' },
          { value: 'left', label: 'Left' },
        ]" />
      </div>
    </SettingGroup>
    <SettingImage label="Feature image" hint="Upload" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str } = useSectionSettingsForm()
const headline = str('headline', 'Designed for calm spaces')
const subheadline = str('subheadline', 'Balanced proportions and natural materials.')
const imageSide = str('image_side', 'right')
</script>