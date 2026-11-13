import type { FulfilCourier, FulfilOrder, FulfilShipmentInput, FulfilStatus } from '@/types/fulfillment'

const TRACKING_PREFIX: Record<FulfilCourier, string> = { bosta: 'BST', aramex: 'ARX', jt: 'JT', manual: 'MAN' }

export const useFulfilBoardStore = defineStore('fulfilBoard', () => {
  const orders = ref<FulfilOrder[]>([
    {
      id: 'FUL-3012', orderId: 'ORD-8851', customer: 'Sara Mostafa', phone: '+20 100 234 5678',
      governorate: 'Cairo', address: '14 Road 9, Maadi, Cairo', addressAr: '١٤ شارع ٩، المعادي، القاهرة',
      createdAt: '2026-11-12 09:14', status: 'toPack', packages: [],
      lines: [
        { sku: 'TSH-BLK-M', name: 'Cotton T-shirt Black M', bin: 'A-03-2', qty: 2, shippedQty: 0, picked: false },
        { sku: 'CAP-NVY', name: 'Navy Baseball Cap', bin: 'B-11-1', qty: 1, shippedQty: 0, picked: false },
      ],
    },
    {
      id: 'FUL-3011', orderId: 'ORD-8849', customer: 'Omar Hassan', phone: '+20 111 876 5432',
      governorate: 'Giza', address: '7 Mourad St, Dokki, Giza', addressAr: '٧ شارع مراد، الدقي، الجيزة',
      createdAt: '2026-11-12 08:40', status: 'toPack', packages: [],
      lines: [
        { sku: 'SNK-WHT-42', name: 'White Sneakers 42', bin: 'C-02-4', qty: 1, shippedQty: 0, picked: false },
        { sku: 'SOCK-3PK', name: 'Socks 3-pack', bin: 'B-05-3', qty: 3, shippedQty: 0, picked: false },
      ],
    },
    {
      id: 'FUL-3009', orderId: 'ORD-8844', customer: 'Nour Adel', phone: '+20 122 345 6789',
      governorate: 'Alexandria', address: '32 Saad Zaghloul St, Smouha, Alexandria', addressAr: '٣٢ شارع سعد زغلول، سموحة، الإسكندرية',
      createdAt: '2026-11-11 19:22', status: 'packed', packages: [],
      lines: [{ sku: 'BAG-LTH-BR', name: 'Leather Bag Brown', bin: 'D-01-1', qty: 1, shippedQty: 0, picked: true }],
    },
    {
      id: 'FUL-3004', orderId: 'ORD-8832', customer: 'Karim Fathy', phone: '+20 109 111 2222',
      governorate: 'Mansoura', address: '5 El Gomhoria St, Mansoura, Dakahlia', addressAr: '٥ شارع الجمهورية، المنصورة، الدقهلية',
      createdAt: '2026-11-11 11:05', status: 'shipped',
      lines: [{ sku: 'HOOD-GRY-L', name: 'Grey Hoodie L', bin: 'A-07-2', qty: 1, shippedQty: 1, picked: true }],
      packages: [{ id: 'PKG-1', courier: 'bosta', tracking: 'BST-7741209', weightKg: 0.8, lengthCm: 30, widthCm: 25, heightCm: 6, lines: [{ sku: 'HOOD-GRY-L', qty: 1 }] }],
    },
    {
      id: 'FUL-2998', orderId: 'ORD-8820', customer: 'Mona Samir', phone: '+20 100 999 8888',
      governorate: 'Tanta', address: '18 El Bahr St, Tanta, Gharbia', addressAr: '١٨ شارع البحر، طنطا، الغربية',
      createdAt: '2026-11-10 15:30', status: 'delivered',
      lines: [{ sku: 'WLT-BLK', name: 'Black Wallet', bin: 'B-02-2', qty: 2, shippedQty: 2, picked: true }],
      packages: [{ id: 'PKG-1', courier: 'aramex', tracking: 'ARX-5530917', weightKg: 0.4, lengthCm: 20, widthCm: 15, heightCm: 5, lines: [{ sku: 'WLT-BLK', qty: 2 }] }],
    },
    {
      id: 'FUL-2991', orderId: 'ORD-8803', customer: 'Hany Tarek', phone: '+20 115 000 1111',
      governorate: 'Assiut', address: '9 El Nasr St, Assiut', addressAr: '٩ شارع النصر، أسيوط',
      createdAt: '2026-11-09 12:10', status: 'exception',
      lines: [{ sku: 'JKT-DNM-M', name: 'Denim Jacket M', bin: 'A-09-1', qty: 1, shippedQty: 1, picked: true }],
      packages: [{ id: 'PKG-1', courier: 'jt', tracking: 'JT-2210984', weightKg: 1.1, lengthCm: 35, widthCm: 28, heightCm: 8, lines: [{ sku: 'JKT-DNM-M', qty: 1 }] }],
    },
  ])

  function byId(id: string) {
    return orders.value.find((o) => o.id === id)
  }

  function setStatus(id: string, status: FulfilStatus) {
    const o = byId(id)
    if (o) o.status = status
  }

  function togglePick(id: string, sku: string) {
    const line = byId(id)?.lines.find((l) => l.sku === sku)
    if (line) line.picked = !line.picked
  }

  function markPacked(id: string) {
    const o = byId(id)
    if (!o || o.status !== 'toPack') return
    o.lines.forEach((l) => (l.picked = true))
    o.status = 'packed'
  }

  function remaining(o: FulfilOrder) {
    return o.lines.reduce((s, l) => s + (l.qty - l.shippedQty), 0)
  }

  /** Creates one package. Order becomes shipped only when every unit is on a package (partial fulfillment otherwise). */
  function createShipment(id: string, input: FulfilShipmentInput) {
    const o = byId(id)
    if (!o) return null
    const picked = input.lines.filter((l) => l.qty > 0)
    if (!picked.length) return null
    const digits = Number(o.orderId.replace(/\D/g, '')) || 0
    const seq = 1000000 + ((digits * 7919 + (o.packages.length + 1) * 104729) % 8999999)
    const pkg = {
      id: `PKG-${o.packages.length + 1}`,
      courier: input.courier,
      tracking: `${TRACKING_PREFIX[input.courier]}-${seq}`,
      weightKg: input.weightKg,
      lengthCm: input.lengthCm,
      widthCm: input.widthCm,
      heightCm: input.heightCm,
      lines: picked,
    }
    for (const p of picked) {
      const line = o.lines.find((l) => l.sku === p.sku)
      if (line) line.shippedQty = Math.min(line.qty, line.shippedQty + p.qty)
    }
    o.packages.push(pkg)
    o.status = remaining(o) === 0 ? 'shipped' : 'packed'
    return pkg
  }

  /** Bulk "Buy labels": ships every remaining unit of each order in one Bosta package. */
  function buyLabels(ids: string[]) {
    let count = 0
    for (const id of ids) {
      const o = byId(id)
      if (!o || (o.status !== 'toPack' && o.status !== 'packed') || remaining(o) === 0) continue
      const res = createShipment(id, {
        courier: 'bosta', weightKg: 1, lengthCm: 30, widthCm: 20, heightCm: 10,
        lines: o.lines.map((l) => ({ sku: l.sku, qty: l.qty - l.shippedQty })),
      })
      if (res) count++
    }
    return count
  }

  return { orders, byId, setStatus, togglePick, markPacked, remaining, createShipment, buyLabels }
})
