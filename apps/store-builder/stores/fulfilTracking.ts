import type { FulfilShipment, TrackingState } from '@/types/fulfillment'

export const useFulfilTrackingStore = defineStore('fulfilTracking', () => {
  const shipments = ref<FulfilShipment[]>([
    {
      id: 'SHP-501', orderId: 'ORD-8832', customer: 'Karim Fathy', governorate: 'Dakahlia', courier: 'bosta',
      tracking: 'BST-7741209', state: 'outForDelivery', attempts: 0, shippedAt: '2026-11-11', deliveryDays: null,
      events: [
        { at: '2026-11-12 08:10', label: 'outForDelivery', location: 'Mansoura' },
        { at: '2026-11-11 22:40', label: 'arrivedHub', location: 'Mansoura Hub' },
        { at: '2026-11-11 14:00', label: 'pickedUp', location: 'Cairo' },
      ],
    },
    {
      id: 'SHP-498', orderId: 'ORD-8820', customer: 'Mona Samir', governorate: 'Gharbia', courier: 'aramex',
      tracking: 'ARX-5530917', state: 'delivered', attempts: 1, shippedAt: '2026-11-10', deliveryDays: 2,
      events: [
        { at: '2026-11-12 11:25', label: 'delivered', location: 'Tanta' },
        { at: '2026-11-11 09:00', label: 'outForDelivery', location: 'Tanta' },
        { at: '2026-11-10 17:30', label: 'pickedUp', location: 'Cairo' },
      ],
    },
    {
      id: 'SHP-490', orderId: 'ORD-8803', customer: 'Hany Tarek', governorate: 'Assiut', courier: 'jt',
      tracking: 'JT-2210984', state: 'failedAttempt', attempts: 2, shippedAt: '2026-11-09', deliveryDays: null,
      events: [
        { at: '2026-11-12 10:05', label: 'failedAttempt', location: 'Assiut' },
        { at: '2026-11-11 13:20', label: 'failedAttempt', location: 'Assiut' },
        { at: '2026-11-10 08:00', label: 'outForDelivery', location: 'Assiut' },
        { at: '2026-11-09 16:45', label: 'pickedUp', location: 'Cairo' },
      ],
    },
    {
      id: 'SHP-487', orderId: 'ORD-8790', customer: 'Layla Ibrahim', governorate: 'Sharqia', courier: 'bosta',
      tracking: 'BST-7702331', state: 'refused', attempts: 1, shippedAt: '2026-11-08', deliveryDays: null,
      events: [
        { at: '2026-11-10 12:30', label: 'refused', location: 'Zagazig' },
        { at: '2026-11-09 09:15', label: 'outForDelivery', location: 'Zagazig' },
        { at: '2026-11-08 15:00', label: 'pickedUp', location: 'Cairo' },
      ],
    },
    {
      id: 'SHP-470', orderId: 'ORD-8744', customer: 'Youssef Ali', governorate: 'Red Sea', courier: 'aramex',
      tracking: 'ARX-5498120', state: 'rto', attempts: 3, shippedAt: '2026-11-04', deliveryDays: null,
      events: [
        { at: '2026-11-11 10:00', label: 'returning', location: 'Hurghada' },
        { at: '2026-11-09 15:10', label: 'failedAttempt', location: 'Hurghada' },
        { at: '2026-11-04 14:00', label: 'pickedUp', location: 'Cairo' },
      ],
    },
    {
      id: 'SHP-466', orderId: 'ORD-8731', customer: 'Dina Khaled', governorate: 'Cairo', courier: 'bosta',
      tracking: 'BST-7690045', state: 'delivered', attempts: 1, shippedAt: '2026-11-05', deliveryDays: 1,
      events: [
        { at: '2026-11-06 13:00', label: 'delivered', location: 'Cairo' },
        { at: '2026-11-05 17:00', label: 'pickedUp', location: 'Cairo' },
      ],
    },
    {
      id: 'SHP-462', orderId: 'ORD-8722', customer: 'Tamer Nabil', governorate: 'Alexandria', courier: 'jt',
      tracking: 'JT-2199001', state: 'inTransit', attempts: 0, shippedAt: '2026-11-12', deliveryDays: null,
      events: [{ at: '2026-11-12 07:30', label: 'pickedUp', location: 'Cairo' }],
    },
  ])

  function setState(id: string, state: TrackingState, label: string) {
    const s = shipments.value.find((x) => x.id === id)
    if (!s) return
    s.state = state
    s.events.unshift({ at: '2026-11-12 12:00', label, location: s.governorate })
  }

  /** Retry delivery: the courier re-dispatches the parcel. */
  function retry(id: string) {
    const s = shipments.value.find((x) => x.id === id)
    if (!s) return
    s.attempts += 1
    setState(id, 'outForDelivery', 'outForDelivery')
  }

  /** Return to sender. */
  function returnToSender(id: string) {
    setState(id, 'rto', 'returning')
  }

  return { shipments, retry, returnToSender }
})
