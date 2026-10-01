import { useEffect, useRef, useState, FormEvent } from 'react';
import { type Nomination } from '../data/prototype';
import LocationPicker from './LocationPicker';

interface Props {
  open: boolean;
  onClose: () => void;
  onNominate: (nomination: Nomination) => void;
  onOpenHost?: (location: { lat: number; lng: number }) => void;
}

type Step = 'map' | 'success' | 'findHost' | 'intro' | 'introSuccess' | 'thanks';

export default function NominateSheet({ open, onClose, onNominate, onOpenHost }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>('map');
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [note, setNote] = useState('');
  const [relationship, setRelationship] = useState<string>('');
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
    setIntroEmail('');
  };

  const handleClose = () => {
    resetState();
    document.body.style.overflow = '';
    onClose();
  };

  const handleSubmit = () => {
    if (!pin) return;
    onNominate({
      id: crypto.randomUUID(),
      lat: pin.lat,
      lng: pin.lng,
      note: note.trim() || undefined,
      createdAt: Date.now(),
    });
    setStep('success');
  };

  const handleRelationshipSelect = (value: string) => {
    setRelationship(value);
    if (value === 'own' && pin && onOpenHost) {
      handleClose();
      onOpenHost(pin);
    }
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
  const flowClass = step === 'map' ? 'sheet-view' : 'sheet-view nomination-flow-step';

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
            <LocationPicker
              pin={pin}
              onPinChange={setPin}
              active={open && step === 'map'}
              label="View location"
              hint="Drop a pin where a camera should be."
            />
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
          <div className={`${flowClass} sheet-success nomination-success`}>
            <p className="success-label">VIEW NOMINATED</p>
            <p className="success-message">Every nomination helps us find where the next free camera should go.</p>
            <div className="host-followup">
              <p>Know someone with a view here?</p>
              <button className="secondary-action" onClick={() => setStep('findHost')}>Help us find a host →</button>
            </div>
            <button className="primary-button" onClick={handleDone}>Done</button>
          </div>
        )}

        {step === 'findHost' && !relationship && (
          <div className={flowClass}>
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
              <button type="button" className="choice-row" onClick={() => setStep('thanks')}>
                <div className="choice-row-content"><span className="choice-row-label">No</span><span className="choice-row-description">Thanks for nominating</span></div>
                <span className="choice-row-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        )}

        {step === 'findHost' && relationship === 'know' && (
          <div className={flowClass}>
            <button className="sheet-back" onClick={() => setRelationship('')}>← Back</button>
            <h2>Help us connect</h2>
            <p className="sheet-description">Could you introduce us to the property owner?</p>
            <div className="choice-group">
              <button type="button" className="choice-row" onClick={() => setStep('intro')}><span className="choice-row-label">Yes, I can introduce you</span><span className="choice-row-arrow" aria-hidden="true">→</span></button>
              <button type="button" className="choice-row" onClick={() => setStep('intro')}><span className="choice-row-label">Maybe</span><span className="choice-row-arrow" aria-hidden="true">→</span></button>
              <button type="button" className="choice-row" onClick={() => setStep('thanks')}><span className="choice-row-label">No</span><span className="choice-row-arrow" aria-hidden="true">→</span></button>
            </div>
          </div>
        )}

        {step === 'intro' && (
          <div className={flowClass}>
            <button className="sheet-back" onClick={() => setStep('findHost')}>← Back</button>
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


        {step === 'thanks' && (
          <div className={`${flowClass} sheet-success nomination-success`}>
            <p className="success-label">THANKS FOR NOMINATING</p>
            <p className="success-message">Your nomination still helps us decide where the next free camera should go.</p>
            <button className="primary-button" onClick={handleDone}>Done</button>
          </div>
        )}

        {step === 'introSuccess' && (
          <div className={`${flowClass} sheet-success`}>
            <p className="success-label">RECEIVED</p>
            <p className="success-message">Thanks — we'll be in touch about making an introduction.</p>
            <p className="form-note success-note">Preview only. Nothing was actually submitted.</p>
            <button className="primary-button" onClick={handleDone}>Done</button>
          </div>
        )}
      </div>
    </dialog>
  );
}

