/** Minimal typing for Vite's `import.meta.glob` (vite/client types are not resolvable from this app). */
interface ImportMeta {
  glob<T = unknown>(pattern: string, options: { eager: true }): Record<string, T>
  glob<T = unknown>(pattern: string, options?: { eager?: false }): Record<string, () => Promise<T>>
}
