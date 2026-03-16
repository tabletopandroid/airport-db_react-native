import { Text, View } from 'react-native';
import globalStyles from '../styles/globalStyles';

const AboutScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>About This App</Text>
      <Text style={globalStyles.text}>
        This app provides information about airports around the world.
      </Text>
      <View style={globalStyles.section}>
        <Text style={globalStyles.subtitle}>Features:</Text>
        <Text style={globalStyles.text}>- Search for airports by name</Text>
        <Text style={globalStyles.text}>
          - View detailed information about each airport
        </Text>
        <Text style={globalStyles.text}>
          - Save your favorite airports for quick access
        </Text>
      </View>
      <View style={globalStyles.section}>
        <Text style={globalStyles.subtitle}>Contact Us:</Text>
        <Text style={globalStyles.text}>
          If you have any questions or feedback, please contact us at
          support@tabletopandroid.com
        </Text>
      </View>
    </View>
  );
};

export default AboutScreen;
