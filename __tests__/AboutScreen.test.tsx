import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

import AboutScreen from '../src/screens/AboutScreen';

describe('AboutScreen', () => {
  it('renders the about copy and key features', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      renderer = ReactTestRenderer.create(<AboutScreen />);
    });

    const output = JSON.stringify(renderer!.toJSON());

    expect(output).toContain('About This App');
    expect(output).toContain('Features:');
    expect(output).toContain(
      'This app provides information about airports around the world.',
    );
    expect(output).toContain('support@tabletopandroid.com');
  });
});
