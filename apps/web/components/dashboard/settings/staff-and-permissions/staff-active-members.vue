<template>
  <div>
    <section class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden shadow-2xl max-w-7xl mx-auto">
      <div class="px-4 py-3.5 flex justify-between items-center border-b border-border-subtle">
        <h2 class="font-bold text-sm tracking-wide">Active Team Members</h2>
        <span class="bg-bg-elevated text-[10px] font-black px-2.5 py-1 rounded-full text-tx-secondary tracking-widest">Total:
          {{ members.length.toString().padStart(2, '0') }}</span>
      </div>

      <VTable :headers="headers" :items="members">
        <template #cell(avatar_name)="{ item }">
          <div class="flex items-center gap-4">
            <img :src="item.avatar"
              class="w-10 h-10 rounded-xl border border-border-default grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
            <div>
              <h4 class="text-sm font-bold">{{ item.name }}</h4>
              <p class="text-[9px] text-tx-muted font-bold mt-1">{{ item.joined }}</p>
            </div>
          </div>
        </template>
        <template #cell(email)="{ item }">
          <span class="text-xs text-tx-secondary font-medium">{{ item.email }}</span>
        </template>
        <template #cell(role)="{ item }">
          <span :class="[getRoleClass(item.role), 'rounded-full px-2 py-0.5 text-[10px] font-semibold']">
            {{ item.role }}
          </span>
        </template>
        <template #cell(active)="{ item }">
          <span class="text-xs text-tx-muted">{{ item.active }}</span>
        </template>
        <template #cell(actions)>
          <button class="text-tx-muted hover:text-tx-primary transition-colors">
            <Icon name="ph:dots-three-bold" />
          </button>
        </template>
      </VTable>
    </section>
  </div>
</template>

<script lang="ts" setup>
const headers = [
  { key: 'avatar_name', label: 'Avatar & Name', class: 'px-8 py-6', headerClass: 'px-8 py-5' },
  { key: 'email', label: 'Email Address', class: 'px-6 py-6', headerClass: 'px-6 py-5' },
  { key: 'role', label: 'Role', class: 'px-6 py-6', headerClass: 'px-6 py-5' },
  { key: 'active', label: 'Last Active', class: 'px-6 py-6', headerClass: 'px-6 py-5' },
  { key: 'actions', label: 'Actions', align: 'end', class: 'px-8 py-6', headerClass: 'px-8 py-5' }
];

const members = [
  {
    name: 'Marcus Thorne',
    joined: 'JOINED 12 MAR 2023',
    email: 'm.thorne@storeos.com',
    role: 'OWNER',
    active: '2024-05-31 12:33',
    avatar: 'https://i.pravatar.cc/100?u=marcus'
  },
  {
    name: 'Elena Rodriguez',
    joined: 'JOINED 04 JAN 2024',
    email: 'e.rodriguez@storeos.com',
    role: 'MANAGER',
    active: '2024-05-28 09:15',
    avatar: 'https://i.pravatar.cc/100?u=elena'
  },
  {
    name: 'Sarah Jenkins',
    joined: 'JOINED 18 FEB 2024',
    email: 's.jenkins@storeos.com',
    role: 'STAFF',
    active: '2024-05-23 18:45',
    avatar: 'https://i.pravatar.cc/100?u=sarah'
  }
]

const getRoleClass = (role: string) => {
  switch (role) {
    case 'OWNER': return 'bg-brand-dim text-brand'
    case 'MANAGER': return 'bg-accent-dim text-accent'
    default: return 'bg-bg-elevated text-tx-secondary'
  }
}
</script>