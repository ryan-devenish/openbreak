import { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';
import CameraFrame from './components/CameraFrame';
import PersonaActions from './components/PersonaActions';
import PropertyCard from './components/PropertyCard';
import LocalOffer from './components/LocalOffer';
import { IMAGES, personas } from './data/prototype';

export default function App() {
  const track = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState({ view: false, property: false });
  const active = personas[index].id;
  const navigate = (next: number) => {
    const element = track.current;
    if (!element) return;
    const destination = Math.max(0, Math.min(personas.length - 1, next));
    element.scrollTo({ left: destination * element.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(() => element.scrollTo({ left: current.current * element.clientWidth, behavior: 'instant' }));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <main className={'experience state-' + active}>
    <div className="backgrounds" aria-hidden="true">
      <img className={'background view ' + (loaded.view ? 'loaded' : '')} src={IMAGES.view} alt="" style={{ transform: `translate3d(${(1 - progress) * 3}%,0,0)` }} onLoad={() => setLoaded(v => ({ ...v, view: true }))}/>
      <img className={'background property ' + (active === 'host' && loaded.property ? 'loaded' : '')} src={IMAGES.property} alt="" style={{ transform: `translate3d(${(1 - progress) * 3}%,0,0)` }} onLoad={() => setLoaded(v => ({ ...v, property: true }))}/>
    </div>
    <div className="camera-layer"><div className="camera-area"><CameraFrame/>{!loaded[active === 'host' ? 'property' : 'view'] && <p className="image-notice">Loading the original photograph…</p>}</div></div>
    <div className="view-track" ref={track} role="region" aria-roledescription="carousel" aria-label="Explore OpenBreak views" tabIndex={0}
      onScroll={event => {
        const element = event.currentTarget;
        const position = element.scrollLeft / element.clientWidth;
        const next = Math.max(0, Math.min(personas.length - 1, Math.round(position)));
        current.current = next;
        setProgress(position);
        setIndex(next);
      }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Escape') {
          event.preventDefault();
          navigate(event.key === 'Escape' ? 0 : index + (event.key === 'ArrowRight' ? 1 : -1));
        }
      }}>
      {personas.map((persona, page) => <section className="view-page" key={persona.id} role="group" aria-roledescription="slide" aria-label={`${page + 1} of ${personas.length}: ${persona.title}`} inert={page !== index}>
        <Hero active={persona.id}/>
        <div className="camera-space" aria-hidden="true"/>
        <div className="story-area">
          <div className="story"><p className="promise">Free surf cams. Built locally.</p>
            <p className="coming-next">{persona.id === 'surfer' ? 'Early access and camera nominations coming soon.' : persona.id === 'host' ? 'Share your view. Host a free camera. Coming soon.' : 'Support a break. Reach local surfers. Coming soon.'}</p>
          </div>
          {persona.id === 'host' && <PropertyCard prominent/>}
          {persona.id === 'business' && <LocalOffer/>}
        </div>
        <div className="navigation-space" aria-hidden="true"/>
        <footer><span>OPENBREAK</span><p>{persona.id === 'host' ? 'Concept placement. Property is not affiliated with OpenBreak.' : 'Concept camera. A free view of your break.'}</p></footer>
      </section>)}
    </div>
    <div className="navigation-layer"><PersonaActions index={index} navigate={navigate}/></div>
  </main>;
}
