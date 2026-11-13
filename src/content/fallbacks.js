// Records every place where a real language (ar, pl) fell back to English so the
// page generator can list them at the end of the build. Missing translations never
// fail the build, and they never silently disappear either.

const seen = new Map();

export function recordFallback(kind, lang, key) {
  const id = `${lang}|${kind}|${key}`;
  if (!seen.has(id)) seen.set(id, { kind, lang, key });
}

export function getFallbackReport() {
  return [...seen.values()];
}

export function clearFallbacks() {
  seen.clear();
}
