// Privacy-first PostHog analytics (EU region). Loaded only in the browser, only after the page has
// finished loading and the browser is idle, so it can never slow down what a visitor sees.
//
// Choices made for visitors:
//   - no cookies or local storage (persistence: memory), so no consent banner is needed
//   - Do Not Track is respected
//   - no autocapture, no session recording, no surveys, no feature-flag requests
//   - page views (including route changes) and web vitals only, plus one custom event
//   - never runs on localhost or preview hosts

const KEY = 'phc_CJH4H2eoDjipJ7EEsC7pvYHgSnSUKfHmaeEFF54aX7BR'; // public project key, safe in client code
const HOST = 'https://eu.i.posthog.com';

let client = null;
const pending = [];

// Record a custom event. Safe to call at any time; events wait until PostHog has loaded.
export function track(name, props) {
  if (client) client.capture(name, props);
  else if (pending.length < 20) pending.push([name, props]);
}

function shouldRun() {
  if (typeof window === 'undefined') return false;
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return false;
  const host = window.location.hostname;
  return host === 'bhuiyanworkforce.com' || host === 'www.bhuiyanworkforce.com';
}

export function initAnalytics() {
  if (!shouldRun()) return;

  const load = () => {
    import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.init(KEY, {
          api_host: HOST,
          ui_host: 'https://eu.posthog.com',
          persistence: 'memory',
          person_profiles: 'identified_only',
          autocapture: false,
          capture_pageview: 'history_change',
          capture_pageleave: false,
          capture_performance: { web_vitals: true },
          disable_session_recording: true,
          disable_surveys: true,
          advanced_disable_feature_flags: true,
          advanced_disable_flags: true,
          respect_dnt: true,
        });
        client = posthog;
        pending.splice(0).forEach(([name, props]) => posthog.capture(name, props));
      })
      .catch(() => { /* analytics is optional; never surface an error to a visitor */ });
  };

  const whenIdle = () => {
    if (window.requestIdleCallback) window.requestIdleCallback(load, { timeout: 4000 });
    else window.setTimeout(load, 1500);
  };

  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });
}
