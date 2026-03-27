<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] pb-32 selection:bg-indigo-500/30 overflow-x-hidden">
    <VBreadcrumb class="max-w-6xl mx-auto mb-4" />
    
    <profile-header @save="handleSave" />

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
      <profile-general :profile="profile" />
      <profile-preferences />
      <profile-security />
      <profile-sessions :sessions="sessions" />
      <profile-danger-zone />
    </div>

    <profile-commands />
  </div>
  </div>
</template>

<script lang="ts" setup>
const profile = ref({
  name: 'Marcus Thorne',
  email: 'm.thorne@storeos.co',
  phone: '+81 90-1234-5678',
  jobTitle: 'Owner'
});

const sessions = [
  { device: 'MacBook Pro', meta: 'Tokyo, Japan • 192.168.1.1', status: 'ONLINE NOW', current: true, icon: 'ph:desktop-bold' },
  { device: 'iPhone 15 Pro', meta: 'Tokyo, Japan • 172.56.234.1', status: '2 HOURS AGO', current: false, icon: 'ph:device-mobile-bold' },
  { device: 'Windows Workstation', meta: 'Osaka, Japan • 10.0.0.42', status: '4 DAYS AGO', current: false, icon: 'ph:monitor-bold' },
];

const handleSave = () => {
  console.log('Saving profile...', profile.value);
};

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Profile',
});
</script>