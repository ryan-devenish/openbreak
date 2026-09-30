export type Persona = 'default' | 'surfer' | 'host' | 'business';
export const IMAGES = { view: '/images/windansea-view.jpg', property: '/images/windansea-property.jpg' };
// Replace with the exact property listing URL.
export const AIRBNB_PROPERTY_URL = 'https://www.airbnb.com/';
export const personas: { id: Exclude<Persona, 'default'>; title: string; description: string }[] = [
{ id: 'surfer', title: 'I SURF HERE', description: 'Watch this break free.\nHelp bring free cams to yours.' },
{ id: 'host', title: 'I HAVE A VIEW', description: 'Turn your home, rental or business view into a free surf camera.' },
{ id: 'business', title: "I’M A LOCAL BUSINESS", description: 'Reach local surfers.\nHelp keep their cameras free.' },
];
export const headlines: Record<Persona, string[]> = {
default: ['THE OCEAN IS FREE.', 'WATCHING IT SHOULD BE TOO.'],
surfer: ['YOUR BREAK', 'SHOULD BE FREE.'],
host: ['YOUR VIEW', 'BECOMES THE CAMERA.'],
business: ['REACH SURFERS WHILE THEY’RE CHECKING THE BREAK.', 'HELP KEEP THEIR CAMERA FREE.'],
};
// Fictional prototype data, not a real business or offer.
export const DEMO_LOCAL_OFFER = { business: 'JUAN’S BURRITOS', distance: '0.2 MI', offer: 'FREE COFFEE WITH ANY BREAKFAST BURRITO' };
