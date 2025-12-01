import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// High-Quality Agri Images
const IMAGES = {
    user: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    corn: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    drone: 'https://images.unsplash.com/photo-1508614589041-895b8c9d7b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    field: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/10003/10003848.png' // Vibrant Leaf Logo
};

export default function HomeScreen({ navigation }) {
    return (
        <View className="flex-1 bg-[#F2F4F7]">
            <StatusBar style="dark" />
            <SafeAreaView className="flex-1">
                <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>

                    {/* Header with Logo */}
                    <View className="flex-row justify-between items-center mt-4 mb-8">
                        <View className="flex-row items-center">
                            <Image source={{ uri: IMAGES.logo }} className="w-10 h-10 mr-3" resizeMode="contain" />
                            <View>
                                <Text className="text-emerald-600 text-xs font-bold tracking-widest uppercase">Agri Gen</Text>
                                <Text className="text-gray-900 text-xl font-bold">Dashboard</Text>
                            </View>
                        </View>
                        <Image source={{ uri: IMAGES.user }} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                    </View>

                    {/* Smart AI Insights Card */}
                    <View className="mb-8">
                        <View className="rounded-[32px] overflow-hidden h-64 shadow-lg shadow-emerald-500/30 relative">
                            <Image source={{ uri: IMAGES.field }} className="w-full h-full absolute" resizeMode="cover" />
                            <View className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                            <View className="p-6 flex-1 justify-between">
                                <View className="flex-row justify-between items-start">
                                    <View className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                        <Text className="text-white text-xs font-bold">LIVE UPDATES</Text>
                                    </View>
                                </View>

                                <View>
                                    <Text className="text-white text-3xl font-bold mb-4">Smart Field Insights</Text>
                                    <View className="flex-row space-x-4">
                                        {/* Weather Pill */}
                                        <View className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex-row items-center">
                                            <Ionicons name="partly-sunny" size={24} color="#FBBF24" />
                                            <View className="ml-2">
                                                <Text className="text-white font-bold text-lg">24°C</Text>
                                                <Text className="text-white/80 text-xs">Sunny</Text>
                                            </View>
                                        </View>

                                        {/* Humidity Pill */}
                                        <View className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex-row items-center">
                                            <Ionicons name="water" size={24} color="#60A5FA" />
                                            <View className="ml-2">
                                                <Text className="text-white font-bold text-lg">45%</Text>
                                                <Text className="text-white/80 text-xs">Humidity</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* My Field Section */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-gray-900 text-xl font-bold">My Field Status</Text>
                        <TouchableOpacity onPress={() => alert("Showing all fields...")}>
                            <Text className="text-emerald-600 font-bold text-sm">See All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Grid Layout */}
                    <View className="flex-row justify-between flex-wrap pb-24">
                        {/* Card 1 */}
                        <TouchableOpacity
                            className="w-[48%] mb-4 bg-white p-3 rounded-3xl shadow-sm border border-gray-100"
                            onPress={() => navigation.navigate('Scan')}
                        >
                            <View className="h-40 rounded-2xl overflow-hidden mb-3 relative">
                                <Image source={{ uri: IMAGES.wheat }} className="w-full h-full" />
                                <View className="absolute top-2 right-2 bg-emerald-100 px-2 py-1 rounded-lg">
                                    <Text className="text-xs font-bold text-emerald-700">Healthy</Text>
                                </View>
                            </View>
                            <Text className="text-gray-900 font-bold text-lg ml-1">Wheat</Text>
                            <Text className="text-gray-500 text-xs ml-1 mb-2">Ready in 20 days</Text>
                        </TouchableOpacity>

                        {/* Card 2 */}
                        <TouchableOpacity
                            className="w-[48%] mb-4 bg-white p-3 rounded-3xl shadow-sm border border-gray-100"
                            onPress={() => navigation.navigate('Scan')}
                        >
                            <View className="h-40 rounded-2xl overflow-hidden mb-3 relative">
                                <Image source={{ uri: IMAGES.corn }} className="w-full h-full" />
                                <View className="absolute top-2 right-2 bg-red-100 px-2 py-1 rounded-lg">
                                    <Text className="text-xs font-bold text-red-600">Alert</Text>
                                </View>
                            </View>
                            <Text className="text-gray-900 font-bold text-lg ml-1">Corn</Text>
                            <Text className="text-gray-500 text-xs ml-1 mb-2">Needs Water</Text>
                        </TouchableOpacity>

                        {/* Card 3 (Drone/Tech) */}
                        <TouchableOpacity
                            className="w-full mb-4 bg-gray-900 p-5 rounded-[32px] shadow-lg flex-row items-center justify-between"
                            onPress={() => navigation.navigate('Scan')}
                        >
                            <View>
                                <Text className="text-emerald-400 font-bold text-sm mb-1">AI DIAGNOSIS</Text>
                                <Text className="text-white font-bold text-2xl">Scan Your Crop</Text>
                                <Text className="text-gray-400 text-xs mt-2 max-w-[180px]">Detect diseases instantly with our Bio-Scanner.</Text>
                            </View>
                            <Image source={{ uri: IMAGES.drone }} className="w-28 h-28 rounded-2xl" />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
