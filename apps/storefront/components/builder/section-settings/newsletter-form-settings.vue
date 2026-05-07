<template>
  <div class="space-y-6">
    <SettingGroup title="Newsletter" default-open>
      <SettingText v-model="heading" label="Heading" />
      <div class="mt-4">
        <SettingText v-model="placeholder" label="Input placeholder" />
      </div>
      <div class="mt-4">
        <SettingText v-model="buttonLabel" label="Button label" />
      </div>
      <div class="mt-4">
        <SettingToggle v-model="gdpr" label="Show GDPR note" />
      </div>
    </SettingGroup>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str, bool } = useSectionSettingsForm()
const heading = str('heading', 'Join the list')
const placeholder = str('placeholder', 'Email address')
const buttonLabel = str('button_label', 'Subscribe')
const gdpr = bool('gdpr_note', true)
</script>