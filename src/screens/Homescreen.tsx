
import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { fetchWeatherData } from '../services/weatherService';
import WeatherDetails from '../components/WeatherDetails'; 

interface State {
  city: string;
  weather: any | null;
  error: string | null;
}

class HomeScreen extends Component<{}, State> {
  state: State = {
    city: '',
    weather: null,
    error: null,
  };

  handleSearch = async () => {
    try {
      const weather = await fetchWeatherData(this.state.city);
      this.setState({ weather, error: null });
    } catch (error) {
      this.setState({ weather: null, error: (error as Error).message });
    }
  };

  render() {
    const { city, weather, error } = this.state;

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

        {weather && <WeatherDetails weather={weather} />}
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


