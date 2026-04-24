<template>
  <div>
    <div class="min-h-screen text-tx-primary pb-32 selection:bg-indigo-500/30 overflow-x-hidden">
    <VBreadcrumb class="max-w-6xl mx-auto mb-4" />
    
    <profile-header @save="saveProfile" />

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
const profileStore = useProfileStore()
const { profile, sessions } = storeToRefs(profileStore)
const { saveProfile } = profileStore

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Profile',
});
</script>
