import { useEffect, useRef, useState, FormEvent } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CAMERA } from '../data/prototype';

interface Props {
  open: boolean;
  onClose: () => void;
  initialLocation?: { lat: number; lng: number };
}

type Step = 'choice' | 'existing' | 'need' | 'success';

interface HostFormData {
  url?: string;
  location: string;
  email: string;
  coordinates?: { lat: number; lng: number };
  note?: string;
}

export default function HostSheet({ open, onClose, initialLocation }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>('choice');
  const [formData, setFormData] = useState<HostFormData>({ location: '', email: '' });
  const [viewPin, setViewPin] = useState<{ lat: number; lng: number } | null>(initialLocation ?? null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!open && dialog.open) {
      dialog.close();
      document.body.style.overflow = '';
    }
  }, [open]);

  const handleClose = () => {
    setStep('choice');
    setFormData({ location: '', email: '' });
    setViewPin(initialLocation ?? null);
    document.body.style.overflow = '';
    onClose();
  };

  const handleExistingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    setFormData({
      url: data.get('url') as string,
      location: data.get('location') as string,
      email: data.get('email') as string,
    });
    setStep('success');
  };

  const handleNeedSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!viewPin) return;
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    setFormData({
      location: data.get('location') as string,
      email: data.get('email') as string,
      coordinates: viewPin,
      note: (data.get('note') as string)?.trim() || undefined,
    });
    setStep('success');
  };

  return (
    <dialog ref={dialogRef} className="sheet" onClose={handleClose} aria-labelledby="host-dialog-title">
      <div className="sheet-content">
        <button
          className="icon-button sheet-close"
          onClick={handleClose}
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>

        {step === 'choice' && (
          <div className="sheet-view">
            <h2 id="host-dialog-title">Host a camera</h2>
            <p className="sheet-description">
              Turn your ocean view into a free surf camera.
            </p>
            <div className="choice-group">
              <button
                type="button"
                className="choice-row"
                onClick={() => setStep('existing')}
              >
                <div className="choice-row-content">
                  <span className="choice-row-label">Already have a camera?</span>
                  <span className="choice-row-description">Connect an existing camera</span>
                </div>
                <span className="choice-row-arrow" aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className="choice-row"
                onClick={() => setStep('need')}
              >
                <div className="choice-row-content">
                  <span className="choice-row-label">Need a camera?</span>
                  <span className="choice-row-description">I have an ocean view</span>
                </div>
                <span className="choice-row-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        )}

        {step === 'existing' && (
          <div className="sheet-view">
            <button className="sheet-back" onClick={() => setStep('choice')}>
              ← Back
            </button>
            <h2>Connect an existing camera</h2>
            <p className="sheet-description">
              Share your camera details and we'll get in touch.
            </p>
            <form onSubmit={handleExistingSubmit}>
              <label htmlFor="cam-url">
                Camera or stream link
                <span className="field-hint">Public webcam, HLS, YouTube, or another stream link</span>
              </label>
              <input
                id="cam-url"
                name="url"
                type="url"
                placeholder="https://..."
                maxLength={500}
                required
              />
              <label htmlFor="cam-location">Location</label>
              <input
                id="cam-location"
                name="location"
                placeholder="Break or neighborhood"
                maxLength={200}
                required
                defaultValue={initialLocation ? `${initialLocation.lat.toFixed(4)}, ${initialLocation.lng.toFixed(4)}` : ''}
              />
              <label htmlFor="cam-email">Email</label>
              <input
                id="cam-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                maxLength={254}
                required
              />
              <button className="primary-button" type="submit">
                Share camera details
              </button>
              <p className="form-note">Preview only. Submissions are not sent yet.</p>
            </form>
          </div>
        )}

        {step === 'need' && (
          <div className="sheet-view">
            <button className="sheet-back" onClick={() => setStep('choice')}>
              ← Back
            </button>
            <h2>I have a view</h2>
            <p className="sheet-description">
              Tell us where it is. We'll follow up about adding a camera.
            </p>
            <form onSubmit={handleNeedSubmit}>
              <label>View location</label>
              <p className="field-hint host-map-hint">Drop a pin as close as you can to the property or camera viewpoint.</p>
              <HostLocationMap pin={viewPin} onPinChange={setViewPin} active={open && step === 'need'} />
              <label htmlFor="view-location">Location name <span>(optional)</span></label>
              <input
                id="view-location"
                name="location"
                placeholder="Windansea, Marine St, address..."
                maxLength={200}
              />
              <label htmlFor="view-note">Tell us about the view <span>(optional)</span></label>
              <textarea
                id="view-note"
                name="note"
                rows={2}
                placeholder="3rd-floor balcony looking southwest..."
                maxLength={300}
              />
              <label htmlFor="view-email">Email</label>
              <input
                id="view-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                maxLength={254}
                required
              />
              <button className="primary-button" type="submit" disabled={!viewPin}>
                Express interest
              </button>
              <p className="form-note">Preview only. Submissions are not sent yet.</p>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="sheet-view sheet-success">
            <p className="success-label">RECEIVED</p>
            <p className="success-message">
              Thanks — we've got the details.
            </p>
            <p className="form-note" style={{ marginBottom: 'var(--space-6)' }}>
              Preview only. Nothing was actually submitted.
            </p>
            <button className="primary-button" onClick={handleClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}


function HostLocationMap({ pin, onPinChange, active }: {
  pin: { lat: number; lng: number } | null;
  onPinChange: (pin: { lat: number; lng: number }) => void;
  active: boolean;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current, {
      center: [CAMERA.coordinates.lat, CAMERA.coordinates.lng],
      zoom: 14,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map);
    map.on('click', (e: L.LeafletMouseEvent) => onPinChange({ lat: e.latlng.lat, lng: e.latlng.lng }));
    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onPinChange]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const node = mapRef.current;
    if (!map || !node || !active) return;
    const refresh = () => map.invalidateSize({ animate: false });
    const frame = requestAnimationFrame(refresh);
    const timeout = window.setTimeout(refresh, 300);
    const observer = new ResizeObserver(refresh);
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, [active]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
      markerRef.current = null;
    }
    if (pin) {
      markerRef.current = L.marker([pin.lat, pin.lng], {
        icon: L.divIcon({ className: 'nomination-pin', html: '<div class="pin-dot"></div>', iconSize: [24, 24], iconAnchor: [12, 12] }),
      }).addTo(map);
    }
  }, [pin]);

  return (
    <div className="nomination-map-container">
      <div ref={mapRef} className="nomination-map" />
      {!pin && <p className="map-hint">Tap to place a pin</p>}
    </div>
  );
}

