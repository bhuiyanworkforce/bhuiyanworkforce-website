// Drop-in replacements for the react-router-dom pieces the site uses, so every internal
// link and redirect stays in the visitor's language. Components import from here instead of
// 'react-router-dom'; the paths they write stay English.
import React from 'react';
import {
  Link as RRLink,
  Navigate as RRNavigate,
  useNavigate as useRRNavigate,
  useLocation,
} from 'react-router-dom';
import { useLang } from './LanguageContext';
import { localizeTo } from './localize.js';

export { useLocation };

export const Link = React.forwardRef(function Link({ to, ...rest }, ref) {
  const { urlLang } = useLang();
  return <RRLink ref={ref} to={localizeTo(to, urlLang)} {...rest} />;
});

export function Navigate({ to, ...rest }) {
  const { urlLang } = useLang();
  return <RRNavigate to={localizeTo(to, urlLang)} {...rest} />;
}

export function useNavigate() {
  const navigate = useRRNavigate();
  const { urlLang } = useLang();
  return (to, options) => navigate(typeof to === 'string' ? localizeTo(to, urlLang) : to, options);
}

// Pages read their slug from here. The slug is always the English slug (the canonical id),
// resolved from the URL by the shared route module.
export function useParams() {
  return useLang().params;
}
