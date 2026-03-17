import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import {
  getFavoriteAirportIds,
  addFavoriteAirportId,
  removeFavoriteAirportId,
} from '../services/favoritesStorage';
import type { HomeStackParamList } from '../types/navigation';
import { AirportType } from '../utils/enum';
import globalStyles from '../styles/globalStyles';

type Props = NativeStackScreenProps<HomeStackParamList, 'AirportDetails'>;

const AirportDetailsScreen = ({ route }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { airport } = route.params;
  const { attributes, id = '' } = airport;
  const elevation = attributes?.elevation
    ? `${attributes.elevation} ft`
    : 'N/A';

  const lat = attributes?.latitude ? attributes.latitude : '';
  const lon = attributes?.longitude ? attributes.longitude : '';
  const type = attributes?.type ? attributes.type : '';

  useEffect(() => {
    const checkFavorite = async () => {
      const favoriteIds = await getFavoriteAirportIds();
      setIsFavorite(favoriteIds.includes(id));
    };
    checkFavorite();
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      await removeFavoriteAirportId(id);
    } else {
      await addFavoriteAirportId(id);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>{attributes?.name}</Text>
      <View style={globalStyles.card}>
        <View style={styles.container}>
          <View style={[globalStyles.section, styles.column]}>
            <Text style={globalStyles.subtitle}>Airport Code</Text>
            <Text>{attributes?.code}</Text>
          </View>
          <View style={globalStyles.section}>
            <Ionicons
              name={isFavorite ? 'bookmark' : 'bookmark-outline'}
              size={30}
              color={isFavorite ? 'steelblue' : '#000000'}
              onPress={handleFavoriteToggle}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={[globalStyles.section, styles.column]}>
            <Text style={globalStyles.subtitle}>Type</Text>
            <Text>{AirportType[type]}</Text>
          </View>
          <View style={[globalStyles.section, styles.column]}>
            <Text style={globalStyles.subtitle}>Elevation</Text>
            <Text>{elevation}</Text>
          </View>
        </View>
        <View style={globalStyles.section}>
          <Text style={globalStyles.subtitle}>Location</Text>
          <Text>Latitude: {attributes?.latitude}</Text>
          <Text>Longitude: {attributes?.longitude}</Text>
        </View>
      </View>
      <View style={globalStyles.section}>
        <Text style={globalStyles.subtitle}>Map</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
            }}
            title={attributes?.name}
            description={attributes?.code}
          >
            <Ionicons name="paper-plane" size={30} color="#FF0000" />
          </Marker>
        </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  column: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 250,
  },
});

export default AirportDetailsScreen;
