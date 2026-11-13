import type { NavItem, NavMenu } from '@/types/storeContent'

let seq = 100
const uid = () => `nav-${++seq}`

export const useNavigationStore = defineStore('navigation', () => {
  const menus = ref<NavMenu[]>([
    {
      id: 'main',
      name: 'Main menu',
      handle: 'main-menu',
      items: [
        { id: 'n1', label: 'Home', url: '/', children: [] },
        {
          id: 'n2',
          label: 'Shop',
          url: '/collections/all',
          children: [
            { id: 'n2a', label: 'New arrivals', url: '/collections/new', children: [] },
            { id: 'n2b', label: 'Best sellers', url: '/collections/best', children: [] },
          ],
        },
        { id: 'n3', label: 'Contact', url: '/pages/contact', children: [] },
      ],
    },
    {
      id: 'footer',
      name: 'Footer',
      handle: 'footer',
      items: [
        { id: 'f1', label: 'Shipping policy', url: '/policies/shipping', children: [] },
        { id: 'f2', label: 'Refund policy', url: '/policies/refund', children: [] },
        { id: 'f3', label: 'Terms of service', url: '/policies/terms', children: [] },
      ],
    },
  ])
  const selectedId = ref('main')
  const dirty = ref(false)
  const lastSaved = ref('')

  const selected = computed(() => menus.value.find((m) => m.id === selectedId.value) ?? menus.value[0])

  function listFor(parent?: NavItem): NavItem[] {
    return parent ? parent.children : (selected.value?.items ?? [])
  }
  function addItem(parent?: NavItem) {
    listFor(parent).push({ id: uid(), label: '', url: '', children: [] })
    dirty.value = true
  }
  function removeItem(item: NavItem, parent?: NavItem) {
    const list = listFor(parent)
    const i = list.findIndex((x) => x.id === item.id)
    if (i >= 0) list.splice(i, 1)
    dirty.value = true
  }
  function move(item: NavItem, dir: -1 | 1, parent?: NavItem) {
    const list = listFor(parent)
    const i = list.findIndex((x) => x.id === item.id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= list.length) return
    const a = list[i]!
    const b = list[j]!
    list[i] = b
    list[j] = a
    dirty.value = true
  }
  function save() {
    dirty.value = false
    lastSaved.value = new Date().toISOString().slice(0, 16).replace('T', ' ')
  }

  return { menus, selectedId, selected, dirty, lastSaved, addItem, removeItem, move, save }
})
