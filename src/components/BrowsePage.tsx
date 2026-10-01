import { BREAKS } from '../data/breaks';
import { GEOGRAPHY } from '../data/geography';
import { getRecentlyViewedBreakSlugs } from '../data/recent';
import BreakResult from './BreakResult';

interface Props {
  onOpenSearch: () => void;
}

export default function BrowsePage({ onOpenSearch }: Props) {
  const recentBreaks = getRecentlyViewedBreakSlugs()
    .map((slug) => BREAKS.find((surfBreak) => surfBreak.slug === slug))
    .filter((surfBreak): surfBreak is (typeof BREAKS)[number] => Boolean(surfBreak));
  const browseRegions = ['la-jolla', 'san-diego', 'ca']
    .map((id) => GEOGRAPHY.find((entity) => entity.id === id))
    .filter((entity): entity is (typeof GEOGRAPHY)[number] => Boolean(entity));

  return (
    <main className="page browse-page">
      <header className="browse-header">
        <a className="logo logo-link" href="/">OPENBREAK</a>
        <button type="button" className="browse-search-trigger" onClick={onOpenSearch}>Search</button>
      </header>

      <div className="browse-content">
        <section className="browse-intro">
          <p className="text-eyebrow">Browse</p>
          <h1>Find water worth checking.</h1>
          <p>OpenBreak is still small. That’s okay. Every available camera is here.</p>
        </section>

        {recentBreaks.length > 0 && (
          <section className="browse-section">
            <div className="section-heading">
              <h2>Recently viewed</h2>
            </div>
            <div className="browse-results">
              {recentBreaks.map((surfBreak) => <BreakResult key={surfBreak.slug} surfBreak={surfBreak} />)}
            </div>
          </section>
        )}

        <section className="browse-section">
          <div className="section-heading">
            <h2>Available now</h2>
            <p>{BREAKS.length === 1 ? '1 break on OpenBreak' : `${BREAKS.length} breaks on OpenBreak`}</p>
          </div>
          <div className="browse-results">
            {BREAKS.map((surfBreak) => <BreakResult key={surfBreak.slug} surfBreak={surfBreak} />)}
          </div>
        </section>

        <section className="browse-section">
          <div className="section-heading">
            <h2>Regions</h2>
            <p>Geographic collections will grow with the camera network.</p>
          </div>
          <div className="region-grid">
            {browseRegions.map((entity) => (
              <div className="region-card" key={entity.id}>
                <strong>{entity.name}</strong>
                <span>{entity.level === 'region' ? 'Surf region' : entity.level[0].toUpperCase() + entity.level.slice(1)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="browse-section browse-nearby">
          <div className="section-heading">
            <h2>Near you</h2>
            <p>Location stays off unless you choose to use it.</p>
          </div>
          <p className="browse-note">Nearby discovery is prepared for the current break coordinates, but OpenBreak won’t request location until there’s enough network coverage for it to be useful.</p>
        </section>
      </div>
    </main>
  );
}
