import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import ChatScreen from '../screens/ChatScreen';
import StoreScreen from '../screens/StoreScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    backgroundColor: '#2D2D2D',
                    borderRadius: 30,
                    height: 70,
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    paddingBottom: 0,
                },
                tabBarIcon: ({ focused }) => {
                    let iconName;

                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Scan') iconName = 'scan';
                    else if (route.name === 'Chat') iconName = 'chatbubbles';
                    else if (route.name === 'Store') iconName = 'cart';
                    else if (route.name === 'Profile') iconName = 'person';

                    return (
                        <View className={`items-center justify-center ${focused ? 'bg-[#6B8E23] w-14 h-14 rounded-full -mt-8 shadow-lg' : ''}`}>
                            <Ionicons
                                name={iconName}
                                size={focused ? 26 : 22}
                                color={focused ? '#FFFFFF' : '#9CA3AF'}
                            />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Scan" component={ScanScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Store" component={StoreScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
