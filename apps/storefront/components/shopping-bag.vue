<template>
  <div>
    <!-- Trigger Button -->
    <button @click="isInternalOpen = true"
      class="relative text-tx-secondary hover:text-tx-primary p-2 transition-colors">
      <Icon name="ph:shopping-bag-bold" class="text-xl" />
      <span
        class="absolute -top-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-white shadow-sm shadow-brand/20">
        {{ totalItems }}
      </span>
    </button>

    <Teleport to="body">
      <!-- Backdrop -->
      <Transition name="fade">
        <div v-if="isInternalOpen" class="fixed inset-0 bg-bg-overlay/40 backdrop-blur-sm z-[100]"
          @click="isInternalOpen = false"></div>
      </Transition>

      <!-- Slide-over Drawer -->
      <Transition name="slide">
        <aside v-if="isInternalOpen"
          class="fixed end-0 top-0 h-full w-full max-w-[400px] bg-bg-base border-s border-border-subtle shadow-2xl flex flex-col z-[101]">
          <!-- Header -->
          <div class="px-6 py-6 border-b border-border-subtle bg-bg-primary">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-[10px] font-black text-tx-muted tracking-[0.2em] mb-1">
                  Your Selection
                </h3>
                <h2 class="text-2xl font-bold text-tx-primary tracking-tight">Shopping Bag</h2>
              </div>
              <button @click="isInternalOpen = false" class="text-tx-muted hover:text-tx-primary transition-colors p-2">
                <Icon name="ph:x-bold" class="text-xl" />
              </button>
            </div>
          </div>

          <!-- Cart Items List -->
          <div class="flex-1 overflow-y-auto hide-scrollbar bg-bg-primary p-6 space-y-6">
            <div v-if="cartItems.length > 0" class="space-y-6">
              <div v-for="item in cartItems" :key="item.id" class="flex gap-4 group">
                <!-- Product Image -->
                <div
                  class="w-24 h-24 rounded-xl overflow-hidden bg-bg-elevated border border-border-subtle shrink-0 shadow-sm transition-all group-hover:border-brand/40 group-hover:shadow-md">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </div>

                <!-- Product Details -->
                <div class="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div class="flex justify-between items-start gap-2">
                      <h4
                        class="text-sm font-bold text-tx-primary leading-tight group-hover:text-brand transition-colors">
                        {{ item.name }}
                      </h4>
                      <button @click="removeItem(item.id)" class="text-tx-muted hover:text-red-500 transition-colors">
                        <Icon name="ph:trash-bold" class="text-sm" />
                      </button>
                    </div>
                    <p class="text-[10px] text-tx-muted tracking-tighter mt-1">{{ item.category }}</p>
                  </div>

                  <div class="flex items-center justify-between mt-4">
                    <!-- Price -->
                    <span class="text-sm font-bold text-tx-primary">${{ item.price.toLocaleString()
                      }}</span>

                    <!-- Quantity Stepper -->
                    <div
                      class="flex items-center bg-bg-elevated rounded-lg border border-border-subtle overflow-hidden">
                      <button @click="updateQuantity(item.id, -1)"
                        class="px-2.5 py-1 text-tx-muted hover:text-tx-primary hover:bg-bg-base/50 transition-colors">
                        <Icon name="ph:minus-bold" class="text-[10px]" />
                      </button>
                      <span class="px-2 text-xs font-bold text-tx-primary min-w-[20px] text-center">{{ item.quantity
                        }}</span>
                      <button @click="updateQuantity(item.id, 1)"
                        class="px-2.5 py-1 text-tx-muted hover:text-tx-primary hover:bg-bg-base/50 transition-colors">
                        <Icon name="ph:plus-bold" class="text-[10px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="h-full flex flex-col items-center justify-center text-center">
              <div
                class="w-20 h-20 rounded-full bg-bg-elevated flex items-center justify-center mb-6 border border-border-subtle">
                <Icon name="ph:shopping-bag-open-bold" class="text-3xl text-tx-muted opacity-40" />
              </div>
              <h4 class="text-xl font-bold text-tx-secondary tracking-tight">Your bag is empty</h4>
              <p class="text-sm text-tx-muted mt-2 max-w-[240px] leading-relaxed">Discover our latest arrivals and find
                something special for your collection.</p>
              <VButton @click="isInternalOpen = false" variant="primary"
                className="mt-8 px-8 py-3 rounded-xl font-black">
                Start Shopping
              </VButton>
            </div>
          </div>

          <!-- Footer Summary -->
          <div v-if="cartItems.length > 0" class="p-6 border-t border-border-subtle bg-bg-base">
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-xs text-tx-muted">
                <span>Subtotal</span>
                <span>${{ subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-xs text-tx-muted">
                <span>Shipping</span>
                <span class="text-emerald-500 font-bold tracking-widest text-[9px]">Calculated at
                  checkout</span>
              </div>
              <div class="pt-3 border-t border-border-subtle/50 flex justify-between items-end">
                <span class="text-sm font-bold text-tx-primary">Total Amount</span>
                <span class="text-xl font-black text-brand">${{ subtotal.toLocaleString() }}</span>
              </div>
            </div>

            <VButton variant="none" @click="isInternalOpen = false; navigateTo(localePath('/checkout'))"
              className="w-full bg-brand hover:bg-brand-hover text-white py-4 rounded-xl font-black tracking-widest text-[11px] shadow-lg shadow-brand/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
              PROCEED TO SECURE CHECKOUT
              <Icon name="ph:arrow-right-bold" />
            </VButton>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'

const isInternalOpen = ref(false)

const cartStore = useCartStore()
const { cartItems, totalItems, subtotal } = storeToRefs(cartStore)
const { updateQuantity, removeItem } = cartStore

const localePath = useLocalePath()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

[dir="rtl"] .slide-enter-from,
[dir="rtl"] .slide-leave-to {
  transform: translateX(-100%);
}
</style>