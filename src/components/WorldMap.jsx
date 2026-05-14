import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO numeric codes → slug mapping for shape highlighting
const ISO_TO_SLUG = {
  682: 'saudi-arabia',
  784: 'uae',
  634: 'qatar',
  414: 'kuwait',
  512: 'oman',
  48:  'bahrain',
  400: 'jordan',
  458: 'malaysia',
  702: 'singapore',
  462: 'maldives',
  380: 'italy',
  620: 'portugal',
  300: 'greece',
  642: 'romania',
  616: 'poland',
  348: 'hungary',
  191: 'croatia',
  203: 'czech-republic',
  440: 'lithuania',
  428: 'latvia',
  233: 'estonia',
  100: 'bulgaria',
  196: 'cyprus',
  703: 'slovakia',
  70:  'bosnia-herzegovina',
  50:  'bangladesh',
};

const COUNTRY_COORDS = {
  'saudi-arabia':       [45.1, 24],
  'uae':                [54, 24.5],
  'qatar':              [51.2, 25.3],
  'kuwait':             [47.7, 29.3],
  'oman':               [57.5, 23.6],
  'bahrain':            [50.5, 26],
  'jordan':             [36.2, 31.2],
  'malaysia':           [109.5, 4.2],
  'singapore':          [103.8, 1.35],
  'maldives':           [73.2, 3.2],
  'italy':              [12.6, 42.5],
  'portugal':           [-8.2, 39.4],
  'greece':             [22, 39.1],
  'romania':            [25, 45.9],
  'poland':             [19.5, 52.1],
  'hungary':            [19.5, 47.2],
  'croatia':            [15.2, 45.1],
  'czech-republic':     [15.5, 49.8],
  'lithuania':          [23.9, 55.9],
  'latvia':             [24.9, 56.9],
  'estonia':            [25, 58.6],
  'bulgaria':           [25.5, 42.7],
  'cyprus':             [33.4, 35.1],
  'slovakia':           [19.7, 48.7],
  'bosnia-herzegovina': [17.5, 43.9],
};

const BANGLADESH_COORDS = [90.3563, 23.6850];

const REGION_COLORS = {
  'Gulf':           '#C9A84C',
  'Middle East':    '#E8B84B',
  'Southeast Asia': '#4CAF50',
  'South Asia':     '#81C784',
  'Europe':         '#4FC3F7',
};

const REGION_ZOOM = {
  'Gulf':           { center: [50, 24],   zoom: 3.5 },
  'Middle East':    { center: [38, 30],   zoom: 3.5 },
  'Southeast Asia': { center: [108, 5],   zoom: 3.5 },
  'South Asia':     { center: [80, 20],   zoom: 3   },
  'Europe':         { center: [18, 50],   zoom: 3.5 },
};

const ALL_REGIONS = ['All', 'Gulf', 'Middle East', 'Southeast Asia', 'Europe'];

// Pulse animation CSS injected once
const PULSE_CSS = `
@keyframes bw-pulse {
  0%   { r: 7;  opacity: 0.7; }
  50%  { r: 13; opacity: 0;   }
  100% { r: 7;  opacity: 0.7; }
}
@keyframes bw-origin-pulse {
  0%   { r: 10; opacity: 0.6; }
  50%  { r: 20; opacity: 0;   }
  100% { r: 10; opacity: 0.6; }
}
@keyframes bw-panel-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0);   }
}
`;

