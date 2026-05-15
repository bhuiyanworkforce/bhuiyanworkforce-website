/**
 * useSchema — inject page-specific JSON-LD structured data into <head>
 *
 * Usage:
 *   import useSchema from '../hooks/useSchema';
 *   useSchema({ "@context": "https://schema.org", "@type": "BreadcrumbList", ... });
 *
 * The script tag is removed when the component unmounts (page navigation).
 */
import { useEffect } from 'react';

export default function useSchema(schemaObject) {
  useEffect(() => {
    if (!schemaObject) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema-injected', 'true');
    script.textContent = JSON.stringify(schemaObject);
    document.head.appendChild(script);

    return () => {
      // Clean up on unmount so stale schemas don't persist across navigation
      document.head.removeChild(script);
    };
  }, [JSON.stringify(schemaObject)]);
}
