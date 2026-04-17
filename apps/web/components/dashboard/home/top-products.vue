<template>
  <div class="h-full">
    <section class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 text-start h-full">
      <div class="flex justify-between items-center mb-8">
        <h3 class="font-bold">Top Products</h3>
        <Icon name="ph:dots-three-outline-fill"
          class="text-tx-muted cursor-pointer hover:text-tx-primary transition-colors" />
      </div>
      <div class="space-y-6">
        <div v-for="(prod, i) in topProducts" :key="prod.name" class="flex items-center gap-4 group cursor-pointer">
          <div
            class="size-12 shrink-0 overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated group-hover:border-border-default transition-colors">
            <img
              :src="publicImageUrl(prod.image)"
              :alt="prod.name"
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
              class="size-12 object-cover grayscale opacity-60 transition-all group-hover:grayscale-0 group-hover:opacity-100"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold truncate group-hover:text-brand transition-colors">{{ prod.name }}</h4>
            <p class="text-[10px] text-tx-muted font-bold mt-0.5 tracking-tight">{{ prod.soldToday }} SOLD TODAY
            </p>
          </div>
          <span class="text-xs font-black text-tx-muted group-hover:text-brand/50 transition-colors">#0{{ i + 1
          }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { topProducts } = storeToRefs(useDashboardStore())

/** Resolve `/img/...` paths against Nuxt `app.baseURL` when the app is not served from `/`. */
function publicImageUrl(path: string) {
  const raw = useRuntimeConfig().app.baseURL || '/'
  const base = raw === '/' ? '' : raw.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${p}` : p
}
</script>