<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] pb-24">
      <VBreadcrumb class="mb-6" :overrides="{ [String($route.params.id)]: customer.name }" />

      <!-- Top Header: Identity & Actions -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div class="flex items-center gap-6">
          <!-- Profile Avatar -->
          <div
            class="w-20 h-20 rounded-2xl bg-brand-dim border border-brand/20 flex items-center justify-center text-2xl font-black text-brand shadow-lg shadow-indigo-500/10">
            {{ customer.initials }}
          </div>
          <div>
            <h1 class="text-3xl font-bold tracking-tight">{{ customer.name }}</h1>
            <div class="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
              <div class="flex items-center gap-2 text-xs text-tx-secondary font-medium">
                <Icon name="ph:phone-fill" class="text-brand" />
                {{ customer.phone }}
              </div>
              <div class="flex items-center gap-2 text-xs text-tx-secondary font-medium">
                <Icon name="ph:envelope-fill" class="text-brand" />
                {{ customer.email }}
              </div>
            </div>
            <p class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px] mt-3">Member Since {{ customer.memberSince
            }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <VButton variant="primary" label="New Order" icon="ph:shopping-cart-light" iconPosition="left"
            to="/dashboard/orders/order-form" />
          <button
            class="p-3.5 bg-bg-elevated border border-border-default rounded-xl text-tx-secondary hover:text-tx-primary transition-colors">
            <Icon name="ph:tag-bold" />
          </button>
        </div>
      </header>

      <!-- Key Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        <div v-for="stat in stats" :key="stat.label"
          class="bg-bg-primary border border-border-subtle rounded-xl px-4 py-3.5 group hover:border-border-default transition-all">
          <h3 class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px] mb-3">{{ stat.label }}</h3>
          <div class="flex items-baseline gap-2">
            <span v-if="stat.prefix" class="text-xl font-bold text-tx-secondary">{{ stat.prefix }}</span>
            <p class="font-mono text-[22px] font-semibold tracking-tight">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <!-- Main Content Split -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <!-- Main Content: Tabs & History -->
        <div class="lg:col-span-8 bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden flex flex-col">
          <!-- Tabs Header -->
          <div class="px-6 pt-6 border-b border-border-subtle flex gap-8">
            <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
              class="pb-4 text-xs font-bold tracking-widest transition-all relative"
              :class="activeTab === tab ? 'text-tx-primary' : 'text-tx-muted hover:text-tx-secondary'">
              {{ tab }}
              <div v-if="activeTab === tab" class="absolute bottom-0 start-0 w-full h-0.5 bg-brand"></div>
            </button>
          </div>

          <!-- Tab Content -->
          <div class="px-4 py-3.5 flex-1">
            <!-- Orders Tab -->
            <div v-if="activeTab === 'Orders'">
              <div class="grid grid-cols-4 text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px] mb-6 px-4">
                <span>Order #</span>
                <span class="text-center">Status</span>
                <span class="text-center">Date</span>
                <span class="text-end">Total</span>
              </div>

              <div class="space-y-3">
                <div v-for="order in orders" :key="order.id"
                  class="grid grid-cols-4 items-center p-4 rounded-xl hover:bg-bg-elevated transition-all border border-transparent hover:border-border-subtle cursor-pointer group/row">
                  <span class="text-xs font-bold font-mono text-tx-secondary group-hover/row:text-brand transition-colors">{{
                    order.id }}</span>
                  <div class="flex justify-center">
                    <span :class="[order.color, 'text-[9px] font-black px-3 py-1 rounded-md tracking-widest']">
                      {{ order.status }}
                    </span>
                  </div>
                  <span class="text-xs font-medium text-tx-secondary text-center">{{ order.date }}</span>
                  <div class="text-end">
                    <p class="text-[9px] font-semibold text-tx-muted uppercase tracking-[0.6px]">EGP</p>
                    <p class="text-sm font-bold font-mono">{{ order.total }}</p>
                  </div>
                </div>
              </div>

              <button
                class="w-full mt-8 py-4 text-[10px] font-black tracking-[0.2em] text-tx-secondary hover:text-tx-primary transition-all flex items-center justify-center gap-2 group">
                View all 42 orders
                <Icon name="ph:arrow-right-bold" class="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <!-- Notes Tab -->
            <div v-if="activeTab === 'Notes'" class="space-y-6">
              <!-- Add Note -->
              <div class="bg-bg-overlay rounded-2xl p-6 border border-border-subtle">
                <textarea v-model="newNote"
                  class="w-full bg-transparent border-none focus:ring-0 text-sm placeholder-tx-muted resize-none h-24"
                  placeholder="Type an internal note about this customer... (visible to staff only)"></textarea>
                <div class="flex justify-end mt-4">
                  <VButton variant="primary" size="sm" label="Add Note" @click="handleAddNote"
                    :disabled="!newNote.trim()" />
                </div>
              </div>

              <!-- Notes Timeline -->
              <div class="space-y-6">
                <div v-for="note in notes" :key="note.id"
                  class="relative ps-8 border-s border-border-subtle last:border-s-transparent">
                  <div
                    class="absolute -start-1 top-0 w-2 h-2 rounded-full bg-brand shadow-lg shadow-indigo-500/50">
                  </div>
                  <div
                    class="bg-bg-elevated border border-border-subtle rounded-2xl p-6 hover:border-border-default transition-colors">
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px]">{{ note.author }} • {{
                        note.date }}</span>
                      <button class="text-tx-muted hover:text-danger transition-colors">
                        <Icon name="ph:trash-bold" />
                      </button>
                    </div>
                    <p class="text-sm text-tx-secondary leading-relaxed">{{ note.text }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity Tab -->
            <div v-if="activeTab === 'Activity'" class="space-y-4">
              <div v-for="activity in activities" :key="activity.id"
                class="flex items-start gap-4 p-4 rounded-xl hover:bg-bg-elevated transition-colors border border-transparent hover:border-border-subtle">
                <div :class="[activity.bg, 'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg']">
                  <Icon :name="activity.icon" :class="activity.color" />
                </div>
                <div>
                  <p class="text-sm font-medium">
                    <span class="text-tx-primary">{{ activity.user }}</span>
                    <span class="text-tx-secondary"> {{ activity.action }} </span>
                    <span v-if="activity.target" class="text-brand font-bold capitalize">{{ activity.target
                    }}</span>
                  </p>
                  <p class="text-[10px] text-tx-muted mt-1 font-semibold uppercase tracking-[0.6px]">{{ activity.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar: Metadata & Risk -->
        <aside class="lg:col-span-4 space-y-6">
          <!-- Contact Metadata -->
          <section class="bg-bg-primary border border-border-subtle rounded-2xl p-6 shadow-xl shadow-black/20">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px]">Contact Metadata</h3>
              <button v-if="!isEditingContact" @click="startEditContact"
                class="text-tx-muted hover:text-brand transition-colors">
                <Icon name="ph:pencil-simple-line-bold" />
              </button>
            </div>

            <div v-if="!isEditingContact" class="space-y-6">
              <div class="group/field">
                <p class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px] mb-2">Primary Phone</p>
                <p class="text-xs font-bold text-tx-secondary">{{ customer.phone }}</p>
              </div>
              <div class="group/field">
                <p class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px] mb-2">Primary Email</p>
                <p class="text-xs font-bold text-tx-secondary">{{ customer.email }}</p>
              </div>
            </div>

            <div v-else class="space-y-6">
              <div>
                <p class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px] mb-2">Primary Phone</p>
                <input v-model="editedContact.phone"
                  class="w-full bg-bg-overlay border border-border-default rounded-xl px-4 py-3 text-xs font-bold focus:border-brand/50 focus:ring-1 focus:ring-brand/20 outline-none transition-all"
                  placeholder="+20 000 000 0000" />
              </div>
              <div>
                <p class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px] mb-2">Primary Email</p>
                <input v-model="editedContact.email"
                  class="w-full bg-bg-overlay border border-border-default rounded-xl px-4 py-3 text-xs font-bold focus:border-brand/50 focus:ring-1 focus:ring-brand/20 outline-none transition-all"
                  placeholder="name@company.com" />
              </div>
              <div class="flex gap-2 pt-2">
                <VButton variant="primary" size="sm" label="Save" className="flex-1" @click="saveContact" />
                <VButton variant="secondary" size="sm" label="Cancel" @click="isEditingContact = false" />
              </div>
            </div>
          </section>

          <!-- Shipping Destinations -->
          <section class="bg-bg-primary border border-border-subtle rounded-2xl p-6 overflow-hidden">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px]">Shipping Destinations</h3>
              <button
                class="text-tx-primary bg-bg-elevated rounded-md p-1 hover:bg-bg-elevated transition-all border border-border-subtle">
                <Icon name="ph:plus-bold" />
              </button>
            </div>
            <div class="space-y-3">
              <div v-for="address in addresses" :key="address.label"
                class="flex items-start gap-4 p-4 bg-bg-overlay rounded-xl border border-border-subtle hover:border-brand/30 transition-all group/addr cursor-pointer">
                <Icon :name="address.icon"
                  class="text-brand mt-1 group-hover/addr:scale-110 transition-transform" />
                <div>
                  <h4 class="text-xs font-bold">{{ address.label }}</h4>
                  <p class="text-[10px] text-tx-secondary mt-1 leading-relaxed">{{ address.value }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Customer Tags -->
          <section class="bg-bg-primary border border-border-subtle rounded-2xl p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px]">Customer Tags</h3>
              <button class="text-tx-muted hover:text-brand transition-colors">
                <Icon name="ph:gear-six-bold" />
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="t in customer.tags" :key="t"
                class="px-3 py-1.5 bg-brand-dim text-brand text-[9px] font-black rounded tracking-widest border border-brand/10 hover:border-brand/30 transition-all cursor-pointer">
                {{ t }}
              </span>
            </div>
          </section>

          <!-- Risk Analysis -->
          <section class="bg-bg-primary border border-brand/20 rounded-2xl p-6 group overflow-hidden relative">
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 rounded-xl bg-success-dim flex items-center justify-center shrink-0">
                <Icon name="ph:shield-check-fill" class="text-success text-2xl" />
              </div>
              <div>
                <h3 class="text-[10px] font-semibold text-tx-secondary uppercase tracking-[0.6px] mb-1">Risk Analysis</h3>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                  <span class="text-[10px] font-black text-success tracking-widest">Low_Risk_Score:
                    {{ customer.riskScore }}</span>
                </div>
              </div>
            </div>
            <div
              class="mt-6 pt-6 border-t border-border-subtle flex justify-between items-center text-[8px] font-bold text-tx-muted tracking-widest">
              <span>Last Verified by System</span>
              <span>{{ customer.lastVerified }}</span>
            </div>
          </section>
        </aside>
      </div>

      <!-- Bottom Command Bar (Floating) -->
      <div
        class="fixed bottom-8 start-1/2 -translate-x-1/2 bg-bg-overlay/80 backdrop-blur-xl border border-border-default px-6 py-2 rounded-2xl flex items-center gap-6 shadow-2xl z-50">
        <div
          class="flex items-center gap-2 text-[10px] font-bold text-tx-secondary tracking-widest border-e border-border-default pe-6">
          <Icon name="ph:command-bold" class="text-sm" />
          <span>Commands</span>
          <span class="ms-2 px-1.5 py-0.5 bg-bg-elevated border border-border-default rounded text-[8px] text-tx-secondary">⌘K</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="group relative">
            <VButton variant="none" :to="`mailto:${customer.email}`"
              className="p-3 text-tx-secondary hover:text-tx-primary transition-colors">
              <Icon name="ph:envelope-bold" class="text-xl" />
            </VButton>
            <span
              class="absolute -top-10 start-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[8px] font-black text-tx-secondary rounded border border-border-default opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest">Email
              [E]</span>
          </div>

          <div class="group relative">
            <VButton variant="none" className="p-3 text-tx-secondary hover:text-tx-primary transition-colors">
              <Icon name="ph:chat-circle-dots-bold" class="text-xl" />
            </VButton>
            <span
              class="absolute -top-10 start-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[8px] font-black text-tx-secondary rounded border border-border-default opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest">Chat
              [C]</span>
          </div>

          <div class="group relative">
            <VButton variant="none" :to="`tel:${customer.phone}`"
              className="p-3 text-tx-secondary hover:text-tx-primary transition-colors">
              <Icon name="ph:phone-bold" class="text-xl" />
            </VButton>
            <span
              class="absolute -top-10 start-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[8px] font-black text-tx-secondary rounded border border-border-default opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest">Call
              [P]</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const activeTab = ref('Orders')
const tabs = ['Orders', 'Notes', 'Activity']
const newNote = ref('')

const isEditingContact = ref(false)
const editedContact = ref({ phone: '', email: '' })

const startEditContact = () => {
  editedContact.value = { ...customer.value }
  isEditingContact.value = true
}

const saveContact = () => {
  customer.value.phone = editedContact.value.phone
  customer.value.email = editedContact.value.email
  isEditingContact.value = false
}

const handleAddNote = () => {
  if (!newNote.value.trim()) return
  notes.value.unshift({
    id: Date.now(),
    date: 'Just now',
    author: 'Current User',
    text: newNote.value.trim()
  })
  newNote.value = ''
}

// --- Mock Data ---
const customer = ref({
  name: 'Alex Rivera',
  initials: 'AR',
  phone: '+20 102 345 6789',
  email: 'alex.rivera@kinetic-ops.io',
  memberSince: 'Oct 2023',
  riskScore: '0.04',
  lastVerified: 'Feb 24, 09:12',
  tags: ['VIP_TIER_1', 'EARLY_ADOPTER', 'TECH_SECTOR']
})

const addresses = [
  { label: 'Main Office', value: '42 Tech Plaza, Smart Village, Giza', icon: 'ph:buildings-bold' },
  { label: 'Home Address', value: 'Bldg 12, Maadi Degla, Cairo', icon: 'ph:house-bold' }
]

const orders = [
  { id: '#ORD-9921', status: 'DELIVERED', date: 'Feb 24, 2024', total: '1,240.00', color: 'text-emerald-500 bg-emerald-500/10' },
  { id: '#ORD-9844', status: 'IN TRANSIT', date: 'Feb 18, 2024', total: '450.50', color: 'text-blue-400 bg-blue-400/10' },
  { id: '#ORD-9710', status: 'DELIVERED', date: 'Feb 02, 2024', total: '2,100.00', color: 'text-emerald-500 bg-emerald-500/10' },
  { id: '#ORD-9655', status: 'CANCELLED', date: 'Jan 28, 2024', total: '0.00', color: 'text-red-500 bg-red-500/10' },
]

const notes = ref([
  { id: 1, date: 'Feb 22, 14:30', author: 'Sarah J.', text: 'Customer requested a customized quote for the next bulk order. Needs follow-up by Friday.' },
  { id: 2, date: 'Jan 15, 10:15', author: 'Mike T.', text: 'High potential for upgrade to Enterprise Tier. Extremely satisfied with current logistics.' }
])

const activities = [
  { id: 1, date: 'Feb 24, 09:12', user: 'System', action: 'verified risk status for', target: 'Alex Rivera', icon: 'ph:shield-check-fill', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 2, date: 'Feb 24, 08:45', user: 'Alex Rivera', action: 'placed new order', target: '#ORD-9921', icon: 'ph:shopping-cart-fill', color: 'text-brand', bg: 'bg-brand-dim' },
  { id: 3, date: 'Feb 22, 14:32', user: 'Sarah J.', action: 'added a new internal note', target: '', icon: 'ph:note-fill', color: 'text-amber-500', bg: 'bg-amber-500/10' }
]

const stats = [
  { label: 'Total Orders', value: '42', prefix: '' },
  { label: 'Total Spent', value: '14,208.5', prefix: 'EGP' },
  { label: 'Avg Order Value', value: '338.29', prefix: 'EGP' },
  { label: 'Last Order', value: 'Feb 24, 2024', prefix: '' },
]

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Customer Details',
});
</script>
