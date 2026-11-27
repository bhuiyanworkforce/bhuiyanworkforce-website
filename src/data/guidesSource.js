// Indirection so the browser build can swap the 436 kB guide text for an empty stub (see vite.config.js)
// and load the real thing on demand. Node scripts, tests and the static build use this file as is.
export { default } from './guidesData.js';
