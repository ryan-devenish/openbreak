import { BREAKS, type SurfBreak } from './breaks';
import { GEOGRAPHY, type GeographicEntity } from './geography';

export type DiscoveryResult =
  | { type: 'break'; id: string; label: string; secondary: string; href: string; image: string; status: SurfBreak['camera']['status'] }
  | { type: 'region'; id: string; label: string; secondary: string; href?: string; level: GeographicEntity['level'] };

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function includesQuery(values: Array<string | undefined>, query: string) {
  return values.some((value) => value && normalize(value).includes(query));
}

export function searchDiscovery(queryValue: string): DiscoveryResult[] {
  const query = normalize(queryValue);
  if (!query) return [];

  const regions: DiscoveryResult[] = GEOGRAPHY.filter((entity) =>
    includesQuery([entity.name, entity.slug, ...(entity.aliases ?? [])], query)
  ).map((entity) => ({
    type: 'region',
    id: entity.id,
    label: entity.name,
    secondary: entity.level === 'region' ? 'Surf region' : entity.level[0].toUpperCase() + entity.level.slice(1),
    level: entity.level,
  }));

  const breaks: DiscoveryResult[] = BREAKS.filter((surfBreak) => {
    const geography = surfBreak.geographyId ? GEOGRAPHY.filter((entity) => surfBreak.geographyPath?.includes(entity.id)) : [];
    return includesQuery(
      [surfBreak.name, surfBreak.slug, surfBreak.location, ...(surfBreak.aliases ?? []), ...geography.flatMap((entity) => [entity.name, entity.slug, ...(entity.aliases ?? [])])],
      query
    );
  }).map((surfBreak) => ({
    type: 'break',
    id: surfBreak.slug,
    label: surfBreak.name,
    secondary: surfBreak.location,
    href: `/break/${surfBreak.slug}`,
    image: surfBreak.camera.image,
    status: surfBreak.camera.status,
  }));

  return [...regions, ...breaks];
}

export function getBreakResults() {
  return BREAKS.map((surfBreak) => ({
    type: 'break' as const,
    id: surfBreak.slug,
    label: surfBreak.name,
    secondary: surfBreak.location,
    href: `/break/${surfBreak.slug}`,
    image: surfBreak.camera.image,
    status: surfBreak.camera.status,
  }));
}
