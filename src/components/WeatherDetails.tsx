// src/components/WeatherDetails.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  weather: any;
}

const WeatherDetails: React.FC<Props> = ({ weather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp}°C</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 22,
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default WeatherDetails;
