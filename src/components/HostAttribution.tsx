const AIRBNB_LISTING_ID = '1076961338909974204';
const AIRBNB_URL = `https://www.airbnb.com/rooms/${AIRBNB_LISTING_ID}?guests=1&adults=1&s=66&source=embed_widget`;

function AirbnbMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="airbnb-card-mark">
      <path
        d="M16 4.25c2.35 0 3.95 2.04 5.34 4.42 1.44 2.46 2.78 5.4 4.3 8.3 1.03 1.98 1.46 3.66 1.46 5.13 0 2.97-1.8 5.15-4.52 5.15-2.02 0-3.97-1.23-5.96-3.2L16 23.43l-.62.62c-1.99 1.97-3.94 3.2-5.96 3.2-2.72 0-4.52-2.18-4.52-5.15 0-1.47.43-3.15 1.46-5.13 1.52-2.9 2.86-5.84 4.3-8.3C12.05 6.29 13.65 4.25 16 4.25Zm0 4.1c-.9 0-1.78 1.11-2.8 2.86-1.11 1.9-2.24 4.35-3.7 7.14-.76 1.46-1.1 2.59-1.1 3.41 0 1.18.48 1.84 1.4 1.84 1.06 0 2.28-.83 3.66-2.19l.7-.7c-1.42-1.57-2.2-3.06-2.2-4.47 0-2.23 1.7-3.91 4.04-3.91s4.04 1.68 4.04 3.91c0 1.41-.78 2.9-2.2 4.47l.7.7c1.38 1.36 2.6 2.19 3.66 2.19.92 0 1.4-.66 1.4-1.84 0-.82-.34-1.95-1.1-3.41-1.46-2.79-2.59-5.24-3.7-7.14-1.02-1.75-1.9-2.86-2.8-2.86Zm0 6.7c-.95 0-1.58.62-1.58 1.42 0 .67.45 1.52 1.58 2.77 1.13-1.25 1.58-2.1 1.58-2.77 0-.8-.63-1.42-1.58-1.42Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function HostAttribution() {
  return (
    <section className="host-attribution" aria-label="Camera host">
      <p className="attribution-label">This view is made possible by</p>

      <a className="airbnb-card" href={AIRBNB_URL} target="_blank" rel="noreferrer nofollow">
        <div className="airbnb-card-image-wrap">
          <img
            className="airbnb-card-image"
            src="/images/windansea-property.jpg"
            alt="Oceanfront Airbnb property near Windansea"
          />
        </div>

        <div className="airbnb-card-body">
          <div className="airbnb-card-brand" aria-label="Airbnb">
            <AirbnbMark />
            <span>airbnb</span>
          </div>

          <div className="airbnb-card-copy">
            <strong>Oceanfront Penthouse</strong>
            <span>Home in San Diego</span>
            <span>★ 5.0 · 2 bedrooms · 4 beds · 2 baths</span>
          </div>

          <span className="airbnb-card-cta">View listing ↗</span>
        </div>
      </a>

      <p className="concept-note">
        Concept placement. Property is not affiliated with OpenBreak.
      </p>
    </section>
  );
}
