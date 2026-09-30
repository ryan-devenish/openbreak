import { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';
import CameraFrame from './components/CameraFrame';
import PersonaActions from './components/PersonaActions';
import PropertyCard from './components/PropertyCard';
import LocalOffer from './components/LocalOffer';
import InterestForm from './components/InterestForm';
import { IMAGES, personas } from './data/prototype';

const content = {
  surfer: {
    eyebrow: 'YOUR BREAK', title: 'Windansea', description: 'A free view of the ocean. Built by the people who surf here.', action: 'Get early access',
    detail: 'A camera you can always check.', body: 'OpenBreak starts with one break and grows locally. Sign up for launch updates, tell us where you surf, or nominate a view that deserves a free camera.',
    steps: ['Check your break without a paywall.', 'Help us choose the next camera spot.', 'Keep the ocean open to everyone.'],
  },
  host: {
    eyebrow: 'YOUR CAMERA', title: 'A view worth sharing.', description: 'Turn an ocean-facing home, rental or business into a free surf camera.', action: 'Offer your view',
    detail: 'Your view brings a break to life.', body: 'Tell us where your view is and what it looks out on. We’ll talk through camera placement and how your property could be credited beside the view.',
    steps: ['Share a view of your local break.', 'Explore a camera location together.', 'Get a host credit beside your camera.'],
  },
  business: {
    eyebrow: 'YOUR BUSINESS', title: 'Be part of their daily surf check.', description: 'Sponsor a local camera. Put your business beside the break your customers love.', action: 'Become a local sponsor',
    detail: 'Local attention. A free camera.', body: 'Support a camera at a break near your business. Your name and a simple offer can appear beside the view, helping surfers find you before or after their session.',
    steps: ['Choose a break near your business.', 'Introduce your business beside the camera.', 'Share a local offer with surfers.'],
  },
};

export default function App() {
  const track = useRef<HTMLDivElement>(null);
  const details = useRef<HTMLElement>(null);
  const signup = useRef<HTMLElement>(null);
  const current = useRef(0);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState({ view: false, host: false, business: false });
  const active = personas[index].id;
  const page = content[active];
  const motion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' as const : 'smooth' as const;
  const navigate = (next: number) => {
    const element = track.current;
    if (!element) return;
    element.scrollTo({ left: Math.max(0, Math.min(personas.length - 1, next)) * element.clientWidth, behavior: motion() });
  };
  const reveal = (element: HTMLElement | null) => {
    if (!element) return;
    element.scrollIntoView({ block: 'start', behavior: motion() });
    element.focus({ preventScroll: true });
  };
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(() => element.scrollTo({ left: current.current * element.clientWidth, behavior: 'instant' }));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <main className={'experience state-' + active} onKeyDown={event => {
    if ((event.target as HTMLElement).closest('input, textarea, select')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Escape') {
      event.preventDefault(); navigate(event.key === 'Escape' ? 0 : index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }}>
    <div className="camera-zone">
      <div className="backgrounds" aria-hidden="true">
        <img className={'background view ' + (loaded.view ? 'loaded' : '')} src={IMAGES.view} alt="" style={{ transform: `translate3d(${(1 - progress) * 3}%,0,0)` }} onLoad={() => setLoaded(v => ({ ...v, view: true }))}/>
        <img className={'background host ' + (active === 'host' && loaded.host ? 'loaded' : '')} src={IMAGES.host} alt="" style={{ transform: `translate3d(${(1 - progress) * 3}%,0,0)` }} onLoad={() => setLoaded(v => ({ ...v, host: true }))}/>
        <img className={'background business ' + (active === 'business' && loaded.business ? 'loaded' : '')} src={IMAGES.business} alt="" style={{ transform: `translate3d(${(1 - progress) * 3}%,0,0)` }} onLoad={() => setLoaded(v => ({ ...v, business: true }))}/>
      </div>
      <div className="camera-layer"><div className="camera-area"><CameraFrame business={active === 'business'}/>{!loaded[active === 'host' ? 'host' : active === 'business' ? 'business' : 'view'] && <p className="image-notice">Loading the original photograph…</p>}</div></div>
      <div className="view-track" ref={track} role="region" aria-roledescription="carousel" aria-label="Explore OpenBreak views" tabIndex={0} onScroll={event => {
        const element = event.currentTarget;
        const position = element.scrollLeft / element.clientWidth;
        const next = Math.max(0, Math.min(personas.length - 1, Math.round(position)));
        current.current = next; setProgress(position); setIndex(next);
      }}>
        {personas.map((persona, slide) => <section className="view-page" key={persona.id} role="group" aria-roledescription="slide" aria-label={`${slide + 1} of ${personas.length}: ${persona.title}`} inert={slide !== index}>
          <Hero active={persona.id}/><div className="camera-space" aria-hidden="true"/><p className="promise">Free surf cams. Built locally.</p>
        </section>)}
      </div>
    </div>
    <div className="app-zone" role="region" aria-label={`${personas[index].title} app preview`} tabIndex={0}>
      <div className="app-content">
        {active === 'host' && <PropertyCard prominent/>}
        <PersonaActions index={index} navigate={navigate}/>
        <section className="app-summary" aria-labelledby="preview-title">
          <p className="eyebrow">{page.eyebrow}</p><h2 id="preview-title">{page.title}</h2><p>{page.description}</p>
          {active === 'business' && <LocalOffer/>}
          <div className="primary-actions"><button className="primary-button" onClick={() => reveal(signup.current)}>{page.action}</button><button className="text-button" onClick={() => reveal(details.current)}>Learn more ↓</button></div>
        </section>
        <section className="learn-section" ref={details} tabIndex={-1} aria-labelledby="learn-title">
          <h2 id="learn-title">{page.detail}</h2><p>{page.body}</p><ul>{page.steps.map(step => <li key={step}>{step}</li>)}</ul>
        </section>
        <section className="signup-section" ref={signup} tabIndex={-1} aria-labelledby="signup-title"><InterestForm persona={active}/></section>
        <footer><span>OPENBREAK</span><p>{active === 'host' ? 'Concept placement. Property is not affiliated with OpenBreak.' : active === 'business' ? 'Example placement. Lahaina Beach House is not affiliated with OpenBreak.' : 'Concept camera. No live feed connected.'}</p></footer>
      </div>
    </div>
  </main>;
}
