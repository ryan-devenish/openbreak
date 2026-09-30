# OpenBreak

**The ocean is free. Watching it should be too.**

A community-supported network of free surf cameras. Surfers get free access, hosts contribute valuable views and receive exposure, and local businesses support cameras while reaching surfers at specific breaks.

## Prototype
Single-screen Windansea concept using Vite, React, TypeScript and plain CSS. Three horizontal snap views tell the Surfer, Host and Business stories. Swipe left/right, use the previous/next arrows, or focus the carousel and use Left/Right keys. Escape returns to the surfer view. The photograph moves more slowly than the content for parallax; the camera HUD remains anchored across all views. There is no vertical scrolling. Resize preserves the selected view. Reduced motion disables parallax and uses immediate navigation.

No live feed, backend, authentication, payments, forecasts or maps. Future actions are described as coming soon rather than presented as clickable controls. The local offer is fictional demo data; the property is not affiliated with OpenBreak. Property attribution appears only in the host view.

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
