import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Airport } from '../types/airport';
import type { HomeStackParamList } from '../types/navigation';
import { getAirportByName } from '../services/airportsApi';
import globalStyles from '../styles/globalStyles';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

const HomeScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Airport[]>([]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const results = await getAirportByName(query);
        setSearchResults(results.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const renderAirportItem = (airport: Airport) => (
    <Pressable
      key={airport.id}
      onPress={() => navigation.navigate('AirportDetails', { airport })}
      style={globalStyles.cardRectangle}
    >
      <Text style={typography.bold}>{airport.attributes.name}</Text>
    </Pressable>
  );

  const renderSearchResults = () => {
    return (
      searchQuery.length > 2 && (
        <View style={globalStyles.section}>
          <Text style={globalStyles.subtitle}>
            Search Results ({searchResults.length})
          </Text>
          {searchResults.length > 0 ? (
            <View style={globalStyles.section}>
              {searchResults.map(result => renderAirportItem(result))}
            </View>
          ) : (
            <View style={[globalStyles.section, spacing.medium]}>
              <Text style={globalStyles.text}>Searching for airports...</Text>
              <ActivityIndicator
                style={spacing.large}
                size="large"
                color="#0000ff"
              />
            </View>
          )}
        </View>
      )
    );
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={[globalStyles.title, spacing.small]}>
        Welcome to the Airport Explorer
      </Text>
      <Text style={globalStyles.text}>
        Explore information about airports around the world. Use the tabs below
        to navigate through the app.
      </Text>
      <View style={globalStyles.section}>
        <TextInput
          placeholder="Search for an airport... (at least 3 characters)"
          style={globalStyles.input}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {renderSearchResults()}
    </ScrollView>
  );
};

export default HomeScreen;
