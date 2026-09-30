import { DEMO_LOCAL_OFFER as offer } from '../data/prototype';
export default function LocalOffer() {
  return <aside className="local-offer" aria-label="Example business placement">
    <p className="eyebrow">YOUR PLACEMENT <span>EXAMPLE</span></p>
    <p className="offer-business">{offer.business} <span>{offer.address}</span></p>
    <h3>{offer.offer}</h3><p>Example sponsor placement. No partnership implied.</p>
  <a href={offer.url} target="_blank" rel="noopener noreferrer">Visit Lahaina Beach House ↗</a>
  </aside>;
}
