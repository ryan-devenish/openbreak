import { useEffect, useRef } from 'react';
import { CAMERA } from '../data/prototype';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdvertiseSheet({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
    document.body.style.overflow = '';
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="sheet" onClose={handleClose}>
      <div className="sheet-content">
        <button className="sheet-close" onClick={handleClose} aria-label="Close">
          ×
        </button>
        <div className="sheet-view">
          <h2>Advertise near {CAMERA.name}</h2>
          <p className="sheet-description">
            Reach surfers checking this break.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="ad-business">Business name</label>
            <input
              id="ad-business"
              name="business"
              placeholder="Your business"
              maxLength={200}
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
            />
            <button className="primary-button" type="submit">
              Express interest
            </button>
            <p className="form-note">Preview only. Submissions are not sent yet.</p>
          </form>
        </div>
      </div>
    </dialog>
  );
}
