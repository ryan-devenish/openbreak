import { useState } from 'react';
import CameraHero from './CameraHero';
import NetworkGrowth from './NetworkGrowth';
import NominateSheet from './NominateSheet';
import HostSheet from './HostSheet';
import AdvertiseSheet from './AdvertiseSheet';
import type { SurfBreak } from '../data/breaks';
import type { Nomination } from '../data/prototype';
import type { SheetView } from '../App';

interface Props {
  surfBreak: SurfBreak;
}

export default function BreakPage({ surfBreak }: Props) {
  const [sheet, setSheet] = useState<SheetView>(null);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [hostLocation, setHostLocation] = useState<{ lat: number; lng: number } | undefined>();
  const [shareLabel, setShareLabel] = useState('Share');

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
      setShareLabel('Copied');
      window.setTimeout(() => setShareLabel('Share'), 1800);
    } catch {
      setShareLabel('Share');
    }
  };

  return (
    <main className="page break-page">
      <header className="break-header">
        <a className="logo logo-link" href="/" aria-label="OpenBreak home">OPENBREAK</a>
        <a className="browse-link" href="/">Browse</a>
      </header>

      <section className="break-intro" aria-labelledby="break-title">
        <div>
          <h1 id="break-title">{surfBreak.name}</h1>
          <p>{surfBreak.location}</p>
        </div>
        <button className="secondary-action break-share" type="button" onClick={handleShare} aria-label={`Share ${surfBreak.name}`}>
          {shareLabel}
        </button>
      </section>

      <CameraHero surfBreak={surfBreak} single />

      <div className="break-content">
        <section className="camera-context" aria-label="About this camera">
          <div>
            <p className="text-eyebrow">Right now</p>
            <h2>See the break. Skip the forecast dashboard.</h2>
            <p>
              OpenBreak is built around the camera first. Forecast conditions can live here later when real data is available.
            </p>
          </div>

          <a className="host-inline host-inline-promoted" href={surfBreak.host.url} target="_blank" rel="noreferrer nofollow">
            {surfBreak.host.image && (
              <img src={surfBreak.host.image} alt="" className="host-inline-image" />
            )}
            <div className="host-inline-copy">
              <span className="host-inline-kicker">Hosted from here</span>
              <strong>{surfBreak.host.name}</strong>
              <span className="host-inline-endorsement">A pretty great view of {surfBreak.name}, if you ask us.</span>
              <span className="host-inline-provider">See the spot on {surfBreak.host.provider} ↗</span>
            </div>
          </a>
        </section>

        <NetworkGrowth onAction={setSheet} compact />

        <footer>
          <span className="logo">OPENBREAK</span>
          <p>{surfBreak.camera.status === 'live' ? 'Live camera.' : 'Prototype camera preview. No live feed connected.'}</p>
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
