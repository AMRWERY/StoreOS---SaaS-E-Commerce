<template>
  <aside
    class="w-full max-w-full rounded-xl border border-border-subtle bg-bg-primary shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
    aria-label="Site settings"
  >
    <div class="flex items-start justify-between gap-3 border-b border-border-subtle px-5 py-4">
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <Icon name="ph:gear-six-bold" class="text-brand" />
          <h2 class="text-sm font-bold tracking-wide text-tx-primary">Site settings</h2>
        </div>
        <p class="mt-1 text-[10px] font-bold tracking-[0.2em] text-tx-muted">
          Brand, contact, tracking &amp; backup
        </p>
      </div>
      <button
        type="button"
        class="hidden size-9 shrink-0 items-center justify-center rounded-lg border border-border-subtle text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary xl:inline-flex"
        title="Collapse panel"
        @click="$emit('collapse')"
      >
        <Icon name="ph:caret-double-right-bold" class="text-lg rtl:rotate-180" />
      </button>
    </div>

    <div class="max-h-[min(60vh,520px)] space-y-6 overflow-y-auto px-5 py-5 xl:max-h-[calc(100vh-14rem)]">
      <lazy-setting-group title="Brand" default-open>
        <div class="space-y-4">
          <image-upload-field
            v-model="logoUrl"
            label="Logo"
            hint="Replaces the store name in the navbar and footer."
          />
          <image-upload-field
            v-model="faviconUrl"
            label="Favicon"
            hint="Small square icon shown in the browser tab."
          />
        </div>
      </lazy-setting-group>

      <lazy-setting-group title="Contact details">
        <div class="space-y-4">
          <lazy-setting-text v-model="email" label="Email" placeholder="hello@mystore.com" />
          <lazy-setting-text v-model="phone" label="Phone" placeholder="+20 100 000 0000" />
          <lazy-setting-textarea v-model="address" label="Address" :rows="2" />
        </div>
      </lazy-setting-group>

      <lazy-setting-group title="Social links">
        <div class="space-y-4">
          <lazy-setting-text v-model="instagram" label="Instagram" placeholder="https://instagram.com/…" />
          <lazy-setting-text v-model="facebook" label="Facebook" placeholder="https://facebook.com/…" />
          <lazy-setting-text v-model="xHandle" label="X (Twitter)" placeholder="https://x.com/…" />
          <lazy-setting-text v-model="tiktok" label="TikTok" placeholder="https://tiktok.com/@…" />
          <lazy-setting-text v-model="youtube" label="YouTube" placeholder="https://youtube.com/@…" />
          <lazy-setting-text v-model="whatsapp" label="WhatsApp link" placeholder="https://wa.me/…" />
          <p class="text-[10px] leading-snug text-tx-muted">
            Only the links you fill in appear as icons in the footer.
          </p>
        </div>
      </lazy-setting-group>

      <lazy-setting-group title="Tracking">
        <div class="space-y-4">
          <lazy-setting-text v-model="gaId" label="Google Analytics ID" placeholder="G-XXXXXXXXXX" />
          <lazy-setting-text v-model="pixelId" label="Meta Pixel ID" placeholder="1234567890" />
          <lazy-setting-textarea
            v-model="headScripts"
            label="Custom JavaScript (advanced)"
            placeholder="// runs on every page of your published store"
            :rows="4"
          />
          <lazy-setting-toggle
            v-model="cookieBanner"
            label="Ask for cookie consent first"
            hint="Analytics and custom scripts only load after the visitor accepts."
          />
          <p class="text-[10px] leading-snug text-tx-muted">
            Loaded on the published store (try “Preview store”). Only add code you trust — it runs with full access to your site.
          </p>
        </div>
      </lazy-setting-group>

      <lazy-setting-group title="Custom CSS">
        <lazy-setting-textarea
          v-model="customCss"
          label="CSS applied to the whole site"
          placeholder=".my-class { color: red; }"
          :rows="6"
        />
        <p class="mt-1.5 text-[10px] leading-snug text-tx-muted">
          Only affects your storefront, never the builder. Target blocks with the CSS class you set in each block's Advanced settings.
        </p>
      </lazy-setting-group>

      <lazy-setting-group title="Maintenance mode">
        <lazy-setting-toggle
          v-model="maintenance"
          label="Show a “coming soon” page"
          hint="Visitors see the message below instead of your store."
        />
        <div class="mt-4">
          <lazy-setting-textarea v-model="maintenanceMessageLocal" label="Message" :rows="2" />
        </div>
      </lazy-setting-group>

      <lazy-setting-group title="Media & history">
        <div class="space-y-2.5">
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2.5 text-[11px] font-bold text-tx-primary transition-colors hover:border-brand/40 hover:text-brand"
            @click="openMedia"
          >
            <Icon name="ph:images-bold" /> Media library ({{ mediaCount }})
          </button>
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2.5 text-[11px] font-bold text-tx-primary transition-colors hover:border-brand/40 hover:text-brand"
            @click="versionsOpen = true"
          >
            <Icon name="ph:clock-counter-clockwise-bold" /> Version history ({{ versionCount }})
          </button>
          <p class="text-[10px] leading-snug text-tx-muted">
            Your work is saved automatically in this browser. Publish to also keep a restorable version.
          </p>
        </div>
      </lazy-setting-group>

      <lazy-setting-group title="Backup">
        <div class="space-y-2.5">
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2.5 text-[11px] font-bold text-tx-primary transition-colors hover:border-brand/40 hover:text-brand"
            @click="exportDesign"
          >
            <Icon name="ph:download-simple-bold" /> Export design (.json)
          </button>
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2.5 text-[11px] font-bold text-tx-primary transition-colors hover:border-brand/40 hover:text-brand"
            @click="importer?.click()"
          >
            <Icon name="ph:upload-simple-bold" /> Import design
          </button>
          <p v-if="importMsg" class="text-[11px]" :class="importOk ? 'text-green-400' : 'text-red-400'">
            {{ importMsg }}
          </p>
          <p class="text-[10px] leading-snug text-tx-muted">
            Importing replaces all pages, theme and settings. You cannot undo it, so export first.
          </p>
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[11px] font-bold transition-colors"
            :class="confirmReset ? 'border-red-400 bg-red-500/10 text-red-400' : 'border-border-subtle bg-bg-elevated text-tx-secondary hover:border-red-400/40 hover:text-red-400'"
            @click="onStartOver"
          >
            <Icon name="ph:arrow-counter-clockwise-bold" />
            {{ confirmReset ? "Click again to erase and start over" : "Start over from the starter store" }}
          </button>
          <input ref="importer" type="file" accept="application/json,.json" class="hidden" @change="onImport" />
        </div>
      </lazy-setting-group>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { SiteSettings } from "@/data/site-theme";

