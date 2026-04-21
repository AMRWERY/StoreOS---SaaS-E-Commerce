<template>
   <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
      <!-- Dev Hero -->
      <section class="relative pt-32 pb-24 px-6 overflow-hidden border-b border-border-subtle bg-[#08080C]">
         <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex flex-col lg:flex-row items-center gap-20">
               <div class="flex-1">
                  <p class="text-[10px] font-black tracking-[0.4em] text-info mb-6 uppercase">Developer Portal</p>
                  <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-8">
                     Built for engineers,<br />
                     <span class="text-tx-secondary text-info/80">by engineers.</span>
                  </h1>
                  <p class="text-lg text-tx-secondary leading-relaxed mb-10 max-w-xl">
                     Deeply customizable, type-safe, and enterprise-ready. Integrate StoreOS into
                     your existing stack with our powerful GraphQL API and modern SDKs.
                  </p>
                  <div class="flex items-center gap-4">
                     <VButton variant="none"
                        className="bg-info text-white py-4 px-10 rounded-xl font-bold text-sm shadow-xl shadow-info/20">
                        Get API Keys</VButton>
                     <VButton variant="none" className="text-tx-secondary hover:text-tx-primary font-bold">API Reference
                     </VButton>
                  </div>
               </div>
               <!-- Code Mockup -->
               <div class="flex-1 w-full">
                  <div
                     class="rounded-2xl border border-border-subtle bg-[#0F111A] p-6 shadow-2xl relative overflow-hidden group">
                     <div class="flex items-center gap-2 mb-6">
                        <div class="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                        <div class="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                        <span class="text-[10px] font-mono text-tx-muted ms-2">storeos.js — index.ts</span>
                     </div>
                     <pre class="font-mono text-xs leading-relaxed text-info/90">
<span class="text-purple-400">import</span> { StoreOS } <span class="text-purple-400">from</span> <span class="text-success-dim">'@storeos/sdk'</span>;

<span class="text-tx-muted">// Initialize the client</span>
<span class="text-purple-400">const</span> client = <span class="text-purple-400">new</span> StoreOS({
  apiKey: process.env.STOREOS_KEY,
  region: <span class="text-success-dim">'ME-1'</span>
});

<span class="text-tx-muted">// Sync multi-warehouse inventory</span>
<span class="text-purple-400">await</span> client.inventory.sync({
  sku: <span class="text-success-dim">'PRO-MAX-1'</span>,
  locations: [<span class="text-success-dim">'WA-01'</span>, <span class="text-success-dim">'WA-02'</span>]
});</pre>
                     <div class="absolute bottom-0 end-0 p-4">
                        <div
                           class="text-[8px] font-black text-tx-muted uppercase tracking-widest bg-bg-primary px-2 py-1 rounded border border-border-subtle">
                           Typescript Ready</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- SDKs & Libraries -->
      <section class="py-24 px-6">
         <div class="max-w-7xl mx-auto">
            <h2 class="text-2xl font-bold mb-12">Official SDKs & Libraries</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div v-for="sdk in sdks" :key="sdk.name"
                  class="p-8 rounded-2xl bg-bg-elevated border border-border-subtle hover:border-info/30 transition-all group cursor-pointer">
                  <div
                     class="w-12 h-12 rounded-xl bg-bg-primary border border-border-subtle flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-info group-hover:text-white transition-all">
                     <Icon :name="sdk.icon" />
                  </div>
                  <h3 class="font-bold mb-2">{{ sdk.name }}</h3>
                  <p class="text-[11px] text-tx-secondary mb-6">{{ sdk.desc }}</p>
                  <div
                     class="text-[9px] font-black text-tx-muted group-hover:text-info uppercase tracking-widest transition-colors">
                     View Repo
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- Technical Specs -->
      <section class="py-24 px-6 bg-bg-primary/30">
         <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-3 gap-12">
               <div v-for="spec in specs" :key="spec.title" class="space-y-4">
                  <div class="text-info font-black text-[10px] tracking-widest uppercase">{{ spec.tag }}</div>
                  <h3 class="text-xl font-bold">{{ spec.title }}</h3>
                  <p class="text-sm text-tx-secondary leading-relaxed">{{ spec.desc }}</p>
                  <ul class="space-y-2 mt-6">
                     <li v-for="point in spec.points" :key="point"
                        class="flex items-center gap-3 text-xs text-tx-primary">
                        <div class="w-1 h-1 rounded-full bg-info"></div>
                        {{ point }}
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </section>

      <!-- Final CTA -->
      <section class="py-32 px-6">
         <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-6">Ready to integrate?</h2>
            <p class="text-tx-secondary mb-10 max-w-lg mx-auto">
               Get started with your first API request in less than 5 minutes. No credit card required to start
               building.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
               <VButton variant="none"
                  className="bg-info text-white py-4 px-10 rounded-xl font-bold text-sm shadow-xl shadow-info/20">Create
                  Sandbox Account</VButton>
               <VButton variant="none" className="text-tx-secondary hover:text-tx-primary font-bold">API Status
               </VButton>
            </div>
         </div>
      </section>
   </div>
</template>

<script lang="ts" setup>
useSeoMeta({
   title: "Documentation — Build with StoreOS",
   description: "API references, SDKs, and technical guides for integrating StoreOS. Everything you need to build powerful commerce apps.",
   ogTitle: "StoreOS Developer Documentation",
   ogDescription: "The engineering layer for high-growth commerce.",
})

const sdks = [
   { name: 'JavaScript SDK', icon: 'ph:brand-javascript-fill', desc: 'Node.js and browser-ready core SDK for all StoreOS modules.' },
   { name: 'React Components', icon: 'ph:atom-fill', desc: 'Ready-to-use UI components for building custom storefronts.' },
   { name: 'Python SDK', icon: 'ph:brand-python-fill', desc: 'Clean, asynchronous client for data pipelines and back-office apps.' },
   { name: 'Go Library', icon: 'ph:code-bold', desc: 'High-performance library for mission-critical warehouse services.' },
]

const specs = [
   {
      tag: 'GRAPHQL API',
      title: 'Type-Safe Schema',
      desc: 'Our GraphQL schema is strictly typed, ensuring predictable results and excellent IDE support during development.',
      points: ['Introspective schema', 'Custom scalars for metrics', 'Rate-limited for stability']
   },
   {
      tag: 'WEBHOOKS',
      title: 'Real-time Events',
      desc: 'Subscribe to events across your entire operation—from inventory stock-outs to payment settlement.',
      points: ['Signed payloads for security', 'Automatic retry logic', 'Detailed delivery logs']
   },
   {
      tag: 'EXTENSIBILITY',
      title: 'Plugin Architecture',
      desc: 'Extend the StoreOS Operational Layer with custom business logic or proprietary integrations.',
      points: ['Serverless functions', 'Metadata custom fields', 'Native app ecosystem']
   },
]
</script>