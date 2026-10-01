import { useState } from 'react';
import { IMAGES, CAMERA } from '../data/prototype';

const CAMERAS = [
  {
    id: CAMERA.id,
    name: CAMERA.name,
    location: CAMERA.location,
    image: IMAGES.camera,
    host: 'Airbnb',
  },
  {
    id: 'windansea-wide',
    name: 'Windansea',
    location: 'La Jolla, CA',
    image: '/images/windansea-view.jpg',
    host: 'Airbnb',
  },
  {
    id: 'lahaina-view',
    name: 'Pacific Beach',
    location: 'San Diego, CA',
    image: '/images/lahaina-business-view.webp',
    host: 'Airbnb',
  },
];

function AirbnbMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="airbnb-mark">
      <path
        d="M16 4.25c2.35 0 3.95 2.04 5.34 4.42 1.44 2.46 2.78 5.4 4.3 8.3 1.03 1.98 1.46 3.66 1.46 5.13 0 2.97-1.8 5.15-4.52 5.15-2.02 0-3.97-1.23-5.96-3.2L16 23.43l-.62.62c-1.99 1.97-3.94 3.2-5.96 3.2-2.72 0-4.52-2.18-4.52-5.15 0-1.47.43-3.15 1.46-5.13 1.52-2.9 2.86-5.84 4.3-8.3C12.05 6.29 13.65 4.25 16 4.25Zm0 4.1c-.9 0-1.78 1.11-2.8 2.86-1.11 1.9-2.24 4.35-3.7 7.14-.76 1.46-1.1 2.59-1.1 3.41 0 1.18.48 1.84 1.4 1.84 1.06 0 2.28-.83 3.66-2.19l.7-.7c-1.42-1.57-2.2-3.06-2.2-4.47 0-2.23 1.7-3.91 4.04-3.91s4.04 1.68 4.04 3.91c0 1.41-.78 2.9-2.2 4.47l.7.7c1.38 1.36 2.6 2.19 3.66 2.19.92 0 1.4-.66 1.4-1.84 0-.82-.34-1.95-1.1-3.41-1.46-2.79-2.59-5.24-3.7-7.14-1.02-1.75-1.9-2.86-2.8-2.86Zm0 6.7c-.95 0-1.58.62-1.58 1.42 0 .67.45 1.52 1.58 2.77 1.13-1.25 1.58-2.1 1.58-2.77 0-.8-.63-1.42-1.58-1.42Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CameraHero() {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  return (
    <section className="camera-hero" aria-label="OpenBreak camera views">
      <div className="camera-carousel" role="region" aria-label="Surf camera carousel">
        {CAMERAS.map((camera) => (
          <article className="camera-card" key={camera.id}>
            <div className="camera-viewport">
              <img
                src={camera.image}
                alt={`${camera.name} surf camera view`}
                className={`camera-image ${loaded[camera.id] ? 'loaded' : ''}`}
                onLoad={() => setLoaded((prev) => ({ ...prev, [camera.id]: true }))}
              />

              <div className="live-pill" aria-label="Live camera">
                <span className="live-dot" aria-hidden="true" />
                <span>LIVE</span>
              </div>

              <button className="camera-play" type="button" aria-label={`Play ${camera.name} camera`}>
                <span className="camera-play-icon" aria-hidden="true" />
              </button>

              <div className="camera-host-bug" aria-label="Camera hosted by Airbnb">
                <AirbnbMark />
                <span>Camera hosted by</span>
                <strong>{camera.host}</strong>
              </div>

              <div className="camera-overlay">
                <div className="camera-location">
                  <strong>{camera.name.toUpperCase()}</strong>
                  <span>{camera.location.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
