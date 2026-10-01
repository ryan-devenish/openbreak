import { useState } from 'react';
import { IMAGES, CAMERA } from '../data/prototype';

const CAMERAS = [
  {
    id: CAMERA.id,
    name: CAMERA.name,
    location: CAMERA.location,
    image: IMAGES.camera,
  },
  {
    id: 'windansea-wide',
    name: 'Windansea',
    location: 'La Jolla, CA',
    image: '/images/windansea-view.jpg',
  },
  {
    id: 'lahaina-view',
    name: 'Pacific Beach',
    location: 'San Diego, CA',
    image: '/images/lahaina-business-view.webp',
  },
];

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
