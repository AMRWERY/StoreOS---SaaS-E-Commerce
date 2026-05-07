<template>
  <div class="space-y-6">
    <setting-group title="Banner" default-open>
      <setting-text v-model="title" label="Title" />

      <div class="mt-4">
        <setting-text v-model="subtitle" label="Subtitle" />
      </div>

      <div class="mt-4">
        <setting-color v-model="overlay" label="Overlay tint" />
      </div>

    </setting-group>

    <setting-image label="Background" hint="Wide image" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str } = useSectionSettingsForm()
const title = str('title', 'Free shipping over $50')
const subtitle = str('subtitle', '')
const overlay = str('overlay', '#000000')
</script>