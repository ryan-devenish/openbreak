import { useEffect, useRef } from 'react';

const AIRBNB_LISTING_ID = '1076961338909974204';
const AIRBNB_SCRIPT_URL = 'https://www.airbnb.com/embeddable/airbnb_jssdk';

export default function HostAttribution() {
  const embedRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const existingScript = document.querySelector(`script[src="${AIRBNB_SCRIPT_URL}"]`);
    if (existingScript) {
      scriptLoadedRef.current = true;
      return;
    }

    const script = document.createElement('script');
    script.src = AIRBNB_SCRIPT_URL;
    script.async = true;
    document.body.appendChild(script);
    scriptLoadedRef.current = true;

    return () => {
      // Don't remove on cleanup - Airbnb SDK should persist
    };
  }, []);

  return (
    <section className="host-attribution" aria-label="Camera host">
      <p className="attribution-label">This view is made possible by</p>

      <div className="airbnb-embed-wrapper" ref={embedRef}>
        <div
          className="airbnb-embed-frame"
          data-id={AIRBNB_LISTING_ID}
          data-view="home"
          data-hide-price="true"
        >
          <a href={`https://www.airbnb.com/rooms/${AIRBNB_LISTING_ID}?guests=1&adults=1&s=66&source=embed_widget`}>
            View On Airbnb
          </a>
          <a
            href={`https://www.airbnb.com/rooms/${AIRBNB_LISTING_ID}?guests=1&adults=1&s=66&source=embed_widget`}
            rel="nofollow"
          >
            Home in San Diego · ★5.0 · 2 bedrooms · 4 beds · 2 baths
          </a>
        </div>
      </div>

      <p className="concept-note">
        Concept placement. Property is not affiliated with OpenBreak.
      </p>
    </section>
  );
}
