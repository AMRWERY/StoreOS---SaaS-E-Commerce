<template>
  <div class="border-t border-neutral-200 px-8 py-10">
    <h3 v-if="str('heading')" class="mb-6 text-center text-xs font-bold tracking-widest text-neutral-400">
      {{ str('heading') }}
    </h3>
    <div class="grid grid-cols-4 gap-6 text-center">
      <div v-for="badge in displayBadges" :key="badge.icon || badge.label" class="flex flex-col items-center gap-2">
        <Icon :name="badge.icon || 'ph:check-circle-bold'" class="text-3xl text-neutral-400" />
        <span class="text-xs font-semibold text-neutral-700">{{ badge.label }}</span>
        <span v-if="badge.desc" class="text-[10px] text-neutral-400">{{ badge.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()
const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)

const FALLBACK_BADGES = [
  { icon: 'ph:truck-bold', label: 'Free shipping', desc: '' },
  { icon: 'ph:lock-bold', label: 'Secure checkout', desc: '' },
  { icon: 'ph:arrow-counter-clockwise-bold', label: 'Easy returns', desc: '' },
  { icon: 'ph:headset-bold', label: '24/7 support', desc: '' },
]

const ICON_MAP: Record<string, string> = {
  truck: 'ph:truck-bold',
  shield: 'ph:shield-check-bold',
  lock: 'ph:lock-bold',
  'arrow-uturn-left': 'ph:arrow-counter-clockwise-bold',
  chat: 'ph:chat-circle-bold',
  headset: 'ph:headset-bold',
}

const displayBadges = computed(() => {
  const items = props.section.settings['items'] as any[]
  if (items?.length) {
    return items.map((b) => ({ ...b, icon: ICON_MAP[b.icon] || b.icon || 'ph:check-circle-bold' }))
  }
  return FALLBACK_BADGES
})
</script>