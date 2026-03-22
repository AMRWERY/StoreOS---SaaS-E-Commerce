<template>
  <div>
    <footer class="pt-24 pb-12 px-6 border-t border-white/5">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-5 gap-12 mb-16">
          <!-- Brand -->
          <div class="md:col-span-1">
            <nuxt-link-locale
              to="/"
              class="flex items-center gap-2 font-bold text-lg mb-6"
            >
              <icon
                name="material-symbols:storefront"
                class="text-indigo-500 w-5 h-5"
              />
              StoreOS
            </nuxt-link-locale>
            <p class="text-gray-500 text-sm leading-relaxed">
              The modern operational layer for high-growth commerce stores.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h4
              class="font-bold mb-6 text-sm tracking-widest text-gray-500"
            >
              Product
            </h4>
            <ul class="space-y-4 text-gray-400 text-sm">
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Features</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Dashboard</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Pricing</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Roadmap</nuxt-link-locale
                >
              </li>
            </ul>
          </div>

          <div>
            <h4
              class="font-bold mb-6 text-sm tracking-widest text-gray-500"
            >
              Integrations
            </h4>
            <ul class="space-y-4 text-gray-400 text-sm">
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Payments</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Shipping</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Marketing</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Messaging</nuxt-link-locale
                >
              </li>
            </ul>
          </div>

          <div>
            <h4
              class="font-bold mb-6 text-sm tracking-widest text-gray-500"
            >
              Company
            </h4>
            <ul class="space-y-4 text-gray-400 text-sm">
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >About Us</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Careers</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Blog</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Privacy</nuxt-link-locale
                >
              </li>
            </ul>
          </div>

          <div>
            <h4
              class="font-bold mb-6 text-sm tracking-widest text-gray-500"
            >
              Support
            </h4>
            <ul class="space-y-4 text-gray-400 text-sm">
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Documentation</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Help Center</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Community</nuxt-link-locale
                >
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-white transition"
                  >Contact</nuxt-link-locale
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div
          class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p class="text-xs text-gray-600">
            © 2026 STOREOS OPERATING SYSTEM. ALL RIGHTS RESERVED.
          </p>
          <div class="flex gap-6 text-gray-600">
            <nuxt-link-locale to="" class="hover:text-white transition-colors"
              >Twitter</nuxt-link-locale
            >
            <nuxt-link-locale to="" class="hover:text-white transition-colors"
              >Instagram</nuxt-link-locale
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>

</script>