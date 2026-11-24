// Hero globe: a dotted Earth with glowing routes from Bangladesh to every destination country.
// Plain canvas 2D, no dependencies. Loaded on demand by HeroGlobe.jsx, never in the main bundle.
//
// Care for visitors on modest devices:
//   - pauses when scrolled off-screen or when the tab is hidden
//   - lowers its own resolution, then stops animating, if frames get slow
//   - `reducedMotion` / `lowPower` render a single still frame instead of a loop

import { GLOBE_LAND_ROWS } from '../../data/globeLand.js';
import { COUNTRY_COORDS, BANGLADESH_COORDS } from '../../data/geo.js';

const DEG = Math.PI / 180;
const TILT = 22 * DEG; // camera looks slightly down on the northern hemisphere
const CENTER_LON = 62; // between Bangladesh and the Gulf / Europe
const SWAY_DEG = 34; // gentle left-right sweep instead of a full spin
const ARC_SAMPLES = 44;
const TAIL = 9; // samples in the glowing comet tail

const GOLD = '201,168,76';
const GOLD_LIGHT = '232,201,122';

const toVec = (lat, lon) => {
  const la = lat * DEG;
  const lo = lon * DEG;
  const c = Math.cos(la);
  return [c * Math.sin(lo), Math.sin(la), c * Math.cos(lo)];
};

function decodeLand(rows) {
  const out = [];
  for (const row of rows) {
    const lat = row[0];
    const n = row[1];
    let idx = 0;
    let isLand = false;
    for (let r = 2; r < row.length; r++) {
      const run = row[r];
      if (isLand) {
        for (let k = 0; k < run; k++) {
          const v = toVec(lat, -180 + ((idx + k + 0.5) * 360) / n);
          out.push(v[0], v[1], v[2]);
        }
      }
      idx += run;
      isLand = !isLand;
    }
  }
  return new Float32Array(out);
}

function buildArcs() {
  const origin = toVec(BANGLADESH_COORDS[1], BANGLADESH_COORDS[0]);
  const arcs = [];
  const entries = Object.values(COUNTRY_COORDS);
  entries.forEach(([lon, lat], i) => {
    const dest = toVec(lat, lon);
    const dot = Math.min(1, Math.max(-1, origin[0] * dest[0] + origin[1] * dest[1] + origin[2] * dest[2]));
    const angle = Math.acos(dot);
    if (angle < 0.02) return;
    const sin = Math.sin(angle);
    const lift = 0.05 + 0.2 * (angle / Math.PI);
    const pts = new Float32Array((ARC_SAMPLES + 1) * 3);
    for (let s = 0; s <= ARC_SAMPLES; s++) {
      const t = s / ARC_SAMPLES;
      const a = Math.sin((1 - t) * angle) / sin;
      const b = Math.sin(t * angle) / sin;
      const h = 1 + lift * Math.sin(Math.PI * t);
      pts[s * 3] = (a * origin[0] + b * dest[0]) * h;
      pts[s * 3 + 1] = (a * origin[1] + b * dest[1]) * h;
      pts[s * 3 + 2] = (a * origin[2] + b * dest[2]) * h;
    }
    arcs.push({
      pts,
      end: dest,
      phase: ((i * 0.6180339887) % 1),
      speed: 0.16 + ((i * 7) % 5) * 0.018,
    });
  });
  return { origin, arcs };
}

