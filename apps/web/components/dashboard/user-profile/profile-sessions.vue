<template>
  <section class="lg:col-span-8 bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 space-y-8">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-3">
        <Icon name="ph:broadcast-bold" class="text-brand text-lg" />
        <h3 class="text-sm font-bold">Active Sessions</h3>
      </div>
      <button
        class="text-[9px] font-bold text-accent/80 hover:text-accent transition-colors tracking-widest">Sign
        out of all other sessions</button>
    </div>

    <div class="space-y-3">
      <div v-for="session in sessions" :key="session.device"
        class="bg-black border border-border-subtle p-4 rounded-2xl flex items-center justify-between group hover:border-border-default transition-all">
        <div class="flex items-center gap-5">
          <div class="w-12 h-12 bg-bg-elevated rounded-xl flex items-center justify-center text-xl text-tx-muted">
            <Icon :name="session.icon" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-bold">{{ session.device }}</h4>
              <span v-if="session.current"
                class="text-[8px] font-black px-1.5 py-0.5 bg-brand-dim text-brand rounded-md tracking-widest">Current</span>
            </div>
            <p class="text-[10px] text-tx-muted mt-1 font-medium">{{ session.meta }}</p>
          </div>
        </div>
        <div class="text-end">
          <span class="text-[9px] font-black tracking-widest"
            :class="session.current ? 'text-success' : 'text-tx-muted'">{{ session.status }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  sessions: Array<{
    device: string;
    current: boolean;
    icon: string;
    meta: string;
    status: string;
  }>
}>();
</script>