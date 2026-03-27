<template>
  <section
    class="lg:col-span-12 mt-4 bg-red-950/10 border border-red-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
    <div>
      <h3 class="text-sm font-bold text-red-500">Danger Zone</h3>
      <p class="text-xs text-red-500/60 mt-1 font-medium">Irreversibly delete your profile and all store associations.
      </p>
    </div>
    <VButton variant="none"
      className="px-8 py-3 border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-xl text-xs font-black tracking-widest">
      Delete Account
    </VButton>
  </section>
</template>

<script lang="ts" setup>

</script>