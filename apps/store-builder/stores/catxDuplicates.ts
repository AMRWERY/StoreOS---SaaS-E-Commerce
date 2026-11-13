import type { CatxDuplicateGroup, DuplicateStatus } from '@/types/catalogDepth'

export const useCatxDuplicatesStore = defineStore('catxDuplicates', () => {
  const groups = ref<CatxDuplicateGroup[]>([
    {
      id: 'DUP-01', reason: 'phone', confidence: 96, status: 'open',
      records: [
        { id: 'C-201', name: 'منى عبد الله', email: 'mona@example.com', phone: '+20 100 555 1234', address: '12 شارع التحرير، الدقي، الجيزة', orders: 8, spent: 5400 },
        { id: 'C-318', name: 'منى عبدالله', email: 'mona.a@example.com', phone: '+20 100 555 1234', address: '12 شارع التحرير، الجيزة', orders: 2, spent: 900 },
      ],
    },
    {
      id: 'DUP-02', reason: 'email', confidence: 99, status: 'open',
      records: [
        { id: 'C-144', name: 'كريم السيد', email: 'karim@example.com', phone: '+20 111 222 3344', address: '5 شارع النصر، مدينة نصر، القاهرة', orders: 12, spent: 14200 },
        { id: 'C-402', name: 'كريم محمد السيد', email: 'karim@example.com', phone: '+20 122 333 4455', address: '5 شارع النصر، القاهرة', orders: 1, spent: 450 },
      ],
    },
    {
      id: 'DUP-03', reason: 'name_address', confidence: 72, status: 'open',
      records: [
        { id: 'C-090', name: 'هالة إبراهيم', email: 'hala.i@example.com', phone: '+20 109 888 7766', address: '30 شارع سعد زغلول، الإسكندرية', orders: 4, spent: 2700 },
        { id: 'C-275', name: 'هالة إبراهيم', email: 'hala.ibrahim@example.com', phone: '+20 155 444 3322', address: '30 شارع سعد زغلول، الإسكندرية', orders: 3, spent: 1900 },
      ],
    },
  ])

  function setStatus(id: string, status: DuplicateStatus) {
    const g = groups.value.find((x) => x.id === id)
    if (g) g.status = status
  }

  return { groups, setStatus }
})
