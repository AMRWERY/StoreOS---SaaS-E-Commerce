<template>
  <div class="space-y-6">
    <setting-group title="Contact form" default-open>
      <setting-text v-model="heading" label="Heading" />

      <div class="mt-4">
        <setting-text v-model="submitLabel" label="Submit button" />
      </div>

      <div class="mt-4">
        <setting-toggle v-model="phoneField" label="Include phone field" />
      </div>
    </setting-group>

    <setting-text v-model="recipient" label="Recipient email" input-type="email" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str, bool } = useSectionSettingsForm()
const heading = str('heading', 'We would love to hear from you')
const submitLabel = str('submit_label', 'Send message')
const recipient = str('recipient', 'hello@store.com')
const phoneField = bool('phone_field', false)
</script>