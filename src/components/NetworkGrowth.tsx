import type { SheetView } from '../App';

interface Props {
  onAction: (view: SheetView) => void;
}

export default function NetworkGrowth({ onAction }: Props) {
  return (
    <section className="network-growth" aria-label="Grow the network">
      <h2>Know a view that should have a free camera?</h2>

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
