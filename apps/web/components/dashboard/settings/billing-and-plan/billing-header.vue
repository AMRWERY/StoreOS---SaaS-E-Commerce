<template>
  <div>
    <header class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div>
        <h1 class="text-4xl font-bold tracking-tight text-white mt-2">Billing & Plan</h1>
        <p class="text-sm text-gray-500 mt-2 leading-relaxed">
          Manage your enterprise subscription, view usage, and download invoices.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <VButton variant="ghost" label="Compare Plans" className="px-6 py-2.5 text-xs font-bold" />
        <VButton label="Upgrade Plan" className="px-6 py-2.5 text-xs font-bold shadow-lg shadow-indigo-600/30" />
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>

</script>