<template>
  <div
    class="min-h-screen bg-bg-base text-tx-primary selection:bg-brand/30 py-8 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
    <div v-if="!article" class="py-20 text-center space-y-6">
      <p class="text-tx-secondary">{{ t("storefront.editorial.notFound") }}</p>
      <nuxt-link-locale to="/editorial"
        class="inline-flex text-brand font-bold text-sm tracking-widest hover:underline">
        {{ t("storefront.editorial.backToEditorial") }}
      </nuxt-link-locale>
    </div>

    <article v-else class="space-y-10">
      <LazyVBreadcrumb :items="breadcrumbItems" />

      <header class="space-y-6 border-b border-border-subtle pb-10">
        <div class="flex flex-wrap items-center gap-4">
          <span
            class="bg-brand/10 text-brand border border-brand/20 px-3 py-1 rounded-[6px] text-[10px] font-black tracking-widest">
            {{ article.category }}
          </span>
          <span class="text-[10px] font-bold text-tx-muted tracking-tighter">
            Ref: {{ article.id }}
          </span>
        </div>
        <h1 class="text-brandxl md:text-4xl lg:text-tx-mutedxl font-bold tracking-tight leading-tight">
          {{ article.title }}
        </h1>
        <div class="flex flex-wrap gap-8 text-[11px] font-bold text-tx-muted tracking-widest">
          <span class="flex items-center gap-2">
            <Icon name="ph:user-circle-fill" class="w-4 h-4 text-brand" />
            {{ article.author }}
          </span>
          <span class="normal-case tracking-tight">{{ article.date }}</span>
          <span class="flex items-center gap-2 normal-case tracking-tight">
            <Icon name="ph:clock" class="w-4 h-4" />
            {{ article.readTime }}
          </span>
        </div>
      </header>

      <div
        class="relative aspect-[21/9] max-h-[420px] rounded-[20px] overflow-hidden bg-black border border-border-subtle">
        <img :src="article.image" class="w-full h-full object-cover" :alt="article.title" />
      </div>

      <div class="max-w-3xl space-y-6">
        <p class="text-[18px] text-tx-secondary leading-relaxed">
          {{ article.excerpt }}
        </p>
        <p class="text-[15px] text-tx-muted leading-relaxed">
          {{ t("storefront.editorial.fullArticle") }}
        </p>
      </div>

      <nuxt-link-locale to="/editorial"
        class="inline-flex items-center gap-2 text-[11px] font-bold text-brand tracking-widest hover:text-brand-hover transition-colors">
        <Icon name="ph:arrow-left" class="w-4 h-4" />
        {{ t("storefront.editorial.allEntries") }}
      </nuxt-link-locale>
    </article>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "../../../../layers/ui/types/v-breadcrumb";
import { getEditorialArticleById } from "../../data/editorial-articles";

const route = useRoute();

const articleId = computed(() => String(route.params.id ?? ""));

const article = computed(() => getEditorialArticleById(articleId.value));

const { t } = useI18n();

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  { label: t("common.home"), to: "/" },
  { label: t("storefront.nav.editorial"), to: "/editorial" },
  {
    label: article.value?.title ?? t("storefront.editorial.entry"),
    active: true,
  },
]);

const seoTitle = computed(() =>
  article.value ? `${article.value.title} | Editorial` : "Editorial | StoreOS"
);
const seoDescription = computed(
  () => article.value?.excerpt ?? "Editorial journal."
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: "article",
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
});
</script>
