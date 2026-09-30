import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import CameraFrame from './components/CameraFrame';
import PersonaActions from './components/PersonaActions';
import PropertyCard from './components/PropertyCard';
import LocalOffer from './components/LocalOffer';
import { IMAGES, type Persona } from './data/prototype';
export default function App() {
const [selected, setSelected] = useState<Persona>('default');
const [preview, setPreview] = useState<Persona | null>(null);
const [loaded, setLoaded] = useState({ view: false, property: false });
const active = preview ?? selected;
useEffect(() => {
const reset = (e: KeyboardEvent) => { if (e.key === 'Escape') { setSelected('default'); setPreview(null); (document.activeElement as HTMLElement)?.blur(); } };
window.addEventListener('keydown', reset);
return () => window.removeEventListener('keydown', reset);
}, []);
return <main className={'experience state-' + active}>
<div className="backgrounds" aria-hidden="true">
<img className={'background view ' + (loaded.view ? 'loaded' : '')} src={IMAGES.view} alt="" onLoad={() => setLoaded(v => ({ ...v, view: true }))}/>
<img className={'background property ' + (active === 'host' && loaded.property ? 'loaded' : '')} src={IMAGES.property} alt="" onLoad={() => setLoaded(v => ({ ...v, property: true }))}/>
<div className="shade"/></div>
<Hero active={active}/>
<div className="camera-area"><CameraFrame/>{!loaded[active === 'host' ? 'property' : 'view'] && <p className="image-notice">Original {active === 'host' ? 'property' : 'ocean'} photograph coming soon</p>}</div>
<div className="story-area"><div className="story" key={active}><p className="promise">Free surf cams. Built locally.</p>
{active === 'surfer' && <div className="next-actions"><button disabled>Get early access</button><button disabled>Nominate a camera spot</button><button disabled>Nominate a local business</button><span>Coming next</span></div>}
{active === 'host' && <div className="next-actions"><button disabled>Show us your view →</button><span>Coming next</span></div>}
{active === 'business' && <div className="next-actions"><button disabled>Put my business here →</button><span>Coming next</span></div>}
</div><div className="context-card">{active === 'business' ? <LocalOffer/> : active === 'host' ? <PropertyCard prominent/> : null}</div></div>
<PersonaActions active={active} selected={selected} preview={setPreview} select={value => setSelected(previous => previous === value ? 'default' : value)}/>
<footer><span>OPENBREAK</span><p>{active === 'host' ? 'Concept camera placement. Property is not currently affiliated with OpenBreak.' : 'Concept camera. A free view of your break.'}</p>{selected !== 'default' && <button className="reset" onClick={() => { setSelected('default'); setPreview(null); }}>Reset view ×</button>}</footer>
</main>;
}
