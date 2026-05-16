<template>
  <div class="space-y-6">
    <SettingGroup title="Video" default-open>
      <SettingText v-model="videoUrl" label="Video URL" input-type="url" placeholder="https://…" />
      <div class="mt-4">
        <SettingToggle v-model="autoplay" label="Autoplay (muted)" />
      </div>
      <div class="mt-4">
        <SettingToggle v-model="showControls" label="Show controls" />
      </div>
    </SettingGroup>
    <SettingText v-model="poster" label="Poster image URL" input-type="url" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str, bool } = useSectionSettingsForm()
const videoUrl = str('video_url', '')
const poster = str('poster_url', '')
const autoplay = bool('autoplay', true)
const showControls = bool('show_controls', false)
</script>