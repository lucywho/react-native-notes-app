# Maestro E2E Tests

## iOS Simulator (Expo Go)

1. Terminal 1: `npm start` then `i` to open iOS Simulator

### Login flow only

2. Terminal 2: `npm run login:ios` (runs `maestro test .maestro/login-ios.yml`)
3. Expo Go launches in simulator. Select app from "Recently opened". openLink with exp:// is unreliable on iOS simulator.

### E2E including Notes CRUD:

2. Terminal 2: `npm run login:ios` (runs `maestro test .maestro/login-ios.yml`)

## Browser

1. Terminal 1: `npm start`

### Login flow only

2. Terminal 2: `npm run login:web` (runs `maestro test -p web .maestro/login.yml`)

Maestro opens Chromium, loads the app, and runs the login flow. No simulators, Xcode, or native builds.

### E2E including Notes CRUD:

2. Terminal 2: `npm run e2e:web` (runs `maestro test .maestro/e2e.yml`)

## Flows

| File          | Description                                        |
| ------------- | -------------------------------------------------- |
| login.yml     | Login flow for browser                             |
| login-ios.yml | Login flow for iOS Simulator                       |
| e2e.yml       | Add, edit, delete note (browser; runs login first) |
| e2e-ios.yml   | Add, edit, delete note (iOS; runs login first)     |
