<template>
  <div class="min-h-screen bg-bg-base text-tx-primary selection:bg-brand/30">
    <div class="max-w-[1400px] mx-auto px-4 md:px-10 py-8">
      <div class="flex gap-6 items-start">
        <!-- Sidebar Nav -->
        <checkout-nav :steps="steps" @step-click="setActiveStep" />

        <!-- Step Content -->
        <div class="flex-1 min-w-0">
          <!-- Cart -->
          <template v-if="activeStep === 'cart'">
            <div class="flex flex-col md:flex-row gap-6 items-start">
              <checkout-cart-items
                class="flex-1 min-w-0"
                :items="cartItems"
                @update-qty="updateQty"
                @remove-item="removeItem"
              />
              <checkout-order-summary
                class="w-full md:w-80 shrink-0"
                :subtotal="subtotal"
                :total="total"
                @proceed="onProceed"
              />
            </div>
          </template>

          <!-- Shipping & Payment -->
          <template v-else-if="activeStep === 'shipping'">
            <checkout-shipping @proceed="onSubmitOrder" />
          </template>

          <!-- Order Tracking -->
          <template v-else-if="activeStep === 'order-tracking'">
            <checkout-order-tracking />
          </template>
        </div>
      </div>

      <!-- Footer -->
      <footer
        class="mt-16 pt-8 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black tracking-[0.3em] text-[#262640]"
      >
        <p>{{ t("storefront.checkout.node") }}</p>
        <div class="flex gap-8">
          <nuxt-link-locale
            to="/privacy"
            class="hover:text-brand transition-colors"
            >{{ t("storefront.checkout.privacy") }}</nuxt-link-locale
          >
          <nuxt-link-locale
            to="/terms"
            class="hover:text-brand transition-colors"
            >{{ t("storefront.checkout.terms") }}</nuxt-link-locale
          >
          <nuxt-link-locale to="" class="hover:text-brand transition-colors">{{
            t("storefront.checkout.security")
          }}</nuxt-link-locale>
        </div>
      </footer>
    </div>

    <!-- Order Confirmation overlay (3s) -->
    <order-confirmation v-if="showConfirmation" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const cartStore = useCartStore();
const { cartItems, subtotal, total } = storeToRefs(cartStore);
const { updateQuantity: updateQty, removeItem } = cartStore;

const checkoutStore = useCheckoutStore();
const { steps, showConfirmation, activeStep } = storeToRefs(checkoutStore);
const { setActiveStep, onProceed, onSubmitOrder } = checkoutStore;

useSeoMeta({
  title: "Checkout",
  robots: "noindex, nofollow",
  description: "Checkout page",
});
</script>