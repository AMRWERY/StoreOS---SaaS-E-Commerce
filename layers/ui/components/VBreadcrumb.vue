<template>
  <div>
    <nav class="flex items-center gap-2 text-[11px] font-black text-tx-muted tracking-[0.3em] mb-4"
      aria-label="Breadcrumb">
      <template v-for="(item, index) in computedItems" :key="`${item.label}-${index}`">
        <nuxt-link-locale v-if="item.to" :to="item.to" :class="[
          'whitespace-nowrap',
          item.active
            ? 'text-brand'
            : 'text-tx-muted hover:text-tx-secondary',
        ]">
          {{ item.label }}
        </nuxt-link-locale>
        <span v-else :class="[
          'whitespace-nowrap',
          item.active
            ? 'text-brand'
            : 'text-tx-muted hover:text-tx-secondary',
        ]">
          {{ item.label }}
        </span>

        <Icon v-if="Number(index) < computedItems.length - 1" name="ph:caret-right-bold"
          class="text-[11px] rtl:rotate-180" />
      </template>
      <slot />
    </nav>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "../types/v-breadcrumb";

const props = withDefaults(
  defineProps<{
    items?: BreadcrumbItem[];
    overrides?: Record<string, string>;
  }>(),
  {
    items: () => [],
    overrides: () => ({}),
  }
);

const router = useRouter();
const route = useRoute();

const computedItems = computed(() => {
  if (props.items && props.items.length > 0) {
    return props.items;
  }

  const routeParts = route.path.split('/').filter(Boolean);
  const locale = ['en', 'ar'].includes(routeParts[0]) ? routeParts[0] : '';
  const prefix = locale ? `/${locale}` : '';

  const parts = [...routeParts];
  if (locale) {
    parts.shift();
  }

  return parts.map((part, index) => {
    let label = part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    if (props.overrides && props.overrides[part]) {
      label = props.overrides[part];
    }

    const toPath = '/' + parts.slice(0, index + 1).join('/');
    const fullCheckPath = prefix + toPath;

    const allRoutes = router.getRoutes();
    const isRoutable = allRoutes.some(r =>
      r.path === fullCheckPath || r.path === toPath
    );

    const isLast = index === parts.length - 1;

    return {
      label,
      to: (!isLast && isRoutable) ? toPath : undefined,
      active: isLast,
    };
  });
});
</script>
