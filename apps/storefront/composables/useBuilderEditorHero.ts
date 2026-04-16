import type { InjectionKey, Reactive } from 'vue'

export interface BuilderEditorHero {
  headline: string
  subheadline: string
  buttonText: string
}

export const builderEditorHeroKey: InjectionKey<Reactive<BuilderEditorHero>> = Symbol('builderEditorHero')

export function useBuilderEditorHero() {
  const hero = inject(builderEditorHeroKey)
  if (!hero) {
    throw new Error('useBuilderEditorHero must be used within BuilderShell (or a parent that provides hero state)')
  }
  return hero
}
