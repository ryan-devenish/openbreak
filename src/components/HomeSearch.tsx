interface Props {
  onOpen: () => void;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function HomeSearch({ onOpen }: Props) {
  return (
    <section className="home-search" aria-labelledby="home-search-title">
      <h2 id="home-search-title">Find your break</h2>
      <button type="button" className="home-search-button" onClick={onOpen} aria-haspopup="dialog">
        <SearchIcon />
        <span>Search breaks, cities, or regions</span>
      </button>
    </section>
  );
}
