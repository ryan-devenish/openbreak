import type { SheetView } from '../App';

interface Props {
  onAction: (view: SheetView) => void;
}

export default function NetworkGrowth({ onAction }: Props) {
  return (
    <section className="network-growth" aria-label="Grow the network">
      <h2>Have a view of the ocean?<br />Put it on OpenBreak.</h2>

      <button className="primary-button" onClick={() => onAction('main')}>
        Put a view on OpenBreak
      </button>

      <nav className="growth-links">
        <button onClick={() => onAction('nominate')}>
          Nominate a view →
        </button>
        <button onClick={() => onAction('host')}>
          Have a view? Host a camera →
        </button>
        <button onClick={() => onAction('advertise')}>
          Local business? Advertise nearby →
        </button>
      </nav>
    </section>
  );
}
