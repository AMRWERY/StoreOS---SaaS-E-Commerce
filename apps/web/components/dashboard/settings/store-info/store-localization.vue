<template>
  <div>
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/5 pt-16">
      <div class="lg:col-span-4">
        <h3 class="font-bold text-lg mb-2">Localization</h3>
        <p class="text-xs text-gray-500 leading-relaxed">Regional settings that affect checkout, tax calculations, and
          delivery times.</p>
      </div>
      <div class="lg:col-span-8 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-2">
            <label class="text-[10px] font-bold text-gray-500 tracking-wider">Currency</label>
            <div class="relative">
              <select v-model="modelValue.currency"
                class="w-full bg-[#161618] border border-white/5 rounded-lg px-5 py-3.5 text-sm outline-none appearance-none hover:border-white/10 focus:border-orange-500/50 transition-all">
                <option>JPY (¥) - Japanese Yen</option>
              </select>
              <Icon name="ph:caret-up-down-bold" class="absolute end-5 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-bold text-gray-500 tracking-wider">Timezone</label>
            <div class="relative">
              <select v-model="modelValue.timezone"
                class="w-full bg-[#161618] border border-white/5 rounded-lg px-5 py-3.5 text-sm outline-none appearance-none hover:border-white/10 focus:border-orange-500/50 transition-all">
                <option>(GMT+09:00) Tokyo</option>
              </select>
              <Icon name="ph:caret-up-down-bold" class="absolute end-5 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <label class="text-[10px] font-bold text-gray-500 tracking-wider">Unit System</label>
            <div class="bg-black p-1 rounded-xl flex border border-white/10">
              <button @click="modelValue.unitSystem = 'Metric'"
                :class="modelValue.unitSystem === 'Metric' ? 'bg-white/5 text-white' : 'text-gray-600'"
                class="flex-1 py-2 text-[10px] font-black tracking-widest rounded-lg transition-all">Metric</button>
              <button @click="modelValue.unitSystem = 'Imperial'"
                :class="modelValue.unitSystem === 'Imperial' ? 'bg-white/5 text-white' : 'text-gray-600'"
                class="flex-1 py-2 text-[10px] font-black tracking-widest rounded-lg transition-all">Imperial</button>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-bold text-gray-500 tracking-wider">Default Language</label>
            <div class="relative">
              <select v-model="modelValue.language"
                class="w-full bg-[#161618] border border-white/5 rounded-lg px-5 py-3.5 text-sm outline-none appearance-none hover:border-white/10 focus:border-orange-500/50 transition-all">
                <option>English (International)</option>
              </select>
              <Icon name="ph:caret-up-down-bold" class="absolute end-5 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: any
}>();
</script>