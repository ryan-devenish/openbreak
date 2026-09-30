import { DEMO_LOCAL_OFFER as offer } from '../data/prototype';
export default function LocalOffer() {
return <aside className="local-offer"><p className="eyebrow">AFTER YOUR SESSION <span>DEMO OFFER</span></p><p className="offer-business">{offer.business} · {offer.distance}</p><h2>{offer.offer}</h2><p>Supporting this free camera.</p></aside>;
}
