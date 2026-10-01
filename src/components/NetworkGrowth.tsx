import type { SheetView } from '../App';

interface Props {
  onAction: (view: SheetView) => void;
  compact?: boolean;
}

export default function NetworkGrowth({ onAction, compact = false }: Props) {
  if (compact) {
    return (
      <section className="network-growth network-growth-compact" aria-label="Grow the network">
        <div className="network-growth-compact-copy">
          <h2>Know another view?</h2>
          <p>Help bring a free camera to another break.</p>
        </div>
        <div className="network-growth-compact-actions">
          <button className="text-button" onClick={() => onAction('nominate')}>Nominate a view →</button>
          <button className="text-button" onClick={() => onAction('host')}>Have a view? Host a camera →</button>
        </div>
      </section>
    );
  }

  return (
    <section className="network-growth" aria-label="Grow the network">
      <h2>Know another view that should have a free camera?</h2>

      <button className="primary-button" onClick={() => onAction('nominate')}>
        Nominate a view
      </button>

      <nav className="growth-links" aria-label="Other ways to participate">
        <button onClick={() => onAction('host')}>
          Have an ocean view? Host a camera →
        </button>
        <button onClick={() => onAction('advertise')}>
          Local business? Advertise nearby →
        </button>
      </nav>
    </section>
  );
}
