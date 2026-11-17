import React from 'react';

// These page strings are loaded with each language's locale bundle (ar, pl, bg, el, hr, sr, bs, ...), not shipped in
// the default English client bundle. Each row is { file, en, <lang code> }. Only exact static text and safe text
// attributes are translated; URLs, form values, identifiers, and user data stay
// untouched.
const TABLES = new Map();
const TEXT_ATTRIBUTES = new Set(['alt', 'aria-label', 'placeholder', 'title']);

// opts.skipFiles: source files whose rows are left out (their strings are already translated through <Tx>).
export function registerStaticPageTranslations(locale, rows, opts = {}) {
  const skip = new Set(opts.skipFiles || []);
  const pages = Object.create(null);
  for (const row of rows || []) {
    if (!row || typeof row.file !== 'string' || typeof row.en !== 'string' || typeof row[locale] !== 'string') continue;
    if (skip.has(row.file)) continue;
    if (!pages[row.file]) pages[row.file] = new Map();
    pages[row.file].set(row.en.trim(), row[locale].trim());
  }
  TABLES.set(locale, pages);
}

function translateNode(node, map) {
  if (typeof node === 'string') {
    const text = node.trim();
    if (!text) return node;
    const translated = map.get(text);
    if (translated === undefined) return node;
    const prefix = node.match(/^\s*/)?.[0] || '';
    const suffix = node.match(/\s*$/)?.[0] || '';
    return `${prefix}${translated}${suffix}`;
  }
  if (Array.isArray(node)) return React.Children.toArray(node).map((child) => translateNode(child, map));
  if (!React.isValidElement(node)) return node;
  if (typeof node.type === 'function' && node.type.name === 'Tx') return node;

  let changed = false;
  const props = {};
  for (const [key, value] of Object.entries(node.props)) {
    if (key === 'children') {
      const translated = translateNode(value, map);
      props.children = translated;
      changed ||= translated !== value;
    } else if (TEXT_ATTRIBUTES.has(key) && typeof value === 'string') {
      const translated = map.get(value) ?? value;
      props[key] = translated;
      changed ||= translated !== value;
    } else {
      props[key] = value;
    }
  }
  return changed ? React.cloneElement(node, props) : node;
}

// True once a language has registered static page strings (so callers can skip per-string fallbacks).
export function hasStaticPageTranslations(locale, file) {
  if (file) return Boolean(TABLES.get(locale)?.[file]);
  return TABLES.has(locale);
}

export function StaticPageLocalizer({ locale, file, children }) {
  const map = TABLES.get(locale)?.[file];
  if (!map) return children;
  return React.createElement(React.Fragment, null, translateNode(children, map));
}
