import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Card from '../components/Card';
import { getAirportListByCode } from '../services/airportsApi';
import { getFavoriteAirportIds } from '../services/favoritesStorage';
import { FavoritesStackParamList } from '../types/navigation';
import { Airport } from '../types/airport';

import globalStyles from '../styles/globalStyles';

type Props = NativeStackScreenProps<FavoritesStackParamList, 'FavoritesMain'>;

const FavoriteAirports = ({ navigation }: Props) => {
  const [favoriteAirportIds, setFavoriteAirportIds] = useState<string[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const ids = await getFavoriteAirportIds();
      setFavoriteAirportIds(ids);
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (favoriteAirportIds.length === 0) {
      setAirports([]);
      return;
    }

    const fetchAirportData = async () => {
      try {
        const list = await getAirportListByCode(favoriteAirportIds);
        setAirports(list);
      } catch (error) {
        console.error('Error fetching favorite airports:', error);
        setAirports([]);
      }
    };

    fetchAirportData();
  }, [favoriteAirportIds]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>
        Below is a list of airports marked as favorites:
      </Text>
      <FlatList
        data={airports}
        keyExtractor={item =>
          item.id ?? item.attributes?.code ?? 'unknown-airport'
        }
        renderItem={({ item }) => {
          const airportCode =
            item.attributes?.code ?? item.id ?? 'Unknown code';
          const airportName = item.attributes?.name ?? 'Unknown airport';

          return (
            <Pressable
              key={item.id ?? item.attributes?.code ?? airportCode}
              onPress={() =>
                navigation.navigate('AirportDetails', { airport: item })
              }
            >
              <Card>
                <Text>{airportName}</Text>
                <Text>{airportCode}</Text>
              </Card>
            </Pressable>
          );
        }}
        style={globalStyles.list}
      />
    </View>
  );
};

export default FavoriteAirports;
