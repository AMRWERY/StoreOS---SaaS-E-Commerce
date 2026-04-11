import type { InjectionKey, Reactive } from 'vue'
import { inject } from 'vue'

export interface BuilderEditorHero {
  headline: string
  subheadline: string
  buttonText: string
}

export const builderEditorHeroKey: InjectionKey<Reactive<BuilderEditorHero>> = Symbol('builderEditorHero')

export function useBuilderEditorHero() {
  const hero = inject(builderEditorHeroKey)
  if (!hero) {
    throw new Error('useBuilderEditorHero must be used within BuilderEditorWorkspace')
  }
  return hero
}
