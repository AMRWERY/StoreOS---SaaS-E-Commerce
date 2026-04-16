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
      preview-url="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" />
  </div>
</template>

<script lang="ts" setup>
const hero = useBuilderEditorHero()
</script>