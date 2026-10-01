import type { SurfBreak } from '../data/breaks';

interface Props {
  surfBreak: SurfBreak;
  compact?: boolean;
}

export default function BreakResult({ surfBreak, compact = false }: Props) {
  const statusLabel = surfBreak.camera.status === 'preview'
    ? 'PREVIEW'
    : surfBreak.camera.status === 'coming-soon'
      ? 'COMING SOON'
      : surfBreak.camera.status.toUpperCase();

  return (
    <a className={`break-result ${compact ? 'break-result-compact' : ''}`} href={`/break/${surfBreak.slug}`}>
      <img loading="lazy" src={surfBreak.camera.image} alt={`${surfBreak.name} camera preview`} />
      <span className="break-result-copy">
        <strong>{surfBreak.name}</strong>
        <span>{surfBreak.location}</span>
      </span>
      <span className="break-result-status">{statusLabel}</span>
    </a>
  );
}
