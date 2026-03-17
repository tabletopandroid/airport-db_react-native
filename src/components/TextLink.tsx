import React from 'react';
import { Linking, StyleSheet, Text } from 'react-native';

type Props = {
  children: React.ReactNode;
  url: string;
};

const TextLink = ({ children, url }: Props) => {
  const openUrl = async () => {
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.error(`Cannot open URL: ${url}. Error: ${err}`);
    }
  };

  return (
    <Text style={styles.link} onPress={openUrl}>
      {' '}
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
});

export default TextLink;