function makeGlow(size, rgb) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${rgb},0.95)`);
  grad.addColorStop(0.25, `rgba(${rgb},0.35)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export function createGlobe(canvas, options = {}) {
  const { reducedMotion = false, lowPower = false, onFirstFrame } = options;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { destroy() {} };

  const land = decodeLand(GLOBE_LAND_ROWS);
  const { origin, arcs } = buildArcs();
  const glow = makeGlow(64, GOLD_LIGHT);

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let yawOffset = 0; // set by dragging
  let dragging = false;
  let lastX = 0;
  let visible = true;
  let animate = !(reducedMotion || lowPower);
  let rafId = 0;
  let startedAt = 0;
  let lastFrameAt = 0;
  let slowFrames = 0;
  let sampleFrames = 0;
  let sampleTime = 0;
  let sampleCost = 0;
  let firstFrameSent = false;
  let destroyed = false;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!animate) draw(0);
  };

  function draw(timeSec) {
    ctx.clearRect(0, 0, w, h);
    const R = Math.min(w, h) * 0.43;
    const cx = w / 2;
    const cy = h / 2;

    const yaw = (CENTER_LON + (animate ? SWAY_DEG * Math.sin(timeSec * 0.11) : 0) + yawOffset) * DEG;
    const cY = Math.cos(yaw);
    const sY = Math.sin(yaw);
    const cT = Math.cos(TILT);
    const sT = Math.sin(TILT);

    // Returns screen x/y and depth in out[0..2].
    const out = [0, 0, 0];
    const project = (x, y, z, scale) => {
      const x1 = x * cY - z * sY;
      const z1 = x * sY + z * cY;
      const y2 = y * cT - z1 * sT;
      const z2 = y * sT + z1 * cT;
      out[0] = cx + x1 * R * scale;
      out[1] = cy - y2 * R * scale;
      out[2] = z2;
      return out;
    };

    // Soft outer glow behind the planet.
    const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.28);
    halo.addColorStop(0, `rgba(${GOLD},0.22)`);
    halo.addColorStop(0.45, 'rgba(60,130,210,0.10)');
    halo.addColorStop(1, 'rgba(60,130,210,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.28, 0, Math.PI * 2);
    ctx.fill();

    // Ocean.
    const ocean = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
    ocean.addColorStop(0, '#1d4f84');
    ocean.addColorStop(0.55, '#0f2f57');
    ocean.addColorStop(1, '#071a33');
    ctx.fillStyle = ocean;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    // Land dots: faint on the far side, brighter toward the viewer.
    const dotSize = Math.max(1.5, R / 100);
    for (let i = 0; i < land.length; i += 3) {
      const p = project(land[i], land[i + 1], land[i + 2], 1);
      const z = p[2];
      if (z > 0) {
        ctx.globalAlpha = 0.38 + 0.57 * z;
        ctx.fillStyle = `rgb(${GOLD_LIGHT})`;
      } else {
        ctx.globalAlpha = 0.06;
        ctx.fillStyle = `rgb(${GOLD_LIGHT})`;
      }
      ctx.fillRect(p[0] - dotSize / 2, p[1] - dotSize / 2, dotSize, dotSize);
    }
    ctx.globalAlpha = 1;

    // Routes. A point is visible if it is on the near side, or outside the planet's disc.
    const visibleAt = (px, py, z) => {
      if (z >= 0) return true;
      const dx = (px - cx) / R;
      const dy = (py - cy) / R;
      return dx * dx + dy * dy > 1;
    };

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const line = Math.max(1, R / 190);
    const screen = new Float32Array((ARC_SAMPLES + 1) * 3);

    for (const arc of arcs) {
      const pts = arc.pts;
      for (let s = 0; s <= ARC_SAMPLES; s++) {
        const p = project(pts[s * 3], pts[s * 3 + 1], pts[s * 3 + 2], 1);
        screen[s * 3] = p[0];
        screen[s * 3 + 1] = p[1];
        screen[s * 3 + 2] = visibleAt(p[0], p[1], p[2]) ? 1 : 0;
      }

      // Base route.
      ctx.strokeStyle = `rgba(${GOLD},0.26)`;
      ctx.lineWidth = line;
      ctx.beginPath();
      let pen = false;
      for (let s = 0; s <= ARC_SAMPLES; s++) {
        if (screen[s * 3 + 2]) {
          if (pen) ctx.lineTo(screen[s * 3], screen[s * 3 + 1]);
          else { ctx.moveTo(screen[s * 3], screen[s * 3 + 1]); pen = true; }
        } else pen = false;
      }
      ctx.stroke();

      // Moving highlight. In a still frame, show it part-way along every route.
      const t = animate ? (timeSec * arc.speed + arc.phase) % 1 : 0.45 + arc.phase * 0.5;
      const head = Math.floor(t * ARC_SAMPLES);
      const from = Math.max(0, head - TAIL);
      for (let pass = 0; pass < 2; pass++) {
        const start = pass === 0 ? from : Math.max(0, head - 3);
        ctx.strokeStyle = pass === 0 ? `rgba(${GOLD_LIGHT},0.5)` : `rgba(255,248,225,0.95)`;
        ctx.lineWidth = pass === 0 ? line * 1.5 : line * 2;
        ctx.beginPath();
        pen = false;
        for (let s = start; s <= head; s++) {
          if (screen[s * 3 + 2]) {
            if (pen) ctx.lineTo(screen[s * 3], screen[s * 3 + 1]);
            else { ctx.moveTo(screen[s * 3], screen[s * 3 + 1]); pen = true; }
          } else pen = false;
        }
        ctx.stroke();
      }
      if (screen[head * 3 + 2]) {
        const gs = R * 0.07;
        ctx.drawImage(glow, screen[head * 3] - gs / 2, screen[head * 3 + 1] - gs / 2, gs, gs);
      }

      // Destination node.
      const e = project(arc.end[0], arc.end[1], arc.end[2], 1);
      if (e[2] > 0) {
        const gs = R * 0.085;
        ctx.drawImage(glow, e[0] - gs / 2, e[1] - gs / 2, gs, gs);
        ctx.fillStyle = `rgb(${GOLD_LIGHT})`;
        ctx.beginPath();
        ctx.arc(e[0], e[1], Math.max(1.4, R / 150), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Bangladesh: the origin, with a slow pulse.
    const o = project(origin[0], origin[1], origin[2], 1);
    if (o[2] > -0.05) {
      const pulse = animate ? (timeSec * 0.55) % 1 : 0.3;
      ctx.strokeStyle = `rgba(255,248,225,${0.65 * (1 - pulse)})`;
      ctx.lineWidth = line * 1.2;
      ctx.beginPath();
      ctx.arc(o[0], o[1], R * (0.03 + 0.08 * pulse), 0, Math.PI * 2);
      ctx.stroke();
      const gs = R * 0.17;
      ctx.drawImage(glow, o[0] - gs / 2, o[1] - gs / 2, gs, gs);
      ctx.fillStyle = '#fff8e1';
      ctx.beginPath();
      ctx.arc(o[0], o[1], Math.max(2.4, R / 72), 0, Math.PI * 2);
      ctx.fill();
    }

    // Rim light so the sphere reads as a solid.
    const rim = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R);
    rim.addColorStop(0, 'rgba(120,180,255,0)');
    rim.addColorStop(1, 'rgba(120,180,255,0.22)');
    ctx.fillStyle = rim;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    if (!firstFrameSent) {
      firstFrameSent = true;
      if (onFirstFrame) onFirstFrame();
    }
  }

  function frame(now) {
    rafId = 0;
    if (destroyed || !animate || !visible || document.hidden) return;
    if (!startedAt) startedAt = now;
    const t0 = performance.now();
    draw((now - startedAt) / 1000);
    const cost = performance.now() - t0;

    // Adaptive quality. Judge by how long drawing takes and by how far frames fall behind,
    // not by raw fps, so browsers that cap animation at 30fps (battery saver) keep animating.
    if (lastFrameAt) {
      sampleTime += now - lastFrameAt;
      sampleCost += cost;
      sampleFrames++;
      if (sampleFrames >= 45) {
        const avgGap = sampleTime / sampleFrames;
        const avgCost = sampleCost / sampleFrames;
        sampleFrames = 0;
        sampleTime = 0;
        sampleCost = 0;
        if (avgCost > 10 || avgGap > 50) {
          slowFrames++;
          if (dpr > 1) {
            dpr = 1;
            resize();
          } else if (slowFrames >= 2) {
            animate = false; // settle on a still frame rather than stutter
            draw(0);
            return;
          }
        } else slowFrames = 0;
      }
    }
    lastFrameAt = now;
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (rafId || destroyed || !animate || !visible || document.hidden) return;
    lastFrameAt = 0;
    sampleFrames = 0;
    sampleTime = 0;
    sampleCost = 0;
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  const onVisibility = () => (document.hidden ? stop() : start());
  const ro = new ResizeObserver(resize);
  const io = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) start();
    else stop();
  });

  // Drag to turn the globe. It never blocks page scrolling (touch-action: pan-y in CSS).
  const onDown = (e) => {
    dragging = true;
    lastX = e.clientX;
    canvas.setPointerCapture?.(e.pointerId);
    canvas.style.cursor = 'grabbing';
  };
  const onMove = (e) => {
    if (!dragging) return;
    yawOffset -= (e.clientX - lastX) * 0.35;
    lastX = e.clientX;
    if (!animate) draw(0);
  };
  const onUp = (e) => {
    dragging = false;
    canvas.releasePointerCapture?.(e.pointerId);
    canvas.style.cursor = '';
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);

  document.addEventListener('visibilitychange', onVisibility);
  ro.observe(canvas);
  io.observe(canvas);
  resize();
  if (animate) {
    draw(0); // paint immediately so the fade-in has something to show
    start();
  }

  return {
    destroy() {
      destroyed = true;
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
    },
  };
}
