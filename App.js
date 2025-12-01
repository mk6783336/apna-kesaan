import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator'; // Connecting your screens
import { StatusBar } from 'expo-status-bar';
import './global.css'; // Loading the Green styles
import { registerRootComponent } from 'expo';

function App() {
    return (
        <NavigationContainer>
            <StatusBar style="dark" backgroundColor="#f9fafb" />
            <TabNavigator />
        </NavigationContainer>
    );
}

export default App;
registerRootComponent(App);
