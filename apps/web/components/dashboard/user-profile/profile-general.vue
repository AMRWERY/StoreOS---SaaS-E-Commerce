<template>
  <section class="lg:col-span-8 bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row gap-10">
    <!-- Avatar Side -->
    <div class="flex flex-col items-center gap-4 shrink-0">
      <div
        class="w-32 h-32 bg-[#1a1a1e] border border-white/10 rounded-2xl flex items-center justify-center text-3xl font-black text-gray-500 shadow-inner">
        MT
      </div>
      <VButton variant="secondary"
        className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[10px] font-black tracking-widest transition-colors">
        Update Avatar
      </VButton>
      <button
        class="text-[10px] font-bold text-red-500/60 hover:text-red-500 transition-colors tracking-widest">
        Remove
      </button>
    </div>

    <!-- Form Side -->
    <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
      <VInput v-model="profile.name" label="Full Name"
        inputClass="bg-black border-white/10 rounded-xl px-5 py-3.5 focus:border-indigo-500/50" />
      <VInput v-model="profile.email" label="Email Address" type="email"
        inputClass="bg-black border-white/10 rounded-xl px-5 py-3.5 focus:border-indigo-500/50" />
      <VInput v-model="profile.phone" label="Phone Number"
        inputClass="bg-black border-white/10 rounded-xl px-5 py-3.5 focus:border-indigo-500/50" />
      <div class="space-y-2">
        <label class="text-[10px] font-bold text-gray-500 tracking-wider">Job Title</label>
        <div class="relative">
          <select v-model="profile.jobTitle"
            class="w-full bg-black border border-white/10 rounded-xl px-5 py-3.5 text-sm appearance-none outline-none focus:border-indigo-500/50">
            <option>Owner</option>
            <option>Manager</option>
          </select>
          <Icon name="ph:caret-down-bold"
            class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  profile: {
    name: string;
    email: string;
    phone: string;
    jobTitle: string;
  }
}>();
</script>