import type { AuditEntry, PlatformStaffMember } from '@/types/platform'

export const usePlatformStaffStore = defineStore('platformStaff', () => {
  const staff = ref<PlatformStaffMember[]>([
    { id: 'stf_1', name: 'Amr Mohamed', email: 'amr@storeos.io', role: 'superAdmin', twoFactor: true, lastActive: '2026-11-12' },
    { id: 'stf_2', name: 'Rana Mostafa', email: 'rana@storeos.io', role: 'support', twoFactor: true, lastActive: '2026-11-12' },
    { id: 'stf_3', name: 'Youssef Hany', email: 'youssef@storeos.io', role: 'support', twoFactor: false, lastActive: '2026-11-11' },
    { id: 'stf_4', name: 'Laila Barakat', email: 'laila@storeos.io', role: 'finance', twoFactor: true, lastActive: '2026-11-10' },
    { id: 'stf_5', name: 'Mina Adel', email: 'mina@storeos.io', role: 'trustSafety', twoFactor: true, lastActive: '2026-11-12' },
  ])

  const audit = ref<AuditEntry[]>([
    { id: 'aud_901', actor: 'Mina Adel', action: 'suspendStore', target: 'Giza Gadgets', date: '2026-11-08 14:22', ip: '41.33.10.4' },
    { id: 'aud_900', actor: 'Amr Mohamed', action: 'toggleFlag', target: 'checkout_v2', date: '2026-11-08 11:05', ip: '197.55.2.19' },
    { id: 'aud_899', actor: 'Laila Barakat', action: 'changePlan', target: 'Delta Electronics', date: '2026-11-07 16:40', ip: '41.33.10.8' },
    { id: 'aud_898', actor: 'Rana Mostafa', action: 'addNote', target: 'Alex Spice House', date: '2026-11-07 10:12', ip: '41.33.10.6' },
    { id: 'aud_897', actor: 'Mina Adel', action: 'resolveCase', target: 'ab_2031', date: '2026-11-02 18:01', ip: '41.33.10.4' },
    { id: 'aud_896', actor: 'Youssef Hany', action: 'retryJob', target: 'job_8790', date: '2026-11-02 09:30', ip: '41.33.10.7' },
  ])

  return { staff, audit }
})
