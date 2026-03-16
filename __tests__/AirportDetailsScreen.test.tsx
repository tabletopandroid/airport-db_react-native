import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import AirportDetailsScreen from '../src/screens/AirportDetailsScreen';
import { mockAirport } from '../testUtils/mockAirport';

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

jest.mock('@react-native-vector-icons/ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    Ionicons: ({ name }: { name: string }) => <Text>{name}</Text>,
  };
});

describe('AirportDetailsScreen', () => {
  it('renders airport details and the map section', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      renderer = ReactTestRenderer.create(
        <AirportDetailsScreen
          navigation={{} as never}
          route={{ params: { airport: mockAirport } } as never}
        />,
      );
    });

    const output = JSON.stringify(renderer!.toJSON());

    expect(output).toContain('Test International');
    expect(output).toContain('Airport Code');
    expect(output).toContain('TST');
    expect(output).toContain('Large Airport');
    expect(renderer!.root.findByProps({ testID: 'map-view' })).toBeTruthy();
    expect(renderer!.root.findByProps({ testID: 'map-marker' })).toBeTruthy();
  });
});
