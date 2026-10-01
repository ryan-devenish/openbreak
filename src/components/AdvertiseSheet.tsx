import { useEffect, useRef, useState, FormEvent } from 'react';
import { CAMERA } from '../data/prototype';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = 'form' | 'success';

export default function AdvertiseSheet({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>('form');

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
    setStep('form');
    document.body.style.overflow = '';
    onClose();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStep('success');
  };

  return (
    <dialog ref={dialogRef} className="sheet" onClose={handleClose} aria-labelledby="advertise-dialog-title">
      <div className="sheet-content">
        <button
          className="icon-button sheet-close"
          onClick={handleClose}
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>

        {step === 'form' && (
          <div className="sheet-view">
            <h2 id="advertise-dialog-title">Advertise near {CAMERA.name}</h2>
            <p className="sheet-description">
              Reach surfers checking this break.
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="ad-business">Business name</label>
              <input
                id="ad-business"
                name="business"
                placeholder="Your business"
                maxLength={200}
                required
              />
              <label htmlFor="ad-website">Website <span>(optional)</span></label>
              <input
                id="ad-website"
                name="website"
                type="url"
                placeholder="https://..."
                maxLength={500}
              />
              <label htmlFor="ad-email">Email</label>
              <input
                id="ad-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                maxLength={254}
                required
              />
              <button className="primary-button" type="submit">
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
              Thanks for your interest.
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
