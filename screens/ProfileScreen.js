import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const MENU_ITEMS = [
    { id: '1', label: 'My Fields', urdu: 'میرا کھیت', icon: 'leaf', color: ['#10B981', '#059669'] },
    { id: '2', label: 'Order History', urdu: 'آرڈر ہسٹری', icon: 'receipt', color: ['#3B82F6', '#2563EB'] },
    { id: '3', label: 'Settings', urdu: 'ترتیبات', icon: 'settings', color: ['#8B5CF6', '#7C3AED'] },
    { id: '4', label: 'Help', urdu: 'مدد', icon: 'help-circle', color: ['#EC4899', '#DB2777'] },
];

export default function ProfileScreen() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [language, setLanguage] = useState('en');

    const handleAuth = () => {
        if (email && password) {
            setIsLoggedIn(true);
        } else {
            Alert.alert("Error", "Please enter credentials");
        }
    };

    if (!isLoggedIn) {
        return (
            <View className="flex-1 bg-[#10B981]">
                <LinearGradient
                    colors={['#10B981', '#059669', '#047857']}
                    className="h-72 rounded-b-[60px]"
                    style={{
                        shadowColor: '#10B981',
                        shadowOffset: { width: 0, height: 12 },
                        shadowOpacity: 0.5,
                        shadowRadius: 25,
                    }}
                />

                <View className="flex-1 px-8 -mt-40">
                    <View className="items-center mb-8">
                        <LinearGradient
                            colors={['#FFFFFF', '#F0FDF4']}
                            className="w-40 h-40 rounded-full items-center justify-center mb-6"
                            style={{
                                shadowColor: '#10B981',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: 30,
                            }}
                        >
                            <LinearGradient
                                colors={['#10B981', '#059669']}
                                className="w-32 h-32 rounded-full items-center justify-center"
                            >
                                <Ionicons name="leaf" size={70} color="white" />
                            </LinearGradient>
                        </LinearGradient>
                        <Text
                            className="text-white text-5xl font-bold"
                            style={{
                                textShadowColor: 'rgba(16, 185, 129, 0.8)',
                                textShadowOffset: { width: 0, height: 0 },
                                textShadowRadius: 20,
                            }}
                        >
                            Apna Kisaan
                        </Text>
                        <Text className="text-emerald-100 text-xl mt-2 text-center">اپنا کسان • Your Farming Partner</Text>
                    </View>

                    <LinearGradient
                        colors={['#FFFFFF', '#FAFAFA']}
                        className="rounded-[40px] p-8"
                        style={{
                            shadowColor: '#10B981',
                            shadowOffset: { width: 0, height: 12 },
                            shadowOpacity: 0.3,
                            shadowRadius: 25,
                            borderWidth: 2,
                            borderColor: 'rgba(16, 185, 129, 0.2)',
                        }}
                    >
                        <Text className="text-gray-900 text-3xl font-bold mb-6 text-center">
                            {isLoginView ? 'Welcome Back' : 'Create Account'}
                        </Text>

                        <View
                            className="bg-gray-50 rounded-[24px] mb-4"
                            style={{
                                borderWidth: 2,
                                borderColor: 'rgba(16, 185, 129, 0.1)',
                            }}
                        >
                            <TextInput
                                placeholder={language === 'ur' ? 'ای میل یا فون' : 'Email or Phone'}
                                value={email}
                                onChangeText={setEmail}
                                className="p-5 text-gray-900 text-base font-medium"
                            />
                        </View>

                        <View
                            className="bg-gray-50 rounded-[24px] mb-6"
                            style={{
                                borderWidth: 2,
                                borderColor: 'rgba(16, 185, 129, 0.1)',
                            }}
                        >
                            <TextInput
                                placeholder={language === 'ur' ? 'پاس ورڈ' : 'Password'}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                className="p-5 text-gray-900 text-base font-medium"
                            />
                        </View>

                        <TouchableOpacity onPress={handleAuth}>
                            <LinearGradient
                                colors={['#10B981', '#059669', '#047857']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="py-5 rounded-[28px]"
                                style={{
                                    shadowColor: '#10B981',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 20,
                                }}
                            >
                                <Text className="text-white font-bold text-center text-xl">
                                    {isLoginView ? (language === 'ur' ? 'لاگ ان' : 'Login') : (language === 'ur' ? 'سائن اپ' : 'Sign Up')}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsLoginView(!isLoginView)} className="mt-6 items-center">
                            <Text className="text-gray-600 font-medium text-base">
                                {isLoginView ? "Don't have an account? " : "Already have an account? "}
                                <Text className="text-emerald-600 font-bold">
                                    {isLoginView ? (language === 'ur' ? 'سائن اپ' : 'Sign Up') : (language === 'ur' ? 'لاگ ان' : 'Login')}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#FFF8E7]">

            {/* Vibrant Header */}
            <LinearGradient
                colors={['#F59E0B', '#D97706', '#B45309']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-b-[50px]"
                style={{
                    shadowColor: '#F59E0B',
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.5,
                    shadowRadius: 25,
                }}
            >
                <SafeAreaView>
                    <View className="px-6 py-6">
                        <View className="flex-row justify-between items-start mb-6">
                            <TouchableOpacity
                                onPress={() => setIsLoggedIn(false)}
                                className="bg-white/20 p-4 rounded-full"
                            >
                                <Ionicons name="log-out-outline" size={24} color="white" />
                            </TouchableOpacity>

                            {/* Language Toggle */}
                            <View className="flex-row bg-white/20 rounded-full p-1">
                                <TouchableOpacity
                                    onPress={() => setLanguage('en')}
                                    className={`px-5 py-3 rounded-full ${language === 'en' ? 'bg-white' : ''}`}
                                >
                                    <Text className={`font-bold text-base ${language === 'en' ? 'text-amber-600' : 'text-white'}`}>EN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setLanguage('ur')}
                                    className={`px-5 py-3 rounded-full ${language === 'ur' ? 'bg-white' : ''}`}
                                >
                                    <Text className={`font-bold text-base ${language === 'ur' ? 'text-amber-600' : 'text-white'}`}>اردو</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity className="bg-white/20 p-4 rounded-full">
                                <Ionicons name="notifications-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View className="items-center">
                            <View
                                className="w-32 h-32 bg-white rounded-full items-center justify-center mb-4"
                                style={{
                                    shadowColor: '#FFFFFF',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 20,
                                }}
                            >
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }}
                                    className="w-28 h-28 rounded-full"
                                />
                            </View>
                            <Text className="text-white text-3xl font-bold">Abdul Aziz Khan</Text>
                            <Text className="text-amber-100 text-xl mt-1">عبدالعزیز خان</Text>
                            <View className="flex-row items-center mt-2">
                                <Ionicons name="location" size={18} color="white" />
                                <Text className="text-white/90 ml-2 text-base">Multan, Pakistan</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView className="flex-1 px-6 -mt-8" showsVerticalScrollIndicator={false}>

                <Text className="text-gray-900 text-3xl font-bold mb-4 mt-6">
                    {language === 'ur' ? 'مینو' : 'Menu'}
                </Text>

                {MENU_ITEMS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        className="mb-4"
                    >
                        <LinearGradient
                            colors={['#FFFFFF', '#FAFAFA']}
                            className="rounded-[32px] p-6 flex-row items-center justify-between"
                            style={{
                                shadowColor: item.color[0],
                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.15,
                                shadowRadius: 12,
                                borderWidth: 2,
                                borderColor: `${item.color[0]}20`,
                            }}
                        >
                            <View className="flex-row items-center flex-1">
                                <LinearGradient
                                    colors={item.color}
                                    className="w-16 h-16 rounded-[20px] items-center justify-center mr-4"
                                    style={{
                                        shadowColor: item.color[0],
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowOpacity: 0.6,
                                        shadowRadius: 12,
                                    }}
                                >
                                    <Ionicons name={item.icon} size={28} color="white" />
                                </LinearGradient>
                                <View>
                                    <Text className="text-gray-900 font-bold text-lg">{item.label}</Text>
                                    <Text className="text-gray-500 text-base">{item.urdu}</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={28} color="#D1D5DB" />
                        </LinearGradient>
                    </TouchableOpacity>
                ))}

                {/* Logout */}
                <TouchableOpacity
                    onPress={() => setIsLoggedIn(false)}
                    className="mb-32 mt-4"
                >
                    <LinearGradient
                        colors={['#EF4444', '#DC2626']}
                        className="rounded-[32px] p-6 flex-row items-center justify-between"
                        style={{
                            shadowColor: '#EF4444',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.6,
                            shadowRadius: 20,
                        }}
                    >
                        <View className="flex-row items-center flex-1">
                            <View className="w-16 h-16 bg-white/25 rounded-[20px] items-center justify-center mr-4">
                                <Ionicons name="log-out" size={28} color="white" />
                            </View>
                            <Text className="text-white font-bold text-lg">
                                {language === 'ur' ? 'لاگ آؤٹ' : 'Logout'}
                            </Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}
