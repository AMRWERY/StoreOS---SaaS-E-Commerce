<template>
  <div class="bg-bg-base min-h-screen text-tx-primary pb-32">
    <!-- Header -->
    <header class="pt-32 pb-20 px-6 border-b border-border-subtle bg-bg-primary/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
      <div class="max-w-5xl mx-auto relative z-10">
        <p class="text-[10px] font-black tracking-[0.4em] text-brand mb-6 uppercase">Community</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">Built with<br />merchants, for merchants.</h1>
        <p class="text-tx-secondary text-lg max-w-2xl leading-relaxed">
          Join thousands of store owners sharing strategies, troubleshooting issues, and shaping the future of StoreOS together.
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <LazyVButton to="https://discord.gg/storeos" label="Join Discord" icon="ph:discord-logo-bold" icon-position="left" variant="none" className="inline-flex items-center gap-2 bg-[#5865F2] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg" />
          <LazyVButton to="https://github.com/storeos" label="GitHub Discussions" icon="ph:github-logo-bold" icon-position="left" variant="secondary" className="px-6 py-3 rounded-xl" />
        </div>
      </div>
    </header>

    <!-- Stats -->
    <section class="py-16 px-6 border-b border-border-subtle bg-bg-primary/30">
      <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <LazyVStatCard v-for="stat in stats" :key="stat.label" :label="stat.label" :value="stat.value" :icon-name="stat.icon" />
      </div>
    </section>

    <!-- Channels -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Where to find us</p>
        <h2 class="text-2xl font-bold mb-12">Community channels</h2>
        <div class="grid sm:grid-cols-2 gap-6">
          <div v-for="channel in channels" :key="channel.title"
            class="bg-bg-primary border border-border-subtle rounded-2xl p-6 hover:border-brand/30 transition-all group">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                :style="`background-color: ${channel.color}20`">
                <Icon :name="channel.icon" class="text-xl" :style="`color: ${channel.color}`" />
              </div>
              <div>
                <p class="font-bold mb-1">{{ channel.title }}</p>
                <p class="text-xs text-tx-muted leading-relaxed">{{ channel.description }}</p>
              </div>
            </div>
            <a :href="channel.href" target="_blank" rel="noopener noreferrer"
              class="text-xs font-bold text-brand hover:underline flex items-center gap-1">
              {{ channel.cta }}
              <Icon name="ph:arrow-up-right-bold" class="text-xs" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent discussions -->
    <section class="py-24 px-6 border-b border-border-subtle">
      <div class="max-w-5xl mx-auto">
        <p class="text-[10px] font-black tracking-[0.4em] text-tx-muted mb-4 uppercase">Trending</p>
        <h2 class="text-2xl font-bold mb-10">Recent discussions</h2>
        <div class="space-y-3">
          <div v-for="thread in threads" :key="thread.title"
            class="bg-bg-primary border border-border-subtle rounded-2xl px-6 py-4 flex items-center justify-between gap-4 hover:border-brand/30 transition-all cursor-pointer">
            <div class="flex items-center gap-4 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 text-sm font-black text-brand">
                {{ thread.author[0] }}
              </div>
              <div class="min-w-0">
                <p class="font-semibold text-sm truncate">{{ thread.title }}</p>
                <p class="text-xs text-tx-muted">{{ thread.author }} · {{ thread.time }}</p>
              </div>
            </div>
            <div class="flex items-center gap-4 shrink-0 text-xs text-tx-muted">
              <span class="flex items-center gap-1"><Icon name="ph:chat-circle-bold" />{{ thread.replies }}</span>
              <span class="flex items-center gap-1"><Icon name="ph:heart-bold" />{{ thread.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to join the conversation?</h2>
        <p class="text-tx-secondary mb-8">3,200+ merchants are already there. Come say hi.</p>
        <LazyVButton to="https://discord.gg/storeos" label="Join the community" icon="ph:arrow-right-bold" className="px-8 py-4 rounded-xl shadow-lg shadow-brand/20" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({ title: 'Community — StoreOS', description: 'Join the StoreOS merchant community on Discord and GitHub.' })

const stats = [
  { value: '3.2K+', label: 'Discord members', icon: 'ph:discord-logo-bold' },
  { value: '480+', label: 'GitHub stars', icon: 'ph:star-bold' },
  { value: '1.1K', label: 'Discussions', icon: 'ph:chats-bold' },
  { value: '98%', label: 'Questions answered', icon: 'ph:check-circle-bold' },
]

const channels = [
  { icon: 'ph:discord-logo-bold', color: '#5865F2', title: 'Discord', description: 'Real-time chat with other merchants and the StoreOS team. Get answers fast.', cta: 'Join Discord server', href: 'https://discord.gg/storeos' },
  { icon: 'ph:github-logo-bold', color: '#c9d1d9', title: 'GitHub', description: 'Report bugs, request features, and follow the product roadmap.', cta: 'Open GitHub', href: 'https://github.com/storeos' },
  { icon: 'ph:twitter-logo-bold', color: '#1DA1F2', title: 'Twitter / X', description: 'Product updates, tips, and community highlights — follow @storeos.', cta: 'Follow @storeos', href: 'https://twitter.com/storeos' },
  { icon: 'ph:youtube-logo-bold', color: '#FF0000', title: 'YouTube', description: 'Tutorial videos, feature walkthroughs, and merchant spotlights.', cta: 'Subscribe on YouTube', href: 'https://youtube.com/@storeos' },
]

const threads = [
  { title: 'Best practices for managing inventory across multiple warehouses?', author: 'Kareem H.', time: '2h ago', replies: 14, likes: 32 },
  { title: 'How do you handle abandoned carts before the feature ships?', author: 'Nour A.', time: '5h ago', replies: 9, likes: 21 },
  { title: 'Paymob vs Stripe for Egypt-based stores — real comparison', author: 'Omar F.', time: '1d ago', replies: 27, likes: 58 },
  { title: 'Feature request: bulk product import with variant mapping', author: 'Lina M.', time: '2d ago', replies: 6, likes: 44 },
  { title: 'Store Builder v2 early access — sharing my first impression', author: 'Tarek S.', time: '3d ago', replies: 18, likes: 73 },
]
</script>
