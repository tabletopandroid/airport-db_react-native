import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites_airports';

export const getFavoriteAirportIds = async (): Promise<string[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error fetching favorite airports:', e);
    return [];
  }
};

export const addFavoriteAirportId = async (
  airportId: string,
): Promise<void> => {
  try {
    const currentFavorites = await getFavoriteAirportIds();
    if (!currentFavorites.includes(airportId)) {
      const updatedFavorites = [...currentFavorites, airportId];
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );
    }
  } catch (e) {
    console.error('Error adding favorite airport:', e);
  }
};

export const removeFavoriteAirportId = async (
  airportId: string,
): Promise<void> => {
  try {
    const currentFavorites = await getFavoriteAirportIds();
    const updatedFavorites = currentFavorites.filter(id => id !== airportId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (e) {
    console.error('Error removing favorite airport:', e);
  }
};
