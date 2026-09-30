export type Persona = 'default' | 'surfer' | 'host' | 'business';
export const IMAGES = { view: '/images/windansea-view.jpg', property: '/images/windansea-property.jpg' };
// Replace with the exact property listing URL.
export const AIRBNB_PROPERTY_URL = 'https://www.airbnb.com/';
export const personas: { id: Exclude<Persona, 'default'>; title: string; description: string }[] = [
{ id: 'surfer', title: 'I surf here', description: 'Watch this break free.\nHelp bring free cams to yours.' },
{ id: 'host', title: 'I have a view', description: 'Turn your home, rental or business view into a free surf camera.' },
{ id: 'business', title: "I’m a local business", description: 'Reach local surfers.\nHelp keep their cameras free.' },
];
export const headlines: Record<Persona, string[]> = {
default: ['The ocean is free.', 'Watching it should be too.'],
surfer: ['Your break', 'should be free.'],
host: ['Your view', 'becomes the camera.'],
business: ['Reach local surfers.', 'Keep their camera free.'],
};
// Fictional prototype data, not a real business or offer.
export const DEMO_LOCAL_OFFER = { business: 'JUAN’S BURRITOS', distance: '0.2 MI', offer: 'FREE COFFEE WITH ANY BREAKFAST BURRITO' };
