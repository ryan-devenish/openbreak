import { useEffect, useRef, useState, FormEvent } from 'react';
import LocationPicker from './LocationPicker';

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
  const [existingPin, setExistingPin] = useState<{ lat: number; lng: number } | null>(initialLocation ?? null);

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
    setExistingPin(initialLocation ?? null);
    document.body.style.overflow = '';
    onClose();
  };

  const handleExistingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!existingPin) return;
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
      coordinates: existingPin,
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
              <LocationPicker
                pin={existingPin}
                onPinChange={setExistingPin}
                active={open && step === 'existing'}
              />
              <label htmlFor="cam-location">Location name <span>(optional)</span></label>
              <input
                id="cam-location"
                name="location"
                placeholder="Windansea, Marine St, address..."
                maxLength={200}
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
              <button className="primary-button" type="submit" disabled={!existingPin}>
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
              <LocationPicker
                pin={viewPin}
                onPinChange={setViewPin}
                active={open && step === 'need'}
              />
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

