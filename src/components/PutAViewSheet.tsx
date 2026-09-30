import { useEffect, useRef } from 'react';
import type { SheetView } from '../App';

interface Props {
  view: SheetView;
  onClose: () => void;
  onChange: (view: SheetView) => void;
}

export default function PutAViewSheet({ view, onClose, onChange }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (view && !dialog.open) {
      dialog.showModal();
    } else if (!view && dialog.open) {
      dialog.close();
    }
  }, [view]);

  const handleClose = () => {
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="sheet" onClose={handleClose}>
      <div className="sheet-content">
        <button className="sheet-close" onClick={handleClose} aria-label="Close">
          ×
        </button>

        {view === 'main' && (
          <MainView onChange={onChange} />
        )}

        {view === 'nominate' && (
          <NominateView onBack={() => onChange('main')} />
        )}

        {view === 'host' && (
          <HostView onBack={() => onChange('main')} />
        )}

        {view === 'advertise' && (
          <AdvertiseView onBack={() => onChange('main')} />
        )}
      </div>
    </dialog>
  );
}

function MainView({ onChange }: { onChange: (view: SheetView) => void }) {
  return (
    <div className="sheet-view">
      <h2>Put a view on OpenBreak</h2>
      <nav className="sheet-options">
        <button onClick={() => onChange('host')}>
          <strong>Already have a camera?</strong>
          <span>Connect your feed →</span>
        </button>
        <button onClick={() => onChange('host')}>
          <strong>Need a camera?</strong>
          <span>We can help →</span>
        </button>
        <button onClick={() => onChange('nominate')}>
          <strong>Know a great view?</strong>
          <span>Nominate it →</span>
        </button>
      </nav>
    </div>
  );
}

function NominateView({ onBack }: { onBack: () => void }) {
  return (
    <div className="sheet-view">
      <button className="sheet-back" onClick={onBack}>← Back</button>
      <h2>Nominate a view</h2>
      <p className="sheet-description">
        Know a spot that deserves a free camera? Tell us about it.
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="nom-location">Location</label>
        <input
          id="nom-location"
          name="location"
          placeholder="Break, neighborhood, or address"
          maxLength={200}
        />

        <label htmlFor="nom-reason">Why would this make a good camera?</label>
        <textarea
          id="nom-reason"
          name="reason"
          rows={3}
          placeholder="Popular break, unique angle, etc."
          maxLength={500}
        />

        <label htmlFor="nom-link">Link <span>(optional)</span></label>
        <input
          id="nom-link"
          name="link"
          type="url"
          placeholder="Public property or listing URL"
          maxLength={500}
        />

        <fieldset>
          <legend>Do you know or control the property?</legend>
          <label className="radio-label">
            <input type="radio" name="relationship" value="own" />
            I own/control it
          </label>
          <label className="radio-label">
            <input type="radio" name="relationship" value="know" />
            I know the owner
          </label>
          <label className="radio-label">
            <input type="radio" name="relationship" value="no" defaultChecked />
            No
          </label>
        </fieldset>

        <button className="primary-button" type="submit">
          Nominate this view
        </button>
        <p className="form-note">This is a preview. Submissions are not sent yet.</p>
      </form>
    </div>
  );
}

function HostView({ onBack }: { onBack: () => void }) {
  return (
    <div className="sheet-view">
      <button className="sheet-back" onClick={onBack}>← Back</button>
      <h2>Host a camera</h2>
      <p className="sheet-description">
        Turn your ocean view into a free surf camera.
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend>Do you already have a camera pointed at the ocean?</legend>
          <label className="radio-label">
            <input type="radio" name="has-camera" value="yes" />
            Yes — connect an existing feed
          </label>
          <label className="radio-label">
            <input type="radio" name="has-camera" value="no" defaultChecked />
            No — I have a view and need a camera
          </label>
        </fieldset>

        <label htmlFor="host-location">View location</label>
        <input
          id="host-location"
          name="location"
          placeholder="Break, neighborhood, or address"
          maxLength={200}
        />

        <label htmlFor="host-email">Email</label>
        <input
          id="host-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          maxLength={254}
        />

        <button className="primary-button" type="submit">
          Express interest
        </button>
        <p className="form-note">This is a preview. Submissions are not sent yet.</p>
      </form>
    </div>
  );
}

function AdvertiseView({ onBack }: { onBack: () => void }) {
  return (
    <div className="sheet-view">
      <button className="sheet-back" onClick={onBack}>← Back</button>
      <h2>Advertise nearby</h2>
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

        <label htmlFor="ad-location">Location</label>
        <input
          id="ad-location"
          name="location"
          placeholder="Neighborhood or address"
          maxLength={200}
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
        <p className="form-note">This is a preview. Submissions are not sent yet.</p>
      </form>
    </div>
  );
}
