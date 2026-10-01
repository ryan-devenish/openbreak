import { useEffect, useState } from 'react';
import CameraHero from './CameraHero';
import NetworkGrowth from './NetworkGrowth';
import NominateSheet from './NominateSheet';
import HostSheet from './HostSheet';
import AdvertiseSheet from './AdvertiseSheet';
import type { SurfBreak } from '../data/breaks';
import { recordRecentlyViewedBreak } from '../data/recent';
import type { Nomination } from '../data/prototype';
import type { SheetView } from '../App';

interface Props {
  surfBreak: SurfBreak;
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 16V4m0 0L8 8m4-4 4 4M6 11v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BreakPage({ surfBreak }: Props) {
  const [sheet, setSheet] = useState<SheetView>(null);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [hostLocation, setHostLocation] = useState<{ lat: number; lng: number } | undefined>();

  useEffect(() => {
    recordRecentlyViewedBreak(surfBreak.slug);
  }, [surfBreak.slug]);

  const handleNominate = (nomination: Nomination) => {
    setNominations((prev) => [...prev, nomination]);
  };

  const handleOpenHost = (location: { lat: number; lng: number }) => {
    setHostLocation(location);
    setSheet('host');
  };

  const handleShare = async () => {
    const shareData = {
      title: `${surfBreak.name} surf camera — OpenBreak`,
      text: `Check ${surfBreak.name} on OpenBreak.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // Native share cancellation or clipboard failure needs no persistent UI.
    }
  };

  return (
    <main className="page break-page">
      <header className="break-header">
        <a className="logo logo-link" href="/" aria-label="OpenBreak home">OPENBREAK</a>
        <a className="browse-link" href="/browse">Browse</a>
      </header>

      <section className="break-intro" aria-labelledby="break-title">
        <div>
          <h1 id="break-title">{surfBreak.name}</h1>
          <p>{surfBreak.location}</p>
        </div>
        <button className="break-share" type="button" onClick={handleShare} aria-label={`Share ${surfBreak.name}`}>
          <ShareIcon />
        </button>
      </section>

      <CameraHero surfBreak={surfBreak} single />

      <div className="break-content">
        <NetworkGrowth onAction={setSheet} compact />

        <footer className="break-footer">
          <span className="logo">OPENBREAK</span>
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
