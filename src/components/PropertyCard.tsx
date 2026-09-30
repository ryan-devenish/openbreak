import { AIRBNB_PROPERTY_URL, IMAGES } from '../data/prototype';
export default function PropertyCard({ prominent }: { prominent: boolean }) {
return <aside className={'property-card ' + (prominent ? 'prominent' : '')} aria-label="Concept camera host">
<div className="property-photo"><img src={IMAGES.host} alt="Oceanfront living room with a view of Windansea" onError={e => { e.currentTarget.hidden = true; }} /><span>PROPERTY<br/>PHOTO</span></div>
<div><p className="eyebrow">CAMERA HOSTED FROM</p><h2>Oceanfront Penthouse<br/><span>Windansea</span></h2><p className="property-meta">2 BR · Oceanfront · This exact view</p><a href={AIRBNB_PROPERTY_URL} target="_blank" rel="noopener noreferrer" aria-label="View on Airbnb (placeholder link; opens a new tab)">VIEW ON AIRBNB →</a></div></aside>;
}
