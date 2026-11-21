<template>
  <div>
    <nuxt-link-locale :to="to"
      class="flex items-center gap-2 text-[10px] font-black text-tx-muted tracking-widest hover:text-tx-primary transition-colors group">
      <Icon name="ph:caret-left-bold" class="group-hover:-translate-x-0.5 transition-transform" />
      <span>{{ label }}</span>
    </nuxt-link-locale>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  label: {
    type: String,
    default: 'Back'
  }
})
</script>
