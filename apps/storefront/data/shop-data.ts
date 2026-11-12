import type { Category, Collection, ContentPage, GeoGovernorate, Localized, Product, ProductOption, ProductVariant, ShopOrder } from '@/types/shop'

const l = (en: string, ar: string): Localized => ({ en, ar })

export const CATEGORIES: Category[] = [
  { handle: 'apparel', title: l('Apparel', 'الملابس'), icon: 'lucide:shirt', tone: 0 },
  { handle: 'home', title: l('Home & Living', 'المنزل والمعيشة'), icon: 'lucide:lamp', tone: 1 },
  { handle: 'accessories', title: l('Accessories', 'الإكسسوارات'), icon: 'lucide:watch', tone: 2 },
  { handle: 'beauty', title: l('Beauty', 'الجمال'), icon: 'lucide:sparkles', tone: 3 },
]

export const COLLECTIONS: Collection[] = [
  { handle: 'all', title: l('All products', 'كل المنتجات'), description: l('Everything we make, in one place.', 'كل ما نقدمه في مكان واحد.'), tone: 0, icon: 'lucide:shopping-bag' },
  { handle: 'new-arrivals', title: l('New arrivals', 'وصل حديثاً'), description: l('Fresh pieces added this week.', 'قطع جديدة أضيفت هذا الأسبوع.'), tone: 1, icon: 'lucide:sparkles' },
  { handle: 'best-sellers', title: l('Best sellers', 'الأكثر مبيعاً'), description: l('The pieces our customers keep coming back for.', 'القطع التي يعود إليها عملاؤنا دائماً.'), tone: 2, icon: 'lucide:star' },
  { handle: 'summer-edit', title: l('The summer edit', 'تشكيلة الصيف'), description: l('Light fabrics and easy colours for hot days.', 'أقمشة خفيفة وألوان هادئة للأيام الحارة.'), tone: 3, icon: 'lucide:sun' },
]

const SIZES: ProductOption = {
  key: 'size', label: l('Size', 'المقاس'),
  values: [
    { value: 's', label: l('S', 'S') }, { value: 'm', label: l('M', 'M') },
    { value: 'l', label: l('L', 'L') }, { value: 'xl', label: l('XL', 'XL') },
  ],
}
const colors = (...vals: [string, string, string][]): ProductOption => ({
  key: 'color', label: l('Colour', 'اللون'),
  values: vals.map(([value, en, ar]) => ({ value, label: l(en, ar) })),
})

function build(id: string, price: number, options: ProductOption[], seed: number): ProductVariant[] {
  let combos: Record<string, string>[] = [{}]
  for (const o of options) {
    combos = combos.flatMap(c => o.values.map(v => ({ ...c, [o.key]: v.value })))
  }
  return combos.map((c, i) => ({
    id: `${id}-${i + 1}`,
    sku: `${id.toUpperCase()}-${Object.values(c).join('-').toUpperCase()}`,
    options: c,
    price: price + (c.size === 'xl' ? 40 : 0),
    stock: (i * 7 + seed) % 11 === 0 ? 0 : ((i * 5 + seed) % 9) + 1,
  }))
}

interface Seed {
  id: string; handle: string; title: Localized; description: Localized; price: number; compareAt?: number
  category: string; collections: string[]; options: ProductOption[]; rating: number; reviews: number
  tone: number; icon: string; isNew?: boolean; cod?: boolean
}

