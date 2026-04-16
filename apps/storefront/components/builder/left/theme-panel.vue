<template>
  <div class="min-h-0 min-w-0 flex-1 overflow-y-auto p-4">
    <p class="text-[10px] font-black tracking-[0.2em] text-tx-muted">
      Quick theme
    </p>
    <p class="mt-2 text-[11px] leading-relaxed text-tx-secondary">
      Full controls are in the right panel while this tab is active.
    </p>
    <div class="mt-5 space-y-4 rounded-lg border border-border-subtle bg-bg-elevated/30 p-4">
      <setting-toggle v-model="announcement" label="Announcement bar" hint="Shown above the navbar" />

      <div class="mt-2">
        <setting-text v-model="announcementText" label="Bar text" placeholder="Free shipping this week" />
      </div>
    </div>

    <button type="button"
      class="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-brand/35 py-3 text-[10px] font-black tracking-wider text-brand hover:bg-brand-dim/25"
      @click="planGateOpen = true">
      <Icon name="ph:crown-simple-bold" />
      Compare plans
    </button>
  </div>
</template>

<script lang="ts" setup>
const { planGateOpen } = useBuilderModals()

const announcement = ref(false)
const announcementText = ref('Free shipping on orders over $50')
</script>