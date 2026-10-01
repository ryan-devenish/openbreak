import { CAMERA, SPONSOR, calculateDistance, formatDistance } from '../data/prototype';

export default function LocalSponsor() {
  const distanceMiles = calculateDistance(
    CAMERA.coordinates.lat,
    CAMERA.coordinates.lng,
    SPONSOR.coordinates.lat,
    SPONSOR.coordinates.lng
  );
  const distanceText = formatDistance(distanceMiles);

  return (
    <section className="local-sponsor" aria-label="Nearby sponsor">
      <p className="sponsor-label">NEARBY</p>
      <div className="sponsor-card">
        {SPONSOR.image && (
          <div className="sponsor-photo">
            <img src={SPONSOR.image} alt={SPONSOR.name} />
          </div>
        )}
        <div className="sponsor-info">
          <p className="sponsor-name">{SPONSOR.name}</p>
          <p className="sponsor-meta">
            {SPONSOR.category} · {distanceText}
          </p>
        </div>

        {SPONSOR.offer && (
          <div className="sponsor-offer">
            <p className="offer-eyebrow">CONCEPT OFFER</p>
            <p className="offer-headline">Free drink</p>
            <p className="offer-detail">Mention OpenBreak*</p>
          </div>
        )}

        <a
          href={SPONSOR.website}
          target="_blank"
          rel="noopener noreferrer"
          className="sponsor-link"
        >
          View on Google Maps →
        </a>
      </div>

      <p className="concept-note">
        {SPONSOR.offer?.status === 'concept'
          ? '*Concept offer only · Not an actual promotion. Business is not affiliated with OpenBreak.'
          : 'Concept placement. Not affiliated with OpenBreak.'}
      </p>
    </section>
  );
}
