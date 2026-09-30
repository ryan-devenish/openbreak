import { headlines, type Persona } from '../data/prototype';
export default function Hero({ active }: { active: Persona }) {
return <header className={'hero ' + (active === 'business' ? 'business-headline' : '')}><p className="location">WINDANSEA · LA JOLLA, CA</p><h1 key={active}>{headlines[active].map(line => <span key={line}>{line}</span>)}</h1></header>;
}