defineEmits<{ collapse: [] }>();

const store = useBuilderStore();

/** Two-way bind a top-level site setting to the store. */
const field = <K extends keyof SiteSettings>(key: K) =>
  computed<SiteSettings[K]>({
    get: () => store.siteSettings[key],
    set: (v) => store.setSiteSettings({ [key]: v } as Partial<SiteSettings>),
  });

/** Two-way bind one social link to the store. */
const social = (key: keyof SiteSettings["social"]) =>
  computed<string>({
    get: () => store.siteSettings.social[key],
    set: (v) => store.setSocial(key, v),
  });

const logoUrl = field("logoUrl");
const faviconUrl = field("faviconUrl");
const email = field("email");
const phone = field("phone");
const address = field("address");
const gaId = field("gaId");
const pixelId = field("pixelId");
const customCss = field("customCss");
const maintenance = field("maintenance");
const headScripts = field("headScripts");
const cookieBanner = field("cookieBanner");
const maintenanceMessageLocal = computed({
  get: () => store.localMaintenanceMessage,
  set: (v: string) => store.setMaintenanceMessage(v),
});

const { browse: openMedia } = useMediaLibrary();
const { versionsOpen } = useBuilderModals();
const confirmReset = ref(false);
const mediaCount = computed(() => store.media.length);
const versionCount = computed(() => store.versions.length);
const onStartOver = () => {
  if (confirmReset.value) void store.resetDesign();
  else confirmReset.value = true;
};

const instagram = social("instagram");
const facebook = social("facebook");
const xHandle = social("x");
const tiktok = social("tiktok");
const youtube = social("youtube");
const whatsapp = social("whatsapp");

const exportDesign = () => store.exportDesign();

const importer = ref<HTMLInputElement | null>(null);
const importMsg = ref("");
const importOk = ref(false);

const onImport = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file) return;
  importOk.value = await store.importDesign(file);
  importMsg.value = importOk.value
    ? "Design imported."
    : "That file is not a valid exported design.";
};
</script>
