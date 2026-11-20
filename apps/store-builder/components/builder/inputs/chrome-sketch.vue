<template>
  <!-- Tiny wireframe thumbnails for the navbar / footer style pickers -->
  <div v-if="kind === 'navbar'" class="select-none">
    <!-- classic -->
    <div v-if="variant === 'classic'" class="flex items-center justify-between px-2 py-2">
      <div class="h-2 w-8 rounded bg-neutral-800" />
      <div class="flex gap-1.5"><i v-for="n in 3" :key="n" class="block h-1.5 w-4 rounded bg-neutral-300" /></div>
      <div class="flex gap-1"><i class="block size-2 rounded-full bg-neutral-300" /><i class="block size-2 rounded-full bg-neutral-300" /></div>
    </div>
    <!-- centered -->
    <div v-else-if="variant === 'centered'">
      <div class="flex justify-center px-2 py-1.5"><div class="h-2 w-10 rounded bg-neutral-800" /></div>
      <div class="flex justify-center gap-1.5 border-t border-neutral-100 px-2 pb-1.5 pt-1">
        <i v-for="n in 3" :key="n" class="block h-1.5 w-4 rounded bg-neutral-300" />
      </div>
    </div>
    <!-- dark -->
    <div v-else-if="variant === 'dark'" class="flex items-center justify-between bg-neutral-900 px-2 py-2">
      <div class="h-2 w-8 rounded bg-white/80" />
      <div class="flex gap-1.5"><i v-for="n in 3" :key="n" class="block h-1.5 w-4 rounded bg-neutral-600" /></div>
      <div class="h-3 w-6 rounded bg-white" />
    </div>
    <!-- minimal -->
    <div v-else-if="variant === 'minimal'" class="flex items-center justify-between px-2 py-2.5">
      <div class="h-2.5 w-7 rounded bg-neutral-800" />
      <div class="flex items-center gap-1.5">
        <i v-for="n in 2" :key="n" class="block h-1.5 w-3 rounded bg-neutral-300" />
        <i class="block size-2.5 rounded-full bg-indigo-500" />
      </div>
    </div>
    <!-- split -->
    <div v-else-if="variant === 'split'" class="flex items-center gap-2 px-2 py-2">
      <div class="h-2 w-7 rounded bg-neutral-800" />
      <div class="flex flex-1 justify-center gap-1.5"><i v-for="n in 3" :key="n" class="block h-1.5 w-4 rounded bg-neutral-300" /></div>
      <div class="h-3 w-7 rounded bg-indigo-500" />
    </div>
    <!-- floating -->
    <div v-else-if="variant === 'floating'" class="bg-neutral-100 px-2 py-2">
      <div class="flex items-center justify-between rounded-full bg-white px-2.5 py-1.5 shadow">
        <div class="h-2 w-6 rounded bg-neutral-800" />
        <div class="flex gap-1.5"><i v-for="n in 3" :key="n" class="block h-1.5 w-3 rounded bg-neutral-300" /></div>
        <i class="block size-2 rounded-full bg-neutral-400" />
      </div>
    </div>
    <!-- announcement -->
    <div v-else-if="variant === 'announcement'">
      <div class="h-2.5 bg-indigo-500" />
      <div class="flex items-center justify-between px-2 py-1.5">
        <div class="h-2 w-8 rounded bg-neutral-800" />
        <div class="flex gap-1.5"><i v-for="n in 3" :key="n" class="block h-1.5 w-4 rounded bg-neutral-300" /></div>
        <i class="block size-2 rounded-full bg-neutral-300" />
      </div>
    </div>
    <!-- search -->
    <div v-else-if="variant === 'search'">
      <div class="flex items-center gap-2 px-2 py-1.5">
        <div class="h-2 w-6 rounded bg-neutral-800" />
        <div class="h-3 flex-1 rounded-full bg-neutral-200" />
        <i class="block size-2 rounded-full bg-neutral-400" />
      </div>
      <div class="flex justify-center gap-1.5 border-t border-neutral-100 px-2 pb-1.5 pt-1">
        <i v-for="n in 3" :key="n" class="block h-1.5 w-4 rounded bg-neutral-300" />
      </div>
    </div>
    <!-- transparent -->
    <div v-else class="flex items-center justify-between bg-gradient-to-b from-neutral-700 to-neutral-500 px-2 py-3">
      <div class="h-2 w-8 rounded bg-white/90" />
      <div class="flex gap-1.5"><i v-for="n in 3" :key="n" class="block h-1.5 w-4 rounded bg-white/50" /></div>
      <i class="block size-2 rounded-full bg-white/70" />
    </div>
  </div>

  <div v-else class="select-none">
    <!-- columns -->
    <div v-if="variant === 'columns'" class="bg-neutral-900 px-2 py-2.5">
      <div class="flex justify-between">
        <div class="space-y-1"><div class="h-1.5 w-8 rounded bg-white/80" /><div class="h-1 w-12 rounded bg-neutral-600" /></div>
        <div class="flex gap-2">
          <div v-for="n in 3" :key="n" class="space-y-1"><div class="h-1 w-4 rounded bg-neutral-500" /><div class="h-1 w-5 rounded bg-neutral-700" /><div class="h-1 w-4 rounded bg-neutral-700" /></div>
        </div>
      </div>
    </div>
    <!-- centered -->
    <div v-else-if="variant === 'centered'" class="space-y-1.5 bg-neutral-50 px-2 py-3 text-center">
      <div class="mx-auto h-2 w-10 rounded bg-neutral-800" />
      <div class="flex justify-center gap-1.5"><i v-for="n in 4" :key="n" class="block h-1 w-4 rounded bg-neutral-300" /></div>
      <div class="flex justify-center gap-1"><i v-for="n in 3" :key="n" class="block size-1.5 rounded-full bg-neutral-300" /></div>
    </div>
    <!-- newsletter -->
    <div v-else-if="variant === 'newsletter'" class="flex items-center justify-between gap-2 bg-neutral-900 px-2 py-2.5">
      <div class="space-y-1"><div class="h-1.5 w-8 rounded bg-white/80" /><div class="flex gap-1"><i v-for="n in 3" :key="n" class="block h-1 w-4 rounded bg-neutral-600" /></div></div>
      <div class="w-14 space-y-1 rounded bg-neutral-800 p-1.5"><div class="h-1 w-8 rounded bg-neutral-500" /><div class="flex gap-0.5"><i class="block h-2 flex-1 rounded-sm bg-neutral-600" /><i class="block h-2 w-3 rounded-sm bg-indigo-500" /></div></div>
    </div>
    <!-- minimal -->
    <div v-else-if="variant === 'minimal'" class="flex items-center justify-between border-t border-neutral-200 px-2 py-2.5">
      <div class="h-2 w-6 rounded bg-neutral-800" />
      <div class="flex gap-1.5"><i v-for="n in 3" :key="n" class="block h-1 w-4 rounded bg-neutral-300" /></div>
      <div class="h-1 w-6 rounded bg-neutral-300" />
    </div>
    <!-- big brand -->
    <div v-else-if="variant === 'big-brand'" class="bg-neutral-900 px-2 pb-1 pt-2">
      <div class="mb-1.5 flex gap-2"><div v-for="n in 3" :key="n" class="space-y-1"><div class="h-1 w-4 rounded bg-neutral-500" /><div class="h-1 w-5 rounded bg-neutral-700" /></div></div>
      <div class="h-5 w-full rounded-sm bg-white/25" />
    </div>
    <!-- split -->
    <div v-else-if="variant === 'split'" class="flex justify-between gap-2 border-t border-neutral-200 px-2 py-2.5">
      <div class="w-1/2 space-y-1"><div class="h-1.5 w-8 rounded bg-neutral-800" /><div class="flex gap-0.5"><i class="block h-2 flex-1 rounded-sm bg-neutral-200" /><i class="block h-2 w-3 rounded-sm bg-indigo-500" /></div></div>
      <div class="flex gap-2"><div v-for="n in 2" :key="n" class="space-y-1"><div class="h-1 w-4 rounded bg-neutral-400" /><div class="h-1 w-5 rounded bg-neutral-300" /><div class="h-1 w-4 rounded bg-neutral-300" /></div></div>
    </div>
    <!-- cards -->
    <div v-else-if="variant === 'cards'" class="bg-neutral-100 px-2 py-2">
      <div class="grid grid-cols-3 gap-1">
        <div v-for="n in 3" :key="n" class="space-y-1 rounded bg-white p-1"><div class="h-1 w-4 rounded bg-neutral-500" /><div class="h-1 w-5 rounded bg-neutral-300" /><div class="h-1 w-4 rounded bg-neutral-300" /></div>
      </div>
    </div>
    <!-- payments -->
    <div v-else class="space-y-1.5 border-t border-neutral-200 px-2 py-2.5">
      <div class="flex items-center justify-between"><div class="h-2 w-6 rounded bg-neutral-800" /><div class="flex gap-1"><i v-for="n in 3" :key="n" class="block h-1 w-4 rounded bg-neutral-300" /></div></div>
      <div class="flex gap-1"><i v-for="n in 4" :key="n" class="block h-2.5 w-5 rounded-sm border border-neutral-300 bg-white" /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ kind: "navbar" | "footer"; variant: string }>();
</script>
