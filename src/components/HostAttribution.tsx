import { IMAGES, HOST } from '../data/prototype';

export default function HostAttribution() {
  return (
    <section className="host-attribution" aria-label="Camera host">
      <p className="attribution-label">This view is made possible by</p>
      <div className="host-card">
        <div className="host-photo">
          <img
            src={IMAGES.hostInterior}
            alt="Interior view from the host property"
          />
        </div>
        <div className="host-info">
          <h2>{HOST.name}</h2>
          <p>{HOST.location}</p>
          <a href={HOST.url} target="_blank" rel="noopener noreferrer">
            View property →
          </a>
        </div>
      </div>
      <p className="concept-note">Concept placement. Property is not affiliated with OpenBreak.</p>
    </section>
  );
}
