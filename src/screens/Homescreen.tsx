import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { fetchWeatherData } from '../services/weatherService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  WeatherDetails: { city: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;  // Add this line if you need to use the route prop (even if you don't use it)
}

interface State {
  city: string;
  error: string | null;
}

class HomeScreen extends Component<Props, State> {
  state: State = {
    city: '',
    error: null,
  };

  handleSearch = async () => {
    const { city } = this.state;
    try {
      await fetchWeatherData(city);  // Optional: Validate the city name by calling the API
      this.props.navigation.navigate('WeatherDetails', { city });
    } catch (error) {
      this.setState({ error: (error as Error).message });
    }
  };

  render() {
    const { city, error } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Weather App</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={(text) => this.setState({ city: text })}
        />
        <Button title="Search" onPress={this.handleSearch} />

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 44,
    color: "black",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});

export default HomeScreen;
// src/screens/HomeScreen.tsx
// src/screens/HomeScreen.tsx