const seeds: Seed[] = [
  { id: 'p1', handle: 'linen-overshirt', title: l('Linen overshirt', 'قميص كتان خفيف'), description: l('A relaxed overshirt in breathable washed linen, cut for easy layering through the summer.', 'قميص مريح من الكتان المغسول القابل للتنفس، مصمم للطبقات الخفيفة طوال الصيف.'), price: 890, compareAt: 1090, category: 'apparel', collections: ['all', 'best-sellers', 'summer-edit'], options: [SIZES, colors(['sand', 'Sand', 'رملي'], ['olive', 'Olive', 'زيتي'])], rating: 4.8, reviews: 126, tone: 0, icon: 'lucide:shirt' },
  { id: 'p2', handle: 'everyday-tee', title: l('Everyday cotton tee', 'تيشيرت قطن يومي'), description: l('Heavyweight combed cotton with a soft hand and a clean neckline. Made to be worn on repeat.', 'قطن ممشط ثقيل بملمس ناعم وياقة نظيفة. مصمم ليُرتدى باستمرار.'), price: 420, category: 'apparel', collections: ['all', 'best-sellers'], options: [SIZES, colors(['white', 'White', 'أبيض'], ['black', 'Black', 'أسود'], ['sage', 'Sage', 'أخضر فاتح'])], rating: 4.6, reviews: 312, tone: 1, icon: 'lucide:shirt' },
  { id: 'p3', handle: 'wide-leg-trousers', title: l('Wide-leg trousers', 'بنطلون واسع'), description: l('High-waisted trousers with a fluid drape and deep pockets.', 'بنطلون بخصر عالٍ وانسدال انسيابي وجيوب عميقة.'), price: 1150, category: 'apparel', collections: ['all', 'new-arrivals'], options: [SIZES, colors(['stone', 'Stone', 'حجري'], ['navy', 'Navy', 'كحلي'])], rating: 4.7, reviews: 58, tone: 2, icon: 'lucide:shirt', isNew: true },
  { id: 'p4', handle: 'ceramic-table-lamp', title: l('Ceramic table lamp', 'مصباح طاولة سيراميك'), description: l('Hand-glazed ceramic base with a linen shade that casts a warm, even glow.', 'قاعدة سيراميك مطلية يدوياً مع غطاء كتان يمنح إضاءة دافئة ومتوازنة.'), price: 1650, compareAt: 1950, category: 'home', collections: ['all', 'new-arrivals'], options: [colors(['cream', 'Cream', 'كريمي'], ['clay', 'Clay', 'طيني'])], rating: 4.9, reviews: 41, tone: 3, icon: 'lucide:lamp', isNew: true },
  { id: 'p5', handle: 'stoneware-mug-set', title: l('Stoneware mug set', 'طقم أكواب ستونوير'), description: l('Set of four hand-finished mugs. Dishwasher and microwave safe.', 'طقم من أربعة أكواب مصنوعة يدوياً، آمنة للغسالة والميكروويف.'), price: 560, category: 'home', collections: ['all', 'best-sellers'], options: [colors(['speckled', 'Speckled', 'منقط'], ['charcoal', 'Charcoal', 'فحمي'])], rating: 4.5, reviews: 203, tone: 4, icon: 'lucide:coffee' },
  { id: 'p6', handle: 'woven-throw-blanket', title: l('Woven throw blanket', 'بطانية منسوجة'), description: l('Soft cotton-blend throw with fringed edges, ideal for the sofa or the foot of the bed.', 'بطانية ناعمة من خليط القطن بحواف مهدبة، مناسبة للأريكة أو نهاية السرير.'), price: 980, category: 'home', collections: ['all'], options: [colors(['oat', 'Oat', 'شوفاني'], ['rust', 'Rust', 'صدأ'], ['ink', 'Ink', 'حبري'])], rating: 4.4, reviews: 77, tone: 5, icon: 'lucide:bed' },
  { id: 'p7', handle: 'leather-card-holder', title: l('Leather card holder', 'حافظة بطاقات جلد'), description: l('Slim full-grain leather card holder that ages beautifully.', 'حافظة بطاقات نحيفة من الجلد الطبيعي تزداد جمالاً مع الوقت.'), price: 380, category: 'accessories', collections: ['all', 'best-sellers'], options: [colors(['tan', 'Tan', 'عسلي'], ['black', 'Black', 'أسود'])], rating: 4.7, reviews: 164, tone: 0, icon: 'lucide:wallet' },
  { id: 'p8', handle: 'minimal-watch', title: l('Minimal quartz watch', 'ساعة كوارتز بسيطة'), description: l('A 38mm stainless steel case, sapphire-coated glass and a quiet dial.', 'علبة ستانلس ستيل 38 مم وزجاج مغطى بالسافير وميناء هادئ.'), price: 2450, compareAt: 2900, category: 'accessories', collections: ['all', 'new-arrivals'], options: [colors(['silver', 'Silver', 'فضي'], ['gold', 'Gold', 'ذهبي'])], rating: 4.8, reviews: 89, tone: 1, icon: 'lucide:watch', isNew: true },
  { id: 'p9', handle: 'canvas-tote', title: l('Canvas tote bag', 'حقيبة قماش'), description: l('Roomy washed-canvas tote with an inside zip pocket.', 'حقيبة قماش واسعة مغسولة مع جيب داخلي بسحاب.'), price: 340, category: 'accessories', collections: ['all', 'summer-edit'], options: [colors(['natural', 'Natural', 'طبيعي'], ['black', 'Black', 'أسود'])], rating: 4.3, reviews: 241, tone: 2, icon: 'lucide:shopping-bag' },
  { id: 'p10', handle: 'sun-shades', title: l('Acetate sunglasses', 'نظارة شمس أسيتات'), description: l('Polarised lenses in a hand-polished acetate frame with UV400 protection.', 'عدسات مستقطبة بإطار أسيتات مصقول يدوياً وحماية UV400.'), price: 720, category: 'accessories', collections: ['all', 'summer-edit'], options: [colors(['tortoise', 'Tortoise', 'سلحفاة'], ['black', 'Black', 'أسود'])], rating: 4.5, reviews: 98, tone: 3, icon: 'lucide:glasses' },
  { id: 'p11', handle: 'rose-body-oil', title: l('Rose body oil', 'زيت الجسم بالورد'), description: l('A lightweight dry oil with rose and almond that absorbs in seconds.', 'زيت جاف خفيف بالورد واللوز يمتص خلال ثوانٍ.'), price: 310, category: 'beauty', collections: ['all', 'best-sellers'], options: [{ key: 'volume', label: l('Size', 'الحجم'), values: [{ value: '100', label: l('100 ml', '100 مل') }, { value: '250', label: l('250 ml', '250 مل') }] }], rating: 4.9, reviews: 402, tone: 4, icon: 'lucide:droplet' },
  { id: 'p12', handle: 'clay-face-mask', title: l('Clay face mask', 'ماسك الطين للوجه'), description: l('Purifying kaolin clay mask that leaves skin soft and clear.', 'ماسك كاولين منقٍّ يترك البشرة ناعمة ونقية.'), price: 260, category: 'beauty', collections: ['all', 'new-arrivals', 'summer-edit'], options: [{ key: 'volume', label: l('Size', 'الحجم'), values: [{ value: '75', label: l('75 ml', '75 مل') }, { value: '150', label: l('150 ml', '150 مل') }] }], rating: 4.2, reviews: 51, tone: 5, icon: 'lucide:flower-2', isNew: true },
]

