import { useEffect, useMemo, useRef, useState } from 'react';
import { BREAKS } from '../data/breaks';
import { GEOGRAPHY } from '../data/geography';
import { searchDiscovery } from '../data/discovery';
import { getRecentlyViewedBreakSlugs } from '../data/recent';
import BreakResult from './BreakResult';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchDiscovery({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchDiscovery(query), [query]);
  const recentBreaks = getRecentlyViewedBreakSlugs()
    .map((slug) => BREAKS.find((surfBreak) => surfBreak.slug === slug))
    .filter((surfBreak): surfBreak is (typeof BREAKS)[number] => Boolean(surfBreak));

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const breakResults = results.filter((result) => result.type === 'break');
  const regionResults = results.filter((result) => result.type === 'region');
  const california = GEOGRAPHY.find((entity) => entity.id === 'ca');
  const sanDiego = GEOGRAPHY.find((entity) => entity.id === 'san-diego');
  const laJolla = GEOGRAPHY.find((entity) => entity.id === 'la-jolla');

  return (
    <div className="search-discovery" role="dialog" aria-modal="true" aria-label="Find a surf break">
      <div className="search-discovery-shell">
        <header className="search-discovery-header">
          <a className="logo logo-link" href="/">OPENBREAK</a>
          <button type="button" className="search-close" onClick={onClose}>Close</button>
        </header>

        <form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="break-search">Find your break</label>
          <input
            ref={inputRef}
            id="break-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search breaks, cities, or regions"
            autoComplete="off"
          />
        </form>

        <div className="search-discovery-content">
          {query ? (
            <>
              {regionResults.length > 0 && (
                <section className="discovery-section">
                  <h2>Regions</h2>
                  <div className="region-results">
                    {regionResults.map((result) => (
                      <div className="region-result" key={result.id}>
                        <strong>{result.label}</strong>
                        <span>{result.secondary}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {breakResults.length > 0 && (
                <section className="discovery-section">
                  <h2>Breaks</h2>
                  {breakResults.map((result) => {
                    const surfBreak = BREAKS.find((item) => item.slug === result.id);
                    return surfBreak ? <BreakResult key={surfBreak.slug} surfBreak={surfBreak} compact /> : null;
                  })}
                </section>
              )}
              {results.length === 0 && (
                <section className="search-empty">
                  <h2>No OpenBreak camera yet.</h2>
                  <p>Try another place, or help grow the network.</p>
                  <a href="/browse">Browse available breaks</a>
                </section>
              )}
            </>
          ) : (
            <>
              {recentBreaks.length > 0 && (
                <section className="discovery-section">
                  <h2>Recently viewed</h2>
                  {recentBreaks.map((surfBreak) => <BreakResult key={surfBreak.slug} surfBreak={surfBreak} compact />)}
                </section>
              )}
              <section className="discovery-section">
                <h2>Available now</h2>
                {BREAKS.map((surfBreak) => <BreakResult key={surfBreak.slug} surfBreak={surfBreak} compact />)}
              </section>
              <section className="discovery-section">
                <h2>Browse by region</h2>
                <div className="region-results">
                  {[laJolla, sanDiego, california].filter(Boolean).map((entity) => (
                    <div className="region-result" key={entity!.id}>
                      <strong>{entity!.name}</strong>
                      <span>{entity!.level === 'region' ? 'Surf region' : entity!.level[0].toUpperCase() + entity!.level.slice(1)}</span>
                    </div>
                  ))}
                </div>
              </section>
              <a className="search-browse-link" href="/browse">View all breaks →</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
