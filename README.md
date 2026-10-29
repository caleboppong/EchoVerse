# EchoVerse Studio — combined milestones 1–4

An original React Native / Expo **JavaScript JSX** university assessment prototype. Includes four screens, onboarding and informative modal, four SVG generative art worlds, touch/drag gestures, energy slider, iPhone DeviceMotion tilt control, original bundled ambient sound, haptic feedback, focus mode, and PNG sharing.

## Install on Windows / test on iPhone

1. Extract this ZIP and open the `EchoVerse_M1-M4_Combined` folder in VS Code.
2. Run `npm install` then `npx expo install --fix` (Expo will align package versions to SDK 58).
3. Run `npx expo start --clear` and scan the QR code with the iPhone Camera to open Expo Go.
4. For connection problems try `npx expo start --tunnel`.

**Do not merge this folder into the original M1 project.** It is a complete replacement release.

## What to test in Milestone 5

- Onboarding, navigation, all four worlds, guide modal.
- Touch and drag, impulse counter, energy slider.
- Motion toggle on an actual iPhone; rotate/tilt the device and confirm visual response. Motion availability depends on device and Expo Go support.
- Play/pause original ambient WAV audio; check device volume and silent mode.
- Share PNG opens the iOS share sheet. This exports a still image only.
- Focus mode, safe areas, accessibility labels, offline behavior and errors.

## Limitations / academic honesty

This is a combined **implementation package**, not a tested or certified iPhone build. No physical-device testing has been performed by the assistant. The audio is ambient playback, **not microphone analysis or sound-reactive visualisation**. PNG export is a still image, not animated video. Motion may not work in web previews. No account, backend or personal-data collection is included. 

## Troubleshooting

If Expo reports mismatched dependencies run `npx expo install --fix`. If an SDK version is unsupported by the Expo Go version on your iPhone, follow Expo's current compatibility guidance; don't randomly downgrade React Native. Do not run `npm audit fix --force` on this Expo project. Check the terminal for any Metro error and share the exact output.

## Files

- `App.jsx` — app shell, tabs and modal.
- `src/components/ArtCanvas.jsx` — animated SVG composition and gesture responder.
- `src/screens/Studio.jsx` — sensors, audio, controls and PNG sharing.
- `src/screens/Home.jsx`, `Explore.jsx`, `Settings.jsx` — navigation destinations.
- `assets/ambient.wav` — original programmatically synthesised ambient audio.
- `assets/icon.png`, `splash.png` — project visual assets.
