<template>
  <div class="min-h-0 min-w-0 flex-1 overflow-y-auto p-4">
    <p class="text-[10px] font-black tracking-[0.2em] text-tx-muted">
      Quick theme
    </p>
    <p class="mt-2 text-[11px] leading-relaxed text-tx-secondary">
      Full controls are in the right panel while this tab is active.
    </p>
    <div
      class="mt-5 space-y-4 rounded-lg border border-border-subtle bg-bg-elevated/30 p-4"
    >
      <lazy-setting-toggle
        v-model="announcement"
        label="Announcement bar"
        hint="Shown above the navbar"
      />

      <template v-if="announcement">
        <div class="mt-2">
          <lazy-setting-text
            v-model="announcementText"
            label="Bar text"
            placeholder="Free shipping this week"
          />
        </div>
        <div class="mt-3 grid grid-cols-2 gap-3">
          <lazy-setting-color v-model="announcementBg" label="Background" />
          <lazy-setting-color v-model="announcementColor" label="Text" />
        </div>
      </template>
    </div>

    <LazyVButton
      variant="none"
      type="button"
      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-brand/35 py-3 text-[10px] font-black tracking-wider text-brand hover:bg-brand/15"
      @click="planGateOpen = true"
    >
      <Icon name="ph:crown-simple-bold" />
      Compare plans
    </LazyVButton>
  </div>
</template>

<script lang="ts" setup>
const store = useBuilderStore();
const { planGateOpen } = useBuilderModals();

const announcement = computed({
  get: () => store.announcement.enabled,
  set: (v: boolean) => store.setAnnouncement({ enabled: v }),
});
const announcementText = computed({
  get: () => store.announcement.text,
  set: (v: string) => store.setAnnouncement({ text: v }),
});
const announcementBg = computed({
  get: () => store.announcement.bg,
  set: (v: string) => store.setAnnouncement({ bg: v }),
});
const announcementColor = computed({
  get: () => store.announcement.color,
  set: (v: string) => store.setAnnouncement({ color: v }),
});
</script>
