// UI string tables of the real (URL-prefixed) languages. Polish registers itself from
// translations.jsx; Arabic registers from ar-bundle.js once it has been loaded.
export const REAL_UI = {};

export function registerUi(lang, table) {
  REAL_UI[lang] = table;
}
