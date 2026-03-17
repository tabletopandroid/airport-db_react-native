import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FavoriteAirports from '../screens/FavoriteAirports';
import AirportDetailsScreen from '../screens/AirportDetailsScreen';
import { FavoritesStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<FavoritesStackParamList>();

const FavoritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritesMain"
        component={FavoriteAirports}
        options={{ title: 'Favorites' }}
      />
      <Stack.Screen
        name="AirportDetails"
        component={AirportDetailsScreen}
        options={{ title: 'Airport Details' }}
      />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
