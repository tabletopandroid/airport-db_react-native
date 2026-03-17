import React from 'react';
import { Linking, Text, View } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';

import Card from '../src/components/Card';
import TextLink from '../src/components/TextLink';

describe('components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Card', () => {
    it('renders its children inside a view container', async () => {
      let renderer: ReactTestRenderer.ReactTestRenderer;

      await act(async () => {
        renderer = ReactTestRenderer.create(
          <Card>
            <Text>Inside card</Text>
          </Card>,
        );
      });

      const textNode = renderer!.root.findByType(Text);
      const viewNode = renderer!.root.findByType(View);

      expect(textNode.props.children).toBe('Inside card');
      expect(viewNode.props.style?.backgroundColor).toBe('#fff');
      expect(viewNode.props.style?.padding).toBe(16);
    });
  });

  describe('TextLink', () => {
    it('opens the provided URL when pressed', async () => {
      const openUrl = jest
        .spyOn(Linking, 'openURL')
        .mockResolvedValueOnce(true as never);

      let renderer: ReactTestRenderer.ReactTestRenderer;

      await act(async () => {
        renderer = ReactTestRenderer.create(
          <TextLink url="https://example.com">Visit site</TextLink>,
        );
      });

      const textNode = renderer!.root.findByType(Text);

      await act(async () => {
        await textNode.props.onPress();
      });

      expect(openUrl).toHaveBeenCalledWith('https://example.com');
    });

    it('logs an error if the URL cannot be opened', async () => {
      const error = new Error('Link failed');
      jest.spyOn(Linking, 'openURL').mockRejectedValueOnce(error);
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      let renderer: ReactTestRenderer.ReactTestRenderer;

      await act(async () => {
        renderer = ReactTestRenderer.create(
          <TextLink url="https://example.com">Broken site</TextLink>,
        );
      });

      const textNode = renderer!.root.findByType(Text);

      await act(async () => {
        await textNode.props.onPress();
      });

      expect(consoleError).toHaveBeenCalledWith(
        'Cannot open URL: https://example.com. Error: Error: Link failed',
      );
    });
  });
});
