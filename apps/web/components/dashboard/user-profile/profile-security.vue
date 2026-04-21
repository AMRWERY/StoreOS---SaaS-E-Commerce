<template>
  <section class="lg:col-span-4 bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 space-y-8">
    <div class="flex items-center gap-3">
      <Icon name="ph:shield-check-bold" class="text-brand text-lg" />
      <h3 class="text-sm font-bold">{{ $t('dashboard.profile.security') }}</h3>
    </div>
    <div class="space-y-5">
      <VInput :label="$t('dashboard.profile.currentPassword')" type="password" modelValue="********"
        inputClass="bg-black border-border-default rounded-xl px-5 py-3" />
      <VInput :label="$t('dashboard.profile.newPassword')" type="password" inputClass="bg-black border-border-default rounded-xl px-5 py-3" />
      <VInput :label="$t('dashboard.profile.confirmNewPassword')" type="password" inputClass="bg-black border-border-default rounded-xl px-5 py-3"
        class="pb-6 border-b border-border-subtle" />

      <div class="flex items-center justify-between pt-2">
        <div>
          <p class="text-xs font-bold">{{ $t('dashboard.profile.twoFactor') }}</p>
          <p class="text-[9px] text-tx-muted mt-0.5">{{ $t('dashboard.profile.twoFactorDesc') }}</p>
        </div>
        <VSwitchButton v-model="twoFactor" />
      </div>

      <div class="flex justify-between items-center">
        <button class="text-[10px] font-bold text-brand flex items-center gap-2 hover:underline">
          <Icon name="ph:key-bold" /> {{ $t('dashboard.profile.setupBackupCodes') }}
        </button>
        <span class="text-[8px] text-tx-muted font-bold">Updated: 2023.11.14</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const twoFactor = ref(false);
</script>