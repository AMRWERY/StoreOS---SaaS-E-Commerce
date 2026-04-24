<template>
   <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
      <!-- Hero Section -->
      <section class="relative pt-32 pb-24 px-6 overflow-hidden border-b border-border-subtle bg-bg-base">
         <div class="max-w-7xl mx-auto relative z-10 text-center">
            <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">The StoreOS Journal</p>
            <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-8">
               Insights for the<br />
               <span class="text-tx-secondary">next era of commerce.</span>
            </h1>
            <div
               class="max-w-xl mx-auto flex items-center bg-bg-primary rounded-2xl border border-border-subtle p-1 pe-1 group focus-within:border-brand/40 transition-all">
               <Icon name="ph:magnifying-glass-bold" class="ms-4 text-tx-muted" />
               <input type="text" placeholder="Search articles..."
                  class="w-full bg-transparent border-none outline-none text-sm px-4 py-3" />
               <VButton variant="none"
                  className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-brand/20">
                  Search</VButton>
            </div>
         </div>
      </section>

      <!-- Categories -->
      <section class="py-12 border-b border-border-subtle scroll-x overflow-auto hide-scrollbar">
         <div class="max-w-7xl mx-auto px-6 flex items-center justify-center gap-4">
            <button v-for="cat in categories" :key="cat"
               :class="['px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all', currentCategory === cat ? 'bg-brand text-white' : 'bg-bg-elevated border border-border-subtle text-tx-muted hover:text-tx-primary']"
               @click="currentCategory = cat">
               {{ cat }}
            </button>
         </div>
      </section>

      <!-- Featured Post -->
      <section class="py-20 px-6">
         <div class="max-w-7xl mx-auto">
            <div
               class="group relative rounded-[3rem] overflow-hidden border border-border-subtle bg-bg-elevated flex flex-col lg:flex-row items-stretch shadow-2xl transition-all hover:border-brand/30">
               <div
                  class="lg:w-7/12 aspect-video lg:aspect-auto relative overflow-hidden bg-bg-elevated flex items-center justify-center p-20">
                  <!-- Abstract visual placeholder -->
                  <div class="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent"></div>
                  <Icon name="ph:chart-bar-fill"
                     class="text-9xl text-brand/30 group-hover:scale-110 transition-transform duration-700" />
               </div>
               <div class="lg:w-5/12 p-10 lg:p-16 flex flex-col justify-center">
                  <div class="flex items-center gap-3 mb-6">
                     <span
                        class="text-[9px] font-black text-brand bg-brand-dim px-2 py-0.5 rounded uppercase tracking-widest">PRODUCT
                        NEWS</span>
                     <span class="text-[9px] font-medium text-tx-muted uppercase tracking-widest">12 MIN READ</span>
                  </div>
                  <h2
                     class="text-3xl md:text-4xl font-bold mb-6 group-hover:text-brand transition-colors leading-tight">
                     Why we built the StoreOS Operational Layer.
                  </h2>
                  <p class="text-tx-secondary mb-10 leading-relaxed">
                     Deep intelligence, extreme scale, and human-centric design. Learn about the technological
                     breakthroughs
                     that make StoreOS the most powerful platform for high-growth merchants.
                  </p>
                  <div class="flex items-center gap-4">
                     <div
                        class="w-10 h-10 rounded-full bg-bg-primary border border-border-subtle flex items-center justify-center">
                        <Icon name="ph:user-fill" class="text-tx-muted" />
                     </div>
                     <div>
                        <div class="text-xs font-bold">Ahmed Khaled</div>
                        <div class="text-[10px] text-tx-muted uppercase">Co-Founder, StoreOS</div>
                     </div>
                  </div>
               </div>
               <nuxt-link-locale to="" class="absolute inset-0 z-20"></nuxt-link-locale>
            </div>
         </div>
      </section>

      <!-- Blog Grid -->
      <section class="py-20 px-6">
         <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
               <div v-for="post in posts" :key="post.title" class="group flex flex-col cursor-pointer">
                  <div
                     class="aspect-video rounded-3xl bg-bg-elevated border border-border-subtle mb-6 relative overflow-hidden p-12 flex items-center justify-center transition-all group-hover:border-brand/30">
                     <div :class="['absolute inset-0 opacity-10', post.gradient]"></div>
                     <Icon :name="post.icon"
                        class="text-6xl text-tx-muted/20 group-hover:text-brand/20 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div class="flex items-center gap-3 mb-4">
                     <span
                        class="text-[8px] font-black text-tx-muted border border-border-subtle px-2 py-0.5 rounded uppercase tracking-widest">{{
                        post.tag }}</span>
                     <span class="text-[8px] font-medium text-tx-muted uppercase tracking-widest">{{ post.readTime }}
                        MIN READ</span>
                  </div>
                  <h3 class="text-xl font-bold mb-4 group-hover:text-brand transition-colors transition-duration-300">{{
                     post.title }}</h3>
                  <p class="text-sm text-tx-secondary leading-relaxed mb-6 line-clamp-2">
                     {{ post.excerpt }}
                  </p>
                  <div class="mt-auto pt-6 border-t border-border-subtle flex items-center justify-between">
                     <span class="text-[10px] font-bold text-tx-muted">{{ post.date }}</span>
                     <Icon name="ph:arrow-right-bold"
                        class="text-tx-muted group-hover:text-brand group-hover:translate-x-1 transition-all" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- Newsletter -->
      <section class="py-32 px-6">
         <div
            class="max-w-4xl mx-auto p-16 rounded-[3rem] bg-brand text-white text-center shadow-2xl shadow-brand/20 relative overflow-hidden">
            <div class="absolute inset-0 bg-white/5 pointer-events-none"
               style="background-image: radial-gradient(circle, white 0.5px, transparent 0.5px); background-size: 24px 24px;">
            </div>
            <h2 class="text-3xl font-bold mb-4 relative z-10">Get the best of StoreOS.</h2>
            <p class="text-white/80 mb-10 max-w-sm mx-auto relative z-10">Receive expert commerce strategy and platform
               updates twice a month.</p>
            <div class="max-w-md mx-auto flex gap-3 relative z-10">
               <input type="email" placeholder="you@company.com"
                  class="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-sm placeholder:text-white/40 focus:bg-white/20 outline-none transition-all" />
               <button
                  class="bg-white text-brand font-bold text-sm px-8 py-3 rounded-xl hover:bg-white/90 transition-all shadow-xl shadow-black/10">Subscribe</button>
            </div>
         </div>
      </section>
   </div>
