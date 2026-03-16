# Airport Explorer

Airport Explorer is a React Native app for searching airports and viewing airport details in a simple mobile UI.

## Overview

The app uses a bottom tab navigator with two main areas:

- `Home`: Search airports by name and open a details screen for a selected result
- `About`: Read a short summary of the app and its intended features

The home tab contains a nested native stack:

- `HomeMain`: Welcome screen plus airport search
- `AirportDetails`: Airport metadata and map view for the selected airport

## Current Features

- Search airports by name after entering at least 3 characters
- Show matching airport results from `https://airportsapi.com/api`
- Navigate from a search result to a dedicated airport details screen
- View airport code, type, elevation, latitude, longitude, and a map marker
- Browse the app through bottom-tab navigation

## Project Structure

Key source files:

- `App.tsx`: App entry point with `SafeAreaProvider` and `NavigationContainer`
- `src/navigation/AppNavigator.tsx`: Bottom-tab navigation
- `src/navigation/HomeStack.tsx`: Nested home stack navigation
- `src/screens/HomeScreen.tsx`: Search UI and result list
- `src/screens/AirportDetailsScreen.tsx`: Airport detail view with map
- `src/screens/AboutScreen.tsx`: Static about page
- `src/services/airportsApi.ts`: Airport search API helper
- `src/types/`: Shared TypeScript types for airports and navigation params
- `src/styles/`: Shared styling tokens and global styles

## Test Coverage

The Jest test suite covers the main screens and navigation setup:

- `__tests__/HomeScreen.test.tsx`: Verifies welcome content, short-query behavior, search results, and navigation to details
- `__tests__/AirportDetailsScreen.test.tsx`: Verifies airport detail content and mocked map rendering
- `__tests__/AboutScreen.test.tsx`: Verifies static about content
- `__tests__/navigation.test.tsx`: Verifies bottom-tab and home-stack screen registration

Shared test data lives in `testUtils/mockAirport.ts`.

Run the tests with:

```sh
npm test -- --runInBand
```

## Getting Started

Make sure your React Native environment is set up before running the app:

- [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment)

Install dependencies:

```sh
npm install
```

Start Metro:

```sh
npm start
```

Run on Android:

```sh
npm run android
```

Run on iOS:

```sh
bundle install
bundle exec pod install
npm run ios
```

## Scripts

- `npm start`: Start the Metro bundler
- `npm run android`: Build and run the Android app
- `npm run ios`: Build and run the iOS app
- `npm test`: Run Jest tests
- `npm run lint`: Run ESLint

## Notes

- Airport search currently begins only when the query length is greater than 2 characters
- When a search is in progress and no results have been loaded yet, the home screen shows a loading indicator
- The About screen mentions saving favorite airports, but that feature is not implemented in the current `src` code yet
