<template>
  <section class="lg:col-span-8 bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 flex flex-col md:flex-row gap-10">
    <!-- Avatar Side -->
    <div class="flex flex-col items-center gap-4 shrink-0">
      <div
        class="w-32 h-32 bg-bg-overlay border border-border-default rounded-2xl flex items-center justify-center text-3xl font-black text-tx-secondary shadow-inner">
        MT
      </div>
      <VButton variant="secondary"
        className="w-full py-2 bg-bg-elevated hover:bg-bg-elevated border border-border-subtle rounded-lg text-[10px] font-black tracking-widest transition-colors">
        {{ $t('dashboard.profile.updateAvatar') }}
      </VButton>
      <button
        class="text-[10px] font-bold text-danger/60 hover:text-danger transition-colors tracking-widest">
        {{ $t('common.remove') }}
      </button>
    </div>

    <!-- Form Side -->
    <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
      <VInput v-model="profile.name" :label="$t('dashboard.profile.fullName')"
        inputClass="bg-black border-border-default rounded-xl px-5 py-3.5 focus:border-brand" />
      <VInput v-model="profile.email" :label="$t('dashboard.profile.emailAddress')" type="email"
        inputClass="bg-black border-border-default rounded-xl px-5 py-3.5 focus:border-brand" />
      <VInput v-model="profile.phone" :label="$t('dashboard.profile.phoneNumber')"
        inputClass="bg-black border-border-default rounded-xl px-5 py-3.5 focus:border-brand" />
      <div class="space-y-2">
        <label class="text-[10px] font-bold text-tx-secondary tracking-wider">{{ $t('dashboard.profile.jobTitle') }}</label>
        <div class="relative">
          <select v-model="profile.jobTitle"
            class="w-full bg-black border border-border-default rounded-xl px-5 py-3.5 text-sm appearance-none outline-none focus:border-brand">
            <option>Owner</option>
            <option>Manager</option>
          </select>
          <Icon name="ph:caret-down-bold"
            class="absolute end-4 top-1/2 -translate-y-1/2 text-tx-muted pointer-events-none" />
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