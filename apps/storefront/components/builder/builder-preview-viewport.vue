<template>
  <div
    class="flex min-h-0 min-w-0 flex-col rounded-xl border border-border-subtle bg-[#0a0a12] p-4 shadow-inner md:p-6 xl:h-full"
  >
    <p class="mb-3 font-mono text-[9px] font-medium uppercase tracking-[0.35em] text-tx-muted">
      Preview
    </p>

    <div class="min-h-0 flex-1 overflow-auto rounded-lg">
      <!-- Browser chrome -->
      <div
        class="mx-auto flex h-full min-h-[520px] w-full max-w-[1100px] flex-col overflow-hidden rounded-t-xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
        <div class="flex shrink-0 items-center gap-3 border-b border-neutral-200/90 bg-neutral-100/95 px-3 py-2.5">
          <div class="flex gap-1.5 ps-1">
            <span class="size-2.5 rounded-full bg-[#ff5f57]" />
            <span class="size-2.5 rounded-full bg-[#febc2e]" />
            <span class="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div
            class="mx-auto flex max-w-md flex-1 items-center justify-center rounded-md bg-white/90 px-3 py-1.5 text-center text-[11px] text-neutral-400 shadow-sm ring-1 ring-neutral-200/80">
            <span class="truncate font-mono">mystore.storeos.io/home</span>
          </div>
          <div class="w-14 shrink-0" aria-hidden="true" />
        </div>

        <!-- Page -->
        <div class="relative min-h-0 flex-1 overflow-y-auto bg-white text-neutral-900">
          <!-- Hero (selected block) -->
          <section class="relative cursor-pointer outline-none transition-shadow"
            :class="heroSelected ? 'ring-2 ring-inset ring-brand' : 'ring-2 ring-inset ring-transparent'" role="button"
            tabindex="0" @click="heroSelected = true" @keydown.enter.prevent="heroSelected = true">
            <header
              class="absolute inset-x-0 top-0 z-20 flex w-full items-center justify-between px-8 py-5 text-sm font-semibold text-white drop-shadow-md">
              <span class="text-lg font-bold tracking-[0.2em]">LUXE</span>
              <nav class="hidden gap-10 md:flex">
                <a class="opacity-90 transition hover:opacity-100" href="#">Collection</a>
                <a class="opacity-90 transition hover:opacity-100" href="#">Shop</a>
                <a class="opacity-90 transition hover:opacity-100" href="#">About</a>
              </nav>
              <div class="flex gap-4 text-lg opacity-90">
                <Icon name="ph:magnifying-glass-bold" />
                <Icon name="ph:bag-bold" />
              </div>
            </header>

            <div
              class="relative flex min-h-[380px] items-end bg-neutral-800 bg-cover bg-center pb-16 ps-10 pe-8 pt-28 md:items-center md:pb-20 md:ps-16"
              style="background-image: linear-gradient(90deg, rgba(15,15,20,0.75) 0%, rgba(15,15,20,0.35) 45%, transparent 100%), url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80')">
              <div v-if="heroSelected"
                class="absolute end-3 top-14 z-30 flex items-center gap-0.5 rounded-lg border border-white/10 bg-neutral-950/90 p-1 shadow-xl backdrop-blur-md md:end-4 md:top-16"
                @click.stop>
                <component :is="UiButton" v-for="action in canvasToolbarActions" :key="action.id" variant="none"
                  type="button" :title="action.title" :class-name="toolbarBtnClass(action)">
                  <Icon :name="action.icon" class="text-base text-neutral-200" />
                </component>
              </div>

              <div class="relative z-10 max-w-xl">
                <h2 class="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                  {{ hero.headline }}
                </h2>
                <p class="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85">
                  {{ hero.subheadline }}
                </p>
                <button type="button"
                  class="mt-8 rounded-md bg-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 shadow-lg transition hover:bg-neutral-100">
                  {{ hero.buttonText }}
                </button>
              </div>
            </div>
          </section>

          <!-- Products strip -->
          <section class="border-t border-neutral-200 px-8 py-12">
            <h3 class="text-lg font-bold text-neutral-900">
              Curated Favorites
            </h3>
            <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div v-for="(img, i) in productPlaceholders" :key="i"
                class="aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-neutral-200/80">
                <div class="h-full w-full bg-cover bg-center" :style="{ backgroundImage: `url('${img}')` }" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBuilderEditorHero } from '@/composables/useBuilderEditorHero'

const hero = useBuilderEditorHero()
const UiButton = resolveComponent('VButton')

const heroSelected = ref(true)

const canvasToolbarActions = [
  { id: 'up', title: 'Move up', icon: 'ph:arrow-up-bold' },
  { id: 'down', title: 'Move down', icon: 'ph:arrow-down-bold' },
  { id: 'dup', title: 'Duplicate', icon: 'ph:copy-bold' },
  { id: 'hide', title: 'Hide section', icon: 'ph:eye-slash-bold' },
  { id: 'del', title: 'Delete', icon: 'ph:trash-bold', danger: true },
] as const

const productPlaceholders = [
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
  'https://images.unsplash.com/photo-1578500494199-246f612d84b6?w=600&q=80',
  'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80',
]

function toolbarBtnClass(action: (typeof canvasToolbarActions)[number]) {
  const base
    = 'rounded-md p-1.5 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white '
  const danger = 'danger' in action && action.danger
  return base + (danger ? 'hover:!text-red-400' : '')
}
</script>