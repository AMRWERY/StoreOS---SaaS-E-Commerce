import type { InjectionKey, Reactive } from 'vue'
import type { BuilderEditorHero } from '@/types/builder'

export const builderEditorHeroKey: InjectionKey<Reactive<BuilderEditorHero>> = Symbol('builderEditorHero')

export function useBuilderEditorHero() {
  const hero = inject(builderEditorHeroKey)
  if (!hero) {
    throw new Error('useBuilderEditorHero must be used within BuilderShell (or a parent that provides hero state)')
  }
  return hero
}
