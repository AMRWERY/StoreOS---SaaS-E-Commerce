<template>
  <div>
    <div class="min-h-screen bg-[#08080E] font-sans text-[#F0F0FF] selection:bg-[#6366F1]/30">
      <!-- --- NAVIGATION --- -->
      <nav
        class="sticky top-0 z-50 h-[52px] bg-[#0D0D18]/80 backdrop-blur-md border-b border-[#1C1C30] px-6 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <span class="text-xl font-bold tracking-tighter text-[#F0F0FF]">Store<span
              class="text-[#6366F1]">OS</span></span>
          <div class="hidden md:flex gap-6">
            <a href="#"
              class="text-[11px] font-semibold text-[#8888AA] hover:text-[#6366F1] transition-colors uppercase tracking-widest">Shop
              All</a>
            <a href="#"
              class="text-[11px] font-semibold text-[#8888AA] hover:text-[#6366F1] transition-colors uppercase tracking-widest">New
              Arrivals</a>
            <a href="#"
              class="text-[11px] font-semibold text-[#8888AA] hover:text-[#6366F1] transition-colors uppercase tracking-widest">Collections</a>
          </div>
        </div>
        <div class="flex items-center gap-5 text-[#8888AA]">
          <Icon name="solar:magnifer-linear" class="w-[18px] h-[18px] cursor-pointer hover:text-[#F0F0FF]" />
          <Icon name="solar:user-linear" class="w-[18px] h-[18px] cursor-pointer hover:text-[#F0F0FF]" />
          <div class="relative cursor-pointer hover:text-[#F0F0FF]">
            <Icon name="solar:bag-3-linear" class="w-[18px] h-[18px]" />
            <span
              class="absolute -top-1.5 -end-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#6366F1] text-[9px] font-bold text-white font-mono">2</span>
          </div>
        </div>
      </nav>

      <!-- --- HERO SECTION --- -->
      <section class="relative h-[80vh] w-full overflow-hidden">
        <img src="/img/hero-banner.avif" class="absolute inset-0 h-full w-full object-cover opacity-40 grayscale-[40%]"
          alt="Hero Image" />
        <!-- Gradient overlay to blend with bg-base -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#08080E] via-[#08080E]/40 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#08080E] via-transparent to-transparent"></div>

        <div class="relative flex h-full items-center px-12 md:px-24">
          <div class="max-w-2xl space-y-6">
            <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#6366F1]">System Ready</span>
            <h1 class="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter text-[#F0F0FF]">
              Elevate Your <br /> Digital Style
            </h1>
            <p class="text-[15px] font-normal leading-relaxed text-[#8888AA] max-w-lg">
              High-performance aesthetics for the modern operator. Designed to function in any environment.
            </p>
            <button
              class="bg-[#6366F1] hover:bg-[#818CF8] text-white px-8 py-3.5 rounded-[8px] text-[12px] font-bold transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.2)] uppercase tracking-[0.2em]">
              Access Catalog
            </button>
          </div>
        </div>
      </section>

      <!-- --- CATEGORIES (Using primary card bg) --- -->
      <section class="py-20 px-6 max-w-[1280px] mx-auto">
        <div class="mb-12">
          <span class="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8888AA]">Root Directory</span>
          <h2 class="mt-2 text-2xl font-bold text-[#F0F0FF]">Shop by Category</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div v-for="cat in categories" :key="cat.name" class="group cursor-pointer">
            <div
              class="overflow-hidden rounded-[12px] bg-[#0D0D18] border border-[#1C1C30] transition-all duration-300 group-hover:border-[#6366F1]/50 group-hover:-translate-y-1">
              <img :src="cat.image"
                class="aspect-[3/4] w-full object-cover opacity-70 grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0" />
            </div>
            <div class="mt-4 px-1">
              <h3 class="text-[13px] font-semibold text-[#F0F0FF]">{{ cat.name }}</h3>
              <p class="text-[11px] text-[#50506A] font-mono uppercase tracking-tighter">{{ cat.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- --- NEW ARRIVALS (Elevated section) --- -->
      <section class="bg-[#0D0D18] py-24 border-y border-[#1C1C30]">
        <div class="max-w-[1280px] mx-auto px-6">
          <div class="flex items-end justify-between mb-12">
            <div>
              <h2 class="text-3xl font-bold text-[#F0F0FF]">New Arrivals</h2>
              <div class="h-1 w-12 bg-[#6366F1] mt-2"></div>
            </div>
            <a href="#"
              class="text-[11px] font-bold text-[#6366F1] hover:text-[#818CF8] transition-colors uppercase tracking-widest flex items-center gap-2">
              View All
              <Icon name="solar:arrow-right-linear" class="w-4 h-4" />
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="product in newArrivals" :key="product.id"
              class="group relative bg-[#141422] border border-[#262640] rounded-[12px] p-2 transition-all hover:border-[#6366F1]/40">
              <div class="relative overflow-hidden rounded-[8px] aspect-[4/5]">
                <img :src="product.image"
                  class="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
                <span v-if="product.tag" :class="[product.tag.type === 'new' ? 'bg-[#6366F1]' : 'bg-[#F97316]']"
                  class="absolute top-4 start-4 rounded-full px-3 py-0.5 text-[9px] font-bold text-white tracking-widest uppercase">
                  {{ product.tag.text }}
                </span>
              </div>
              <div class="p-3">
                <h3
                  class="text-[12px] font-medium text-[#8888AA] group-hover:text-[#F0F0FF] transition-colors truncate">
                  {{ product.name }}</h3>
                <div class="mt-2 flex items-baseline gap-2 font-mono font-semibold">
                  <span class="text-[#F0F0FF] text-[15px]">EGP {{ product.price.toLocaleString() }}</span>
                  <span v-if="product.oldPrice" class="text-[#50506A] line-through text-[11px]">EGP {{
                    product.oldPrice.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- --- PROMO BAR (Brand Glow) --- -->
      <div class="bg-[#6366F1] py-3 overflow-hidden whitespace-nowrap">
        <div class="flex gap-20 items-center justify-center">
          <span v-for="i in 3" :key="i" class="text-[10px] font-black text-white uppercase tracking-[0.5em] opacity-90">
            Global Distribution Active • Limited Production Batch • Encrypted Payments • Secure Ops
          </span>
        </div>
      </div>

      <!-- --- BEST SELLERS --- -->
      <section class="py-24 px-6 max-w-[1280px] mx-auto">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold text-[#F0F0FF]">Best Sellers</h2>
          <div class="flex gap-3">
            <button class="rounded-[6px] border border-[#262640] p-2 hover:bg-[#141422] transition-colors">
              <Icon name="solar:arrow-left-linear" class="w-5 h-5 text-[#8888AA]" />
            </button>
            <button class="rounded-[6px] border border-[#262640] p-2 hover:bg-[#141422] transition-colors">
              <Icon name="solar:arrow-right-linear" class="w-5 h-5 text-[#8888AA]" />
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="product in bestSellers" :key="product.id" class="group">
            <div class="relative overflow-hidden rounded-[12px] bg-[#0D0D18] border border-[#1C1C30]">
              <img :src="product.image"
                class="aspect-square w-full object-cover opacity-60 grayscale-[50%] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              <div class="absolute inset-0 bg-[#6366F1]/0 transition-colors group-hover:bg-[#6366F1]/5"></div>
            </div>
            <div class="mt-5 space-y-1">
              <p class="text-[10px] font-bold text-[#50506A] uppercase tracking-widest">{{ product.category }}</p>
              <h3 class="text-[15px] font-medium text-[#8888AA] group-hover:text-[#F0F0FF] transition-colors">{{
                product.name }}</h3>
              <p class="font-mono text-[#6366F1] font-bold text-[16px]">EGP {{ product.price.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- --- TRUST FEATURES (Operational stats look) --- -->
      <div class="bg-[#0D0D18] border-t border-[#1C1C30] py-16">
        <div class="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div v-for="feat in [
            { icon: 'solar:delivery-bold', label: 'Fast Transit', desc: 'Direct logistics hub' },
            { icon: 'solar:verified-check-bold', label: 'Auth Verified', desc: '100% genuine units' },
            { icon: 'solar:restart-bold', label: 'Refund Node', desc: 'Hassle-free logic' },
            { icon: 'solar:chat-dots-bold', label: 'Support 24h', desc: 'Direct comms' }
          ]" :key="feat.label" class="flex items-center gap-4">
            <div
              class="h-10 w-10 rounded-[8px] bg-[#141422] border border-[#262640] flex items-center justify-center shrink-0">
              <Icon :name="feat.icon" class="w-5 h-5 text-[#6366F1]" />
            </div>
            <div>
              <h4 class="text-[12px] font-bold text-[#F0F0FF] uppercase tracking-widest">{{ feat.label }}</h4>
              <p class="text-[11px] text-[#50506A] font-mono uppercase tracking-tighter">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- --- FOOTER (Deep Dark) --- -->
      <footer class="bg-[#08080E] pt-20 pb-8 text-[#8888AA]">
        <div class="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div class="space-y-6">
            <h2 class="text-2xl font-bold tracking-tighter text-[#F0F0FF]">Store<span class="text-[#6366F1]">OS</span>
            </h2>
            <p class="text-[12px] leading-relaxed max-w-xs text-[#50506A]">Unified operating system for modern commerce.
              Optimized for high-velocity environments.</p>
            <div class="flex gap-4">
              <div v-for="soc in ['instagram', 'twitter', 'facebook']" :key="soc"
                class="h-8 w-8 rounded-full border border-[#262640] flex items-center justify-center hover:border-[#6366F1] hover:text-[#6366F1] cursor-pointer transition-all">
                <Icon :name="`solar:${soc}-linear`" class="w-4 h-4" />
              </div>
            </div>
          </div>
          <div v-for="col in [
            { title: 'Core Links', links: ['Shop All', 'Catalog Index', 'Archive'] },
            { title: 'System', links: ['Terms', 'Privacy', 'Compliance'] }
          ]" :key="col.title">
            <h4 class="text-[#F0F0FF] text-[11px] font-black uppercase tracking-[0.2em] mb-8">{{ col.title }}</h4>
            <ul class="space-y-4 text-[12px]">
              <li v-for="link in col.links" :key="link" class="hover:text-[#6366F1] cursor-pointer font-medium">{{ link
                }}</li>
            </ul>
          </div>
          <div>
            <h4 class="text-[#F0F0FF] text-[11px] font-black uppercase tracking-[0.2em] mb-8">Node Location</h4>
            <p class="text-[11px] font-mono uppercase text-[#50506A] leading-relaxed">
              Sector 7 / London Base<br />
              ID: 8829-001-ALPHA<br />
              Status: Operational
            </p>
          </div>
        </div>
        <div class="border-t border-[#1C1C30] pt-8 text-center px-6">
          <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#50506A]">© 2024 StoreOS. All Rights
            Reserved. Built on Kinetic Core.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: { text: string; type: 'new' | 'sale' };
}

// --- Data ---
const categories = [
  { name: 'Fashion', desc: 'Modern silhouettes', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80' },
  { name: 'Electronics', desc: 'Precision tools', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Home Decor', desc: 'Minimalist living', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80' },
  { name: 'Beauty', desc: 'Clean essentials', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80' },
  { name: 'Furniture', desc: 'Timeless form', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80' },
];

const newArrivals = ref<Product[]>([
  { id: 1, name: 'Linear Wool Overcoat', category: 'Fashion', price: 1250, oldPrice: 2400, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80', tag: { text: 'SALE', type: 'sale' } },
  { id: 2, name: 'Studio Wireless Pro', category: 'Electronics', price: 8200, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80', tag: { text: 'NEW', type: 'new' } },
  { id: 3, name: 'Velocity Knit Runner', category: 'Footwear', price: 1400, oldPrice: 3100, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80', tag: { text: 'HOT', type: 'sale' } },
  { id: 4, name: 'Graphene Earth Vase', category: 'Home Decor', price: 550, image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=500&q=80' },
]);

const bestSellers = ref<Product[]>([
  { id: 5, name: 'Essential Timepiece', category: 'Accessories', price: 1700, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', tag: { text: 'BESTSELLER', type: 'new' } },
  { id: 6, name: 'Premium Cotton Zip-up', category: 'Fashion', price: 850, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80' },
  { id: 7, name: 'Heritage Leather Sneaker', category: 'Footwear', price: 2200, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80' },
  { id: 8, name: 'Atmos Series II', category: 'Electronics', price: 3400, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=80' },
]);

useSeoMeta({
  title: 'Home',
  description: 'Shop the latest collection. Free shipping on orders over $50. Discover new arrivals, top-rated products, and exclusive deals every week.',
  ogTitle: 'Home | StoreOS Store',
  ogDescription: 'Shop the latest collection. Free shipping on orders over $50. Discover new arrivals every week.',
  ogType: 'website',
  twitterTitle: 'Home | StoreOS Store',
  twitterDescription: 'Shop the latest collection. Free shipping on orders over $50.',
})
</script>