export const IMAGES = {
  camera: '/images/windansea-surfer-view.jpg',
  property: '/images/windansea-property.jpg',
  hostInterior: '/images/windansea-host-view.jpg',
};

export const CAMERA = {
  id: 'windansea-main',
  name: 'Windansea',
  location: 'La Jolla, CA',
  coordinates: { lat: 32.8328, lng: -117.2813 },
  status: 'concept' as const,
};

export const HOST = {
  name: 'Oceanfront Penthouse',
  location: 'Windansea',
  image: IMAGES.hostInterior,
  listingProvider: 'Airbnb',
  listingUrl: null as string | null,
};

export const SPONSOR = {
  name: 'Don Bravo Grill & Cantina',
  category: 'Mexican & Seafood',
  coordinates: { lat: 32.8124944, lng: -117.26858 },
  address: '5504 La Jolla Blvd, La Jolla, CA 92037',
  website: 'https://maps.app.goo.gl/99ksthykgjhTL1C47',
  image: '/images/don-bravo.webp',
  offer: {
    text: 'Free drink when you mention OpenBreak',
    status: 'concept' as const,
  },
};

export interface Nomination {
  id: string;
  lat: number;
  lng: number;
  note?: string;
  createdAt: number;
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(miles: number): string {
  if (miles < 0.2) {
    const feet = Math.round(miles * 5280);
    return `${feet} ft away`;
  }
  return `${miles.toFixed(1)} mi away`;
}
