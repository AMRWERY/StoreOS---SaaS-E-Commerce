<template>
  <div>
    <section :class="[
      'bg-bg-primary rounded-2xl px-4 py-3.5 space-y-8',
      variant === 'warning'
        ? 'border border-orange-500/10 border-s-2 border-s-orange-500/30'
        : 'border border-border-subtle'
    ]">
      <!-- Card Header -->
      <div class="flex items-center gap-4">
        <div :class="[
          'w-12 h-12 rounded-xl flex items-center justify-center',
          iconBgClass,
          iconBorderClass
        ]">
          <Icon :name="icon" :class="['text-2xl', iconColorClass]" />
        </div>
        <div>
          <h3 class="text-base font-bold">{{ title }}</h3>
          <p class="text-[9px] font-black text-tx-muted tracking-widest mt-1">{{ subtitle }}</p>
        </div>
      </div>

      <!-- Toggles -->
      <div class="space-y-4">
        <div v-for="channel in channels" :key="channel.key" class="flex items-center justify-between group">
          <span :class="[
            'text-sm font-medium transition-colors',
            channel.unavailable ? 'opacity-40 italic text-tx-muted' : 'text-tx-secondary group-hover:text-tx-primary'
          ]">{{ channel.label }}</span>

          <span v-if="channel.unavailable"
            class="text-[8px] font-black text-tx-muted border border-border-default px-1.5 py-0.5 rounded">UNAVAILABLE</span>

          <VSwitchButton v-else :modelValue="modelValue[channel.key]"
            @update:modelValue="(val: boolean) => $emit('update:modelValue', { ...modelValue, [channel.key]: val })" />
        </div>

        <!-- Extra Slot for webhook rows etc -->
        <slot />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  subtitle: string
  icon: string
  iconColorClass?: string
  iconBgClass?: string
  iconBorderClass?: string
  variant?: 'default' | 'warning'
  channels: Array<{ key: string; label: string; unavailable?: boolean }>
  modelValue: Record<string, boolean>
}>()

defineEmits<{
  (e: 'update:modelValue', value: Record<string, boolean>): void
}>()
</script>