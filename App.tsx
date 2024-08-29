
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Homescreen from './src/screens/Homescreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Homescreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

