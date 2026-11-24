import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Decorative 3D-style globe for the home hero. It is an enhancement only:
//   - the server and the first client render output nothing, so pre-rendered HTML is unchanged
//   - it never loads on phones/tablets (the hero image column is hidden below 901px anyway),
//     on Data Saver, or on slow (2G) connections - those visitors keep the hero photo
//   - it waits until the browser is idle so it can never delay the headline or the photo
//   - reduced-motion and low-end devices get a still frame instead of an animation
const FADE_MS = 900;

function canShowGlobe() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  if (!window.matchMedia('(min-width: 901px)').matches) return false;
  const conn = navigator.connection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return false;
  return true;
}

function isLowPower() {
  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;
  return cores <= 2 || memory <= 2;
}

export default function HeroGlobe({ onActive }) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const canvasRef = useRef(null);

  // After hydration: decide whether this visitor gets the globe, then wait for idle time.
  useEffect(() => {
    if (!canShowGlobe()) return undefined;
    let cancelled = false;
    const schedule = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 400));
    const unschedule = window.cancelIdleCallback || window.clearTimeout;
    const handle = schedule(() => { if (!cancelled) setMounted(true); }, { timeout: 2500 });
    return () => { cancelled = true; unschedule(handle); };
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return undefined;
    let dead = false;
    let engine = null;
    let timer = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    import('./globe/engine.js')
      .then(({ createGlobe }) => {
        if (dead || !canvasRef.current) return;
        engine = createGlobe(canvasRef.current, {
          reducedMotion,
          lowPower: isLowPower(),
          onFirstFrame: () => {
            if (dead) return;
            setReady(true); // canvas cross-fades over the photo
            // Once the photo is fully covered, shrink it into a small inset.
            timer = window.setTimeout(() => { if (!dead && onActive) onActive(true); }, FADE_MS);
          },
        });
      })
      .catch(() => { /* the photo simply stays; nothing to recover */ });

    return () => {
      dead = true;
      window.clearTimeout(timer);
      if (engine) engine.destroy();
      if (onActive) onActive(false);
    };
  }, [mounted, onActive]);

  if (!mounted) return null;
  return <canvas ref={canvasRef} className={`bw-globe${ready ? ' is-ready' : ''}`} aria-hidden="true" />;
}

HeroGlobe.propTypes = {
  onActive: PropTypes.func,
};
