import { useEffect, useRef, useState, FormEvent } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CAMERA, type Nomination } from '../data/prototype';

interface Props {
  open: boolean;
  onClose: () => void;
  onNominate: (nomination: Nomination) => void;
  onOpenHost?: (location: { lat: number; lng: number }) => void;
}

type Step = 'map' | 'success' | 'findHost' | 'intro' | 'introSuccess';

export default function NominateSheet({ open, onClose, onNominate, onOpenHost }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>('map');
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [note, setNote] = useState('');
  const [relationship, setRelationship] = useState<string>('');
  const [canIntro, setCanIntro] = useState<string>('');
  const [introEmail, setIntroEmail] = useState('');

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

  const resetState = () => {
    setStep('map');
    setPin(null);
    setNote('');
    setRelationship('');
    setCanIntro('');
    setIntroEmail('');
  };

  const handleClose = () => {
    resetState();
    document.body.style.overflow = '';
    onClose();
  };

  const handleSubmit = () => {
    if (!pin) return;
    const nomination: Nomination = {
      id: crypto.randomUUID(),
      lat: pin.lat,
      lng: pin.lng,
      note: note.trim() || undefined,
      createdAt: Date.now(),
    };
    onNominate(nomination);
    setStep('success');
  };

  const handleFindHost = () => setStep('findHost');

  const handleRelationshipSelect = (value: string) => {
    setRelationship(value);
    if (value === 'own' && pin && onOpenHost) {
      handleClose();
      onOpenHost(pin);
    }
  };

  const handleIntroSelect = (value: string) => {
    setCanIntro(value);
    if (value === 'yes' || value === 'maybe') setStep('intro');
  };

  const handleIntroSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStep('introSuccess');
  };

  const handleDone = () => handleClose();

  return (
    <dialog ref={dialogRef} className="sheet sheet-tall" onClose={handleClose} aria-labelledby="nominate-dialog-title">
      <div className="sheet-content">
        <button className="icon-button sheet-close" onClick={handleClose} aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>

        {step === 'map' && (
          <div className="sheet-view">
            <h2 id="nominate-dialog-title">Nominate a view</h2>
            <p className="sheet-description">Drop a pin where a camera should be.</p>
            <NominationMap pin={pin} onPinChange={setPin} active={open && step === 'map'} />
            <label htmlFor="nom-note" className="note-label">
              Why here? <span>(optional)</span>
            </label>
            <textarea
              id="nom-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Popular break, useful angle, hard to see conditions..."
              maxLength={300}
            />
            <button className="primary-button" onClick={handleSubmit} disabled={!pin}>
              Nominate this view
            </button>
            <p className="form-note">Preview only. Nominations are not sent yet.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="sheet-view sheet-success">
            <p className="success-label">VIEW NOMINATED</p>
            <p className="success-message">Every nomination helps us find where the next free camera should go.</p>
            <div className="success-actions">
              <button className="text-button" onClick={handleFindHost}>Know someone with a view here? Help us find a host →</button>
              <button className="primary-button" onClick={handleDone}>Done</button>
            </div>
          </div>
        )}

        {step === 'findHost' && !relationship && (
          <div className="sheet-view">
            <button className="sheet-back" onClick={() => setStep('success')}>← Back</button>
            <h2>Help us find a host</h2>
            <p className="sheet-description">Do you know or control a property with this view?</p>
            <div className="choice-group">
              <button type="button" className="choice-row" onClick={() => handleRelationshipSelect('own')}>
                <div className="choice-row-content"><span className="choice-row-label">I own or control it</span><span className="choice-row-description">Express interest in hosting</span></div>
                <span className="choice-row-arrow" aria-hidden="true">→</span>
              </button>
              <button type="button" className="choice-row" onClick={() => handleRelationshipSelect('know')}>
                <div className="choice-row-content"><span className="choice-row-label">I know the owner</span><span className="choice-row-description">Help us get in touch</span></div>
                <span className="choice-row-arrow" aria-hidden="true">→</span>
              </button>
              <button type="button" className="choice-row" onClick={handleDone}>
                <div className="choice-row-content"><span className="choice-row-label">No</span><span className="choice-row-description">Thanks for nominating</span></div>
                <span className="choice-row-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        )}

        {step === 'findHost' && relationship === 'know' && !canIntro && (
          <div className="sheet-view">
            <button className="sheet-back" onClick={() => setRelationship('')}>← Back</button>
            <h2>Help us connect</h2>
            <p className="sheet-description">Could you introduce us to the property owner?</p>
            <div className="choice-group">
              <button type="button" className="choice-row" onClick={() => handleIntroSelect('yes')}><span className="choice-row-label">Yes, I can introduce you</span><span className="choice-row-arrow" aria-hidden="true">→</span></button>
              <button type="button" className="choice-row" onClick={() => handleIntroSelect('maybe')}><span className="choice-row-label">Maybe</span><span className="choice-row-arrow" aria-hidden="true">→</span></button>
              <button type="button" className="choice-row" onClick={handleDone}><span className="choice-row-label">No</span><span className="choice-row-arrow" aria-hidden="true">→</span></button>
            </div>
          </div>
        )}

        {step === 'intro' && (
          <div className="sheet-view">
            <button className="sheet-back" onClick={() => { setStep('findHost'); setCanIntro(''); }}>← Back</button>
            <h2>Help us connect</h2>
            <p className="sheet-description">Leave your email and we'll reach out about making an introduction.</p>
            <form onSubmit={handleIntroSubmit}>
              <label htmlFor="intro-email">Your email</label>
              <input id="intro-email" name="email" type="email" placeholder="you@example.com" value={introEmail} onChange={(e) => setIntroEmail(e.target.value)} maxLength={254} required />
              <button className="primary-button" type="submit">Submit</button>
              <p className="form-note">Preview only. Submissions are not sent yet.</p>
            </form>
          </div>
        )}

        {step === 'introSuccess' && (
          <div className="sheet-view sheet-success">
            <p className="success-label">RECEIVED</p>
            <p className="success-message">Thanks — we'll be in touch about making an introduction.</p>
            <p className="form-note" style={{ marginBottom: 'var(--space-6)' }}>Preview only. Nothing was actually submitted.</p>
            <button className="primary-button" onClick={handleDone}>Done</button>
          </div>
        )}
      </div>
    </dialog>
  );
}

function NominationMap({ pin, onPinChange, active }: {
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

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      onPinChange({ lat, lng });
    });

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
      const marker = L.marker([pin.lat, pin.lng], {
        icon: L.divIcon({
          className: 'nomination-pin',
          html: '<div class="pin-dot"></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        }),
      }).addTo(map);
      markerRef.current = marker;
    }
  }, [pin]);

  return (
    <div className="nomination-map-container">
      <div ref={mapRef} className="nomination-map" />
      {!pin && <p className="map-hint">Tap to place a pin</p>}
    </div>
  );
}
