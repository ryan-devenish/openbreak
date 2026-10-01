import { useState } from 'react';
import CameraHero from './components/CameraHero';
import BreakPage from './components/BreakPage';
import BrowsePage from './components/BrowsePage';
import HomeSearch from './components/HomeSearch';
import SearchDiscovery from './components/SearchDiscovery';
import NetworkGrowth from './components/NetworkGrowth';
import NominateSheet from './components/NominateSheet';
import HostSheet from './components/HostSheet';
import AdvertiseSheet from './components/AdvertiseSheet';
import { getBreakBySlug } from './data/breaks';
import type { Nomination } from './data/prototype';

export type SheetView = null | 'nominate' | 'host' | 'advertise';

function HomePage() {
  const [sheet, setSheet] = useState<SheetView>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [hostLocation, setHostLocation] = useState<{ lat: number; lng: number } | undefined>();

  const handleNominate = (nomination: Nomination) => {
    setNominations((prev) => [...prev, nomination]);
  };

  const handleOpenHost = (location: { lat: number; lng: number }) => {
    setHostLocation(location);
    setSheet('host');
  };

  return (
    <main className="page">
      <header className="site-header">
        <div className="site-nav-row">
          <span className="logo">OPENBREAK</span>
          <a className="browse-link" href="/browse">Browse</a>
        </div>
        <h1>Free surf cams.<br />No paywall.</h1>
      </header>

      <HomeSearch onOpen={() => setSearchOpen(true)} />
      <CameraHero />

      <div className="page-content">
        <div className="info-band" />
        <NetworkGrowth onAction={setSheet} />

        <footer>
          <span className="logo">OPENBREAK</span>
          <p>Windansea is a preview camera. No live feed connected.</p>
        </footer>
      </div>

      <SearchDiscovery open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NominateSheet
        open={sheet === 'nominate'}
        onClose={() => setSheet(null)}
        onNominate={handleNominate}
        onOpenHost={handleOpenHost}
      />
      <HostSheet
        open={sheet === 'host'}
        onClose={() => {
          setHostLocation(undefined);
          setSheet(null);
        }}
        initialLocation={hostLocation}
      />
      <AdvertiseSheet open={sheet === 'advertise'} onClose={() => setSheet(null)} />
    </main>
  );
}

function BrowseRoute() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <BrowsePage onOpenSearch={() => setSearchOpen(true)} />
      <SearchDiscovery open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';

  if (pathname === '/browse') return <BrowseRoute />;

  const match = pathname.match(/^\/break\/([^/]+)$/);
  if (match) {
    const surfBreak = getBreakBySlug(match[1]);
    if (surfBreak) return <BreakPage surfBreak={surfBreak} />;
  }

  return <HomePage />;
}
