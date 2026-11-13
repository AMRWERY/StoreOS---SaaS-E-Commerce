import type { TrustedDevice } from '@/types/platformTools'

export const useSecurityCenterStore = defineStore('securityCenter', () => {
  const devices = ref<TrustedDevice[]>([
    { id: 'dev-1', name: 'Chrome / Windows', location: 'Cairo, EG', ip: '41.33.120.18', lastActive: '2026-11-12 09:41', current: true, kind: 'desktop' },
    { id: 'dev-2', name: 'Safari / iPhone', location: 'Giza, EG', ip: '156.197.44.9', lastActive: '2026-11-11 22:10', current: false, kind: 'mobile' },
    { id: 'dev-3', name: 'Edge / Windows', location: 'Alexandria, EG', ip: '197.55.210.76', lastActive: '2026-11-04 14:02', current: false, kind: 'desktop' },
  ])
  const backupCodes = ref<string[]>([
    '4821-7730', '1093-5567', '8842-1019', '3356-9004', '7710-2288', '6195-4431', '2074-8856', '9908-3342',
  ])

  function generateCodes() {
    backupCodes.value = Array.from({ length: 8 }, () =>
      `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    )
  }

  function revoke(id: string) {
    devices.value = devices.value.filter((d) => d.id !== id || d.current)
  }

  return { devices, backupCodes, generateCodes, revoke }
})
