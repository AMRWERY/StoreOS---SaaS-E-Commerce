<template>
  <div class="space-y-6">
    <SettingGroup title="Testimonials" default-open>
      <SettingText v-model="heading" label="Section heading" />
      <div class="mt-4">
        <SettingTextarea v-model="quote" label="Featured quote" :rows="3" />
      </div>
      <div class="mt-4">
        <SettingText v-model="author" label="Author" />
      </div>
      <div class="mt-4">
        <SettingRange v-model="columns" label="Columns" :min="1" :max="3" :step="1" />
      </div>
    </SettingGroup>
  </div>
</template>

<script lang="ts" setup>
const { str, num } = useSectionSettingsForm()
const heading = str('heading', 'Loved by customers')
const quote = str('quote', '')
const author = str('author', '')
const columns = num('columns', 2)
</script>