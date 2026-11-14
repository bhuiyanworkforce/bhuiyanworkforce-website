// FAQPage JSON-LD content for English. Derived from the visible FAQ in
// src/content/pages.js so the marked-up Q&As always match what is on the page
// (Google expects structured data to mirror visible content). Edit the FAQ there, not here.
import { PAGE_CONTENT } from '../content/pages.js';

export const FAQ_EN = PAGE_CONTENT.en.faq.categories
  .flatMap((c) => c.items)
  .map(({ q, a }) => [q, a]);
