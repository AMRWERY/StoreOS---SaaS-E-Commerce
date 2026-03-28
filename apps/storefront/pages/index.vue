<template>
  <div>
    <div class="space-y-0">
      <hero />

      <categories :categories="categoryList" />

      <new-arrivals :products="newArrivalList" />

      <active-bar />

      <best-sellers :products="bestSellerList" />

      <trust-features />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "@/types/products";

const categoryList = [
  { name: 'Fashion', desc: 'Modern silhouettes', image: '/img/category-01.avif' },
  { name: 'Electronics', desc: 'Precision tools', image: '/img/category-02.avif' },
  { name: 'Home Decor', desc: 'Minimalist living', image: '/img/category-03.avif' },
  { name: 'Beauty', desc: 'Clean essentials', image: '/img/category-04.avif' },
  { name: 'Furniture', desc: 'Timeless form', image: '/img/category-05.avif' },
  { name: 'Mobiles & Tablets', desc: 'Connected future', image: '/img/category-06.avif' },
];

const newArrivalList = shallowRef<Product[]>([
  { id: 1, slug: 'linear-wool-overcoat', name: 'Linear Wool Overcoat', category: 'Fashion', price: 1250, oldPrice: 2400, image: '/img/product-01.avif', tag: { text: 'SALE', type: 'sale' } },
  { id: 2, slug: 'studio-wireless-pro', name: 'Studio Wireless Pro', category: 'Electronics', price: 8200, image: '/img/product-02.avif', tag: { text: 'NEW', type: 'new' } },
  { id: 3, slug: 'velocity-knit-runner', name: 'Velocity Knit Runner', category: 'Footwear', price: 1400, oldPrice: 3100, image: '/img/product-03.avif', tag: { text: 'HOT', type: 'sale' } },
  { id: 4, slug: 'graphene-earth-vase', name: 'Graphene Earth Vase', category: 'Home Decor', price: 550, image: '/img/product-04.avif' },
]);

const bestSellerList = shallowRef<Product[]>([
  { id: 5, slug: 'essential-timepiece', name: 'Essential Timepiece', category: 'Accessories', price: 1700, image: '/img/product-05.avif', tag: { text: 'BESTSELLER', type: 'new' } },
  { id: 6, slug: 'premium-cotton-zip-up', name: 'Premium Cotton Zip-up', category: 'Fashion', price: 850, image: '/img/product-06.avif' },
  { id: 7, slug: 'heritage-leather-sneaker', name: 'Heritage Leather Sneaker', category: 'Footwear', price: 2200, image: '/img/product-07.avif' },
  { id: 8, slug: 'atmos-series-ii', name: 'Atmos Series II', category: 'Electronics', price: 3400, image: '/img/product-08.avif' },
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