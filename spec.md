# Specification

## Summary
**Goal:** Make MediFind installable as a Progressive Web App (PWA) by adding a web app manifest, a service worker, and an "Add to Home Screen" button in the UI.

**Planned changes:**
- Add a `manifest.json` to `frontend/public` with app name "MediFind", short name, soft green theme color, standalone display mode, and icon references
- Link the manifest and set the theme-color meta tag in `frontend/index.html`
- Add a minimal `sw.js` service worker to `frontend/public` that caches the app shell on install, and register it in the app
- Add an "Add to Home Screen" button/banner in the app header that appears when the browser fires `beforeinstallprompt`, triggers the native install prompt on click, and hides after interaction
- On iOS Safari, show a fallback instructional banner explaining how to use Share > Add to Home Screen
- Style the button/banner using the existing soft green and white color palette

**User-visible outcome:** Users on supported browsers (Chrome, Edge) see an "Add to Home Screen" button they can click to install MediFind as a standalone app. iOS Safari users see instructions for manual installation.
