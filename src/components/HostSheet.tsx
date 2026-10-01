import { useEffect, useRef, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

type HostType = null | 'existing' | 'need';

export default function HostSheet({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [hostType, setHostType] = useState<HostType>(null);

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
    setHostType(null);
    document.body.style.overflow = '';
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="sheet" onClose={handleClose} aria-labelledby="host-dialog-title">
      <div className="sheet-content">
        <button className="sheet-close" onClick={handleClose} aria-label="Close">
          ×
        </button>

        {!hostType && (
          <div className="sheet-view">
            <h2 id="host-dialog-title">Host a camera</h2>
            <p className="sheet-description">
              Turn your ocean view into a free surf camera.
            </p>
            <fieldset>
              <legend>Do you already have a camera pointed at the ocean?</legend>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasCamera"
                  value="yes"
                  onChange={() => setHostType('existing')}
                />
                Yes — connect an existing feed
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasCamera"
                  value="no"
                  onChange={() => setHostType('need')}
                />
                No — I have a view and need a camera
              </label>
            </fieldset>
          </div>
        )}

        {hostType === 'existing' && (
          <div className="sheet-view">
            <button className="sheet-back" onClick={() => setHostType(null)}>
              ← Back
            </button>
            <h2>Connect an existing camera</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="cam-url">Camera or stream URL</label>
              <input
                id="cam-url"
                name="url"
                type="url"
                placeholder="https://..."
                maxLength={500}
              />
              <label htmlFor="cam-location">Location</label>
              <input
                id="cam-location"
                name="location"
                placeholder="Break or neighborhood"
                maxLength={200}
              />
              <label htmlFor="cam-email">Email</label>
              <input
                id="cam-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                maxLength={254}
              />
              <button className="primary-button" type="submit">
                Continue
              </button>
              <p className="form-note">Preview only. Submissions are not sent yet.</p>
            </form>
          </div>
        )}

        {hostType === 'need' && (
          <div className="sheet-view">
            <button className="sheet-back" onClick={() => setHostType(null)}>
              ← Back
            </button>
            <h2>I have a view</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="view-location">View location</label>
              <input
                id="view-location"
                name="location"
                placeholder="Break or neighborhood"
                maxLength={200}
              />
              <label htmlFor="view-email">Email</label>
              <input
                id="view-email"
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
        )}
      </div>
    </dialog>
  );
}
