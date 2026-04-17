import { defineStore } from 'pinia'
import type { Product, StorefrontProduct } from '@/types/products'

export const useCatalogStore = defineStore('storefront-catalog', () => {
  // --- Home page data ---
  const categoryList = ref([
    { name: 'Fashion', desc: 'Modern silhouettes', image: '/img/category-01.avif' },
    { name: 'Electronics', desc: 'Precision tools', image: '/img/category-02.avif' },
    { name: 'Home Decor', desc: 'Minimalist living', image: '/img/category-03.avif' },
    { name: 'Beauty', desc: 'Clean essentials', image: '/img/category-04.avif' },
    { name: 'Furniture', desc: 'Timeless form', image: '/img/category-05.avif' },
    { name: 'Mobiles & Tablets', desc: 'Connected future', image: '/img/category-06.avif' },
  ])

  const newArrivalList = ref<Product[]>([
    { id: 1, slug: 'linear-wool-overcoat', name: 'Linear Wool Overcoat', category: 'Fashion', price: 1250, oldPrice: 2400, image: '/img/product-01.avif', tag: { text: 'SALE', type: 'sale' } },
    { id: 2, slug: 'studio-wireless-pro', name: 'Studio Wireless Pro', category: 'Electronics', price: 8200, image: '/img/product-02.avif', tag: { text: 'NEW', type: 'new' } },
    { id: 3, slug: 'velocity-knit-runner', name: 'Velocity Knit Runner', category: 'Footwear', price: 1400, oldPrice: 3100, image: '/img/product-03.avif', tag: { text: 'HOT', type: 'sale' } },
    { id: 4, slug: 'graphene-earth-vase', name: 'Graphene Earth Vase', category: 'Home Decor', price: 550, image: '/img/product-04.avif' },
  ])

  const bestSellerList = ref<Product[]>([
    { id: 5, slug: 'essential-timepiece', name: 'Essential Timepiece', category: 'Accessories', price: 1700, image: '/img/product-05.avif', tag: { text: 'BESTSELLER', type: 'new' } },
    { id: 6, slug: 'premium-cotton-zip-up', name: 'Premium Cotton Zip-up', category: 'Fashion', price: 850, image: '/img/product-06.avif' },
    { id: 7, slug: 'heritage-leather-sneaker', name: 'Heritage Leather Sneaker', category: 'Footwear', price: 2200, image: '/img/product-07.avif' },
    { id: 8, slug: 'atmos-series-ii', name: 'Atmos Series II', category: 'Electronics', price: 3400, image: '/img/product-08.avif' },
  ])

  // --- Shop all page data ---
  const shopAllProducts = ref<StorefrontProduct[]>([
    { id: 1, slug: 'aerosprint-pro-trainer', name: 'AeroSprint Pro Trainer', cat: 'FOOTWEAR', price: 2499, oldPrice: 3200, tag: 'NEW', tagColor: 'bg-[#6366F1]', img: '/img/product-09.avif' },
    { id: 2, slug: 'sonic-x-studio-headphones', name: 'Sonic-X Studio Headphones', cat: 'AUDIO', price: 4850, tag: 'SALE', tagColor: 'bg-[#F97316]', img: '/img/product-010.avif' },
    { id: 3, slug: 'core-chronograph-silver', name: 'Core Chronograph Silver', cat: 'ACCESSORIES', price: 1200, img: '/img/product-011.avif' },
    { id: 4, slug: 'titanium-aviator-shade', name: 'Titanium Aviator Shade', cat: 'EYEWEAR', price: 3400, img: '/img/product-012.avif' },
    { id: 5, slug: 'retro-m-digital-compact', name: 'Retro-M Digital Compact', cat: 'PHOTOGRAPHY', price: 9800, img: '/img/product-013.avif' },
    { id: 6, slug: 'volt-matrix-runner', name: 'Volt Matrix Runner', cat: 'FOOTWEAR', price: 2150, img: '/img/product-014.avif' },
    { id: 7, slug: 'hydra-rich-night-serum', name: 'Hydra-Rich Night Serum', cat: 'BEAUTY', price: 950, tag: 'NEW', tagColor: 'bg-[#6366F1]', img: '/img/product-015.avif' },
    { id: 8, slug: 'insta-flex-classic-camera', name: 'Insta-Flex Classic Camera', cat: 'PHOTOGRAPHY', price: 1890, img: '/img/product-016.avif' },
    { id: 9, slug: 'stealth-carbon-backpack', name: 'Stealth Carbon Backpack', cat: 'ACCESSORIES', price: 3200, tag: 'HOT', tagColor: 'bg-[#F97316]', img: '/img/product-017.avif' },
    { id: 10, slug: 'origin-glass-vase', name: 'Origin Glass Vase', cat: 'HOME DECOR', price: 1200, img: '/img/product-018.avif' },
    { id: 11, slug: 'neon-drift-runner', name: 'Neon Drift Runner', cat: 'FOOTWEAR', price: 1799, img: '/img/product-01.avif' },
    { id: 12, slug: 'velocity-knit-runner', name: 'Velocity Knit Runner', cat: 'FOOTWEAR', price: 1400, oldPrice: 3100, tag: 'SALE', tagColor: 'bg-[#F97316]', img: '/img/product-03.avif' },
  ])

  // --- Shop all filter options ---
  const shopAllCategories = ref(['Apparel', 'Electronics', 'Home Decor', 'Beauty', 'Accessories'])
  const shopAllSizes = ref(['S', 'M', 'L', 'XL', 'XXL'])
  const shopAllColors = ref([
    { name: 'Indigo', bg: 'bg-[#6366F1]' },
    { name: 'White', bg: 'bg-[#FFFFFF]' },
    { name: 'Purple', bg: 'bg-[#A78BFA]' },
    { name: 'Green', bg: 'bg-[#10B981]' },
    { name: 'Red', bg: 'bg-[#EF4444]' },
  ])

  // --- PDP related products ---
  const relatedProducts = ref([
    { id: 1, name: 'Nordic Wall Clock', cat: 'MINIMALIST GEAR', price: 1500, img: '/img/product-08.avif' },
    { id: 2, name: 'Slim Leather Wallet', cat: 'ACCESSORIES', price: 950, img: '/img/product-09.avif' },
    { id: 3, name: 'Urban Tech Runners', cat: 'FOOTWEAR', price: 4200, img: '/img/product-010.avif' },
    { id: 4, name: 'Horizon Chrono', cat: 'LIMITED EDITION', price: 3500, img: '/img/product-011.avif', tag: 'HOT' },
  ])

  return {
    categoryList, newArrivalList, bestSellerList,
    shopAllProducts, shopAllCategories, shopAllSizes, shopAllColors,
    relatedProducts,
  }
})
