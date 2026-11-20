import type { SectionDefinition } from '@/types/sections'
import { DEMO_PRODUCTS } from '@/data/demo-catalog'

const def: SectionDefinition = {
  type: 'product_detail',
  name: 'Product detail',
  category: 'product_page',
  description: 'Gallery, price, variants and add to cart for a single product',
  icon: 'ph:package-bold',
  popular: true,
  pages: ['product'],
  defaults: {
    variant: 'classic',
    productId: 'p1',
    showBadge: true,
    showRating: true,
    showCompareAt: true,
    showColors: true,
    showSizes: true,
    showQty: true,
    showBuyNow: true,
    showWishlist: true,
    showStock: true,
    showPerks: true,
    addLabel: 'Add to cart',
    buyNowLabel: 'Buy now',
    stockText: 'In stock - ships within 24 hours',
    outOfStockText: 'Currently out of stock',
    buttonColor: '#4f46e5',
    perks: [
      { text: 'Free shipping over $100' },
      { text: '30-day easy returns' },
      { text: '2-year warranty' },
    ],
  },
  groups: [
    {
      title: 'Product',
      open: true,
      fields: [
        {
          key: 'variant',
          label: 'Design',
          type: 'select',
          display: 'cards',
          options: [
            { value: 'classic', label: 'Classic', icon: 'ph:columns-bold', description: 'Gallery beside details' },
            { value: 'stacked', label: 'Stacked', icon: 'ph:rows-bold', description: 'Wide image, details below' },
            { value: 'split', label: 'Split sticky', icon: 'ph:sidebar-simple-bold', description: 'Vertical thumbs, sticky gallery' },
          ],
        },
        {
          key: 'productId',
          label: 'Demo product',
          type: 'select',
          options: DEMO_PRODUCTS.map((p) => ({ value: p.id, label: p.title })),
        },
        { key: 'addLabel', label: 'Add to cart label', type: 'text' },
        { key: 'buyNowLabel', label: 'Buy now label', type: 'text' },
        { key: 'stockText', label: 'In-stock note', type: 'text' },
        { key: 'outOfStockText', label: 'Out-of-stock note', type: 'text' },
        {
          key: 'perks',
          label: 'Perks',
          type: 'repeater',
          newItem: { text: 'New perk' },
          itemFields: [{ key: 'text', label: 'Text', type: 'text' }],
        },
      ],
    },
    {
      title: 'Elements',
      fields: [
        { key: 'showBadge', label: 'Show badge', type: 'toggle' },
        { key: 'showRating', label: 'Show rating', type: 'toggle' },
        { key: 'showCompareAt', label: 'Show compare-at price', type: 'toggle' },
        { key: 'showColors', label: 'Show colors', type: 'toggle' },
        { key: 'showSizes', label: 'Show sizes', type: 'toggle' },
        { key: 'showQty', label: 'Show quantity', type: 'toggle' },
        { key: 'showBuyNow', label: 'Show Buy now', type: 'toggle' },
        { key: 'showWishlist', label: 'Show wishlist', type: 'toggle' },
        { key: 'showStock', label: 'Show stock note', type: 'toggle' },
        { key: 'showPerks', label: 'Show perks', type: 'toggle' },
      ],
    },
    {
      title: 'Style',
      fields: [{ key: 'buttonColor', label: 'Button color', type: 'color' }],
    },
  ],
}

export default def
