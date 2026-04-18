<template>
  <div>
    <footer class="bg-bg-base pt-20 pb-8 text-tx-muted border-t border-border-subtle">
      <div class="max-w-7xl mx-auto px-12 md:px-24 grid grid-cols-1 md:grid-cols-4 gap-16 mb-12">
        <div class="space-y-6">
          <nuxt-link-locale to="/" class="flex items-center gap-3">
            <div class="w-9 h-9 bg-brand rounded-lg flex items-center justify-center text-white shrink-0">
              <Icon name="ph:storefront-bold" class="text-xl" />
            </div>
            <div>
              <h1 class="font-bold text-lg leading-none text-tx-primary">Store<span class="text-brand">OS</span></h1>
              <p class="text-[9px] text-tx-secondary tracking-[0.2em] font-semibold mt-1">Global Merchant</p>
            </div>
          </nuxt-link-locale>
          <p class="text-[12px] leading-relaxed max-w-xs text-tx-muted opacity-80">
            Unified operating system for modern commerce.
            Optimized for high-velocity environments and seamless customer experiences.
          </p>
          <div class="flex gap-4">
            <div v-for="soc in socialIcons" :key="soc.key"
              class="h-5 w-5 rounded-full flex items-center justify-center hover:border-brand hover:text-brand cursor-pointer transition-all shadow-sm">
              <Icon :name="soc.icon" class="w-5 h-5" />
            </div>
          </div>
        </div>
        <div v-for="col in footerColumns" :key="col.title">
          <h4 class="text-tx-primary text-[11px] font-black tracking-[0.2em] mb-8">{{ col.title }}</h4>
          <ul class="space-y-4 text-[12px] flex flex-col">
            <nuxt-link-locale v-for="link in col.links" :key="link" :to="resolveLink(link)"
              class="hover:text-brand cursor-pointer font-medium transition-colors w-fit">{{ link
              }}</nuxt-link-locale>
          </ul>
        </div>
        <div>
          <h4 class="text-tx-primary text-[11px] font-black tracking-[0.2em] mb-8">Node Location</h4>
          <p class="text-[11px] text-tx-muted leading-relaxed tracking-tighter">
            Sector 7 / London Base<br />
            ID: 8829-001-ALPHA<br />
            Status: Operational
          </p>
        </div>
      </div>
      <div class="border-t border-border-subtle pt-8 text-center px-6">
        <p class="text-[10px] font-bold tracking-[0.3em] text-tx-muted opacity-60">© 2026 StoreOS. All Rights
          Reserved. Built on Kinetic Core.</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const socialIcons = [
  { key: 'instagram', icon: 'skill-icons:instagram' },
  { key: 'twitter', icon: 'garden:twitter-fill-12' },
  { key: 'facebook', icon: 'logos:facebook' }
];

const footerColumns = [
  { title: 'Core Links', links: ['Shop All', 'Catalog Index', 'Archive'] },
  { title: 'System', links: ['Terms', 'Privacy', 'Compliance'] }
];

const resolveLink = (label: string) => {
  const map: Record<string, string> = {
    'Shop All': '/shop-all',
    'Catalog Index': '/catalog-index',
    'Archive': '/archive',
    'Terms': '/terms',
    'Privacy': '/privacy',
    'Compliance': '/compliance'
  };
  return map[label] || '/';
};
</script>