<template>
  <div class="group/card relative h-full min-h-0">
    <nuxt-link-locale :to="detailPath"
      class="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080E]">
      <VProductCard :product="vProduct" :view-mode="viewMode" />
    </nuxt-link-locale>

    <VButton variant="none" type="button" title="Fast deploy to cart"
      className="absolute bottom-3 end-3 z-10 opacity-0 pointer-events-none group-hover/card:opacity-100 group-hover/card:pointer-events-auto bg-white text-black py-2 px-3 rounded-[8px] font-bold text-[10px] tracking-widest shadow-xl hover:bg-[#F0F0FF] active:scale-95 flex items-center gap-2 transition-opacity duration-200"
      @click.stop.prevent="$emit('fast-deploy', product)">
      <Icon name="ph:shopping-cart-simple-fill" class="w-4 h-4" />
      <span class="hidden sm:inline">Deploy</span>
    </VButton>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '../../../../layers/ui/types/v-product-card'
import type { NewArrivalProduct } from '@/types/new-arrivals'

const props = defineProps<{
  product: NewArrivalProduct
  viewMode: 'grid' | 'list'
}>()

defineEmits<{ 'fast-deploy': [product: NewArrivalProduct] }>()

const localePath = useLocalePath()

const slug = computed(() => props.product.slug ?? slugify(props.product.name))

const detailPath = computed(() => localePath(`/shop-all/${slug.value}`))

const vProduct = computed<Product>(() => ({
  id: numericId(props.product.id),
  name: props.product.name,
  price: props.product.price.toLocaleString(),
  category: props.product.category,
  status: 'active',
  stock: 24,
  image: props.product.image,
}))

function numericId(id: string): number {
  const n = Number.parseInt(String(id).replace(/\D/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
}
</script>