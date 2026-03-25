<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] space-y-12 selection:bg-indigo-500/30">
      <staff-header />
      <staff-active-members />
      <staff-role-matrix />
      <staff-system-stats />
    </div>
  </div>
</template>

<script lang="ts" setup>
import StaffHeader from '@/components/dashboard/settings/staff-header.vue'
import StaffActiveMembers from '@/components/dashboard/settings/staff-active-members.vue'
import StaffRoleMatrix from '@/components/dashboard/settings/staff-role-matrix.vue'
import StaffSystemStats from '@/components/dashboard/settings/staff-system-stats.vue'

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Settings - Staff and Permissions',
});
</script>