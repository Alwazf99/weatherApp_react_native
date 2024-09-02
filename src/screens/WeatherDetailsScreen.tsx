
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import WeatherDetails from '../components/WeatherDetails';
import { fetchWeatherData } from '../services/weatherService';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';  

type WeatherDetailsScreenRouteProp = RouteProp<RootStackParamList, 'WeatherDetails'>;

interface Props {
  route: WeatherDetailsScreenRouteProp;
  navigation: any;  
}

interface State {
  weatherData: any;
  loading: boolean;
  error: string | null;
}

class WeatherDetailsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      weatherData: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.loadWeatherData();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.route.params.city !== prevProps.route.params.city) {
      this.loadWeatherData();
    }
  }

  async loadWeatherData() {
    const { city } = this.props.route.params;

    try {
      const data = await fetchWeatherData(city);
      this.setState({ weatherData: data, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to fetch data', loading: false });
    }
  }

  render() {
    const { weatherData, loading, error } = this.state;

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" testID="loading-indicator"/>;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
      <View style={styles.container}>
        {weatherData && <WeatherDetails weather={weatherData} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default WeatherDetailsScreen;








