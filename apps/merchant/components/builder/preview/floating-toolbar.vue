<template>
  <div v-if="visible"
    class="z-30 flex items-center gap-0.5 rounded-lg border border-white/10 bg-neutral-950/90 p-1 shadow-xl backdrop-blur-md"
    :class="placement === 'hero' ? 'absolute end-3 top-14 md:end-4 md:top-16' : 'absolute end-6 top-6'" @click.stop>
    <button v-for="action in actions" :key="action.id" type="button" :title="action.title"
      class="rounded-md p-1.5 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
      :class="action.danger ? 'hover:!text-red-400' : ''" @click="$emit('action', action.id)">
      <Icon :name="action.icon" class="text-base text-neutral-200" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
withDefaults(
  defineProps<{
    visible: boolean
    placement?: 'hero' | 'block'
  }>(),
  { placement: 'hero' },
)

defineEmits<{
  action: [id: string]
}>()

const actions = [
  { id: 'up', title: 'Move up', icon: 'ph:arrow-up-bold' },
  { id: 'down', title: 'Move down', icon: 'ph:arrow-down-bold' },
  { id: 'dup', title: 'Duplicate', icon: 'ph:copy-bold' },
  { id: 'hide', title: 'Hide section', icon: 'ph:eye-slash-bold' },
  { id: 'del', title: 'Delete', icon: 'ph:trash-bold', danger: true },
] as const
</script>