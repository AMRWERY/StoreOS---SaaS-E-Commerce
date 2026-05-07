<template>
  <div :class="section.is_hidden ? 'hidden' : ''">

    <!-- ── hero_banner ─────────────────────────────────────────────── -->
    <template v-if="section.type === 'hero_banner'">
      <div
        class="relative flex min-h-[340px] items-center bg-neutral-800 bg-cover bg-center ps-16 pe-8 py-20"
        style="background-image: linear-gradient(90deg,rgba(15,15,20,.75) 0%,rgba(15,15,20,.35) 45%,transparent 100%),url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80')"
      >
        <div class="relative z-10 max-w-xl">
          <h2 class="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
            {{ str('headline', 'Redefining Minimalist Design.') }}
          </h2>
          <p class="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85">
            {{ str('subheadline', 'Discover a curated collection of artisanal furniture designed for the modern sanctuary.') }}
          </p>
          <button type="button" class="mt-8 rounded-md bg-white px-8 py-3 text-xs font-bold tracking-[0.2em] text-neutral-900 shadow-lg transition hover:bg-neutral-100">
            {{ str('buttonText', 'Shop Collection') }}
          </button>
        </div>
      </div>
    </template>

    <!-- ── hero_split ──────────────────────────────────────────────── -->
    <template v-else-if="section.type === 'hero_split'">
      <div class="grid min-h-[320px] grid-cols-2">
        <div class="flex flex-col justify-center bg-neutral-900 px-10 py-12">
          <h2 class="text-2xl font-bold text-white">{{ str('headline', 'Split Hero') }}</h2>
          <p class="mt-3 text-sm text-neutral-400">{{ str('subheadline', 'Supporting text goes right here.') }}</p>
          <button type="button" class="mt-6 w-fit rounded-md bg-white px-6 py-2.5 text-xs font-bold text-neutral-900">
            {{ str('buttonText', 'Learn More') }}
          </button>
        </div>
        <div class="bg-cover bg-center bg-neutral-700" style="background-image:url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80')" />
      </div>
    </template>

    <!-- ── hero_slideshow ──────────────────────────────────────────── -->
    <template v-else-if="section.type === 'hero_slideshow'">
      <div class="relative flex min-h-[380px] items-center bg-cover bg-center" style="background-image:linear-gradient(90deg,rgba(15,15,20,.75) 0%,rgba(15,15,20,.35) 45%,transparent 100%),url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&q=80')">
        <div class="max-w-xl ps-16">
          <h2 class="text-3xl font-bold text-white">{{ str('headline', 'Hero Slideshow') }}</h2>
          <p class="mt-4 text-white/80">{{ str('subheadline', 'Add multiple slides in the settings panel.') }}</p>
        </div>
        <div class="absolute bottom-5 start-0 end-0 flex justify-center gap-2">
          <span v-for="i in 3" :key="i" class="h-2 w-2 rounded-full" :class="i === 1 ? 'bg-white' : 'bg-white/35'" />
        </div>
      </div>
    </template>

    <!-- ── hero_video ──────────────────────────────────────────────── -->
    <template v-else-if="section.type === 'hero_video'">
      <div class="relative flex min-h-[380px] items-center justify-center bg-neutral-900">
        <Icon name="ph:play-circle-fill" class="absolute text-8xl text-white/20" />
        <div class="relative z-10 text-center">
          <h2 class="text-3xl font-bold text-white">{{ str('headline', 'Hero Video') }}</h2>
          <p class="mt-3 text-sm text-neutral-400">{{ str('subheadline', 'Add a video URL in the settings panel.') }}</p>
        </div>
      </div>
    </template>

    <!-- ── products_grid ──────────────────────────────────────────── -->
    <template v-else-if="section.type === 'products_grid'">
      <div class="border-t border-neutral-200 px-8 py-12">
        <h3 class="text-lg font-bold text-neutral-900">{{ str('heading', 'Our Products') }}</h3>
        <div v-if="str('card_style','shop') === 'sale'" class="mt-8 grid grid-cols-3 gap-5">
          <div v-for="(img, i) in PRODUCT_IMGS" :key="i" class="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <span class="absolute start-3 top-3 rounded-full bg-green-400 px-2.5 py-1 text-[11px] font-bold text-white">20% off</span>
            <div class="flex aspect-square items-center justify-center rounded-xl bg-neutral-50">
              <div class="h-32 w-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url('${img}')` }" />
            </div>
            <div class="mt-3 space-y-1 px-1">
              <p class="text-sm font-medium text-neutral-900">Product {{ i + 1 }}</p>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-neutral-900">$29.00</span>
                <span class="text-xs text-neutral-400 line-through">$59.00</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="str('card_style','shop') === 'horizontal'" class="mt-6 space-y-3">
          <div v-for="(img, i) in PRODUCT_IMGS" :key="i" class="flex items-center gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
            <div class="size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
              <div class="h-full w-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url('${img}')` }" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold text-neutral-900">Product {{ i + 1 }}</p>
              <p class="mt-0.5 text-xs text-neutral-400">{{ PRODUCT_CATS[i] }}</p>
              <p class="mt-2 text-sm font-bold text-neutral-900">$99.00</p>
            </div>
          </div>
        </div>
        <div v-else-if="str('card_style','shop') === 'editorial'" class="mt-8 grid grid-cols-3 gap-5">
          <div v-for="(img, i) in PRODUCT_IMGS" :key="i" class="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div class="aspect-video w-full overflow-hidden bg-neutral-100">
              <div class="h-full w-full bg-cover bg-center" :style="{ backgroundImage: `url('${img}')` }" />
            </div>
            <div class="p-4">
              <p class="text-base font-bold text-neutral-900">Product {{ i + 1 }}</p>
              <p class="mt-1.5 text-xs leading-relaxed text-neutral-500">A beautifully crafted product designed for modern living.</p>
              <button type="button" class="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white">View product</button>
            </div>
          </div>
        </div>
        <div v-else class="mt-8 grid grid-cols-3 gap-5">
          <div v-for="(img, i) in PRODUCT_IMGS" :key="i" class="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div class="flex aspect-square items-center justify-center rounded-xl bg-neutral-50">
              <div class="h-32 w-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url('${img}')` }" />
            </div>
            <div class="mt-3">
              <p class="text-xs text-neutral-400">{{ PRODUCT_CATS[i] }}</p>
              <p class="mt-0.5 text-sm font-bold text-neutral-900">Product {{ i + 1 }}</p>
              <div class="mt-3 flex items-center justify-between gap-2">
                <span class="text-sm font-bold text-neutral-900">$80</span>
                <button type="button" class="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 shadow-sm">
                  <Icon name="ph:shopping-cart-bold" class="text-[11px]" />Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── products_carousel ──────────────────────────────────────── -->
    <template v-else-if="section.type === 'products_carousel'">
      <div class="overflow-hidden px-8 py-12">
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-lg font-bold text-neutral-900">{{ str('heading', 'Featured Products') }}</h3>
          <div class="flex gap-2">
            <button type="button" class="rounded-full border border-neutral-300 p-1.5"><Icon name="ph:arrow-left-bold" class="text-xs" /></button>
            <button type="button" class="rounded-full border border-neutral-300 p-1.5"><Icon name="ph:arrow-right-bold" class="text-xs" /></button>
          </div>
        </div>
        <div class="flex gap-5 overflow-hidden">
          <div v-for="(img, i) in PRODUCT_IMGS" :key="i" class="w-48 shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
            <div class="flex aspect-square items-center justify-center rounded-xl bg-neutral-50">
              <div class="h-24 w-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url('${img}')` }" />
            </div>
            <div class="mt-2">
              <p class="text-[10px] text-neutral-400">{{ PRODUCT_CATS[i] }}</p>
              <p class="mt-0.5 text-xs font-bold text-neutral-900">Product {{ i + 1 }}</p>
              <div class="mt-2 flex items-center justify-between gap-1">
                <span class="text-xs font-bold text-neutral-900">$80</span>
                <button type="button" class="rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1 text-[10px] font-semibold text-neutral-700">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── product_featured ───────────────────────────────────────── -->
    <template v-else-if="section.type === 'product_featured'">
      <div class="grid min-h-[400px] grid-cols-2">
        <div class="bg-cover bg-center bg-neutral-200" style="background-image:url('https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80')" />
        <div class="flex flex-col justify-center px-10 py-12">
          <span class="text-xs font-bold tracking-widest text-neutral-500">Featured</span>
          <h2 class="mt-2 text-2xl font-bold text-neutral-900">{{ str('productName', 'Product Name') }}</h2>
          <p class="mt-2 text-xl font-semibold text-neutral-900">{{ str('price', '$149.00') }}</p>
          <p class="mt-4 text-sm leading-relaxed text-neutral-600">{{ str('description', 'Describe the product here. Highlight key features and benefits.') }}</p>
          <button type="button" class="mt-6 w-fit rounded-md bg-neutral-900 px-8 py-3 text-sm font-bold text-white">Add to cart</button>
        </div>
      </div>
    </template>

    <!-- ── categories_grid ────────────────────────────────────────── -->
    <template v-else-if="section.type === 'categories_grid'">
      <div class="px-8 py-12">
        <h3 class="mb-6 text-lg font-bold text-neutral-900">{{ str('heading', 'Shop by category') }}</h3>
        <div v-if="str('card_style','overlay') === 'below'" class="grid grid-cols-4 gap-4">
          <div v-for="(img, i) in CAT_IMGS" :key="i" class="space-y-2">
            <div class="aspect-square overflow-hidden rounded-xl bg-cover bg-center bg-neutral-200" :style="{ backgroundImage: `url('${img}')` }" />
            <p class="text-center text-sm font-semibold text-neutral-900">Category {{ i + 1 }}</p>
          </div>
        </div>
        <div v-else-if="str('card_style','overlay') === 'pill'" class="flex flex-wrap gap-3">
          <button v-for="(_, i) in CAT_IMGS" :key="i" type="button" class="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm">
            <span class="size-3 rounded-full" :style="{ backgroundColor: CAT_COLORS[i] }" />
            Category {{ i + 1 }}
          </button>
        </div>
        <div v-else-if="str('card_style','overlay') === 'split'" class="grid grid-cols-2 gap-4">
          <div v-for="(img, i) in CAT_IMGS.slice(0, 4)" :key="i" class="flex h-36 overflow-hidden rounded-xl border border-neutral-200">
            <div class="flex w-1/2 items-center justify-center p-4" :style="{ backgroundColor: CAT_COLORS[i] + '22' }">
              <p class="text-sm font-bold text-neutral-900">Category {{ i + 1 }}</p>
            </div>
            <div class="w-1/2 bg-cover bg-center bg-neutral-200" :style="{ backgroundImage: `url('${img}')` }" />
          </div>
        </div>
        <div v-else class="grid grid-cols-4 gap-4">
          <div v-for="(img, i) in CAT_IMGS" :key="i" class="relative aspect-square overflow-hidden rounded-xl bg-cover bg-center bg-neutral-200" :style="{ backgroundImage: `url('${img}')` }">
            <div class="absolute inset-0 bg-black/30" />
            <div class="absolute inset-0 flex items-end p-3">
              <span class="rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-900">Category {{ i + 1 }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── rich_text ──────────────────────────────────────────────── -->
    <template v-else-if="section.type === 'rich_text'">
      <div class="px-8 py-14 text-center">
        <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">{{ str('heading') }}</h2>
        <div class="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
          {{ str('body', 'Start writing your content here.') }}
        </div>
      </div>
    </template>

    <!-- ── image_text ─────────────────────────────────────────────── -->
    <template v-else-if="section.type === 'image_text'">
      <div class="grid min-h-[280px] grid-cols-2">
        <div class="bg-cover bg-center bg-neutral-200" style="background-image:url('https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80')" />
        <div class="flex flex-col justify-center px-10 py-12">
          <h2 class="text-2xl font-bold text-neutral-900">{{ str('heading', 'Our story') }}</h2>
          <p class="mt-4 text-[15px] leading-relaxed text-neutral-600">{{ str('body', 'Tell your brand story, highlight what makes you special.') }}</p>
        </div>
      </div>
    </template>

    <!-- ── image_gallery ──────────────────────────────────────────── -->
    <template v-else-if="section.type === 'image_gallery'">
      <div class="px-8 py-12">
        <h2 v-if="str('heading')" class="mb-6 text-xl font-bold text-neutral-900">{{ str('heading') }}</h2>
        <div class="grid grid-cols-3 gap-3">
          <div v-for="(img, i) in GALLERY_IMGS" :key="i" class="aspect-square overflow-hidden rounded-lg bg-cover bg-center bg-neutral-200" :style="{ backgroundImage: `url('${img}')` }" />
        </div>
      </div>
    </template>

    <!-- ── banner_full ────────────────────────────────────────────── -->
    <template v-else-if="section.type === 'banner_full'">
      <div class="flex min-h-[200px] items-center justify-center bg-neutral-900 px-8 py-12 text-center">
        <div>
          <h2 class="text-2xl font-bold text-white">{{ str('heading', 'Special Offer') }}</h2>
          <p class="mt-3 text-neutral-400">{{ str('subheading', "Limited time deal — don't miss out") }}</p>
          <button type="button" class="mt-6 rounded-md bg-white px-8 py-2.5 text-sm font-bold text-neutral-900">{{ str('buttonText', 'Shop Now') }}</button>
        </div>
      </div>
    </template>

    <!-- ── banner_split ───────────────────────────────────────────── -->
    <template v-else-if="section.type === 'banner_split'">
      <div class="grid min-h-[200px] grid-cols-2">
        <div class="flex items-center justify-center bg-neutral-900 p-10 text-center">
          <div>
            <h3 class="text-xl font-bold text-white">{{ str('heading1', 'New Collection') }}</h3>
            <button type="button" class="mt-4 rounded-md border border-white px-6 py-2 text-sm font-semibold text-white">{{ str('button1', 'Shop Now') }}</button>
          </div>
        </div>
        <div class="flex items-center justify-center bg-neutral-100 p-10 text-center">
          <div>
            <h3 class="text-xl font-bold text-neutral-900">{{ str('heading2', 'Sale Items') }}</h3>
            <button type="button" class="mt-4 rounded-md bg-neutral-900 px-6 py-2 text-sm font-semibold text-white">{{ str('button2', 'View Sale') }}</button>
          </div>
        </div>
      </div>
    </template>

    <!-- ── countdown_timer ────────────────────────────────────────── -->
    <template v-else-if="section.type === 'countdown_timer'">
      <div class="bg-neutral-900 px-8 py-12 text-center">
        <p class="text-xs font-bold tracking-widest text-neutral-400">{{ str('label', 'Sale ends in') }}</p>
        <div class="mt-6 flex justify-center gap-6">
          <div v-for="(unit, i) in TIMER_UNITS" :key="i" class="flex flex-col items-center gap-1">
            <span class="text-4xl font-bold tabular-nums text-white">{{ unit.val }}</span>
            <span class="text-[10px] font-medium tracking-widest text-neutral-500">{{ unit.label }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── testimonials ───────────────────────────────────────────── -->
    <template v-else-if="section.type === 'testimonials'">
      <div class="px-8 py-14">
        <h2 class="mb-8 text-center text-xl font-bold text-neutral-900">{{ str('heading', 'What our customers say') }}</h2>
        <div class="grid grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div class="mb-3 flex text-amber-400">
              <Icon v-for="s in 5" :key="s" name="ph:star-fill" class="text-sm" />
            </div>
            <p class="text-sm text-neutral-600">"Great product, highly recommended to everyone who values quality!"</p>
            <p class="mt-4 text-xs font-semibold text-neutral-800">— Happy Customer {{ i }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- ── trust_badges ───────────────────────────────────────────── -->
    <template v-else-if="section.type === 'trust_badges'">
      <div class="border-t border-neutral-200 px-8 py-10">
        <h3 class="mb-6 text-center text-xs font-bold tracking-widest text-neutral-400">{{ str('heading', 'Why shop with us') }}</h3>
        <div class="grid grid-cols-4 gap-6 text-center">
          <div v-for="badge in TRUST_BADGES" :key="badge.icon" class="flex flex-col items-center gap-2">
            <Icon :name="badge.icon" class="text-3xl text-neutral-400" />
            <span class="text-xs font-medium text-neutral-600">{{ badge.label }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── logo_bar ────────────────────────────────────────────────── -->
    <template v-else-if="section.type === 'logo_bar'">
      <div class="border-t border-neutral-200 px-8 py-10">
        <p class="mb-8 text-center text-xs font-bold tracking-widest text-neutral-400">{{ str('heading', 'As seen in') }}</p>
        <div class="flex items-center justify-center gap-10 opacity-35">
          <div v-for="i in 5" :key="i" class="h-6 w-20 rounded bg-neutral-500" />
        </div>
      </div>
    </template>

    <!-- ── faq_accordion ──────────────────────────────────────────── -->
    <template v-else-if="section.type === 'faq_accordion'">
      <div class="px-8 py-14">
        <h2 class="mb-8 text-center text-xl font-bold text-neutral-900">{{ str('heading', 'Frequently asked questions') }}</h2>
        <div class="mx-auto max-w-2xl divide-y divide-neutral-200 border-t border-neutral-200">
          <div v-for="i in 4" :key="i" class="flex items-center justify-between py-4">
            <p class="text-sm font-medium text-neutral-900">Sample question {{ i }}?</p>
            <Icon name="ph:plus-bold" class="shrink-0 text-sm text-neutral-500" />
          </div>
        </div>
      </div>
    </template>

    <!-- ── newsletter_form ────────────────────────────────────────── -->
    <template v-else-if="section.type === 'newsletter_form'">
      <div class="bg-neutral-50 px-8 py-14 text-center">
        <h2 class="text-xl font-bold text-neutral-900">{{ str('heading', 'Stay in the loop') }}</h2>
        <p class="mt-2 text-sm text-neutral-500">{{ str('subheading', 'Get the latest news and exclusive offers.') }}</p>
        <div class="mt-6 flex justify-center gap-2">
          <input type="email" placeholder="you@example.com" class="w-64 rounded-md border border-neutral-300 px-4 py-2 text-sm outline-none" />
          <button type="button" class="rounded-md bg-neutral-900 px-5 py-2 text-sm font-semibold text-white">{{ str('buttonText', 'Subscribe') }}</button>
        </div>
      </div>
    </template>

    <!-- ── contact_form ───────────────────────────────────────────── -->
    <template v-else-if="section.type === 'contact_form'">
      <div class="px-8 py-14">
        <h2 class="text-xl font-bold text-neutral-900">{{ str('heading', 'Contact us') }}</h2>
        <div class="mt-6 grid max-w-xl grid-cols-2 gap-4">
          <input type="text" placeholder="Name" class="rounded-md border border-neutral-300 px-4 py-2.5 text-sm" />
          <input type="email" placeholder="Email" class="rounded-md border border-neutral-300 px-4 py-2.5 text-sm" />
          <textarea placeholder="Message" rows="4" class="col-span-2 rounded-md border border-neutral-300 px-4 py-2.5 text-sm" />
          <button type="button" class="w-fit rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white">{{ str('submitLabel', 'Send message') }}</button>
        </div>
      </div>
    </template>

    <!-- ── video_embed ────────────────────────────────────────────── -->
    <template v-else-if="section.type === 'video_embed'">
      <div class="px-8 py-12">
        <div class="mx-auto flex aspect-video max-w-3xl items-center justify-center rounded-xl bg-neutral-900">
          <Icon name="ph:play-circle-fill" class="text-6xl text-white/30" />
        </div>
      </div>
    </template>

    <!-- ── spacer ─────────────────────────────────────────────────── -->
    <template v-else-if="section.type === 'spacer'">
      <div :style="{ height: `${num('height', 48)}px` }" />
    </template>

    <!-- ── divider ────────────────────────────────────────────────── -->
    <template v-else-if="section.type === 'divider'">
      <div class="px-8 py-6"><hr class="border-neutral-200" /></div>
    </template>

    <!-- ── custom_html ────────────────────────────────────────────── -->
    <template v-else-if="section.type === 'custom_html'">
      <div class="flex flex-col items-center justify-center gap-2 px-8 py-10 text-center">
        <Icon name="ph:code-bold" class="text-3xl text-neutral-300" />
        <p class="text-sm font-medium text-neutral-500">Custom HTML Block</p>
      </div>
    </template>

    <!-- ── fallback ───────────────────────────────────────────────── -->
    <template v-else>
      <div class="flex min-h-[72px] items-center gap-3 border-t border-neutral-200 px-8 py-5">
        <Icon name="ph:squares-four-bold" class="text-xl text-neutral-400" />
        <span class="text-sm font-medium text-neutral-500">{{ section.type }}</span>
      </div>
    </template>

  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

function str(key: string, fallback = '') {
  return String(props.section.settings[key] ?? fallback)
}
function num(key: string, fallback: number) {
  return Number(props.section.settings[key] ?? fallback)
}

const PRODUCT_IMGS = ['/img/category-01.avif', '/img/category-02.avif', '/img/category-03.avif']
const PRODUCT_CATS = ['Electronics', 'Sports', 'Home & Living']
const CAT_IMGS = ['/img/product-01.avif', '/img/product-02.avif', '/img/product-03.avif', '/img/product-04.avif']
const CAT_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#f43f5e']
const GALLERY_IMGS = [
  '/img/collection-01.avif', '/img/collection-02.avif', '/img/collection-03.avif',
  '/img/collection-04.avif', '/img/collection-05.avif', '/img/collection-06.avif',
]
const TRUST_BADGES = [
  { icon: 'ph:truck-bold', label: 'Free shipping' },
  { icon: 'ph:lock-bold', label: 'Secure checkout' },
  { icon: 'ph:arrow-counter-clockwise-bold', label: 'Easy returns' },
  { icon: 'ph:headset-bold', label: '24/7 support' },
]
const TIMER_UNITS = [
  { val: '12', label: 'Days' }, { val: '03', label: 'Hours' },
  { val: '47', label: 'Minutes' }, { val: '22', label: 'Seconds' },
]
</script>