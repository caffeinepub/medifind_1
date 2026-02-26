# Specification

## Summary
**Goal:** Fix the PWA "Add to Home Screen" install prompt so it reliably appears and works on Chrome for Android and iOS Safari.

**Planned changes:**
- Attach the `beforeinstallprompt` event listener in a `<script>` tag inside `index.html` (before the React bundle loads) and store the deferred prompt on `window.__installPrompt` to avoid missing the event due to React hydration timing.
- Update the `useInstallPrompt` hook to read from `window.__installPrompt` on mount.
- Verify and fix `manifest.json` to include valid 192×192 and 512×512 PNG icons, a `start_url`, and `display: standalone`.
- Ensure the service worker (`sw.js`) registers without errors and caches the root URL on install, resolving any race conditions with the `beforeinstallprompt` event.
- Show an iOS Safari fallback banner with "Share → Add to Home Screen" instructions instead of the native prompt.
- Hide the install banner after the prompt is accepted or dismissed so it does not reappear.

**User-visible outcome:** On Chrome for Android, the install banner appears after page load and tapping it triggers the native install prompt. On iOS Safari, a manual instruction banner is shown. The banner is hidden after interaction and Chrome DevTools shows no installability errors.
