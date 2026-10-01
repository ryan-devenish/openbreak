export type GeographicLevel = 'ocean' | 'country' | 'state' | 'region' | 'city';

export interface GeographicEntity {
  id: string;
  slug: string;
  name: string;
  level: GeographicLevel;
  parentId?: string;
  aliases?: string[];
}

export const GEOGRAPHY: GeographicEntity[] = [
  { id: 'pacific', slug: 'pacific', name: 'Pacific Ocean', level: 'ocean', aliases: ['pacific'] },
  { id: 'us', slug: 'united-states', name: 'United States', level: 'country', parentId: 'pacific', aliases: ['usa', 'us'] },
  { id: 'ca', slug: 'california', name: 'California', level: 'state', parentId: 'us', aliases: ['ca'] },
  { id: 'san-diego', slug: 'san-diego', name: 'San Diego', level: 'region', parentId: 'ca', aliases: ['san diego county'] },
  { id: 'la-jolla', slug: 'la-jolla', name: 'La Jolla', level: 'city', parentId: 'san-diego' },
];

export function getGeographicEntity(id: string) {
  return GEOGRAPHY.find((entity) => entity.id === id);
}

export function getGeographicPath(id: string) {
  const path: GeographicEntity[] = [];
  let current = getGeographicEntity(id);

  while (current) {
    path.unshift(current);
    current = current.parentId ? getGeographicEntity(current.parentId) : undefined;
  }

  return path;
}
