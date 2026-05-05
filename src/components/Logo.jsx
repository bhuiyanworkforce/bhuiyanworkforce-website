import React from 'react';
import PropTypes from 'prop-types';

// Light version: gold globe on navy bg, white text (for dark headers/footers)
// Dark version: navy globe on gold bg, navy text (for light backgrounds)
export function LogoSVG({ variant = 'light', width = 200 }) {
  const isLight = variant === 'light';
  const circleFill   = isLight ? '#C8952A' : '#0B2C5E';
  const strokeColor  = isLight ? '#0B2C5E' : '#ffffff';
  const textColor    = isLight ? '#ffffff'  : '#0B2C5E';
  const taglineColor = isLight ? '#C8952A'  : '#0B2C5E';
  const scale = width / 200;
  const h = Math.round(40 * scale);

  return (
    <svg width={width} height={h} viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" aria-label="Bhuiyan Workforce Ltd.">
      {/* Globe mark */}
      <circle cx="20" cy="20" r="18" fill={circleFill}/>
      <circle cx="20" cy="20" r="13" fill="none" stroke={strokeColor} strokeWidth="0.8"/>
      <ellipse cx="20" cy="20" rx="7" ry="13" fill="none" stroke={strokeColor} strokeWidth="0.6"/>
      <line x1="7" y1="20" x2="33" y2="20" stroke={strokeColor} strokeWidth="0.6"/>
      <ellipse cx="20" cy="20" rx="13" ry="6" fill="none" stroke={strokeColor} strokeWidth="0.6"/>
      <polygon points="20,4 17.5,9 20,7.5 22.5,9" fill={strokeColor}/>
      <circle cx="20" cy="20" r="3" fill={strokeColor}/>
      <circle cx="20" cy="20" r="1.5" fill={circleFill}/>
      {/* Divider */}
      <rect x="44" y="8" width="1" height="24" rx="0.5" fill={isLight ? 'rgba(200,149,42,0.5)' : 'rgba(11,44,94,0.3)'}/>
      {/* Wordmark */}
      <text x="50" y="24" fontFamily="Georgia,serif" fontSize="14" fontWeight="700" fill={textColor}>BHUIYAN</text>
      <text x="51" y="34" fontFamily="Arial,sans-serif" fontSize="5" letterSpacing="2.5" fill={taglineColor}>WORKFORCE LTD.</text>
    </svg>
  );
}

LogoSVG.propTypes = {
  variant: PropTypes.string,
  width: PropTypes.number,
};

export default LogoSVG;
