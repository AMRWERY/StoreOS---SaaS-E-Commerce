<template>
  <div>
    <div
      class="min-h-screen bg-bg-base text-tx-primary selection:bg-brand/30 p-6 lg:p-12"
    >
      <!-- --- BREADCRUMBS --- -->
      <VBreadcrumb :items="breadcrumbItems" class="mb-10" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
        <!-- ==========================================
           LEFT: IMAGE GALLERY
           ========================================== -->
        <div class="lg:col-span-6 space-y-6">
          <div
            class="relative w-full lg:max-w-[540px] mx-auto pt-[92%] rounded-[16px] bg-bg-primary border border-border-subtle overflow-hidden group"
          >
            <img
              :src="productImages[activeImage]"
              class="absolute inset-0 w-full h-full object-cover transition-all duration-700 grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105"
            />
            <span
              class="absolute top-6 start-6 bg-[#F97316] rounded-full px-4 py-1 text-[10px] font-black text-white tracking-widest shadow-lg shadow-orange-950/20"
              >HOT</span
            >
          </div>

          <div class="flex gap-4">
            <div
              v-for="(img, idx) in productImages"
              :key="idx"
              @click="activeImage = idx"
              class="flex-1 relative pt-[20%] sm:pt-[15%] lg:pt-[22%] rounded-[12px] bg-bg-primary border cursor-pointer overflow-hidden transition-all duration-300"
              :class="[
                activeImage === idx
                  ? 'border-brand ring-2 ring-brand/20'
                  : 'border-border-subtle hover:border-border-default',
              ]"
            >
              <img
                :src="img"
                class="absolute inset-0 w-full h-full object-cover"
                :class="{ 'opacity-50': activeImage !== idx }"
              />
            </div>
          </div>
        </div>

        <!-- ==========================================
           RIGHT: PRODUCT INFO
           ========================================== -->
        <div class="lg:col-span-6 space-y-10">
          <div>
            <span class="text-[11px] font-black tracking-[0.4em] text-brand"
              >Premium Accessories</span
            >
            <h1 class="mt-2 text-tx-mutedxl font-bold tracking-tight">
              Essential Timepiece
            </h1>

            <div class="mt-6 flex items-baseline gap-4">
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-bold text-white tracking-tighter"
                  >$3,200</span
                >
              </div>
              <span class="text-[16px] text-tx-muted line-through">$3,700</span>
              <div
                class="bg-[#10B981]/10 border border-[#10B981]/20 px-2 py-0.5 rounded text-[10px] font-black text-[#10B981] tracking-widest"
              >
                Save $ 500 [14%]
              </div>
            </div>
          </div>

          <p class="text-[15px] leading-relaxed text-tx-secondary font-normal">
            A meticulously crafted timepiece designed for the modern
            professional. Featuring a brushed stainless steel case and genuine
            leather strap.
          </p>

          <!-- Color Select -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <h4 class="text-[11px] font-black tracking-[0.2em] text-tx-muted">
                {{ t("storefront.product.color") }}:
                <span class="text-tx-primary">{{ selectedColor }}</span>
              </h4>
            </div>
            <div class="flex gap-3">
              <div
                v-for="color in colors"
                :key="color.name"
                @click="selectedColor = color.name"
                class="w-8 h-8 rounded-full cursor-pointer p-0.5 border-border-default transition-all"
                :class="[
                  selectedColor === color.name
                    ? 'border-brand'
                    : 'border-transparent',
                ]"
              >
                <div
                  :class="[
                    color.hex,
                    'w-full h-full rounded-full border border-black/20',
                  ]"
                ></div>
              </div>
            </div>
          </div>

          <!-- Size Select -->
          <div class="space-y-4">
            <h4 class="text-[11px] font-black tracking-[0.2em] text-tx-muted">
              {{ t("storefront.product.size") }}
            </h4>
            <div class="flex gap-2">
              <button
                v-for="size in ['38mm', '42mm']"
                :key="size"
                @click="selectedSize = size"
                class="px-6 py-2 rounded-[8px] border text-[12px] font-bold transition-all"
                :class="[
                  selectedSize === size
                    ? 'bg-brand border-brand text-white'
                    : 'bg-bg-primary border-border-subtle text-tx-secondary hover:border-tx-secondary',
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4">
            <div
              class="h-[52px] bg-bg-primary border border-border-subtle rounded-[10px] flex items-center p-1"
            >
              <button
                @click="decrement"
                class="w-10 h-full flex items-center justify-center text-tx-muted hover:text-tx-primary transition-colors"
              >
                <Icon name="ph:minus-bold" class="w-4 h-4" />
              </button>
              <span class="w-10 text-center font-bold">{{ quantity }}</span>
              <button
                @click="increment"
                class="w-10 h-full flex items-center justify-center text-tx-muted hover:text-tx-primary transition-colors"
              >
                <Icon name="ph:plus-bold" class="w-4 h-4" />
              </button>
            </div>
            <VButton
              variant="none"
              className="flex-1 bg-brand hover:bg-brand-hover text-white rounded-[10px] font-bold text-[14px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
            >
              <Icon name="solar:cart-large-minimalistic-bold" class="w-5 h-5" />
              {{ t("storefront.product.addToCart") }}
            </VButton>
            <VButton
              to="/checkout"
              variant="none"
              className="flex-1 flex items-center justify-center border border-border-subtle hover:bg-white/5 text-tx-primary rounded-[10px] font-bold text-[14px] tracking-[0.2em] transition-all"
            >
              {{ t("storefront.product.buyNow") }}
            </VButton>
          </div>

          <div class="flex items-center gap-2 pt-4">
            <div
              class="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            ></div>
            <span
              class="text-[11px] font-bold text-[#10B981] tracking-widest"
              >{{ t("storefront.product.inStock") }}</span
            >
          </div>

          <!-- Accordion -->
          <VAccordion
            :items="productSections"
            class="pt-6 border-t border-border-subtle"
          >
            <template #content="{ item }">
              <p class="text-[13px] text-tx-secondary leading-relaxed">
                {{ item.content }}
              </p>
            </template>
          </VAccordion>
        </div>
      </div>

      <!-- ==========================================
         BOTTOM: RELATED PRODUCTS
         ========================================== -->
      <section class="mt-32 border-t border-border-subtle pt-20">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="text-brandxl font-bold tracking-tight">
              {{ t("storefront.product.relatedProducts") }}
            </h2>
            <p class="text-[13px] text-tx-muted mt-2">
              {{ t("storefront.product.relatedDesc") }}
            </p>
          </div>
          <nuxt-link-locale
            to="/shop-all"
            class="text-[11px] font-bold text-brand hover:text-brand-hover transition-colors tracking-widest flex items-center gap-2"
          >
            {{ t("common.viewAll") }}
            <Icon name="solar:arrow-right-linear" class="w-4 h-4" />
          </nuxt-link-locale>
        </div>

        <related-products />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { t } = useI18n();

