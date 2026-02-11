# Maestro E2E Tests

## iOS Simulator (Expo Go)

1. Terminal 1: `npm start` then `i` to open iOS Simulator
2. Terminal 2: `npm run e2e:ios` (runs `maestro test .maestro/login-ios.yml`)
3. Expo Go launches in simulator. Select app from "Recently opened". openLink with exp:// is unreliable on iOS simulator.

## Browser

1. Terminal 1: `npm start`
2. Terminal 2: `npm run e2e`

Maestro opens Chromium, loads the app, and runs the login flow. No simulators, Xcode, or native builds.
