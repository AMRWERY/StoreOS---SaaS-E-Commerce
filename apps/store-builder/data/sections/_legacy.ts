import type { SectionDefinition } from '@/types/sections'

/** Metadata for the original blocks. Their settings forms are hand-written. */
const legacy: SectionDefinition[] = [
  { type: 'hero_banner', name: 'Hero banner', category: 'hero', description: 'Big headline over a background image with a call to action', icon: 'ph:image-bold', popular: true, defaults: { headline: 'Welcome to our store', subheadline: 'Discover products made for you.', buttonText: 'Shop now' } },
  { type: 'hero_slideshow', name: 'Hero slideshow', category: 'hero', description: 'Rotating slides with headlines and buttons', icon: 'ph:slideshow-bold', defaults: {} },
  { type: 'hero_split', name: 'Split hero', category: 'hero', description: 'Text on one side, image on the other', icon: 'ph:columns-bold', popular: true, defaults: { headline: 'Split hero', subheadline: 'Supporting line.' } },
  { type: 'hero_video', name: 'Hero video', category: 'hero', description: 'Full-bleed video background with overlay text', icon: 'ph:video-bold', defaults: {} },
  { type: 'banner_full', name: 'Full-width banner', category: 'hero', description: 'Promotional image banner across the page', icon: 'ph:rectangle-bold', defaults: {} },
  { type: 'banner_split', name: 'Split banner', category: 'hero', description: 'Two promotional tiles side by side', icon: 'ph:square-split-horizontal-bold', defaults: {} },
  { type: 'products_grid', name: 'Products grid', category: 'products', description: 'A grid of products with several card styles', icon: 'ph:squares-four-bold', popular: true, defaults: { heading: 'Products', columns: 3 } },
  { type: 'products_carousel', name: 'Products carousel', category: 'products', description: 'Scrollable row of products', icon: 'ph:arrows-left-right-bold', defaults: {} },
  { type: 'product_featured', name: 'Featured product', category: 'products', description: 'Spotlight a single product', icon: 'ph:star-bold', defaults: {} },
  { type: 'categories_grid', name: 'Categories grid', category: 'products', description: 'Tiles that link to your categories', icon: 'ph:grid-four-bold', defaults: {} },
  { type: 'rich_text', name: 'Rich text', category: 'content', description: 'Heading and paragraph text', icon: 'ph:text-aa-bold', defaults: { heading: 'New block', body: 'Start writing…' } },
  { type: 'image_text', name: 'Image & text', category: 'content', description: 'Image next to a text block', icon: 'ph:image-square-bold', defaults: {} },
  { type: 'faq_accordion', name: 'FAQ', category: 'content', description: 'Expandable questions and answers', icon: 'ph:question-bold', defaults: {} },
  { type: 'image_gallery', name: 'Image gallery', category: 'media', description: 'Grid of photos', icon: 'ph:images-bold', defaults: {} },
  { type: 'video_embed', name: 'Video', category: 'media', description: 'Embed a YouTube or Vimeo video', icon: 'ph:play-circle-bold', defaults: {} },
  { type: 'countdown_timer', name: 'Countdown', category: 'marketing', description: 'Timer to a sale or launch date', icon: 'ph:timer-bold', defaults: {} },
  { type: 'testimonials', name: 'Testimonials', category: 'social_proof', description: 'Customer quotes', icon: 'ph:chats-circle-bold', defaults: {} },
  { type: 'trust_badges', name: 'Trust badges', category: 'social_proof', description: 'Shipping, returns and security reassurance', icon: 'ph:seal-check-bold', defaults: { heading: 'Why shop with us' } },
  { type: 'logo_bar', name: 'Logo bar', category: 'social_proof', description: 'Brands and partners', icon: 'ph:buildings-bold', defaults: { heading: 'As seen in' } },
  { type: 'newsletter_form', name: 'Newsletter', category: 'forms', description: 'Email signup', icon: 'ph:envelope-simple-bold', defaults: {} },
  { type: 'contact_form', name: 'Contact form', category: 'forms', description: 'Let customers send you a message', icon: 'ph:paper-plane-tilt-bold', defaults: { heading: 'Contact us', submitLabel: 'Send' } },
  { type: 'spacer', name: 'Spacer', category: 'layout', description: 'Empty vertical space', icon: 'ph:arrows-out-line-vertical-bold', defaults: { height: 48 } },
  { type: 'divider', name: 'Divider', category: 'layout', description: 'A thin separating line', icon: 'ph:minus-bold', defaults: {} },
  { type: 'custom_html', name: 'Custom HTML', category: 'layout', description: 'Your own HTML snippet', icon: 'ph:code-bold', defaults: {} },
]

export default legacy