</template>

<script lang="ts" setup>
useSeoMeta({
   title: "Blogs — The StoreOS Journal",
   description: "Read the latest news, expert guides, and technical insights from the StoreOS team. Stay ahead of the commerce curve.",
   ogTitle: "StoreOS Blog — Insights for Modern Brands",
   ogDescription: "The latest in commerce infrastructure, operational efficiency, and growth strategy.",
})

const currentCategory = ref('ALL')
const categories = ['ALL', 'PRODUCT', 'GUIDES', 'STRATEGY', 'ENGINEERING', 'CASE STUDIES']

const posts = [
   {
      title: 'How Multi-Warehouse Inventory powers global scale.',
      excerpt: 'Syncing stock across physical locations is hard. Here is how we solved it for enterprise-level brands.',
      tag: 'STRATEGY', readTime: 8, date: 'APR 12, 2026', icon: 'ph:buildings-fill', gradient: 'bg-brand'
   },
   {
      title: 'Introducing the Workflow Visual Builder.',
      excerpt: 'Drag, drop, and automate. See how our new visual builder saves hours of manual tasks.',
      tag: 'PRODUCT', readTime: 5, date: 'APR 10, 2026', icon: 'ph:circles-three-plus-fill', gradient: 'bg-success'
   },
   {
      title: 'Optimizing checkout for the Middle East market.',
      excerpt: 'Payments in MENA are unique. From Fawry to Paymob, learn about the local conversion triggers.',
      tag: 'GUIDES', readTime: 10, date: 'APR 05, 2026', icon: 'ph:currency-circle-dollar-fill', gradient: 'bg-info'
   },
   {
      title: 'Scaling to 1M transactions per hour.',
      excerpt: 'A deep dive into our GraphQL architecture and how we handled the latest flash sale spikes.',
      tag: 'ENGINEERING', readTime: 15, date: 'MAR 28, 2026', icon: 'ph:cpu-fill', gradient: 'bg-purple-500'
   },
   {
      title: 'Customer Spotlight: How BrandX grew 240% in 1 year.',
      excerpt: 'A detailed look at the operational shifts that allowed BrandX to scale without increasing overhead.',
      tag: 'CASE STUDIES', readTime: 12, date: 'MAR 20, 2026', icon: 'ph:flag-fill', gradient: 'bg-orange-500'
   },
   {
      title: 'The future of Headless Commerce in 2026.',
      excerpt: 'Why the separation of frontend and backend is no longer optional for high-growth brands.',
      tag: 'STRATEGY', readTime: 6, date: 'MAR 15, 2026', icon: 'ph:browser-fill', gradient: 'bg-teal-500'
   },
]
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
   display: none;
}

.hide-scrollbar {
   -ms-overflow-style: none;
   scrollbar-width: none;
}
</style>