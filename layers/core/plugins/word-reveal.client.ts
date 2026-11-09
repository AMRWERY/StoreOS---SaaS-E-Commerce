/**
 * Plays the word-by-word reveal (see utils/wordReveal.ts) for every
 * `[data-word-reveal]` element once it scrolls into view.
 *
 * It sets `data-visible` on the element and the CSS in transitions.css does
 * the animating. A MutationObserver picks up elements that appear later
 * (route changes, lazy components) so call sites need no setup of their own.
 */
export default defineNuxtPlugin(() => {
  const SELECTOR = "[data-word-reveal]:not([data-visible])";

  const reveal = (el: Element) => el.setAttribute("data-visible", "");

  // Very old browsers: skip the animation and just show the text.
  if (!("IntersectionObserver" in window)) {
    const showAll = () => document.querySelectorAll(SELECTOR).forEach(reveal);
    showAll();
    new MutationObserver(showAll).observe(document.body, {
      childList: true,
      subtree: true,
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.2 },
  );

  const scan = () => document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));

  let queued = false;
  const scheduleScan = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      scan();
    });
  };

  scan();
  new MutationObserver(scheduleScan).observe(document.body, {
    childList: true,
    subtree: true,
  });
});
