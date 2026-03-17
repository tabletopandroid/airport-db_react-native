import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import type { ComponentProps } from 'react';

import HomeStack from './HomeStack';
import FavoritesStack from './FavoritesStack';
import AboutScreen from '../screens/AboutScreen';
import { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();
type IoniconName = ComponentProps<typeof Ionicons>['name'];

const AppNavigator = () => {
  const iconMap: Record<keyof TabParamList, IoniconName> = {
    HomeMain: 'home-outline',
    About: 'information-circle-outline',
    Favorites: 'bookmark-outline',
  };
  return (
    <Tab.Navigator
      initialRouteName="HomeMain"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = iconMap[route.name];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeMain"
        component={HomeStack}
        options={{ title: 'Home', headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
