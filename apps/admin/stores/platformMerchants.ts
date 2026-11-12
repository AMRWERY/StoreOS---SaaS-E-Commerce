import type {
  MerchantActivity,
  MerchantStatus,
  PlatformMerchant,
  PlatformNote,
} from '@/types/platform'

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const m = (
  id: string,
  store: string,
  owner: string,
  city: string,
  plan: PlatformMerchant['plan'],
  status: MerchantStatus,
  gmv: number,
  signupDate: string,
  usage: PlatformMerchant['usage'],
): PlatformMerchant => ({
  id,
  store,
  domain: `${slug(store)}.storeos.shop`,
  owner,
  ownerEmail: `${owner.split(' ')[0]!.toLowerCase()}@${slug(store).replace(/-/g, '')}.com`,
  city,
  plan,
  status,
  gmv,
  signupDate,
  lastActive: '2026-11-11',
  usage,
})

export const usePlatformMerchantsStore = defineStore('platformMerchants', () => {
  const merchants = ref<PlatformMerchant[]>([
    m('mrc_1001', 'Nile Threads', 'Mona El-Sayed', 'Cairo', 'growth', 'active', 1842500, '2025-02-14', { orders: 3120, skus: 412, staff: 6 }),
    m('mrc_1002', 'Alex Spice House', 'Karim Fawzy', 'Alexandria', 'starter', 'active', 412300, '2025-06-03', { orders: 820, skus: 143, staff: 2 }),
    m('mrc_1003', 'Delta Electronics', 'Hossam Abdelrahman', 'Mansoura', 'enterprise', 'active', 6210800, '2024-11-21', { orders: 9840, skus: 2210, staff: 18 }),
    m('mrc_1004', 'Siwa Dates Co.', 'Nour Gamal', 'Siwa', 'free', 'active', 18900, '2026-09-30', { orders: 41, skus: 22, staff: 1 }),
    m('mrc_1005', 'Giza Gadgets', 'Tarek Mansour', 'Giza', 'starter', 'suspended', 96400, '2026-03-19', { orders: 410, skus: 88, staff: 1 }),
    m('mrc_1006', 'Habiba Beauty', 'Habiba Ashraf', 'Cairo', 'trial', 'trial', 0, '2026-11-05', { orders: 7, skus: 14, staff: 1 }),
    m('mrc_1007', 'Dubai Souq Gifts', 'Yasmin Al-Hashimi', 'Dubai', 'growth', 'active', 988200, '2025-08-12', { orders: 2150, skus: 380, staff: 8 }),
    m('mrc_1008', 'Riyadh Oud', 'Faisal Al-Qahtani', 'Riyadh', 'starter', 'active', 275000, '2025-12-01', { orders: 640, skus: 96, staff: 3 }),
    m('mrc_1009', 'Luxor Crafts', 'Amira Saad', 'Luxor', 'free', 'trial', 5200, '2026-11-02', { orders: 12, skus: 31, staff: 1 }),
    m('mrc_1010', 'Tanta Textiles', 'Mahmoud Ragab', 'Tanta', 'starter', 'active', 331700, '2025-10-17', { orders: 910, skus: 301, staff: 2 }),
    m('mrc_1011', 'Quick Kicks', 'Omar Zaki', 'Cairo', 'free', 'suspended', 3100, '2026-10-20', { orders: 49, skus: 50, staff: 1 }),
    m('mrc_1012', 'Casablanca Caftans', 'Salma Idrissi', 'Casablanca', 'growth', 'active', 764900, '2025-04-25', { orders: 1780, skus: 266, staff: 5 }),
    m('mrc_1013', 'Hurghada Divers', 'Ahmed Lotfy', 'Hurghada', 'trial', 'trial', 0, '2026-11-09', { orders: 2, skus: 9, staff: 1 }),
    m('mrc_1014', 'Pharaoh Coffee', 'Dina Kamel', 'Cairo', 'starter', 'active', 158800, '2026-01-11', { orders: 355, skus: 40, staff: 2 }),
  ])

  const notes = ref<Record<string, PlatformNote[]>>({
    mrc_1005: [
      { id: 'n1', author: 'Rana Mostafa', body: 'Suspended after 3 chargeback disputes in 48h. Owner contacted by email.', date: '2026-11-08' },
    ],
    mrc_1003: [
      { id: 'n2', author: 'Youssef Hany', body: 'Enterprise renewal due in January, wants custom SLA.', date: '2026-10-22' },
    ],
  })

  const activity: MerchantActivity[] = [
    { id: 'a1', type: 'orderSpike', date: '2026-11-11' },
    { id: 'a2', type: 'productImport', date: '2026-11-09' },
    { id: 'a3', type: 'paymentFailed', date: '2026-11-07' },
    { id: 'a4', type: 'domainConnected', date: '2026-10-28' },
    { id: 'a5', type: 'planChange', date: '2026-10-15' },
  ]

  const byId = (id: string) => merchants.value.find((x) => x.id === id) ?? null
  const notesFor = (id: string) => notes.value[id] ?? []
  const activityFor = (_id: string) => activity

  const setStatus = (id: string, status: MerchantStatus) => {
    const target = byId(id)
    if (target) target.status = status
  }

  const addNote = (id: string, body: string) => {
    const list = notes.value[id] ?? []
    list.unshift({ id: `n${Date.now()}`, author: 'Amr Mohamed', body, date: '2026-11-12' })
    notes.value[id] = list
  }

  return { merchants, byId, notesFor, activityFor, setStatus, addNote }
})
