import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

jest.mock('@react-native-vector-icons/ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  const MockIonicons = ({ name }: { name: string }) => <Text>{name}</Text>;

  return {
    __esModule: true,
    default: MockIonicons,
    Ionicons: MockIonicons,
  };
});

jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MapView = ({ children }: { children?: React.ReactNode }) => (
    <View testID="map-view">{children}</View>
  );
  const Marker = ({ children }: { children?: React.ReactNode }) => (
    <View testID="map-marker">{children}</View>
  );

  return {
    __esModule: true,
    default: MapView,
    Marker,
  };
});

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (callback: () => void) => callback(),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => {
    const React = require('react');
    const { View } = require('react-native');

    return {
      Navigator: ({ children }: { children: React.ReactNode }) => (
        <View testID="bottom-tab-navigator">{children}</View>
      ),
      Screen: ({
        name,
        component,
        options,
      }: {
        name: string;
        component: unknown;
        options?: Record<string, unknown>;
      }) => (
        <View
          testID={`tab-screen-${name}`}
          name={name}
          component={component}
          options={options}
        />
      ),
    };
  },
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => {
    const React = require('react');
    const { View } = require('react-native');

    return {
      Navigator: ({ children }: { children: React.ReactNode }) => (
        <View testID="native-stack-navigator">{children}</View>
      ),
      Screen: ({
        name,
        component,
        options,
      }: {
        name: string;
        component: unknown;
        options?: Record<string, unknown>;
      }) => (
        <View
          testID={`stack-screen-${name}`}
          name={name}
          component={component}
          options={options}
        />
      ),
    };
  },
}));

const AppNavigator = require('../src/navigation/AppNavigator').default;
const HomeStack = require('../src/navigation/HomeStack').default;
const FavoritesStack = require('../src/navigation/FavoritesStack').default;
const AboutScreen = require('../src/screens/AboutScreen').default;
const AirportDetailsScreen = require('../src/screens/AirportDetailsScreen').default;
const FavoriteAirports = require('../src/screens/FavoriteAirports').default;
const HomeScreen = require('../src/screens/HomeScreen').default;

describe('navigation', () => {
  it('registers the expected bottom tabs', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      renderer = ReactTestRenderer.create(<AppNavigator />);
    });

    const homeTab = renderer!.root.findByProps({ testID: 'tab-screen-HomeMain' });
    const favoritesTab = renderer!.root.findByProps({
      testID: 'tab-screen-Favorites',
    });
    const aboutTab = renderer!.root.findByProps({ testID: 'tab-screen-About' });

    expect(homeTab.props.component).toBe(HomeStack);
    expect(homeTab.props.options).toEqual({
      title: 'Home',
      headerShown: false,
    });
    expect(favoritesTab.props.component).toBe(FavoritesStack);
    expect(favoritesTab.props.options).toEqual({ headerShown: false });
    expect(aboutTab.props.component).toBe(AboutScreen);
  });

  it('registers the expected home stack screens', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      renderer = ReactTestRenderer.create(<HomeStack />);
    });

    const homeScreen = renderer!.root.findByProps({
      testID: 'stack-screen-HomeMain',
    });
    const detailsScreen = renderer!.root.findByProps({
      testID: 'stack-screen-AirportDetails',
    });

    expect(homeScreen.props.component).toBe(HomeScreen);
    expect(homeScreen.props.options).toEqual({ headerShown: false });
    expect(detailsScreen.props.component).toBe(AirportDetailsScreen);
    expect(detailsScreen.props.options).toEqual({
      title: 'Airport Details',
    });
  });

  it('registers the expected favorites stack screens', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      renderer = ReactTestRenderer.create(<FavoritesStack />);
    });

    const favoritesScreen = renderer!.root.findByProps({
      testID: 'stack-screen-FavoritesMain',
    });
    const detailsScreen = renderer!.root.findByProps({
      testID: 'stack-screen-AirportDetails',
    });

    expect(favoritesScreen.props.component).toBe(FavoriteAirports);
    expect(favoritesScreen.props.options).toEqual({
      title: 'Favorites',
    });
    expect(detailsScreen.props.component).toBe(AirportDetailsScreen);
    expect(detailsScreen.props.options).toEqual({
      title: 'Airport Details',
    });
  });
});
