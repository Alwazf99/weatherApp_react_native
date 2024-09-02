// src/App.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import WeatherDetailsScreen from '../src/screens/WeatherDetailsScreen';
import { fetchWeatherData } from '../src/services/weatherService';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  WeatherDetails: { city: string };
};


  
  
jest.mock('../src/services/weatherService');

type WeatherDetailsScreenRouteProp = RouteProp<RootStackParamList, 'WeatherDetails'>;

describe('WeatherDetailsScreen', () => {
  const mockRoute = {
    params: { city: 'London' },
  } as WeatherDetailsScreenRouteProp;

  it('displays a loading indicator while data is being fetched', () => {
    (fetchWeatherData as jest.Mock).mockReturnValue(new Promise(() => {}));

    const { getByTestId } = render(
      <WeatherDetailsScreen route={mockRoute} navigation={null} />
    );

    expect(getByTestId('loading-indicator')).toBeDefined();
  });

  it('displays weather details when data is successfully fetched', async () => {
    const mockWeatherData = {
      main: { temp: 20 },
      weather: [{ description: 'Clear sky' }],
      name: 'London',
    };

    (fetchWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);

    const { getByText } = render(
      <WeatherDetailsScreen route={mockRoute} navigation={null} />
    );

    await waitFor(() => {
      expect(getByText('London')).toBeDefined();
      expect(getByText('20°C')).toBeDefined();
      expect(getByText('Clear sky')).toBeDefined();
    });
  });

  it('displays an error message when data fetch fails', async () => {
    (fetchWeatherData as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    const { getByText } = render(
      <WeatherDetailsScreen route={mockRoute} navigation={null} />
    );

    await waitFor(() => {
      expect(getByText('Failed to fetch data')).toBeDefined();
    });
  });
});
  