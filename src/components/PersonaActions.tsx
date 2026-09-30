import { personas } from '../data/prototype';
const descriptions = ['Watch your break, free.', 'Your view. Everyone’s ocean.', 'Help keep a local camera free.'];
export default function PersonaActions({ index, navigate }: { index: number; navigate: (index: number) => void }) {
  return <nav className="view-navigation" aria-label="Change view">
    <button className="view-arrow" disabled={index === 0} onClick={() => navigate(index - 1)} aria-label="Previous view">‹</button>
    <div className="view-label" aria-live="polite" aria-atomic="true">
      <p>{personas[index].title}</p><span>{descriptions[index]}</span>
      <div className="view-dots" aria-hidden="true">{personas.map((persona, page) => <i key={persona.id} className={page === index ? 'selected' : ''}/>)}</div>
    </div>
    <button className="view-arrow" disabled={index === personas.length - 1} onClick={() => navigate(index + 1)} aria-label="Next view">›</button>
    <span className="swipe-hint">Swipe to explore</span>
  </nav>;
}
