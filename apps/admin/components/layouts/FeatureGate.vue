<template>
  <div class="relative">
    <!-- Locked overlay -->
    <div v-if="locked" class="absolute inset-0 z-30 flex flex-col items-center justify-center p-8" :class="overlayClass">
      <div class="max-w-md w-full text-center space-y-5">
        <!-- Lock Icon -->
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-bg-elevated border border-border-default mb-2">
          <Icon name="lucide:lock" class="w-6 h-6 text-tx-secondary" />
        </div>

        <!-- Copy -->
        <div class="space-y-2">
          <h3 class="text-lg font-bold text-tx-primary">{{ title }}</h3>
          <p class="text-sm text-tx-secondary leading-relaxed">{{ description }}</p>
        </div>

        <!-- Required plan badges -->
        <div class="flex items-center justify-center gap-2">
          <span
            v-for="p in requiredPlans"
            :key="p"
            class="px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider border"
            :class="planBadgeClass(p)"
          >
            {{ p.toUpperCase() }}
          </span>
        </div>

        <!-- CTA -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <nuxt-link-locale
            to="/dashboard/settings/billing-and-plan"
            class="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-brand/20"
          >
            <Icon name="lucide:arrow-up-circle" class="w-4 h-4" />
            Upgrade to unlock
          </nuxt-link-locale>
          <button
            @click="$emit('preview')"
            v-if="allowPreview"
            class="text-sm text-tx-secondary hover:text-tx-primary font-medium transition-colors flex items-center gap-1"
          >
            <Icon name="lucide:eye" class="w-3.5 h-3.5" />
            Preview (read-only)
          </button>
        </div>
      </div>
    </div>

    <!-- Content (blurred when locked) -->
    <div :class="locked ? 'select-none pointer-events-none' : ''">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
type PlanTier = 'starter' | 'growth' | 'enterprise'

const props = withDefaults(defineProps<{
  feature: string
  title?: string
  description?: string
  requiredPlans?: PlanTier[]
  allowPreview?: boolean
  blurContent?: boolean
}>(), {
  title: 'Upgrade required',
  description: 'This feature is not available on your current plan. Upgrade to unlock it.',
  requiredPlans: () => ['starter'],
  allowPreview: false,
  blurContent: true,
})

defineEmits(['preview'])

const { hasFeature } = useAuth()
const locked = computed(() => !hasFeature(props.feature))

const overlayClass = computed(() => {
  if (!props.blurContent) return 'bg-bg-base/95 rounded-xl'
  return 'bg-bg-base/80 backdrop-blur-sm rounded-xl'
})

const planBadgeClass = (plan: PlanTier) => {
  const map: Record<PlanTier, string> = {
    starter: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    growth: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    enterprise: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  }
  return map[plan]
}
</script>
