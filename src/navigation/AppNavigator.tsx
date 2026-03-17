import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import HomeStack from './HomeStack';
import AboutScreen from '../screens/AboutScreen';
import FavoriteAirports from '../screens/FavoriteAirports';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const iconMap: Record<string, string> = {
    HomeMain: 'home-outline',
    About: 'information-circle-outline',
    Favorites: 'bookmark-outline',
  };
  return (
    <Tab.Navigator
      initialRouteName="HomeMain"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = iconMap[route.name] || 'ellipse-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeMain"
        component={HomeStack}
        options={{ title: 'Home', headerShown: false }}
      />
      <Tab.Screen name="Favorites" component={FavoriteAirports} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
