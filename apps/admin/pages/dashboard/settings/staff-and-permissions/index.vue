<template>
  <div>
    <LayoutsFeatureGate
      feature="staff"
      title="Staff & Permissions"
      description="Invite team members, assign roles, and control what each staff member can access. Available on Growth and above."
      :required-plans="['growth', 'enterprise']"
      :blur-content="true"
    >
      <div class="min-h-screen text-tx-primary space-y-12 selection:bg-indigo-500/30">
        <staff-header />
        <staff-active-members />
        <staff-role-matrix />
        <staff-system-stats />
      </div>
    </LayoutsFeatureGate>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
});

useSeoPage({
  titleTemplate: () => 'Settings - Staff and Permissions',
});
</script>