export const PRODUCTS: Product[] = seeds.map((s, i) => ({
  ...s,
  cod: s.cod ?? true,
  variants: build(s.id, s.price, s.options, i + 3),
}))

export const GOVERNORATES: GeoGovernorate[] = [
  {
    value: 'cairo', label: l('Cairo', 'القاهرة'),
    cities: [
      { value: 'nasr-city', label: l('Nasr City', 'مدينة نصر'), areas: [{ value: 'hay-sabaa', label: l('7th District', 'الحي السابع') }, { value: 'abbas-akkad', label: l('Abbas El Akkad', 'عباس العقاد') }] },
      { value: 'new-cairo', label: l('New Cairo', 'القاهرة الجديدة'), areas: [{ value: 'fifth-settlement', label: l('Fifth Settlement', 'التجمع الخامس') }, { value: 'rehab', label: l('Al Rehab', 'الرحاب') }] },
      { value: 'maadi', label: l('Maadi', 'المعادي'), areas: [{ value: 'degla', label: l('Degla', 'دجلة') }, { value: 'sarayat', label: l('Sarayat', 'السرايات') }] },
    ],
  },
  {
    value: 'giza', label: l('Giza', 'الجيزة'),
    cities: [
      { value: 'dokki', label: l('Dokki', 'الدقي'), areas: [{ value: 'mesaha', label: l('Mesaha Square', 'ميدان المساحة') }] },
      { value: 'sheikh-zayed', label: l('Sheikh Zayed', 'الشيخ زايد'), areas: [{ value: 'beverly-hills', label: l('Beverly Hills', 'بيفرلي هيلز') }, { value: 'zayed-3', label: l('District 3', 'الحي الثالث') }] },
    ],
  },
  {
    value: 'alexandria', label: l('Alexandria', 'الإسكندرية'),
    cities: [
      { value: 'smouha', label: l('Smouha', 'سموحة'), areas: [{ value: 'smouha-main', label: l('Smouha Centre', 'وسط سموحة') }] },
      { value: 'montaza', label: l('Montaza', 'المنتزه'), areas: [{ value: 'sidi-bishr', label: l('Sidi Bishr', 'سيدي بشر') }, { value: 'mandara', label: l('Mandara', 'المندرة') }] },
    ],
  },
]

