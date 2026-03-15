import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { Airport } from '../types/airport';
import { getAirportByName } from '../services/airportsApi';
import globalStyles from '../styles/globalStyles';

const HomeScreen = () => {
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

  const renderSearchResults = () => {
    return (
      searchQuery.length > 2 && (
        <View style={globalStyles.section}>
          <Text style={globalStyles.subtitle}>
            Search Results ({searchResults.length})
          </Text>
          {searchResults.length === 0 ? (
            <Text style={globalStyles.text}>No results found.</Text>
          ) : (
            searchResults.map((result, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {result.attributes.name}
                </Text>
              </View>
            ))
          )}
        </View>
      )
    );
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Welcome to Your Airport Db!</Text>
      <Text style={globalStyles.text}>
        Explore information about airports around the world. Use the tabs below
        to navigate through the app.
      </Text>
      <View style={globalStyles.section}>
        <TextInput
          placeholder="Search for an airport..."
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
