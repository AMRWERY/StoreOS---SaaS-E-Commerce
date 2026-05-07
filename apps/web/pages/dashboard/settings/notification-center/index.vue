<template>
  <div>
    <div class="min-h-screen text-tx-primary pb-12 selection:bg-indigo-500/30 overflow-x-hidden">
      <LazyVBreadcrumb />

      <notification-header @save="handleSave" @discard="handleDiscard" @open-stats="showSidebar = true" />

      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <notification-config-card title="New Order" subtitle="Event_Code: ORD_NEW" icon="ph:shopping-cart-duotone"
            iconColorClass="text-brand" iconBgClass="bg-brand-dim" iconBorderClass="border border-brand/10" :channels="[
              { key: 'email', label: 'Email Alert' },
              { key: 'sms', label: 'SMS Message' },
              { key: 'push', label: 'Push Notification' }
            ]" v-model="settings.newOrder" />

          <notification-config-card title="Low Stock" subtitle="Threshold: &lt; 5 UNITS"
            icon="ph:clipboard-text-duotone" iconColorClass="text-orange-400" iconBgClass="bg-orange-500/10"
            iconBorderClass="border border-orange-500/10" variant="warning" :channels="[
              { key: 'email', label: 'Email Alert' },
              { key: 'sms', label: 'SMS Message', unavailable: true },
              { key: 'push', label: 'Push Notification' }
            ]" v-model="settings.lowStock" />

          <notification-config-card title="Payment Received" subtitle="Gateway: STRIPE, PAYPAL" icon="ph:bank-duotone"
            iconColorClass="text-tx-secondary" iconBgClass="bg-bg-elevated"
            iconBorderClass="border border-border-subtle" :channels="[
              { key: 'email', label: 'Email Alert' },
              { key: 'push', label: 'Push Notification' }
            ]" v-model="settings.payment">
            <div class="pt-4 border-t border-border-subtle flex justify-between items-center">
              <span class="text-xs text-tx-muted font-medium italic">Webhook Dispatch</span>
              <span class="text-[9px] text-tx-muted">POST /v2/hooks</span>
            </div>
          </notification-config-card>

          <notification-config-card title="Order Delivered" subtitle="Carrier: DHL, FEDEX" icon="ph:package-duotone"
            iconColorClass="text-tx-secondary" iconBgClass="bg-bg-elevated"
            iconBorderClass="border border-border-subtle" :channels="[
              { key: 'email', label: 'Email Alert' },
              { key: 'push', label: 'Push Notification' }
            ]" v-model="settings.delivered">
            <p class="text-[9px] text-tx-muted italic">Final destination status updates only.</p>
          </notification-config-card>

        </div>
      </div>

      <notification-sidebar v-model="showSidebar" />

      <floating-command-bar />
    </div>
  </div>
</template>

<script lang="ts" setup>
const showSidebar = ref(false)

const settings = ref({
  newOrder: { email: true, sms: true, push: true },
  lowStock: { email: true, push: true },
  payment: { email: true, push: true },
  delivered: { email: true, push: false }
})

const handleSave = () => {
  console.log('Settings saved:', settings.value)
}

const handleDiscard = () => {
  // Reset logic can go here
}

definePageMeta({
  layout: 'dashboard'
})

useHead({
  titleTemplate: () => 'Settings - Notification Center',
})
</script>