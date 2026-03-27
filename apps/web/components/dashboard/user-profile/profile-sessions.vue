<template>
  <section class="lg:col-span-8 bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 space-y-8">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-3">
        <Icon name="ph:broadcast-bold" class="text-indigo-500 text-lg" />
        <h3 class="text-sm font-bold">Active Sessions</h3>
      </div>
      <button
        class="text-[9px] font-bold text-orange-500/80 hover:text-orange-500 transition-colors tracking-widest">Sign
        out of all other sessions</button>
    </div>

    <div class="space-y-3">
      <div v-for="session in sessions" :key="session.device"
        class="bg-black border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all">
        <div class="flex items-center gap-5">
          <div class="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl text-gray-600">
            <Icon :name="session.icon" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-bold">{{ session.device }}</h4>
              <span v-if="session.current"
                class="text-[8px] font-black px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md tracking-widest">Current</span>
            </div>
            <p class="text-[10px] text-gray-600 mt-1 font-medium">{{ session.meta }}</p>
          </div>
        </div>
        <div class="text-end">
          <span class="text-[9px] font-black tracking-widest"
            :class="session.current ? 'text-emerald-500' : 'text-gray-700'">{{ session.status }}</span>
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