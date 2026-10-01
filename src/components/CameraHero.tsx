import { useState } from 'react';
import { BREAKS, type SurfBreak } from '../data/breaks';

function AirbnbMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="airbnb-mark">
      <path d="M16 4.25c2.35 0 3.95 2.04 5.34 4.42 1.44 2.46 2.78 5.4 4.3 8.3 1.03 1.98 1.46 3.66 1.46 5.13 0 2.97-1.8 5.15-4.52 5.15-2.02 0-3.97-1.23-5.96-3.2L16 23.43l-.62.62c-1.99 1.97-3.94 3.2-5.96 3.2-2.72 0-4.52-2.18-4.52-5.15 0-1.47.43-3.15 1.46-5.13 1.52-2.9 2.86-5.84 4.3-8.3C12.05 6.29 13.65 4.25 16 4.25Zm0 4.1c-.9 0-1.78 1.11-2.8 2.86-1.11 1.9-2.24 4.35-3.7 7.14-.76 1.46-1.1 2.59-1.1 3.41 0 1.18.48 1.84 1.4 1.84 1.06 0 2.28-.83 3.66-2.19l.7-.7c-1.42-1.57-2.2-3.06-2.2-4.47 0-2.23 1.7-3.91 4.04-3.91s4.04 1.68 4.04 3.91c0 1.41-.78 2.9-2.2 4.47l.7.7c1.38 1.36 2.6 2.19 3.66 2.19.92 0 1.4-.66 1.4-1.84 0-.82-.34-1.95-1.1-3.41-1.46-2.79-2.59-5.24-3.7-7.14-1.02-1.75-1.9-2.86-2.8-2.86Zm0 6.7c-.95 0-1.58.62-1.58 1.42 0 .67.45 1.52 1.58 2.77 1.13-1.25 1.58-2.1 1.58-2.77 0-.8-.63-1.42-1.58-1.42Z" fill="currentColor" />
    </svg>
  );
}

interface Props { surfBreak?: SurfBreak; single?: boolean; }

function statusLabel(surfBreak: SurfBreak) {
  if (surfBreak.camera.status === 'coming-soon') return 'COMING SOON';
  return surfBreak.camera.status.toUpperCase();
}

export default function CameraHero({ surfBreak, single = false }: Props) {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  if (!surfBreak) {
    return (
      <section className="camera-hero" aria-label="OpenBreak camera views">
        <div className="camera-carousel" role="region" aria-label="Surf camera carousel">
          {BREAKS.map((item) => (
            <article className="camera-card" key={item.camera.id}>
              <div className="camera-viewport">
                <img src={item.camera.image} alt={`${item.name} surf camera preview`} className={`camera-image ${loaded[item.camera.id] ? 'loaded' : ''}`} onLoad={() => setLoaded((prev) => ({ ...prev, [item.camera.id]: true }))} />
                <div className={`live-pill ${item.camera.status !== 'live' ? 'camera-status-muted' : ''}`} aria-label={`Camera status: ${statusLabel(item)}`}>
                  {item.camera.status === 'live' && <span className="live-dot" aria-hidden="true" />}
                  <span>{statusLabel(item)}</span>
                </div>
                <a className="camera-play" href={`/break/${item.slug}`} aria-label={`Open ${item.name} camera`}><span className="camera-play-icon" aria-hidden="true" /></a>
                <div className="camera-host-bug camera-host-bug-static" aria-label={`Camera hosted by ${item.host.name}`}><AirbnbMark /><span>Camera hosted by</span><strong>{item.host.name}</strong></div>
                <div className="camera-overlay"><div className="camera-location"><strong>{item.name.toUpperCase()}</strong><span>{item.location.toUpperCase()}</span></div></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const { camera, host } = surfBreak;
  const isLoaded = loaded[camera.id];
  const label = statusLabel(surfBreak);
  return (
    <section className={`camera-hero ${single ? 'camera-hero-single' : ''}`} aria-label={`${surfBreak.name} camera`}>
      <article className="camera-card"><div className="camera-viewport">
        {!isLoaded && <div className="camera-loading" aria-hidden="true" />}
        <video
          className={`camera-image camera-video ${isLoaded ? 'loaded' : ''}`}
          src="/video/236273_tiny%202.mp4"
          poster={camera.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${surfBreak.name} demo surf camera view`}
          onCanPlay={() => setLoaded((prev) => ({ ...prev, [camera.id]: true }))}
        />
        <div className={`live-pill ${camera.status !== 'live' ? 'camera-status-muted' : ''}`} aria-label={`Camera status: ${label}`}>{camera.status === 'live' && <span className="live-dot" aria-hidden="true" />}<span>{label}</span></div>
        <a className="camera-host-bug camera-host-bug-break" href={host.url} target="_blank" rel="noreferrer nofollow" aria-label={`Camera hosted by ${host.name}. View on ${host.provider}`}>{host.provider === 'Airbnb' && <AirbnbMark />}<strong>{host.name}</strong></a>
      </div></article>
    </section>
  );
}
