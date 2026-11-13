<template>
  <section
    class="lg:col-span-8 card px-4 py-3.5 flex flex-col md:flex-row gap-10"
  >
    <!-- Avatar Side -->
    <div class="w-full md:w-56 shrink-0">
      <LazyVFileUpload
        :title="t('dashboard.profile.updateAvatar')"
        subtitle="PNG, JPG or WEBP (max. 2MB)"
        icon="ph:user-circle-bold"
        accept="image/png, image/jpeg, image/webp"
      />
    </div>

    <!-- Form Side -->
    <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
      <LazyVInput
        v-model="profile.name"
        :label="t('dashboard.profile.fullName')"
        inputClass="bg-bg-primary border-border-default rounded-xl px-5 py-3.5 focus:border-brand"
      />

      <LazyVInput
        v-model="profile.email"
        :label="t('dashboard.profile.emailAddress')"
        type="email"
        inputClass="bg-bg-primary border-border-default rounded-xl px-5 py-3.5 focus:border-brand"
      />

      <LazyVInput
        v-model="profile.phone"
        :label="t('dashboard.profile.phoneNumber')"
        inputClass="bg-bg-primary border-border-default rounded-xl px-5 py-3.5 focus:border-brand"
      />

      <LazyVSelectInput
        v-model="profile.jobTitle"
        :label="t('dashboard.profile.jobTitle')"
        :options="['Owner', 'Manager']"
        selectClass="!bg-bg-primary !border-border-default !rounded-xl !px-5 !py-3.5 !text-sm focus:!border-brand"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n();

defineProps<{
  profile: {
    name: string;
    email: string;
    phone: string;
    jobTitle: string;
  };
}>();
</script>