import { useState } from 'react';
import CameraHero from './components/CameraHero';
import HostAttribution from './components/HostAttribution';
import LocalSponsor from './components/LocalSponsor';
import NetworkGrowth from './components/NetworkGrowth';
import NominateSheet from './components/NominateSheet';
import HostSheet from './components/HostSheet';
import AdvertiseSheet from './components/AdvertiseSheet';
import type { Nomination } from './data/prototype';

export type SheetView = null | 'nominate' | 'host' | 'advertise';

export default function App() {
  const [sheet, setSheet] = useState<SheetView>(null);
  const [nominations, setNominations] = useState<Nomination[]>([]);

  const handleNominate = (nomination: Nomination) => {
    setNominations((prev) => [...prev, nomination]);
  };

  return (
    <main className="page">
      <header className="site-header">
        <span className="logo">OPENBREAK</span>
        <h1>Free surf cams.<br />No paywall.</h1>
      </header>

      <CameraHero />

      <div className="page-content">
        <div className="info-band">
          <HostAttribution />
          <LocalSponsor />
        </div>
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
      />
      <HostSheet
        open={sheet === 'host'}
        onClose={() => setSheet(null)}
      />
      <AdvertiseSheet
        open={sheet === 'advertise'}
        onClose={() => setSheet(null)}
      />
    </main>
  );
}
