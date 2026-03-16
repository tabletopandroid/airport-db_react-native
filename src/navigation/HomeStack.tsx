import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AirportDetailsScreen from '../screens/AirportDetailsScreen';
import { HomeStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AirportDetails"
        component={AirportDetailsScreen}
        options={{ title: 'Airport Details' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