export const CONTENT_PAGES: ContentPage[] = [
  {
    slug: 'about', title: l('About us', 'من نحن'),
    intro: l('We design everyday essentials made to last, and ship them across Egypt.', 'نصمم أساسيات يومية تدوم طويلاً ونوصلها إلى كل أنحاء مصر.'),
    sections: [
      { heading: l('Our story', 'قصتنا'), body: l('Started in a small Cairo studio, our label grew from a simple idea: fewer, better things. Every piece is made with careful materials and sold at honest prices.', 'بدأنا في استوديو صغير بالقاهرة بفكرة بسيطة: قطع أقل وجودة أفضل. كل قطعة تُصنع بخامات منتقاة وتُباع بأسعار عادلة.') },
      { heading: l('How we work', 'طريقتنا في العمل'), body: l('We work with small workshops, test every product ourselves and keep our range focused so quality never slips.', 'نعمل مع ورش صغيرة ونختبر كل منتج بأنفسنا ونحافظ على تشكيلة مركزة حتى لا تتراجع الجودة.') },
    ],
  },
  {
    slug: 'shipping', title: l('Shipping policy', 'سياسة الشحن'),
    intro: l('Fast, trackable delivery to every governorate.', 'توصيل سريع وقابل للتتبع إلى كل المحافظات.'),
    sections: [
      { heading: l('Delivery times', 'مدة التوصيل'), body: l('Greater Cairo and Alexandria: 1 to 2 business days. Other governorates: 3 to 5 business days.', 'القاهرة الكبرى والإسكندرية: من يوم إلى يومين عمل. باقي المحافظات: من 3 إلى 5 أيام عمل.') },
      { heading: l('Shipping costs', 'تكلفة الشحن'), body: l('Standard delivery is a flat fee. Orders above the free-shipping threshold ship free.', 'التوصيل العادي برسم ثابت. الطلبات التي تتجاوز حد الشحن المجاني تُشحن مجاناً.') },
      { heading: l('Cash on delivery', 'الدفع عند الاستلام'), body: l('Pay the courier in cash when your order arrives. Please keep your phone on so the courier can reach you.', 'ادفع نقداً للمندوب عند وصول طلبك. يرجى إبقاء هاتفك مفتوحاً ليتمكن المندوب من الوصول إليك.') },
    ],
  },
  {
    slug: 'returns', title: l('Returns & exchanges', 'الإرجاع والاستبدال'),
    intro: l('Not quite right? Send it back within 14 days.', 'لم يعجبك المنتج؟ أعده خلال 14 يوماً.'),
    sections: [
      { heading: l('Eligibility', 'شروط الإرجاع'), body: l('Items must be unused, unwashed and in their original packaging with tags attached.', 'يجب أن تكون القطع غير مستخدمة وغير مغسولة وفي عبوتها الأصلية مع الملصقات.') },
      { heading: l('Refunds', 'الاسترداد'), body: l('Refunds are issued to the original payment method, or as store credit for cash on delivery orders, within 5 business days of receiving the return.', 'يتم الاسترداد إلى وسيلة الدفع الأصلية، أو كرصيد في المتجر للطلبات المدفوعة عند الاستلام، خلال 5 أيام عمل من استلام المرتجع.') },
    ],
  },
  {
    slug: 'privacy', title: l('Privacy policy', 'سياسة الخصوصية'),
    intro: l('How we collect, use and protect your information.', 'كيف نجمع معلوماتك ونستخدمها ونحميها.'),
    sections: [
      { heading: l('What we collect', 'ما الذي نجمعه'), body: l('We collect the details you give us at checkout, such as your name, phone number and delivery address, to fulfil your order.', 'نجمع البيانات التي تقدمها عند الشراء مثل الاسم ورقم الهاتف وعنوان التوصيل لتنفيذ طلبك.') },
      { heading: l('Payments', 'المدفوعات'), body: l('Card details are handled by our payment provider and never touch our servers.', 'تتم معالجة بيانات البطاقة عبر مزود الدفع ولا تمر على خوادمنا إطلاقاً.') },
    ],
  },
]

export const MOCK_ORDERS: ShopOrder[] = [
  {
    id: 'SO-10482', placedAt: '2026-11-08', status: 'out_for_delivery', paymentMethod: 'cod',
    items: [
      { title: PRODUCTS[0]!.title, variantLabel: 'M / Sand', qty: 1, unitPrice: 890, tone: 0, icon: 'lucide:shirt' },
      { title: PRODUCTS[6]!.title, variantLabel: 'Tan', qty: 2, unitPrice: 380, tone: 0, icon: 'lucide:wallet' },
    ],
    subtotal: 1650, shipping: 0, discount: 0, total: 1650, address: 'Nasr City, Cairo', phone: '01012345678',
  },
  {
    id: 'SO-10377', placedAt: '2026-10-29', status: 'delivered', paymentMethod: 'card',
    items: [{ title: PRODUCTS[3]!.title, variantLabel: 'Cream', qty: 1, unitPrice: 1650, tone: 3, icon: 'lucide:lamp' }],
    subtotal: 1650, shipping: 0, discount: 165, total: 1485, address: 'Sheikh Zayed, Giza', phone: '01012345678',
  },
  {
    id: 'SO-10291', placedAt: '2026-10-12', status: 'cancelled', paymentMethod: 'wallet',
    items: [{ title: PRODUCTS[10]!.title, variantLabel: '100 ml', qty: 2, unitPrice: 310, tone: 4, icon: 'lucide:droplet' }],
    subtotal: 620, shipping: 60, discount: 0, total: 680, address: 'Smouha, Alexandria', phone: '01012345678',
  },
]

export const FREE_SHIPPING_THRESHOLD = 1500
export const STANDARD_SHIPPING = 60
export const EXPRESS_SHIPPING = 110
export const DISCOUNT_CODES: Record<string, { type: 'percent' | 'shipping'; value: number }> = {
  WELCOME10: { type: 'percent', value: 10 },
  FREESHIP: { type: 'shipping', value: 100 },
}
