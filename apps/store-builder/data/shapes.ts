/**
 * Universal "shape" options available on every block (Advanced settings → Shape).
 * Applied as data attributes on the block wrapper and styled in assets/css/section-shapes.css.
 */

export interface ShapeOption {
  value: string
  label: string
  icon: string
}

export interface ShapeGroup {
  /** Settings key stored on the section. */
  key: 'shape_corners' | 'shape_buttons' | 'shape_images' | 'shape_cards'
  /** data-* attribute name on the wrapper. */
  attr: 'data-corners' | 'data-buttons' | 'data-images' | 'data-cards'
  label: string
  options: ShapeOption[]
}

export const SHAPE_GROUPS: ShapeGroup[] = [
  {
    key: 'shape_corners',
    attr: 'data-corners',
    label: 'Corners',
    options: [
      { value: 'default', label: 'Default', icon: 'ph:square-half-bold' },
      { value: 'sharp', label: 'Sharp', icon: 'ph:square-bold' },
      { value: 'soft', label: 'Soft', icon: 'ph:app-window-bold' },
      { value: 'round', label: 'Round', icon: 'ph:circle-notch-bold' },
    ],
  },
  {
    key: 'shape_buttons',
    attr: 'data-buttons',
    label: 'Buttons',
    options: [
      { value: 'default', label: 'Default', icon: 'ph:cursor-click-bold' },
      { value: 'square', label: 'Square', icon: 'ph:rectangle-bold' },
      { value: 'pill', label: 'Pill', icon: 'ph:pill-bold' },
    ],
  },
  {
    key: 'shape_images',
    attr: 'data-images',
    label: 'Images',
    options: [
      { value: 'default', label: 'Default', icon: 'ph:image-bold' },
      { value: 'square', label: 'Square', icon: 'ph:image-square-bold' },
      { value: 'rounded', label: 'Rounded', icon: 'ph:frame-corners-bold' },
      { value: 'circle', label: 'Circle', icon: 'ph:user-circle-bold' },
    ],
  },
  {
    key: 'shape_cards',
    attr: 'data-cards',
    label: 'Cards',
    options: [
      { value: 'default', label: 'Default', icon: 'ph:cards-bold' },
      { value: 'flat', label: 'Flat', icon: 'ph:rectangle-dashed-bold' },
      { value: 'outlined', label: 'Outlined', icon: 'ph:selection-bold' },
      { value: 'elevated', label: 'Elevated', icon: 'ph:stack-bold' },
    ],
  },
]

/** `data-*` attributes for a block wrapper; `default` values are omitted. */
export function shapeAttrs(settings: Record<string, unknown>): Record<string, string> {
  const attrs: Record<string, string> = {}
  for (const g of SHAPE_GROUPS) {
    const v = settings[g.key]
    if (typeof v === 'string' && v && v !== 'default') attrs[g.attr] = v
  }
  return attrs
}
