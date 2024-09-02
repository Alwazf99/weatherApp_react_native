import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Homescreen';
import WeatherDetailsScreen from './src/screens/WeatherDetailsScreen';

type RootStackParamList = {
  Home: undefined;
  WeatherDetails: { city: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="WeatherDetails" component={WeatherDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;








