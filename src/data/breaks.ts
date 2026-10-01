export type CameraStatus = 'live' | 'preview' | 'offline' | 'coming-soon';

export interface BreakCamera {
  id: string;
  image: string;
  status: CameraStatus;
  addedAt?: string;
}

export interface BreakHost {
  name: string;
  provider: 'Airbnb' | string;
  url: string;
  image?: string;
}

export interface SurfBreak {
  slug: string;
  name: string;
  location: string;
  aliases?: string[];
  coordinates: { lat: number; lng: number };
  geographyId?: string;
  geographyPath?: string[];
  camera: BreakCamera;
  host: BreakHost;
  metadata?: Record<string, string>;
}

const windansea: SurfBreak = {
  slug: 'windansea',
  name: 'Windansea',
  location: 'La Jolla, CA',
  aliases: ['wind n sea'],
  coordinates: { lat: 32.8328, lng: -117.2813 },
  geographyId: 'la-jolla',
  geographyPath: ['pacific', 'us', 'ca', 'san-diego', 'la-jolla'],
  camera: {
    id: 'windansea-main',
    image: '/images/windansea-surfer-view.jpg',
    status: 'preview',
  },
  host: {
    name: 'Oceanfront Penthouse',
    provider: 'Airbnb',
    url: 'https://www.airbnb.com/rooms/1076961338909974204?guests=1&adults=1&s=66&source=embed_widget',
    image: '/images/windansea-property.jpg',
  },
};

export const BREAKS: SurfBreak[] = [windansea];

export function getBreakBySlug(slug: string) {
  return BREAKS.find((surfBreak) => surfBreak.slug === slug);
}
