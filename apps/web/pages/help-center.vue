<template>
   <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
      <!-- Search Hero -->
      <section class="relative pt-32 pb-24 px-6 overflow-hidden border-b border-border-subtle bg-bg-primary/50">
         <div class="max-w-4xl mx-auto relative z-10 text-center">
            <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">StoreOS Support</p>
            <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-10">How can we help?</h1>
            <div class="relative max-w-2xl mx-auto group">
               <div
                  class="absolute inset-0 bg-brand/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity">
               </div>
               <div
                  class="relative flex items-center bg-bg-elevated border border-border-subtle rounded-3xl p-2 ps-6 focus-within:border-brand/40 transition-all shadow-2xl">
                  <Icon name="ph:magnifying-glass-bold" class="text-tx-muted text-xl" />
                  <input type="text" placeholder="Search for documentation, guides, or help topics..."
                     class="w-full bg-transparent border-none outline-none px-4 py-4 text-sm" />
                  <button
                     class="bg-brand text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-brand/20 hover:bg-brand/90 transition-all">Search</button>
               </div>
            </div>
            <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
               <span class="text-[9px] font-black text-tx-muted uppercase tracking-widest">POPULAR:</span>
               <button v-for="tag in popularTags" :key="tag"
                  class="text-[9px] font-bold text-tx-secondary px-3 py-1 bg-bg-elevated rounded-full border border-border-subtle hover:text-brand hover:border-brand/30 transition-all">
                  {{ tag }}
               </button>
            </div>
         </div>
      </section>

      <!-- Categories Grid -->
      <section class="py-24 px-6">
         <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div v-for="cat in categories" :key="cat.title"
                  class="p-10 rounded-[2.5rem] bg-bg-elevated border border-border-subtle group hover:border-brand/30 transition-all cursor-pointer shadow-xl hover:shadow-brand/5">
                  <div
                     class="w-14 h-14 rounded-2xl bg-bg-primary border border-border-subtle flex items-center justify-center text-brand mb-8 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-500">
                     <Icon :name="cat.icon" class="text-3xl" />
                  </div>
                  <h3 class="text-xl font-bold mb-4">{{ cat.title }}</h3>
                  <p class="text-sm text-tx-secondary leading-relaxed mb-8">{{ cat.desc }}</p>
                  <div
                     class="pt-8 border-t border-border-subtle flex items-center justify-between text-[10px] font-black text-tx-muted uppercase tracking-widest group-hover:text-brand transition-colors">
                     {{ cat.articleCount }} Articles
                     <Icon name="ph:caret-right-bold" class="group-hover:translate-x-1 transition-transform" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- Popular Articles -->
      <section class="py-24 px-6 bg-bg-primary/30">
         <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold mb-10 flex items-center gap-3">
               <Icon name="ph:star-fill" class="text-brand" />
               Frequently Asked Questions
            </h2>
            <div class="space-y-4">
               <div v-for="article in popularArticles" :key="article.title"
                  class="p-6 rounded-2xl border border-border-subtle bg-bg-base hover:bg-bg-elevated transition-all cursor-pointer flex items-center justify-between group">
                  <div class="flex items-center gap-4">
                     <Icon name="ph:file-text-fill" class="text-tx-muted group-hover:text-brand transition-colors" />
                     <span class="text-sm font-bold">{{ article.title }}</span>
                  </div>
                  <Icon name="ph:arrow-right-bold"
                     class="text-[10px] text-tx-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
               </div>
            </div>
         </div>
      </section>

      <!-- Still need help -->
      <section class="py-32 px-6">
         <div
            class="max-w-4xl mx-auto p-12 rounded-[3rem] border border-brand/20 bg-gradient-to-br from-bg-elevated to-bg-base text-center relative overflow-hidden">
            <div class="absolute inset-0 bg-brand/5 blur-[80px] rounded-full"></div>
            <Icon name="ph:chat-circle-dots-fill" class="text-4xl text-brand mb-6" />
            <h2 class="text-3xl font-bold mb-4">Still need help?</h2>
            <p class="text-tx-secondary mb-10">Our community and support specialists are here to guide you.</p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
               <VButton variant="none"
                  className="bg-brand text-white py-4 px-10 rounded-xl font-bold text-sm shadow-xl shadow-brand/20">Talk
                  to Support</VButton>
               <VButton variant="none" className="text-tx-secondary hover:text-tx-primary font-bold">Ask the Community
               </VButton>
            </div>
         </div>
      </section>
   </div>
</template>

<script lang="ts" setup>
useSeoMeta({
   title: "Help Center — Support & Knowledge Base",
   description: "Find answers to your questions about StoreOS. Detailed guides, FAQs, and support channels.",
   ogTitle: "StoreOS Help Center",
   ogDescription: "Your primary hub for learning and troubleshooting StoreOS.",
})

const popularTags = ['Integration Guide', 'API Keys', 'Billing', 'Mobile App', 'Warehouse Apps']

const categories = [
   { title: 'Getting Started', desc: 'New to StoreOS? Learn the basics of setting up your global commerce hub.', icon: 'ph:rocket-launch-fill', articleCount: 12 },
   { title: 'Account & Billing', desc: 'Manage your subscription, team roles, and billing preferences.', icon: 'ph:shield-check-fill', articleCount: 8 },
   { title: 'Operational Layer', desc: 'Deep dive into inventory, orders, and workflow automations.', icon: 'ph:gear-six-fill', articleCount: 24 },
   { title: 'Integrations', desc: 'How to connect your favorite tools like Stripe, DHL, and Meta.', icon: 'ph:plugs-fill', articleCount: 45 },
   { title: 'Developer Tools', desc: 'GraphQL API, Webhooks, and SDK documentation for engineers.', icon: 'ph:code-fill', articleCount: 30 },
   { title: 'Storefronts', desc: 'Customizing your checkout, building themes, and headless SDKs.', icon: 'ph:storefront-fill', articleCount: 15 },
]

const popularArticles = [
   { title: 'How to set up your first multi-warehouse location.' },
   { title: 'Connecting your Stripe account to StoreOS Payments.' },
   { title: 'Understanding the operational permission roles.' },
   { title: 'Best practices for international shipping with DHL.' },
   { title: 'Recovering abandoned carts via WhatsApp automation.' },
]
</script>