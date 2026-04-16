<template>
  <div class="space-y-6">
    <SettingGroup title="Trust row" default-open>
      <SettingText v-model="heading" label="Heading" />
      <div class="mt-4">
        <SettingToggle v-model="icons" label="Show icons" />
      </div>
    </SettingGroup>
    <SettingRepeater v-model="items" label="Badges">
      <template #default="{ item }">
        <SettingText :model-value="String(item.title ?? '')" label="Line"
          @update:model-value="(v: string) => updateItem(item, 'title', v)" />
      </template>
    </SettingRepeater>
  </div>
</template>

<script lang="ts" setup>
const { str, bool, patch, section } = useSectionSettingsForm()
const heading = str('heading', 'Why shop with us')
const icons = bool('show_icons', true)

const items = computed({
  get: () => {
    const raw = section.value?.settings.items
    if (Array.isArray(raw) && raw.length)
      return raw as Record<string, unknown>[]
    return [{ title: 'Free returns' }, { title: 'Secure checkout' }, { title: 'Carbon neutral' }]
  },
  set: (v: Record<string, unknown>[]) => patch({ items: v }),
})

function updateItem(row: Record<string, unknown>, key: string, v: string) {
  const next = items.value.map((it) => {
    if (it !== row)
      return it
    return { ...it, [key]: v }
  })
  patch({ items: next })
}
</script>