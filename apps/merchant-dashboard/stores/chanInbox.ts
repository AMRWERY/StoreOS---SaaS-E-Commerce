import type { InboxConversation, InboxProduct } from '@/types/insights'

export const useChanInboxStore = defineStore('chanInbox', () => {
  const conversations = ref<InboxConversation[]>([
    {
      id: 'C-1', customer: 'منى إبراهيم', channel: 'whatsapp', phone: '+20 100 234 5678', unread: true, time: '10:02',
      orders: [{ id: '#10482', total: 1250, status: 'delivered' }, { id: '#10511', total: 640, status: 'shipped' }],
      messages: [
        { id: 'm1', kind: 'customer', text: 'السلام عليكم، الهودي الأسود متاح مقاس L؟', time: '09:58' },
        { id: 'm2', kind: 'agent', text: 'وعليكم السلام يا فندم، أيوه متاح', time: '10:00' },
        { id: 'm3', kind: 'customer', text: 'تمام، ممكن أطلب 2 والدفع عند الاستلام؟', time: '10:02' },
      ],
    },
    {
      id: 'C-2', customer: 'Ahmed Samir', channel: 'instagram', phone: '@ahmed.samir', unread: true, time: '09:41',
      orders: [],
      messages: [
        { id: 'm1', kind: 'customer', text: 'Hi, do you ship to Alexandria? How long does it take?', time: '09:41' },
      ],
    },
    {
      id: 'C-3', customer: 'سلمى حجازي', channel: 'messenger', phone: 'fb.com/salma.h', unread: false, time: '16:31',
      orders: [{ id: '#10390', total: 2100, status: 'delivered' }],
      messages: [
        { id: 'm1', kind: 'customer', text: 'عايزة أستبدل الشنطة بلون تاني', time: '16:20' },
        { id: 'm2', kind: 'agent', text: 'أكيد، ابعتيلي رقم الأوردر وهظبطلك الاستبدال.', time: '16:31' },
      ],
    },
  ])
  const products = ref<InboxProduct[]>([
    { id: 'P-1', name: 'Cotton Oversized Hoodie - Black / L', price: 650 },
    { id: 'P-2', name: 'Canvas Sneakers - White / 42', price: 890 },
    { id: 'P-3', name: 'Leather Crossbody Bag', price: 1450 },
    { id: 'P-4', name: 'Linen Summer Shirt', price: 520 },
  ])
  const quickReplyKeys = ['greeting', 'inStock', 'shipping', 'codInfo', 'thanks'] as const
  let seq = 100

  function markRead(id: string) {
    const c = conversations.value.find((x) => x.id === id)
    if (c) c.unread = false
  }
  function send(id: string, text: string) {
    const c = conversations.value.find((x) => x.id === id)
    if (!c || !text.trim()) return
    seq += 1
    c.messages.push({ id: `m${seq}`, kind: 'agent', text: text.trim(), time: '10:05' })
  }
  function addDraft(id: string): string {
    const c = conversations.value.find((x) => x.id === id)
    seq += 1
    const draftId = `DRF-${seq}`
    if (c) c.messages.push({ id: `m${seq}`, kind: 'draft', text: '', draftId, time: '10:06' })
    return draftId
  }

  return { conversations, products, quickReplyKeys, markRead, send, addDraft }
})
