# OpenBreak

**The ocean is free. Watching it should be too.**

A community-supported network of free surf cameras. Surfers get free access, hosts contribute valuable views and receive exposure, and local businesses support cameras while reaching surfers at specific breaks.

## Prototype
Single-screen Windansea concept using Vite, React, TypeScript and plain CSS. Default, Surfer, Host and Business stories surround a fixed camera HUD. Desktop hover and keyboard focus preview states; clicking or tapping selects them. Select the same action again, use Reset View, or press Escape to reset. Host imagery crossfades over 400ms. Mobile actions scroll horizontally; reduced motion is respected.

No live feed, backend, authentication, payments, forecasts or maps. Next-phase CTAs are disabled and labeled “Coming next.” The local offer is fictional demo data; the property is not affiliated with OpenBreak.

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
The supplied photographs are included at:
- `public/images/windansea-view.jpg` — actual ocean/break from the balcony; fullscreen background.
- `public/images/windansea-property.jpg` — interior; host-state background and attribution thumbnail.

They resolve to `/images/windansea-view.jpg` and `/images/windansea-property.jpg`. Missing images show a neutral CSS background and a small notice. No imagery was generated or substituted.
Replace `AIRBNB_PROPERTY_URL` in `src/data/prototype.ts` with the exact property listing; it currently links to Airbnb's homepage.

## GitHub Pages
Canonical domain: **https://openbreak.surf**. Vite's base is `/`; `public/CNAME` is copied into the build. GitHub Actions builds and deploys `dist/` on pushes to `main`, or manual dispatch.

In Settings → Pages, select **GitHub Actions** as the source. Configure the custom domain, point its DNS to GitHub Pages, and enable HTTPS when available. DNS and repository Pages settings are not configured by this source commit.
