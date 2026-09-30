import { personas, type Persona } from '../data/prototype';
type Props = { active: Persona; selected: Persona; preview: (value: Persona | null) => void; select: (value: Persona) => void };
export default function PersonaActions({ active, selected, preview, select }: Props) {
return <div className="persona-actions" aria-label="Explore OpenBreak" onPointerLeave={() => preview(null)}>{personas.map(persona =>
<button key={persona.id} className={'persona-action ' + (active === persona.id ? 'active' : '')} aria-pressed={selected === persona.id}
onPointerEnter={e => { if (e.pointerType === 'mouse' && window.matchMedia('(hover: hover)').matches) preview(persona.id); }}
onFocus={() => preview(persona.id)} onBlur={() => preview(null)} onClick={() => { select(persona.id); preview(null); }}>
<span className="action-heading">{persona.title}<span aria-hidden="true">↗</span></span><span className="action-description">{persona.description}</span></button>)}</div>;
}
