import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import SplashScreen from './screens/SplashScreen';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import { registerRootComponent } from 'expo';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#F59E0B" />
          <TabNavigator />
        </NavigationContainer>
      )}
    </>
  );
}

export default App;
registerRootComponent(App);
