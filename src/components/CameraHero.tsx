import { useState } from 'react';
import { IMAGES, CAMERA } from '../data/prototype';

export default function CameraHero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="camera-hero" aria-label="Windansea camera view">
      <div className="camera-viewport">
        <img
          src={IMAGES.camera}
          alt="Surfer riding a wave at Windansea"
          className={`camera-image ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
        />
        <div className="camera-overlay">
          <div className="camera-location">
            <strong>{CAMERA.name.toUpperCase()}</strong>
            <span>{CAMERA.location.toUpperCase()}</span>
          </div>
          <span className="camera-badge">CONCEPT CAMERA</span>
        </div>
      </div>
    </section>
  );
}