export default function WorldMap({ countries }) {
  const navigate   = useNavigate();
  const [hovered,  setHovered]  = useState(null);
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState('All');
  const [zoom,     setZoom]     = useState(1);
  const [center,   setCenter]   = useState([30, 25]);
  const panelRef = useRef(null);

  // Inject pulse CSS once
  useEffect(() => {
    if (document.getElementById('bw-map-css')) return;
    const style = document.createElement('style');
    style.id = 'bw-map-css';
    style.textContent = PULSE_CSS;
    document.head.appendChild(style);
  }, []);

  // Close panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setSelected(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const visibleCountries = filter === 'All'
    ? countries
    : countries.filter(c => c.region === filter);

  const visibleSlugs = new Set(visibleCountries.map(c => c.slug));

  const handleMarkerClick = useCallback((country) => {
    setSelected(country);
    const reg = REGION_ZOOM[country.region];
    if (reg) { setCenter(reg.center); setZoom(reg.zoom); }
  }, []);

  const handleFilterClick = (region) => {
    setFilter(region);
    setSelected(null);
    if (region === 'All') {
      setZoom(1); setCenter([30, 25]);
    } else if (REGION_ZOOM[region]) {
      setCenter(REGION_ZOOM[region].center);
      setZoom(REGION_ZOOM[region].zoom);
    }
  };

  const selectedCountry = countries.find(c => c.slug === selected?.slug);

  return (
    <div style={{ fontFamily: 'inherit' }}>
      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {ALL_REGIONS.map(region => (
          <button
            key={region}
            onClick={() => handleFilterClick(region)}
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              border: filter === region
                ? `1.5px solid ${region === 'All' ? '#C9A84C' : REGION_COLORS[region]}`
                : '1.5px solid rgba(255,255,255,0.12)',
              background: filter === region
                ? region === 'All' ? 'rgba(201,168,76,0.15)' : `${REGION_COLORS[region]}22`
                : 'transparent',
              color: filter === region
                ? region === 'All' ? '#C9A84C' : REGION_COLORS[region]
                : 'rgba(255,255,255,0.45)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              letterSpacing: '0.04em',
            }}
          >
            {region}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', alignSelf: 'center' }}>
          {visibleCountries.length} countries
        </span>
      </div>

      {/* Map + sidebar wrapper */}
      <div style={{ display: 'flex', gap: 0, position: 'relative', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#060f1e' }}>

        {/* Map */}
        <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 140, center: [30, 30] }}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            viewBox="0 0 900 500"
          >
            <ZoomableGroup
              zoom={zoom}
              center={center}
              minZoom={1}
              maxZoom={8}
              onMoveEnd={({ zoom: z, coordinates }) => {
                setZoom(z);
                setCenter(coordinates);
              }}
            >
              {/* Country shapes */}
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const isoNum = parseInt(geo.id, 10);
                    const slug   = ISO_TO_SLUG[isoNum];
                    const isBangladesh = slug === 'bangladesh';
                    const country = slug ? countries.find(c => c.slug === slug) : null;
                    const isVisible = country && visibleSlugs.has(slug);
                    const isHov = hovered === slug;
                    const isSel = selected?.slug === slug;
                    const color = country ? (REGION_COLORS[country.region] || '#C9A84C') : null;

                    let fill = '#0b1e36';
                    let stroke = '#162d4a';
                    let strokeW = 0.4;

                    if (isBangladesh) {
                      fill = '#ff6b35';
                      stroke = '#ff8c5a';
                      strokeW = 0.8;
                    } else if (isVisible && color) {
                      if (isSel) {
                        fill = `${color}55`;
                        stroke = color;
                        strokeW = 1.2;
                      } else if (isHov) {
                        fill = `${color}44`;
                        stroke = color;
                        strokeW = 1;
                      } else {
                        fill = `${color}28`;
                        stroke = `${color}80`;
                        strokeW = 0.7;
                      }
                    }

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={strokeW}
                        style={{
                          default: { outline: 'none', transition: 'fill 0.2s ease' },
                          hover:   { outline: 'none' },
                          pressed: { outline: 'none' },
                        }}
                        onMouseEnter={() => isVisible && setHovered(slug)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                          if (isVisible && country) handleMarkerClick(country);
                        }}
                        style={{ cursor: isVisible ? 'pointer' : 'default', default: { outline: 'none', transition: 'fill 0.25s ease' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* Bangladesh origin marker */}
              <Marker coordinates={BANGLADESH_COORDS}>
                <circle
                  r={14}
                  fill="none"
                  stroke="#ff6b35"
                  strokeWidth={1.5}
                  opacity={0.5}
                  style={{ animation: 'bw-origin-pulse 2.4s ease-out infinite' }}
                />
                <circle r={7} fill="#ff6b35" opacity={0.95} />
                <circle r={3} fill="#fff" opacity={0.9} />
                <text
                  textAnchor="middle"
                  y={-14}
                  fontSize={7.5}
                  fontWeight={700}
                  fill="#ff8c5a"
                  style={{ userSelect: 'none', pointerEvents: 'none', letterSpacing: '0.05em' }}
                >
                  ORIGIN
                </text>
              </Marker>

              {/* Country markers */}
              {countries.map(country => {
                const coords = COUNTRY_COORDS[country.slug];
                if (!coords) return null;
                const isVisible = visibleSlugs.has(country.slug);
                const color = REGION_COLORS[country.region] || '#C9A84C';
                const isHov = hovered === country.slug;
                const isSel = selected?.slug === country.slug;

                return (
                  <Marker
                    key={country.slug}
                    coordinates={coords}
                    onClick={() => handleMarkerClick(country)}
                    onMouseEnter={() => setHovered(country.slug)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'pointer', opacity: isVisible ? 1 : 0.15, transition: 'opacity 0.2s ease' }}
                  >
                    {/* Pulse ring */}
                    {isVisible && (
                      <circle
                        r={7}
                        fill="none"
                        stroke={color}
                        strokeWidth={1.5}
                        opacity={0.6}
                        style={{ animation: `bw-pulse ${2 + Math.random() * 1.2}s ease-out infinite` }}
                      />
                    )}
                    {/* Dot */}
                    <circle
                      r={isSel ? 7 : isHov ? 6 : 4.5}
                      fill={isSel ? color : isHov ? color : color}
                      opacity={isVisible ? (isSel ? 1 : 0.9) : 0.2}
                      stroke={isSel ? '#fff' : 'none'}
                      strokeWidth={isSel ? 1.5 : 0}
                      style={{ transition: 'r 0.15s ease' }}
                    />
                    {/* Flag emoji */}
                    {isVisible && (
                      <text
                        textAnchor="middle"
                        y={-10}
                        fontSize={isHov || isSel ? 10 : 8}
                        style={{ pointerEvents: 'none', userSelect: 'none', transition: 'font-size 0.15s' }}
                      >
                        {country.flag}
                      </text>
                    )}
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          {/* Hint text */}
          <div style={{
            position: 'absolute', bottom: 12, left: 16,
            fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)',
            pointerEvents: 'none',
          }}>
            Click a country · Scroll to zoom · Drag to pan
          </div>
        </div>

        {/* Sidebar panel */}
        <div
          ref={panelRef}
          style={{
            width: selectedCountry ? 260 : 0,
            minWidth: selectedCountry ? 260 : 0,
            overflow: 'hidden',
            transition: 'width 0.3s ease, min-width 0.3s ease',
            borderLeft: selectedCountry ? '1px solid rgba(255,255,255,0.08)' : 'none',
            background: '#0a1628',
            flexShrink: 0,
          }}
        >
          {selectedCountry && (
            <div
              style={{ padding: '24px 20px', animation: 'bw-panel-in 0.25s ease', width: 260, boxSizing: 'border-box' }}
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: 4 }}
                aria-label="Close"
              >×</button>

              {/* Flag + name */}
              <div style={{ fontSize: '2.2rem', marginBottom: 6 }}>{selectedCountry.flag}</div>
              <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: '0 0 2px', lineHeight: 1.3 }}>
                {selectedCountry.name}
              </h3>
              <div style={{
                display: 'inline-block',
                fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: REGION_COLORS[selectedCountry.region] || '#C9A84C',
                marginBottom: 16,
              }}>
                {selectedCountry.region}
              </div>

              {/* Quick stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', width: 80, flexShrink: 0 }}>Visa</span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>{selectedCountry.visaType}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', width: 80, flexShrink: 0 }}>Processing</span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)' }}>{selectedCountry.processingTime}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', width: 80, flexShrink: 0 }}>Salary</span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>{selectedCountry.salaryRange}</span>
                </div>
              </div>

              {/* Top sectors */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
                  Top Sectors ({selectedCountry.topSectors?.length || 0})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {(selectedCountry.topSectors || []).map(s => (
                    <span key={s} style={{
                      fontSize: '0.7rem', padding: '3px 8px', borderRadius: 20,
                      background: `${REGION_COLORS[selectedCountry.region] || '#C9A84C'}18`,
                      border: `1px solid ${REGION_COLORS[selectedCountry.region] || '#C9A84C'}40`,
                      color: REGION_COLORS[selectedCountry.region] || '#C9A84C',
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate(`/countries/${selectedCountry.slug}`)}
                style={{
                  width: '100%', padding: '10px 0',
                  background: REGION_COLORS[selectedCountry.region] || '#C9A84C',
                  color: '#081e3f', fontWeight: 700, fontSize: '0.78rem',
                  border: 'none', borderRadius: 8, cursor: 'pointer',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                View Full Guide →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 20, padding: '12px 4px', flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff6b35' }} />
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Bangladesh (Origin)</span>
        </div>
        {Object.entries(REGION_COLORS).filter(([r]) => r !== 'South Asia').map(([region, color]) => (
          <div key={region} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{region}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

WorldMap.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({
    slug:          PropTypes.string,
    region:        PropTypes.string,
    flag:          PropTypes.string,
    name:          PropTypes.string,
    visaType:      PropTypes.string,
    processingTime:PropTypes.string,
    salaryRange:   PropTypes.string,
    topSectors:    PropTypes.arrayOf(PropTypes.string),
  })),
};
