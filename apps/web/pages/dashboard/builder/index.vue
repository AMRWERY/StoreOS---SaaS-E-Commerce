<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const localePath = useLocalePath()
await navigateTo(localePath('/dashboard/builder/home'), { replace: true })

useSeoMeta({ title: 'Store Builder', robots: 'noindex, nofollow' })
</script>
