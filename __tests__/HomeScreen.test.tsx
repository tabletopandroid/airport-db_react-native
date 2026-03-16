import React from 'react';
import { TextInput } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';

import HomeScreen from '../src/screens/HomeScreen';
import { getAirportByName } from '../src/services/airportsApi';
import { mockAirport } from '../testUtils/mockAirport';

jest.mock('../src/services/airportsApi', () => ({
  getAirportByName: jest.fn(),
}));

describe('HomeScreen', () => {
  const navigation = {
    navigate: jest.fn(),
  };

  const renderScreen = async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      renderer = ReactTestRenderer.create(
        <HomeScreen navigation={navigation as never} route={{} as never} />,
      );
    });

    return renderer!;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the welcome copy', async () => {
    const renderer = await renderScreen();
    const output = JSON.stringify(renderer.toJSON());

    expect(output).toContain('Welcome to the Airport Explorer');
    expect(output).toContain(
      'Search for an airport... (at least 3 characters)',
    );
  });

  it('does not search when the query is shorter than 3 characters', async () => {
    const renderer = await renderScreen();

    const input = renderer.root.findByType(TextInput);

    await act(async () => {
      input.props.onChangeText('LA');
    });

    expect(getAirportByName).not.toHaveBeenCalled();
  });

  it('shows matching airports and navigates to details when one is pressed', async () => {
    (getAirportByName as jest.Mock).mockResolvedValue({
      data: [mockAirport],
    });

    const renderer = await renderScreen();

    const input = renderer.root.findByType(TextInput);

    await act(async () => {
      input.props.onChangeText('Test');
    });

    expect(getAirportByName).toHaveBeenCalledWith('Test');
    const output = JSON.stringify(renderer.toJSON());

    expect(output).toContain('Search Results (');
    expect(output).toContain('"1"');
    expect(output).toContain('Test International');

    const airportCard = renderer.root.find(
      node =>
        typeof node.props.onPress === 'function' &&
        node.props.style?.backgroundColor === '#fff',
    );

    await act(async () => {
      airportCard.props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalledWith('AirportDetails', {
      airport: mockAirport,
    });
  });
});
