export type TourPlacement = 'top' | 'bottom' | 'start' | 'end' | 'center'

export type TourAction =
  | 'tab:Sections'
  | 'tab:Blocks'
  | 'tab:Theme'
  | 'panel:navbar-settings'
  | 'panel:footer-settings'
  | 'panel:site-settings'
  | 'panel:empty'

export interface TourText {
  en: string
  ar: string
}

export interface TourStep {
  id: string
  /** CSS selector; omit for a centered card */
  target?: string
  placement?: TourPlacement
  action?: TourAction
  title: TourText
  body: TourText
}

export const TOUR_UI = {
  next: { en: 'Next', ar: 'التالي' },
  back: { en: 'Back', ar: 'السابق' },
  skip: { en: 'Skip tour', ar: 'تخطي الجولة' },
  done: { en: 'Done', ar: 'تم' },
  start: { en: 'Start tour', ar: 'ابدأ الجولة' },
  close: { en: 'Close tour', ar: 'إغلاق الجولة' },
  stepOf: { en: 'Step {n} of {total}', ar: 'الخطوة {n} من {total}' },
  guide: { en: 'Guide', ar: 'الدليل' },
  guideTitle: { en: 'Take a quick tour of the builder', ar: 'خذ جولة سريعة في أداة البناء' },
  dontShow: { en: "Don't show this again", ar: 'لا تعرض هذا مرة أخرى' },
} satisfies Record<string, TourText>

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    placement: 'center',
    title: { en: 'Welcome to your store builder', ar: 'أهلاً بك في أداة بناء متجرك' },
    body: {
      en: "Let's build your store in a few easy steps. This quick tour shows you where everything is. It only takes a minute.",
      ar: 'دعنا نبني متجرك في خطوات بسيطة. ستعرّفك هذه الجولة السريعة على مكان كل شيء، ولن تستغرق أكثر من دقيقة.',
    },
  },
  {
    id: 'website',
    target: '[data-tour="website"]',
    placement: 'end',
    title: { en: 'Name your website', ar: 'اختر اسم موقعك' },
    body: {
      en: 'Start here. Type your store name and pick the language your customers will read.',
      ar: 'ابدأ من هنا. اكتب اسم متجرك واختر اللغة التي سيقرأ بها عملاؤك.',
    },
  },
  {
    id: 'pages',
    target: '[data-tour="pages"]',
    placement: 'end',
    title: { en: 'Your pages', ar: 'صفحات متجرك' },
    body: {
      en: 'Your store is made of pages like Home, About and Contact. Click a page to edit it, or add a new one.',
      ar: 'يتكوّن متجرك من صفحات مثل الرئيسية ومن نحن وتواصل معنا. اضغط على أي صفحة لتعديلها أو أضف صفحة جديدة.',
    },
  },
  {
    id: 'template',
    target: '[data-tour="template-btn"]',
    placement: 'end',
    title: { en: 'Start from a ready-made design', ar: 'ابدأ من تصميم جاهز' },
    body: {
      en: "Don't want to start from zero? Pick a ready-made page design and customize it however you like.",
      ar: 'لا تريد البدء من الصفر؟ اختر تصميم صفحة جاهزاً ثم عدّله كما تشاء.',
    },
  },
  {
    id: 'blocks-tab',
    target: '[data-tour="blocks-tab"]',
    placement: 'end',
    action: 'tab:Blocks',
    title: { en: 'Open the Blocks tab', ar: 'افتح تبويب البلوكات' },
    body: {
      en: 'Blocks are the building pieces of a page, such as banners, products and reviews. They all live in this tab.',
      ar: 'البلوكات هي أجزاء بناء الصفحة، مثل البانرات والمنتجات والتقييمات. ستجدها كلها في هذا التبويب.',
    },
  },
  {
    id: 'blocks-library',
    target: '[data-tour="blocks-library"]',
    placement: 'end',
    action: 'tab:Blocks',
    title: { en: 'Add blocks to your page', ar: 'أضف بلوكات إلى صفحتك' },
    body: {
      en: 'Click a block, or drag it into the preview, to add it to your page. You can add as many as you need.',
      ar: 'اضغط على أي بلوك أو اسحبه إلى المعاينة لإضافته إلى صفحتك. يمكنك إضافة ما تحتاجه من البلوكات.',
    },
  },
  {
    id: 'preview',
    target: '[data-tour="preview"]',
    placement: 'top',
    action: 'tab:Sections',
    title: { en: 'Your live page', ar: 'صفحتك مباشرة' },
    body: {
      en: 'This is how your page looks right now. Click any section to edit it, and drag its handle to change the order.',
      ar: 'هكذا تبدو صفحتك الآن. اضغط على أي قسم لتعديله، واسحب مقبضه لتغيير الترتيب.',
    },
  },
  {
    id: 'settings-panel',
    target: '[data-tour="settings-panel"]',
    placement: 'start',
    title: { en: 'Edit the selected section', ar: 'عدّل القسم المحدد' },
    body: {
      en: 'When you select a section, its options show up here: text, images, buttons and more. Changes appear instantly.',
      ar: 'عند تحديد قسم تظهر خياراته هنا: النصوص والصور والأزرار وغيرها. وتظهر التغييرات فوراً.',
    },
  },
  {
    id: 'global',
    target: '[data-tour="global"]',
    placement: 'end',
    action: 'panel:navbar-settings',
    title: { en: 'Navbar, Footer and Site settings', ar: 'الشريط العلوي والتذييل وإعدادات الموقع' },
    body: {
      en: 'These shared parts appear on every page. Edit your menu, footer and general site settings once, and it updates everywhere.',
      ar: 'هذه الأجزاء المشتركة تظهر في كل الصفحات. عدّل القائمة والتذييل وإعدادات الموقع مرة واحدة وسيتحدّث كل شيء.',
    },
  },
  {
    id: 'theme-tab',
    target: '[data-tour="theme-tab"]',
    placement: 'end',
    action: 'tab:Theme',
    title: { en: 'Make it yours with a theme', ar: 'امنح متجرك هويته بالسمة' },
    body: {
      en: 'Choose your brand colors, fonts and the shape of buttons and cards. One change restyles your whole store.',
      ar: 'اختر ألوان علامتك وخطوطها وشكل الأزرار والبطاقات. تغيير واحد يعيد تنسيق متجرك بالكامل.',
    },
  },
  {
    id: 'languages',
    target: '[data-tour="languages"]',
    placement: 'bottom',
    action: 'tab:Sections',
    title: { en: 'Store languages', ar: 'لغات المتجر' },
    body: {
      en: 'Selling in more than one language? Switch the store language here and translate your content.',
      ar: 'هل تبيع بأكثر من لغة؟ بدّل لغة المتجر من هنا وترجم محتواك.',
    },
  },
  {
    id: 'device-toggle',
    target: '[data-tour="device-toggle"]',
    placement: 'bottom',
    title: { en: 'Check it on mobile', ar: 'جرّبه على الجوال' },
    body: {
      en: 'Most shoppers use their phones. Switch between desktop, tablet and mobile to see how your store looks on each.',
      ar: 'معظم المتسوقين يستخدمون هواتفهم. بدّل بين الحاسوب واللوحي والجوال لترى شكل متجرك في كل منها.',
    },
  },
  {
    id: 'undo-redo',
    target: '[data-tour="undo-redo"]',
    placement: 'bottom',
    title: { en: 'Made a mistake? Undo it', ar: 'أخطأت؟ تراجع بسهولة' },
    body: {
      en: 'Undo and redo any change with these buttons. Experiment freely, nothing is permanent until you publish.',
      ar: 'تراجع عن أي تغيير أو أعده بهذين الزرين. جرّب بحرية، فلا شيء نهائي حتى تنشر.',
    },
  },
  {
    id: 'preview-btn',
    target: '[data-tour="preview-btn"]',
    placement: 'bottom',
    title: { en: 'Preview your store', ar: 'عاين متجرك' },
    body: {
      en: 'Open your store in a new tab to see it exactly like your customers will, before anyone else does.',
      ar: 'افتح متجرك في تبويب جديد لتراه تماماً كما سيراه عملاؤك، قبل أن يراه أي شخص آخر.',
    },
  },
  {
    id: 'publish-btn',
    target: '[data-tour="publish-btn"]',
    placement: 'bottom',
    title: { en: 'Publish when you are ready', ar: 'انشر عندما تكون جاهزاً' },
    body: {
      en: 'Happy with your store? Press Publish to make it live for your customers.',
      ar: 'هل أعجبك متجرك؟ اضغط على نشر ليصبح متاحاً لعملائك.',
    },
  },
  {
    id: 'done',
    placement: 'center',
    action: 'panel:empty',
    title: { en: "You're all set!", ar: 'أنت جاهز تماماً!' },
    body: {
      en: 'That is everything you need to build your store. You can replay this guide any time from the Guide button in the top bar.',
      ar: 'هذا كل ما تحتاجه لبناء متجرك. يمكنك إعادة هذا الدليل في أي وقت من زر الدليل في الشريط العلوي.',
    },
  },
]
