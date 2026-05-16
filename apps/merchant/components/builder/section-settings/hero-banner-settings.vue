<template>
  <div class="space-y-6">
    <SettingGroup title="Hero copy" default-open>
      <SettingText v-model="hero.headline" label="Headline" />
      <div class="mt-4">
        <SettingTextarea v-model="hero.subheadline" label="Subheadline" />
      </div>
      <div class="mt-4">
        <SettingText v-model="hero.buttonText" label="Button text" />
      </div>
    </SettingGroup>
    <SettingImage label="Background image" hint="Replace image"
      preview-url="/img/category-01.avif" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const hero = useBuilderEditorHero()
</script>