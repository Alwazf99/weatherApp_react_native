/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

import { render, fireEvent, waitFor } from '@testing-library/react-native';

import Homescreen from '../src/screens/Homescreen';
import { fetchWeatherData } from '../src/services/weatherService';

jest.mock('../src/services/weatherService');

describe('Homescreen', () => {
  it('renders correctly', () =>{
    const {getByText, getByPlaceholderText } = render (<Homescreen/>);

    expect(getByText('Weather App')).toBeTruthy();
    expect(getByPlaceholderText('Enter city name')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('displays weather data on successfull fetch', async ()=>{
    const mockWeatherData = {
      temperature: 25,
      condition: 'Sunny',
      city: 'Pune',
    };

    (fetchWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);

    const { getByText, getByPlaceholderText } = render(<Homescreen/>);

    fireEvent.changeText(getByPlaceholderText('Enter city name'), 'Pune');
    fireEvent.press(getByText('Search'));

    try {
      await waitFor(() => {
        expect(getByText('Temperature: 25°C')).toBeTruthy();
        expect(getByText('Condition: Sunny')).toBeTruthy();
        expect(getByText('City: Pune')).toBeTruthy();
      });
    } catch (error) {
      console.error('Test failed:', error);
    }
  });
 // });
  
  

  it('displays an error message on failed fetch', async () => {
    const mockError = 'Failed to fetch weather data';
    (fetchWeatherData as jest.Mock).mockRejectedValue(new Error(mockError));

    const { getByText, getByPlaceholderText } = render(<Homescreen/>);

    fireEvent.changeText(getByPlaceholderText('Enter city name'), 'Unknown City');
    fireEvent.press(getByText('Search'));

    await waitFor(() => expect(getByText(mockError)).toBeTruthy());
  });

});


