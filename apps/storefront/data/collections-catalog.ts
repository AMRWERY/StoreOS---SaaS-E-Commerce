/** Slugs match `StorefrontCollection.slug` on the collections index page. */
export interface CollectionCatalogProduct {
  id: number
  slug: string
  name: string
  category: string
  price: number
  image: string
  collectionSlug: string
}

export const collectionMeta: Record<string, { name: string; description: string }> = {
  'winter-archive-2024': {
    name: 'Winter Archive 2024',
    description: 'Heavyweight insulation units and weatherproof outer shells for sub-zero operations.',
  },
  'tactical-hardware': {
    name: 'Tactical Hardware',
    description: 'High-performance components and modular racks for professional workstations.',
  },
  'minimalist-office': {
    name: 'Minimalist Office',
    description: 'Refined desk essentials designed to maximize focus and spatial efficiency.',
  },
  'optics-lenses': {
    name: 'Optics & Lenses',
    description: 'Precision engineered glass for the modern visual documentation specialist.',
  },
  'kinetic-footwear': {
    name: 'Kinetic Footwear',
    description: 'Rapid-response trainers and performance runners with advanced energy return.',
  },
  'aesthetic-basics': {
    name: 'Aesthetic Basics',
    description: 'Foundation layers focusing on silhouette, material quality, and longevity.',
  },
}

export const collectionCatalogProducts: CollectionCatalogProduct[] = [
  { id: 101, slug: 'polar-shell-jacket', name: 'Polar Shell Jacket', category: 'OUTERWEAR', price: 4200, image: '/img/product-01.avif', collectionSlug: 'winter-archive-2024' },
  { id: 102, slug: 'thermal-grid-layer', name: 'Thermal Grid Layer', category: 'BASE LAYER', price: 1890, image: '/img/product-02.avif', collectionSlug: 'winter-archive-2024' },
  { id: 103, slug: 'subzero-gloves', name: 'SubZero Gloves', category: 'GEAR', price: 950, image: '/img/product-03.avif', collectionSlug: 'winter-archive-2024' },
  { id: 201, slug: 'modular-rack-v2', name: 'Modular Rack v2', category: 'RACK', price: 8400, image: '/img/product-04.avif', collectionSlug: 'tactical-hardware' },
  { id: 202, slug: 'terminal-hub-pro', name: 'Terminal Hub Pro', category: 'HUB', price: 3200, image: '/img/product-05.avif', collectionSlug: 'tactical-hardware' },
  { id: 301, slug: 'focus-desk-mat', name: 'Focus Desk Mat', category: 'DESK', price: 450, image: '/img/product-06.avif', collectionSlug: 'minimalist-office' },
  { id: 302, slug: 'ambient-task-lamp', name: 'Ambient Task Lamp', category: 'LIGHTING', price: 1200, image: '/img/product-09.avif', collectionSlug: 'minimalist-office' },
  { id: 401, slug: 'spectra-prime-50', name: 'Spectra Prime 50mm', category: 'LENS', price: 8900, image: '/img/product-010.avif', collectionSlug: 'optics-lenses' },
  { id: 501, slug: 'volt-matrix-runner', name: 'Volt Matrix Runner', category: 'FOOTWEAR', price: 2150, image: '/img/product-014.avif', collectionSlug: 'kinetic-footwear' },
  { id: 502, slug: 'aerosprint-pro', name: 'AeroSprint Pro Trainer', category: 'FOOTWEAR', price: 2499, image: '/img/product-09.avif', collectionSlug: 'kinetic-footwear' },
  { id: 601, slug: 'core-tee-pack', name: 'Core Tee Pack', category: 'APPAREL', price: 890, image: '/img/product-011.avif', collectionSlug: 'aesthetic-basics' },
  { id: 602, slug: 'line-weight-hoodie', name: 'Line Weight Hoodie', category: 'APPAREL', price: 1650, image: '/img/product-012.avif', collectionSlug: 'aesthetic-basics' },
]
