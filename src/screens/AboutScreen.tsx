import { Text, View } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>About This App</Text>
      <Text>
        This app provides information about airports around the world.
      </Text>
    </View>
  );
};

export default AboutScreen;
