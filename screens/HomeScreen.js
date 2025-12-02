import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const OPENWEATHER_API = '9461f3ab297c0a8fd2fce4f93eeb0985';

export default function HomeScreen({ navigation }) {
    const [weather, setWeather] = useState({ temp: 17, humidity: 59, wind: 6 });

    useEffect(() => {
        fetchWeather();
    }, []);

    const fetchWeather = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=Multan,PK&appid=${OPENWEATHER_API}&units=metric`
            );
            const data = await response.json();
            setWeather({
                temp: Math.round(data.main.temp),
                humidity: data.main.humidity,
                wind: Math.round(data.wind.speed),
            });
        } catch (error) {
            console.log('Weather error:', error);
        }
    };

    return (
        <View className="flex-1 bg-[#FFF8E7]">
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Ultra HD Hero Section */}
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2000' }}
                    imageStyle={{ height: 550 }}
                    className="h-[550px]"
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['rgba(16,185,129,0.3)', 'rgba(245,158,11,0.6)', 'rgba(217,119,6,0.9)']}
                        className="flex-1 justify-end pb-8"
                    >
                        <SafeAreaView className="px-6">
                            {/* Premium Branding */}
                            <View className="items-center mb-6">
                                <View
                                    className="bg-white/10 backdrop-blur-xl rounded-[40px] px-8 py-6 mb-4"
                                    style={{
                                        shadowColor: '#F59E0B',
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 30,
                                    }}
                                >
                                    <Text className="text-white text-7xl font-bold text-center">Apna Kisaan</Text>
                                    <Text className="text-amber-200 text-3xl text-center mt-2">اپنا کسان</Text>
                                </View>

                                <LinearGradient
                                    colors={['#FBBF24', '#F59E0B', '#D97706']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    className="px-8 py-4 rounded-full"
                                    style={{
                                        shadowColor: '#FBBF24',
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowOpacity: 0.9,
                                        shadowRadius: 25,
                                    }}
                                >
                                    <Text className="text-white font-bold text-2xl">کسان خوشحال، پاکستان خوشحال</Text>
                                </LinearGradient>
                                <Text className="text-white/95 text-lg mt-3 font-medium">Kisaan Khushhal, Pakistan Khushhal</Text>
                            </View>

                            {/* Glass Card */}
                            <View
                                className="bg-white/15 backdrop-blur-2xl rounded-[32px] p-6 border-2 border-white/30"
                                style={{
                                    shadowColor: '#10B981',
                                    shadowOffset: { width: 0, height: 12 },
                                    shadowOpacity: 0.6,
                                    shadowRadius: 20,
                                }}
                            >
                                <View className="flex-row justify-between items-center">
                                    <View className="flex-1">
                                        <View className="flex-row items-center mb-2">
                                            <LinearGradient
                                                colors={['#34D399', '#10B981']}
                                                className="w-8 h-8 rounded-full items-center justify-center mr-2"
                                            >
                                                <Ionicons name="location" size={18} color="white" />
                                            </LinearGradient>
                                            <Text className="text-white font-bold text-xl">Shinkiari, Pakistan</Text>
                                        </View>
                                        <Text className="text-amber-100 text-sm ml-10">
                                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                        </Text>
                                    </View>
                                    <LinearGradient
                                        colors={['#FBBF24', '#F59E0B']}
                                        className="w-16 h-16 rounded-full items-center justify-center"
                                        style={{
                                            shadowColor: '#FBBF24',
                                            shadowOffset: { width: 0, height: 0 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 15,
                                        }}
                                    >
                                        <Ionicons name="sunny" size={36} color="white" />
                                    </LinearGradient>
                                </View>
                            </View>
                        </SafeAreaView>
                    </LinearGradient>
                </ImageBackground>

                {/* Weather Stats */}
                <View className="px-6 -mt-12">
                    <LinearGradient
                        colors={['#FFFFFF', '#F0FDF4']}
                        className="rounded-[32px] p-6 flex-row justify-around"
                        style={{
                            shadowColor: '#10B981',
                            shadowOffset: { width: 0, height: 12 },
                            shadowOpacity: 0.4,
                            shadowRadius: 24,
                            borderWidth: 2,
                            borderColor: 'rgba(16, 185, 129, 0.2)',
                        }}
                    >
                        <View className="items-center">
                            <LinearGradient
                                colors={['#F59E0B', '#DC2626']}
                                className="w-20 h-20 rounded-[24px] items-center justify-center mb-3"
                                style={{
                                    shadowColor: '#F59E0B',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.7,
                                    shadowRadius: 15,
                                }}
                            >
                                <Ionicons name="thermometer" size={36} color="white" />
                            </LinearGradient>
                            <Text className="text-gray-900 font-bold text-3xl">{weather.temp}°C</Text>
                            <Text className="text-emerald-600 text-sm font-medium">Temperature</Text>
                        </View>
                        <View className="items-center">
                            <LinearGradient
                                colors={['#3B82F6', '#1D4ED8']}
                                className="w-20 h-20 rounded-[24px] items-center justify-center mb-3"
                                style={{
                                    shadowColor: '#3B82F6',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.7,
                                    shadowRadius: 15,
                                }}
                            >
                                <Ionicons name="water" size={36} color="white" />
                            </LinearGradient>
                            <Text className="text-gray-900 font-bold text-3xl">{weather.humidity}%</Text>
                            <Text className="text-emerald-600 text-sm font-medium">Humidity</Text>
                        </View>
                        <View className="items-center">
                            <LinearGradient
                                colors={['#10B981', '#047857']}
                                className="w-20 h-20 rounded-[24px] items-center justify-center mb-3"
                                style={{
                                    shadowColor: '#10B981',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.7,
                                    shadowRadius: 15,
                                }}
                            >
                                <Ionicons name="leaf" size={36} color="white" />
                            </LinearGradient>
                            <Text className="text-gray-900 font-bold text-3xl">{weather.wind}</Text>
                            <Text className="text-emerald-600 text-sm font-medium">Wind m/s</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* My Crop */}
                <View className="px-6 mt-8">
                    <Text className="text-gray-900 text-3xl font-bold mb-4">میری فصل • My Crop</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Scan')}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={['#10B981', '#059669', '#047857']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="rounded-[32px] p-8"
                            style={{
                                shadowColor: '#10B981',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: 30,
                            }}
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1">
                                    <View
                                        className="w-20 h-20 bg-white/25 rounded-[24px] items-center justify-center mr-5"
                                    >
                                        <Ionicons name="leaf" size={40} color="white" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white text-3xl font-bold">Wheat Status</Text>
                                        <Text className="text-emerald-100 text-lg mt-1">گندم کی صحت</Text>
                                        <View className="flex-row items-center mt-3">
                                            <View className="w-4 h-4 bg-green-300 rounded-full mr-2" />
                                            <Text className="text-white font-bold text-xl">Healthy • صحت مند</Text>
                                        </View>
                                    </View>
                                </View>
                                <LinearGradient
                                    colors={['#FFFFFF', '#F0FDF4']}
                                    className="w-16 h-16 rounded-full items-center justify-center"
                                >
                                    <Ionicons name="chevron-forward" size={32} color="#10B981" />
                                </LinearGradient>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <View className="px-6 mt-8 pb-32">
                    <Text className="text-gray-900 text-3xl font-bold mb-4">Quick Actions</Text>

                    <View className="flex-row justify-between mb-4">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Chat')}
                            className="flex-1 mr-2"
                        >
                            <LinearGradient
                                colors={['#F59E0B', '#D97706', '#B45309']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="rounded-[28px] p-6 items-center"
                                style={{
                                    shadowColor: '#F59E0B',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 20,
                                }}
                            >
                                <View className="w-16 h-16 bg-white/25 rounded-full items-center justify-center mb-3">
                                    <Ionicons name="chatbubbles" size={32} color="white" />
                                </View>
                                <Text className="text-white font-bold text-lg">AI Advisor</Text>
                                <Text className="text-amber-100 text-sm">مشیر</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Store')}
                            className="flex-1 ml-2"
                        >
                            <LinearGradient
                                colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="rounded-[28px] p-6 items-center"
                                style={{
                                    shadowColor: '#8B5CF6',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 20,
                                }}
                            >
                                <View className="w-16 h-16 bg-white/25 rounded-full items-center justify-center mb-3">
                                    <Ionicons name="cart" size={32} color="white" />
                                </View>
                                <Text className="text-white font-bold text-lg">Market</Text>
                                <Text className="text-violet-100 text-sm">مارکیٹ</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}
