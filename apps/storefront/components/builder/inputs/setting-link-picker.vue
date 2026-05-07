<template>
  <setting-group title="Link" default-open>
    <setting-text v-model="url" label="URL" input-type="url" placeholder="https://..." />
    <setting-text v-model="label" class="mt-4" label="Label" placeholder="Shop now" />
  </setting-group>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const props = defineProps<{
  url: string
  label: string
}>()

const emit = defineEmits<{
  'update:url': [value: string]
  'update:label': [value: string]
}>()

const url = computed({
  get: () => props.url,
  set: v => emit('update:url', v),
})

const label = computed({
  get: () => props.label,
  set: v => emit('update:label', v),
})
</script>