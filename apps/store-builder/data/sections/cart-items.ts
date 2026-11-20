import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'cart_items',
  name: 'Cart items',
  category: 'cart',
  description: 'Cart line items with coupon and order summary',
  icon: 'ph:shopping-cart-bold',
  popular: true,
  pages: ['cart'],
  defaults: {
    variant: 'table',
    heading: 'Shopping cart',
    summaryTitle: 'Order summary',
    freeShippingThreshold: 100,
    shippingFee: 8,
    showCoupon: true,
    couponHint: 'Try code WELCOME10 for 10% off',
    showShippingProgress: true,
    checkoutLabel: 'Checkout',
    continueLabel: 'Continue shopping',
    emptyTitle: 'Your cart is empty',
    emptyText: 'Looks like you have not added anything yet.',
    emptyCta: 'Start shopping',
  },
  groups: [
    {
      title: 'Content',
      open: true,
      fields: [
        {
          key: 'variant',
          label: 'Design',
          type: 'select',
          display: 'cards',
          options: [
            { value: 'table', label: 'Table', icon: 'ph:table-bold', description: 'Columns with header row' },
            { value: 'cards', label: 'Cards', icon: 'ph:cards-bold', description: 'Each item in its own card' },
            { value: 'compact', label: 'Compact', icon: 'ph:rows-bold', description: 'Dense list, summary below' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'summaryTitle', label: 'Summary title', type: 'text' },
        { key: 'couponHint', label: 'Coupon hint', type: 'text' },
        { key: 'checkoutLabel', label: 'Checkout button', type: 'text' },
        { key: 'continueLabel', label: 'Continue shopping button', type: 'text' },
      ],
    },
    {
      title: 'Shipping',
      fields: [
        { key: 'freeShippingThreshold', label: 'Free shipping threshold ($)', type: 'number', min: 0 },
        { key: 'shippingFee', label: 'Shipping fee ($)', type: 'number', min: 0 },
        { key: 'showShippingProgress', label: 'Show progress bar', type: 'toggle' },
        { key: 'showCoupon', label: 'Show coupon field', type: 'toggle' },
      ],
    },
    {
      title: 'Empty state',
      fields: [
        { key: 'emptyTitle', label: 'Title', type: 'text' },
        { key: 'emptyText', label: 'Text', type: 'text' },
        { key: 'emptyCta', label: 'Button label', type: 'text' },
      ],
    },
  ],
}

export default def
