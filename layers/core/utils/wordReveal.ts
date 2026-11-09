export interface WordRevealLine {
  text: string;
  /** Classes applied to this line, e.g. a brand colour for a second line. */
  class?: string;
}

export interface WordRevealOptions {
  /** Wait this many ms before the first word. */
  delay?: number;
  /** Gap in ms between one word starting and the next. */
  stagger?: number;
}

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => ESCAPES[c]!);

/**
 * Builds markup that reveals text one word at a time.
 *
 * Use it with `v-html` on an element marked `data-word-reveal`; the client
 * plugin `word-reveal.client.ts` plays the animation when that element scrolls
 * into view (immediately, for text that is already on screen).
 *
 *   <h1 data-word-reveal v-html="wordReveal(t('home.hero.title'))" />
 *
 * Pass an array to give each line its own styling. The stagger continues
 * across lines, so a two-line headline reads as one sequence:
 *
 *   wordReveal([t('a'), { text: t('b'), class: 'text-brand' }])
 *
 * Words are split on spaces only, so Arabic words keep their letters joined.
 * All text and class names are HTML-escaped.
 */
export function wordReveal(
  lines: string | (string | WordRevealLine)[],
  { delay = 0, stagger = 80 }: WordRevealOptions = {},
): string {
  const list = Array.isArray(lines) ? lines : [lines];
  let index = 0;

  return list
    .map((line) => {
      const { text, class: cls } =
        typeof line === "string" ? { text: line, class: undefined } : line;

      const words = text
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => {
          const ms = delay + index++ * stagger;
          return `<span class="wr-word" style="--wr-delay:${ms}ms">${escapeHtml(word)}</span>`;
        })
        .join(" ");

      return cls ? `<span class="${escapeHtml(cls)}">${words}</span>` : words;
    })
    .join("<br>");
}
