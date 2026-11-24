import { useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext';

// Gentle reveal-on-scroll for section headings and cards.
//
// Safe by design:
//   - nothing is hidden in the HTML; the server renders everything visible, and this only runs
//     in the browser after hydration
//   - only elements that start below the fold are touched, so nothing visible on load ever flickers
//   - skipped entirely for visitors who prefer reduced motion
//   - uses a CSS animation that ends back at the normal styles, so card hover effects are untouched
const SELECTOR = [
  '.section-header',
  '.service-card',
  '.process-step',
  '.why-feature',
  '.bw-founding-benefit',
  '.blog-card',
].join(',');

export default function ScrollReveal() {
  const { route } = useLang();

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const fold = window.innerHeight * 0.92;
    const targets = Array.from(document.querySelectorAll(SELECTOR)).filter(
      (el) => !el.dataset.rv && el.getBoundingClientRect().top > fold,
    );
    if (!targets.length) return undefined;

    // Stagger siblings that enter together (cards in a grid), up to five steps.
    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          const parent = el.parentElement;
          const i = seen.get(parent) || 0;
          seen.set(parent, i + 1);
          el.style.setProperty('--rv-i', String(Math.min(i, 5)));
          el.dataset.rv = 'show';
          io.unobserve(el);
        }
        // A new batch of siblings starts again from zero on the next callback.
        seen.clear();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    for (const el of targets) {
      el.dataset.rv = 'hide';
      io.observe(el);
    }

    return () => {
      io.disconnect();
      for (const el of targets) {
        if (el.dataset.rv === 'hide') delete el.dataset.rv; // never leave anything stranded hidden
      }
    };
  }, [route]);

  return null;
}
