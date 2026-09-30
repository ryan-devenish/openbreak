import { useState } from 'react';
import CameraHero from './components/CameraHero';
import HostAttribution from './components/HostAttribution';
import LocalSponsor from './components/LocalSponsor';
import NetworkGrowth from './components/NetworkGrowth';
import PutAViewSheet from './components/PutAViewSheet';

export type SheetView = null | 'main' | 'nominate' | 'host' | 'advertise';

export default function App() {
  const [sheet, setSheet] = useState<SheetView>(null);

  return (
    <main className="page">
      <header className="site-header">
        <span className="logo">OPENBREAK</span>
        <h1>Free surf cams.<br />No paywall.</h1>
      </header>

      <CameraHero />

      <div className="page-content">
        <HostAttribution />
        <LocalSponsor />
        <NetworkGrowth onAction={setSheet} />

        <footer>
          <span className="logo">OPENBREAK</span>
          <p>Concept camera. No live feed connected.</p>
        </footer>
      </div>

      <PutAViewSheet view={sheet} onClose={() => setSheet(null)} onChange={setSheet} />
    </main>
  );
}
