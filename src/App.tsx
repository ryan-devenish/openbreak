import { useState } from 'react';
import CameraHero from './components/CameraHero';
import BreakPage from './components/BreakPage';
import NetworkGrowth from './components/NetworkGrowth';
import NominateSheet from './components/NominateSheet';
import HostSheet from './components/HostSheet';
import AdvertiseSheet from './components/AdvertiseSheet';
import { getBreakBySlug } from './data/breaks';
import type { Nomination } from './data/prototype';

export type SheetView = null | 'nominate' | 'host' | 'advertise';

function HomePage() {
  const [sheet, setSheet] = useState<SheetView>(null);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [hostLocation, setHostLocation] = useState<{ lat: number; lng: number } | undefined>();
  const windansea = getBreakBySlug('windansea')!;

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
        <span className="logo">OPENBREAK</span>
        <h1>Free surf cams.<br />No paywall.</h1>
      </header>

      <CameraHero surfBreak={windansea} />

      <div className="page-content">
        <div className="info-band" />
        <a className="break-entry" href="/break/windansea">Open Windansea camera →</a>
        <NetworkGrowth onAction={setSheet} />

        <footer>
          <span className="logo">OPENBREAK</span>
          <p>Concept camera. No live feed connected.</p>
        </footer>
      </div>

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

export default function App() {
  const match = window.location.pathname.match(/^\/break\/([^/]+)\/?$/);
  if (match) {
    const surfBreak = getBreakBySlug(match[1]);
    if (surfBreak) return <BreakPage surfBreak={surfBreak} />;
  }

  return <HomePage />;
}
