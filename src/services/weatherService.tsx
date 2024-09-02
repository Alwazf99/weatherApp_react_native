// src/services/weatherService.ts
import axios from 'axios';

const API_KEY = 'cad1480b69a6c339db037606222d1937'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
      },
  });
  return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};
