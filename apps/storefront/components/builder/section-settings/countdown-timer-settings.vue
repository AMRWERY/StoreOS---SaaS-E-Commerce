<template>
  <div class="space-y-6">
    <setting-group title="Countdown" default-open>
      <setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <setting-text v-model="endDate" label="End date (ISO)" placeholder="2026-12-31T23:59:00Z" />
      </div>

      <div class="mt-4">
        <setting-toggle v-model="showDays" label="Show days" />
      </div>
    </setting-group>

    <setting-color v-model="accent" label="Accent" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str, bool } = useSectionSettingsForm()
const heading = str('heading', 'Sale ends soon')
const endDate = str('end_at', '')
const showDays = bool('show_days', true)
const accent = str('accent', '#f97316')
</script>