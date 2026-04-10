<template>
  <div class="min-h-screen bg-[#08080E] text-[#F0F0FF] selection:bg-[#6366F1]/30 pb-20">
    <collections-page-header :breadcrumb-items="breadcrumbItems" :sector-count="collections.length" />
    <collections-grid :collections="collections" />
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '../../../../layers/ui/types/v-breadcrumb'
import type { StorefrontCollection } from '../../types/collections'

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Collections', active: true },
]

const collections = ref<StorefrontCollection[]>([
  {
    id: 'CL-001',
    slug: 'winter-archive-2024',
    name: 'Winter Archive 2024',
    description: 'Heavyweight insulation units and weatherproof outer shells for sub-zero operations.',
    image: '/img/collection-01.avif',
    count: 3,
    featured: true,
  },
  {
    id: 'CL-002',
    slug: 'tactical-hardware',
    name: 'Tactical Hardware',
    description: 'High-performance components and modular racks for professional workstations.',
    image: '/img/collection-02.avif',
    count: 2,
  },
  {
    id: 'CL-003',
    slug: 'minimalist-office',
    name: 'Minimalist Office',
    description: 'Refined desk essentials designed to maximize focus and spatial efficiency.',
    image: '/img/collection-03.avif',
    count: 2,
  },
  {
    id: 'CL-004',
    slug: 'optics-lenses',
    name: 'Optics & Lenses',
    description: 'Precision engineered glass for the modern visual documentation specialist.',
    image: '/img/collection-04.avif',
    count: 1,
  },
  {
    id: 'CL-005',
    slug: 'kinetic-footwear',
    name: 'Kinetic Footwear',
    description: 'Rapid-response trainers and performance runners with advanced energy return.',
    image: '/img/collection-05.avif',
    count: 2,
  },
  {
    id: 'CL-006',
    slug: 'aesthetic-basics',
    name: 'Aesthetic Basics',
    description: 'Foundation layers focusing on silhouette, material quality, and longevity.',
    image: '/img/collection-06.avif',
    count: 2,
  },
])

useSeoMeta({
  title: 'Collections',
  description: 'Browse our full catalog. Filter by category, price, and availability. Fast worldwide shipping on all orders.',
  ogTitle: 'Collections | StoreOS Store',
  ogDescription: 'Browse our full catalog. Filter by category, price, and availability.',
  ogType: 'website',
  twitterTitle: 'Collections | StoreOS Store',
  twitterDescription: 'Browse our full catalog. Fast worldwide shipping.',
})
</script>
