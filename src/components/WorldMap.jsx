import React, { useState } from 'react';
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

const COUNTRY_COORDS = {
  'saudi-arabia': { coords: [45.1, 24] },
  'uae':          { coords: [54, 24.5] },
  'qatar':        { coords: [51.2, 25.3] },
  'kuwait':       { coords: [47.7, 29.3] },
  'oman':         { coords: [57.5, 23.6] },
  'bahrain':      { coords: [50.5, 26] },
  'jordan':       { coords: [36.2, 31.2] },
  'malaysia':     { coords: [109.5, 4.2] },
  'singapore':    { coords: [103.8, 1.35] },
  'maldives':     { coords: [73.2, 3.2] },
  'italy':        { coords: [12.6, 42.5] },
  'portugal':     { coords: [-8.2, 39.4] },
  'greece':       { coords: [22, 39.1] },
  'romania':      { coords: [25, 45.9] },
  'poland':       { coords: [19.5, 52.1] },
  'hungary':      { coords: [19.5, 47.2] },
  'croatia':      { coords: [15.2, 45.1] },
  'czech-republic': { coords: [15.5, 49.8] },
  'lithuania':    { coords: [23.9, 55.9] },
  'latvia':       { coords: [24.9, 56.9] },
  'estonia':      { coords: [25, 58.6] },
  'bulgaria':     { coords: [25.5, 42.7] },
  'cyprus':       { coords: [33.4, 35.1] },
  'russia':       { coords: [60, 55] },
  'slovakia':     { coords: [19.7, 48.7] },
};

const REGION_COLORS = {
  'Gulf': '#C9A84C',
  'Middle East': '#E8B84B',
  'Southeast Asia': '#4CAF50',
  'South Asia': '#81C784',
  'Europe': '#4FC3F7',
};

export default function WorldMap({ countries }) {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative', width: '100%',
      background: '#0a1628', borderRadius: 'var(--radius-lg)',
      overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140, center: [30, 30] }}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        viewBox="0 0 900 440"
      >
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={4}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#0f2744"
                  stroke="#1a3a5c"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover:   { fill: '#1a3a5c', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {countries.map(country => {
            const data = COUNTRY_COORDS[country.slug];
            if (!data) return null;
            const color = REGION_COLORS[country.region] || '#C9A84C';
            const isHovered = hovered === country.slug;

            return (
              <Marker
                key={country.slug}
                coordinates={data.coords}
                onClick={() => navigate(`/countries/${country.slug}`)}
                onMouseEnter={() => setHovered(country.slug)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                {isHovered && (
                  <circle r={14} fill="none" stroke={color} strokeWidth={1.5} opacity={0.4} style={{ pointerEvents: 'none' }} />
                )}
                <circle
                  r={isHovered ? 8 : 5.5}
                  fill={color}
                  opacity={isHovered ? 1 : 0.9}
                  style={{ transition: 'r 0.15s ease' }}
                />
                <text textAnchor="middle" y={-13} fontSize={9} style={{ pointerEvents: 'none', userSelect: 'none' }}>
                  {country.flag}
                </text>
                {isHovered && (
                  <g style={{ pointerEvents: 'none' }}>
                    <rect x={-42} y={-36} width={84} height={22} rx={4} fill={color} opacity={0.96} />
                    <text textAnchor="middle" y={-21} fontSize={9} fontWeight={700} fill="#081e3f" style={{ userSelect: 'none' }}>
                      {country.name}
                    </text>
                  </g>
                )}
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      <div style={{ display: 'flex', gap: 20, padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap', alignItems: 'center' }}>
        {Object.entries(REGION_COLORS).map(([region, color]) => (
          <div key={region} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{region}</span>
          </div>
        ))}
        <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>
          Click any dot to view country details • Scroll to zoom
        </span>
      </div>
    </div>
  );
}

WorldMap.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
    region: PropTypes.string,
    flag: PropTypes.string,
    name: PropTypes.string,
  })),
};
