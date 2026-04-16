<template>
  <div class="space-y-6">
    <SettingGroup title="Custom HTML" default-open>
      <SettingTextarea v-model="html" label="Markup" :rows="10" placeholder="<div>…</div>" />
      <div class="mt-4">
        <SettingToggle v-model="sandbox" label="Sandbox in preview (safer)" />
      </div>
    </SettingGroup>
    <p class="text-[11px] leading-relaxed text-tx-muted">
      Raw HTML is rendered on the storefront. Only paste trusted snippets.
    </p>
  </div>
</template>

<script lang="ts" setup>
const { str, bool } = useSectionSettingsForm()
const html = str('html', '')
const sandbox = bool('sandbox_preview', true)
</script>