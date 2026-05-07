<template>
  <div class="space-y-6">
    <SettingGroup title="Carousel" default-open>
      <SettingText v-model="heading" label="Heading" />
      <div class="mt-4">
        <SettingRange v-model="peek" label="Side peek" :min="0" :max="40" unit="%" />
      </div>
      <div class="mt-4">
        <SettingToggle v-model="loop" label="Infinite loop" />
      </div>
    </SettingGroup>

    <SettingGroup title="Card style">
      <SettingRadioCards v-model="cardStyle" label="Design" :options="cardStyleOptions" />
    </SettingGroup>

    <SettingCategoryPicker v-model="category" label="Source category" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str, num, bool } = useSectionSettingsForm()
const heading = str('heading', 'You may also like')
const peek = num('peek_pct', 12)
const loop = bool('loop', true)
const category = str('category_id', '')
const cardStyle = str('card_style', 'shop')

const cardStyleOptions = [
  {
    value: 'shop',
    label: 'Shop',
    icon: 'ph:shopping-bag-bold',
    description: 'Category · stars · add button',
  },
  {
    value: 'sale',
    label: 'Sale',
    icon: 'ph:tag-bold',
    description: 'Discount badge + wishlist',
  },
  {
    value: 'horizontal',
    label: 'Horizontal',
    icon: 'ph:list-bold',
    description: 'Small image · details right',
  },
  {
    value: 'editorial',
    label: 'Editorial',
    icon: 'ph:article-bold',
    description: 'Image top · CTA button',
  },
]
</script>
