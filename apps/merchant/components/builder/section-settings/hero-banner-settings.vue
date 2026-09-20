<template>
  <div class="space-y-6">
    <lazy-setting-group title="Hero copy" default-open>
      <lazy-setting-text v-model="hero.headline" label="Headline" />
      <div class="mt-4">
        <lazy-setting-textarea v-model="hero.subheadline" label="Subheadline" />
      </div>
      <div class="mt-4">
        <lazy-setting-text v-model="hero.buttonText" label="Button text" />
      </div>
    </lazy-setting-group>

    <lazy-setting-image
      label="Background image"
      hint="Replace image"
      preview-url="/img/category-01.png"
    />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const hero = useBuilderEditorHero();
</script>
