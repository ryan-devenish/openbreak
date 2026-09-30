import { SPONSOR } from '../data/prototype';

export default function LocalSponsor() {
  return (
    <section className="local-sponsor" aria-label="Local sponsor">
      <p className="sponsor-label">NEARBY</p>
      <p className="sponsor-name">{SPONSOR.name}</p>
      <a href="#" onClick={(e) => e.preventDefault()}>
        Local sponsor →
      </a>
      <p className="concept-note">Concept placement. Not affiliated with OpenBreak.</p>
    </section>
  );
}
