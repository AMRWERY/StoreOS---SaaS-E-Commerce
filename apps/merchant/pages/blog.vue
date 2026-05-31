<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-20 px-6 border-b border-border-subtle bg-bg-primary/50">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">Blog</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-6">Insights for<br />modern merchants.</h1>
        <p class="text-tx-secondary text-lg max-w-2xl">
          Guides, product updates, and e-commerce strategy from the StoreOS team.
        </p>
      </div>
    </header>

    <!-- Category filter -->
    <div class="sticky top-0 z-10 bg-bg-base/90 backdrop-blur px-6 pt-4">
      <div class="max-w-5xl mx-auto">
        <LazyVTabs v-model="activeCategory" :tabs="categories" />
      </div>
    </div>

    <!-- Posts -->
    <section class="py-16 px-6">
      <div class="max-w-5xl mx-auto">
        <!-- Featured -->
        <div class="mb-10 bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden grid md:grid-cols-2">
          <div class="bg-gradient-to-br from-brand/10 to-brand/5 h-52 md:h-auto flex items-center justify-center">
            <Icon name="ph:storefront-bold" class="text-brand/30 text-8xl" />
          </div>
          <div class="p-8 flex flex-col justify-center">
            <span class="text-[9px] font-black text-brand tracking-widest mb-3">FEATURED</span>
            <h2 class="text-2xl font-bold mb-3 leading-tight">{{ featured.title }}</h2>
            <p class="text-sm text-tx-secondary mb-5 leading-relaxed">{{ featured.excerpt }}</p>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <div
                  class="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center text-[9px] font-black text-brand">
                  {{ featured.author[0] }}
                </div>
                <span class="text-xs text-tx-muted">{{ featured.author }}</span>
              </div>
              <span class="text-xs text-tx-muted">{{ featured.date }}</span>
              <span class="text-xs text-tx-muted">{{ featured.readTime }}</span>
            </div>
          </div>
        </div>

        <!-- Grid -->
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="post in filteredPosts" :key="post.title"
            class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden hover:border-brand/30 transition-all group cursor-pointer">
            <div class="h-36 flex items-center justify-center border-b border-border-subtle"
              :style="`background: linear-gradient(135deg, ${post.color}15, ${post.color}05)`">
              <Icon :name="post.icon" class="text-5xl opacity-20" :style="`color: ${post.color}`" />
            </div>
            <div class="p-5">
              <span class="text-[9px] font-black tracking-widest text-brand mb-2 block">{{ post.category }}</span>
              <h3 class="font-bold text-sm mb-2 leading-snug group-hover:text-brand transition-colors">{{ post.title }}
              </h3>
              <p class="text-xs text-tx-muted mb-4 leading-relaxed line-clamp-2">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between text-[10px] text-tx-muted">
                <span>{{ post.author }}</span>
                <span>{{ post.readTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const activeCategory = ref('All')
const categories = ['All', 'Product', 'Strategy', 'Operations', 'Engineering']

const featured = {
  title: 'How high-growth stores use StoreOS to scale from 100 to 10,000 orders/day',
  excerpt: 'A deep dive into the operational patterns that let fast-growing merchants keep their sanity as volume explodes.',
  author: 'Sara Nour',
  date: 'May 20, 2026',
  readTime: '8 min read',
}

const posts = [
  { title: 'Inventory forecasting: stop guessing, start predicting', category: 'Operations', author: 'Omar Siddiqui', readTime: '5 min', excerpt: 'A practical guide to demand forecasting using your own order history data.', icon: 'ph:chart-bar-bold', color: '#6366f1', tag: 'Operations' },
  { title: 'Store builder v2: what\'s new and why it matters', category: 'Product', author: 'Priya Mehta', readTime: '4 min', excerpt: 'Real-time collaboration, component library, and performance improvements.', icon: 'ph:paint-brush-bold', color: '#f59e0b', tag: 'Product' },
  { title: 'The MENA payment landscape in 2026', category: 'Strategy', author: 'Adam Karim', readTime: '7 min', excerpt: 'A breakdown of payment preferences, conversion rates, and gateway choices across Egypt, KSA, and UAE.', icon: 'ph:credit-card-bold', color: '#10b981', tag: 'Strategy' },
  { title: 'Building a zero-downtime deployment pipeline', category: 'Engineering', author: 'Lena Volkov', readTime: '10 min', excerpt: 'How the StoreOS platform achieves 99.9% uptime with blue-green deployments.', icon: 'ph:cloud-bold', color: '#3b82f6', tag: 'Engineering' },
  { title: 'Reducing cart abandonment by 40%: a case study', category: 'Strategy', author: 'Youssef Ali', readTime: '6 min', excerpt: 'The exact changes one merchant made to their checkout flow that recovered thousands in revenue.', icon: 'ph:shopping-cart-bold', color: '#ef4444', tag: 'Strategy' },
  { title: 'Multi-currency pricing: what merchants get wrong', category: 'Operations', author: 'Sara Nour', readTime: '5 min', excerpt: 'Common mistakes in currency conversion and how to price your products correctly across markets.', icon: 'ph:currency-dollar-bold', color: '#8b5cf6', tag: 'Operations' },
]

const filteredPosts = computed(() =>
  activeCategory.value === 'All' ? posts : posts.filter((p) => p.category === activeCategory.value)
)

useSeoMeta({
  title: 'Blog',
  description: 'Guides, product updates, and e-commerce strategy from the StoreOS team.'
})
</script>