<template>
  <div>
    <footer class="pt-24 pb-12 px-6 border-t border-border-subtle">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-5 gap-12 mb-16">
          <!-- Brand -->
          <div class="md:col-span-1">
            <nuxt-link-locale to="/" class="flex items-center gap-2 font-bold text-lg mb-6">
              <Icon name="ph:storefront-bold" class="text-brand w-5 h-5" />
              StoreOS
            </nuxt-link-locale>
            <p class="text-tx-secondary text-sm leading-relaxed">
              {{ t('layout.footer.description') }}
            </p>
          </div>

          <div>
            <h4 class="font-bold mb-6 text-sm tracking-widest text-tx-secondary">
              {{ t('layout.footer.integrations') }}
            </h4>
            <ul class="space-y-4 text-tx-secondary text-sm">
              <li>
                <nuxt-link-locale to="/integrations" class="hover:text-tx-primary transition">{{
                  t('layout.footer.payments') }}</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="/integrations" class="hover:text-tx-primary transition">{{
                  t('layout.footer.shipping') }}</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="/integrations" class="hover:text-tx-primary transition">{{
                  t('layout.footer.marketing') }}</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="/integrations" class="hover:text-tx-primary transition">{{
                  t('layout.footer.messaging') }}</nuxt-link-locale>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-6 text-sm tracking-widest text-tx-secondary">
              {{ t('layout.footer.company') }}
            </h4>
            <ul class="space-y-4 text-tx-secondary text-sm">
              <li>
                <nuxt-link-locale to="/about" class="hover:text-tx-primary transition">{{ t('layout.footer.aboutUs')
                  }}</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="/careers" class="hover:text-tx-primary transition">{{ t('layout.footer.careers')
                  }}</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="/blog" class="hover:text-tx-primary transition">{{ t('layout.footer.blogs')
                  }}</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="/privacy" class="hover:text-tx-primary transition">{{ t('layout.footer.privacy')
                  }}</nuxt-link-locale>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-6 text-sm tracking-widest text-tx-secondary">
              {{ t('layout.footer.support') }}
            </h4>
            <ul class="space-y-4 text-tx-secondary text-sm">
              <li>
                <nuxt-link-locale to="/docs" class="hover:text-tx-primary transition">{{
                  t('layout.footer.documentation') }}</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="/help-center" class="hover:text-tx-primary transition">{{
                  t('layout.footer.helpCenter') }}</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="/community" class="hover:text-tx-primary transition">{{
                  t('layout.footer.community') }}</nuxt-link-locale>
              </li>
              <li>
                <nuxt-link-locale to="/contact" class="hover:text-tx-primary transition">{{ t('layout.footer.contact')
                  }}</nuxt-link-locale>
              </li>
            </ul>
          </div>
         
          <div>
            <h4 class="font-bold mb-6 text-sm tracking-widest text-tx-secondary">
              {{ t('layout.footer.legal') }}
            </h4>
            <ul class="space-y-4 text-tx-secondary text-sm">
              <li>
                <nuxt-link-locale to="/roadmap" class="hover:text-tx-primary transition">{{ t('layout.footer.roadmap')
                  }}</nuxt-link-locale>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-xs text-tx-muted">
            {{ t('layout.footer.copyright') }}
          </p>
          <div class="flex gap-6 text-tx-muted">
            <a href="https://twitter.com/storeos" target="_blank" rel="noopener noreferrer"
              class="hover:text-tx-primary transition-colors">{{ t('layout.footer.twitter') }}</a>
            <a href="https://instagram.com/storeos" target="_blank" rel="noopener noreferrer"
              class="hover:text-tx-primary transition-colors">{{ t('layout.footer.instagram') }}</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>