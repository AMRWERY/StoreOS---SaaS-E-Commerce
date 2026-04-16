<template>
  <div>
    <footer class="pt-24 pb-12 px-6 border-t border-border-subtle">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-5 gap-12 mb-16">
          <!-- Brand -->
          <div class="md:col-span-1">
            <nuxt-link-locale to="/" class="flex items-center gap-2 font-bold text-lg mb-6">
              <Icon name="material-symbols:storefront" class="text-brand w-5 h-5" />
              StoreOS
            </nuxt-link-locale>
            <p class="text-tx-secondary text-sm leading-relaxed">
              The modern operational layer for high-growth commerce stores.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h4 class="font-bold mb-6 text-sm tracking-widest text-tx-secondary">
              Product
            </h4>
            <ul class="space-y-4 text-tx-secondary text-sm">
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Features</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Dashboard</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Pricing</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Roadmap</nuxt-link-locale>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-6 text-sm tracking-widest text-tx-secondary">
              Integrations
            </h4>
            <ul class="space-y-4 text-tx-secondary text-sm">
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Payments</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Shipping</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Marketing</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Messaging</nuxt-link-locale>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-6 text-sm tracking-widest text-tx-secondary">
              Company
            </h4>
            <ul class="space-y-4 text-tx-secondary text-sm">
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">About Us</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Careers</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Blog</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Privacy</nuxt-link-locale>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-6 text-sm tracking-widest text-tx-secondary">
              Support
            </h4>
            <ul class="space-y-4 text-tx-secondary text-sm">
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Documentation</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Help Center</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Community</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="" class="hover:text-tx-primary transition">Contact</nuxt-link-locale>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-xs text-tx-muted">
            © <span>2026</span> STOREOS OPERATING SYSTEM. ALL RIGHTS RESERVED.
          </p>
          <div class="flex gap-6 text-tx-muted">
            <nuxt-link-locale to="" class="hover:text-tx-primary transition-colors">Twitter</nuxt-link-locale>
            <nuxt-link-locale to="" class="hover:text-tx-primary transition-colors">Instagram</nuxt-link-locale>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>

</script>
