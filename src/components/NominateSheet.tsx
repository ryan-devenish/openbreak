import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CAMERA, type Nomination } from '../data/prototype';

interface Props {
  open: boolean;
  onClose: () => void;
  onNominate: (nomination: Nomination) => void;
}

type Step = 'map' | 'success' | 'findHost';

export default function NominateSheet({ open, onClose, onNominate }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>('map');
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [note, setNote] = useState('');
  const [relationship, setRelationship] = useState<string>('');
  const [canIntro, setCanIntro] = useState<string>('');

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
    setStep('map');
    setPin(null);
    setNote('');
    setRelationship('');
    setCanIntro('');
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

  const handleFindHost = () => {
    setStep('findHost');
  };

  const handleDone = () => {
    handleClose();
  };

  return (
    <dialog ref={dialogRef} className="sheet sheet-tall" onClose={handleClose} aria-labelledby="nominate-dialog-title">
      <div className="sheet-content">
        <button className="sheet-close" onClick={handleClose} aria-label="Close">
          ×
        </button>

        {step === 'map' && (
          <div className="sheet-view">
            <h2 id="nominate-dialog-title">Nominate a view</h2>
            <p className="sheet-description">
              Drop a pin where a camera should be.
            </p>
            <NominationMap pin={pin} onPinChange={setPin} />
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
            <button
              className="primary-button"
              onClick={handleSubmit}
              disabled={!pin}
            >
              Nominate this view
            </button>
            <p className="form-note">Preview only. Nominations are not sent yet.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="sheet-view sheet-success">
            <p className="success-label">VIEW NOMINATED</p>
            <p className="success-message">
              Every nomination helps us find where the next free camera should go.
            </p>
            <div className="success-actions">
              <button className="text-button" onClick={handleFindHost}>
                Know someone with a view here? Help us find a host →
              </button>
              <button className="primary-button" onClick={handleDone}>
                Done
              </button>
            </div>
          </div>
        )}

        {step === 'findHost' && (
          <div className="sheet-view">
            <button className="sheet-back" onClick={() => setStep('success')}>
              ← Back
            </button>
            <h2>Help us find a host</h2>
            <fieldset>
              <legend>Do you know or control a property with this view?</legend>
              <label className="radio-label">
                <input
                  type="radio"
                  name="relationship"
                  value="own"
                  checked={relationship === 'own'}
                  onChange={(e) => setRelationship(e.target.value)}
                />
                I own/control it
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="relationship"
                  value="know"
                  checked={relationship === 'know'}
                  onChange={(e) => setRelationship(e.target.value)}
                />
                I know the owner
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="relationship"
                  value="no"
                  checked={relationship === 'no'}
                  onChange={(e) => setRelationship(e.target.value)}
                />
                No
              </label>
            </fieldset>

            {relationship === 'know' && (
              <fieldset>
                <legend>Could you introduce us?</legend>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="canIntro"
                    value="yes"
                    checked={canIntro === 'yes'}
                    onChange={(e) => setCanIntro(e.target.value)}
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="canIntro"
                    value="maybe"
                    checked={canIntro === 'maybe'}
                    onChange={(e) => setCanIntro(e.target.value)}
                  />
                  Maybe
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="canIntro"
                    value="no"
                    checked={canIntro === 'no'}
                    onChange={(e) => setCanIntro(e.target.value)}
                  />
                  No
                </label>
              </fieldset>
            )}

            <button className="primary-button" onClick={handleDone}>
              Done
            </button>
            <p className="form-note">Preview only. Responses are not sent yet.</p>
          </div>
        )}
      </div>
    </dialog>
  );
}

function NominationMap({
  pin,
  onPinChange,
}: {
  pin: { lat: number; lng: number } | null;
  onPinChange: (pin: { lat: number; lng: number }) => void;
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

    setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onPinChange]);

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
