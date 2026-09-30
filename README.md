# OpenBreak

**The ocean is free. Watching it should be too.**

A community-supported network of free surf cameras. Surfers get free access, hosts contribute valuable views and receive exposure, and local businesses support cameras while reaching surfers at specific breaks.

## Prototype
A camera-led marketing area sits above a pure-white, app preview. Three horizontal snap views introduce Surfer, Host and Business audiences. Swipe the camera area left/right, use the previous/next arrows, or use Left/Right keys outside the form fields. Escape returns to the surfer view. The photographs move more slowly than the content for parallax; the camera frame stays aligned across horizontal views while the entire page scrolls vertically. Reduced motion disables parallax, smooth navigation and the red live-dot pulse.

Each audience has a primary action, a Learn more section, and an interest form. The business preview uses Lahaina Beach House in Pacific Beach as an explicitly labeled example; no sponsorship or offer is claimed. Property attribution appears only in the host view.

No live feed, authentication, payments, forecasts or maps. The live indicator is part of the concept camera interface.

## Interest signup
Set `endpoint` in `public/signup-config.json` to the supplied HTTPS form endpoint. It must accept multipart POSTs from `https://openbreak.surf` and return a successful HTTP status only after saving a submission. Fields: `interest`, `name`, `email`, `location`, `message`. The form includes email validation, pending/success/error states, and preserves entered details on errors. It does not store personal data in the browser.

Primary actions scroll the page to the signup form; Learn more scrolls to the audience details.

The endpoint is currently blank: submission is disabled and the form explicitly says it is a preview. No signup is claimed or silently discarded. Set the endpoint to enable signup without changing the form component.

## Local development
```sh
npm install
npm run dev
```

## Production build
```sh
npm run build
npm run preview
```
Static output is in `dist/`.

## Original photographs
The supplied photographs are included unchanged at:
- `public/images/windansea-surfer-view.jpg` — uploaded surfer photograph `63ef0b47-b879-40c4-ae9d-dab932faeb17.jpg`.
- `public/images/windansea-host-view.jpg` — uploaded living-room photograph `0781e700-bfd6-4ebc-b860-198e96dc1c15.jpg`.
- `public/images/lahaina-business-view.webp` — uploaded Lahaina Beach House photograph `unnamed.webp`.

Lahaina Beach House's name, location and website come from https://lahainabeachhousepbca.com/. Its example placement is not an actual affiliation or offer. No imagery was generated or substituted.
Replace `AIRBNB_PROPERTY_URL` in `src/data/prototype.ts` with the exact property listing; it currently links to Airbnb's homepage.

## GitHub Pages
Canonical domain: **https://openbreak.surf**. Vite's base is `/`; `public/CNAME` is copied into the build. GitHub Actions builds and deploys `dist/` on pushes to `main`, or manual dispatch.

In Settings → Pages, select **GitHub Actions** as the source. Configure the custom domain, point its DNS to GitHub Pages, and enable HTTPS when available. DNS and repository Pages settings are not configured by this source commit.