const slugParam = computed(() => String(route.params.slug ?? ""));

const titleFromSlug = (slug: string) => {
  if (!slug) return "Product";
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const product = computed(() => ({
  name: titleFromSlug(slugParam.value),
  description:
    "A meticulously crafted timepiece designed for the modern professional. Featuring a brushed stainless steel case and genuine leather strap.",
  price: 3200,
  image: "/img/product-07.avif",
}));

const breadcrumbItems = computed(() => [
  { label: t("common.home"), to: "/" },
  { label: t("storefront.nav.shopAll"), to: "/shop-all" },
  { label: product.value.name, active: true },
]);

const selectedColor = ref("Silver");
const selectedSize = ref("42mm");
const quantity = ref(1);
const activeImage = ref(0);

const productImages = [
  "/img/product-01.avif",
  "/img/product-02.avif",
  "/img/product-03.avif",
  "/img/product-04.avif",
];

const colors = [
  { name: "Silver", hex: "bg-[#E5E7EB]" },
  { name: "Black", hex: "bg-[#1F2937]" },
  { name: "Lavender", hex: "bg-[#A78BFA]" },
];

// --- Data ---
const productSections = computed(() => [
  {
    id: "description",
    title: t("storefront.product.description"),
    content: t("storefront.product.descriptionContent"),
  },
  {
    id: "specifications",
    title: t("storefront.product.specifications"),
    content: t("storefront.product.specificationsContent"),
  },
  {
    id: "shipping",
    title: t("storefront.product.shippingReturns"),
    content: t("storefront.product.shippingContent"),
  },
]);

// --- Utilities ---
const increment = () => quantity.value++;
const decrement = () => quantity.value > 1 && quantity.value--;

useSeoMeta({
  title: () => product.value.name,
  description: () =>
    `${product.value.description} Price: $${product.value.price}. Fast shipping.`,
  ogTitle: () => `${product.value.name} | StoreOS Store`,
  ogDescription: () => product.value.description,
  ogType: "website",
  ogImage: () => product.value.image,
  twitterCard: "summary_large_image",
  twitterTitle: () => product.value.name,
  twitterDescription: () => product.value.description,
  twitterImage: () => product.value.image,
});
</script>