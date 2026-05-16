import type { UserProfile, UserSession } from '@/types/profile'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<UserProfile>({
    name: 'Marcus Thorne',
    email: 'm.thorne@storeos.co',
    phone: '+81 90-1234-5678',
    jobTitle: 'Owner'
  })

  const sessions = ref<UserSession[]>([
    { device: 'MacBook Pro', meta: 'Tokyo, Japan • 192.168.1.1', status: 'ONLINE NOW', current: true, icon: 'ph:desktop-bold' },
    { device: 'iPhone 15 Pro', meta: 'Tokyo, Japan • 172.56.234.1', status: '2 HOURS AGO', current: false, icon: 'ph:device-mobile-bold' },
    { device: 'Windows Workstation', meta: 'Osaka, Japan • 10.0.0.42', status: '4 DAYS AGO', current: false, icon: 'ph:monitor-bold' },
  ])

  function saveProfile() {
    console.log('Saving profile...', profile.value)
  }

  function revokeSession(device: string) {
    const index = sessions.value.findIndex(s => s.device === device && !s.current)
    if (index !== -1) sessions.value.splice(index, 1)
  }

  return { profile, sessions, saveProfile, revokeSession }
})
