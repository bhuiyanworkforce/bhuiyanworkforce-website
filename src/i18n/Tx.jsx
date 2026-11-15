import PropTypes from 'prop-types';
import { useLang } from './LanguageContext';
import { tx } from './extra.js';

// <Tx>English text</Tx> renders the current language's version of a hard-coded page string.
export default function Tx({ children }) {
  const { lang } = useLang();
  return tx(lang, children);
}

Tx.propTypes = { children: PropTypes.string.isRequired };
