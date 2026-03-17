# Airport Explorer

Airport Explorer is a React Native app for searching airports, viewing airport details on a map, and saving favorite airports for quick access.

## Current State

The app currently includes:

- Airport search by name using the public `https://airportsapi.com/api` endpoint
- A details screen with airport metadata and a map marker
- Favorite airport storage backed by `@react-native-async-storage/async-storage`
- Bottom-tab navigation for `Home`, `Favorites`, and `About`
- Separate native stacks for `Home` and `Favorites`, each with access to `AirportDetails`

## Navigation

- `Home` tab
  - `HomeMain`: Welcome copy plus airport search
  - `AirportDetails`: Details for a selected search result
- `Favorites` tab
  - `FavoritesMain`: Saved airport list loaded from local storage
  - `AirportDetails`: Details for a selected favorite airport
- `About` tab
  - Static app summary and contact details

## Features

- Search begins after entering at least 3 characters
- Search results are fetched from the airport API and shown in-app
- Airport details include code, type, elevation, latitude, longitude, and a map
- Airports can be added to or removed from favorites from the details screen
- Favorite airports persist between app launches

## Tech Stack

- React Native `0.84.1`
- React `19.2.3`
- React Navigation bottom tabs and native stacks
- React Native Maps
- AsyncStorage for local persistence
- TypeScript

## Project Structure

- `App.tsx`: App entry point with `SafeAreaProvider` and `NavigationContainer`
- `src/navigation/AppNavigator.tsx`: Bottom-tab navigator
- `src/navigation/HomeStack.tsx`: Home stack
- `src/navigation/FavoritesStack.tsx`: Favorites stack
- `src/screens/HomeScreen.tsx`: Search experience
- `src/screens/FavoriteAirports.tsx`: Favorite airport list
- `src/screens/AirportDetailsScreen.tsx`: Airport details and map
- `src/screens/AboutScreen.tsx`: Static about content
- `src/services/airportsApi.ts`: Airport API helpers
- `src/services/favoritesStorage.ts`: Favorite airport persistence helpers
- `src/types/`: Shared TypeScript types
- `docs/android.md`: Direct Android device install guide

## Getting Started

Prerequisites:

- Node.js `>= 22.11.0`
- A React Native Android toolchain set up locally
- An Android SDK with `adb` available on your `PATH`

Install dependencies:

```sh
npm install
```

Start Metro:

```sh
npm start
```

Run on an Android emulator or attached device with the React Native CLI:

```sh
npm run android
```

For direct APK installation on a physical Android phone, see [docs/android.md](docs/android.md).

## Scripts

- `npm start`: Start the Metro bundler
- `npm run android`: Build and deploy the Android app with React Native CLI
- `npm run ios`: Run the iOS app
- `npm test`: Run Jest tests
- `npm run lint`: Run ESLint

## Notes

- The app uses a Google Maps API key configured in `android/app/build.gradle`
- Some TypeScript nullability issues still exist in the current codebase, mainly around optional airport attributes
- The release build is currently configured to use the debug signing config, which is convenient for local installs but not suitable for store distribution
