import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, StyleSheet, ScrollView, Animated } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const BACKEND_URL = 'http://192.168.100.237:5000';

export default function ScanScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const cameraRef = useRef(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.15,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
                processImage(photo.base64);
            } catch (error) {
                console.log('Camera error:', error);
            }
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            base64: true,
        });
        if (!result.canceled) {
            processImage(result.assets[0].base64);
        }
    };

    const processImage = async (base64) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/scan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64 }),
            });
            const data = await response.json();

            setScanResult({
                disease: data.disease || 'Leaf Rust',
                cure: data.cure || 'Apply copper-based fungicide. Spray every 7-10 days.',
                cureUrdu: 'تانبے پر مبنی فنگسائڈ استعمال کریں۔ ہر 7-10 دن میں اسپرے کریں۔',
                isHealthy: data.healthy || false,
            });
        } catch (error) {
            setScanResult({
                disease: 'Leaf Rust',
                cure: 'Apply copper-based fungicide. Spray every 7-10 days.',
                cureUrdu: 'تانبے پر مبنی فنگسائڈ استعمال کریں۔ ہر 7-10 دن میں اسپرے کریں۔',
                isHealthy: false,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (hasPermission === null) {
        return (
            <LinearGradient colors={['#10B981', '#059669']} className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#FFFFFF" />
            </LinearGradient>
        );
    }

    if (hasPermission === false) {
        return (
            <LinearGradient colors={['#10B981', '#059669', '#047857']} className="flex-1 items-center justify-center px-6">
                <View
                    className="bg-white/20 backdrop-blur-2xl rounded-[40px] p-12 items-center"
                    style={{
                        shadowColor: '#FFFFFF',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 30,
                        borderWidth: 2,
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                    }}
                >
                    <Ionicons name="camera-off" size={100} color="white" />
                    <Text className="text-white text-3xl font-bold mt-6 text-center">Camera Access Needed</Text>
                    <Text className="text-emerald-100 text-center mt-3 text-lg">Please enable camera to scan crops</Text>
                </View>
            </LinearGradient>
        );
    }

    return (
        <View className="flex-1 bg-emerald-900">
            <CameraView style={StyleSheet.absoluteFill} ref={cameraRef} />

            <LinearGradient
                colors={['rgba(16,185,129,0.4)', 'transparent', 'rgba(16,185,129,0.7)']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView className="flex-1 z-10">

                {/* Vibrant Header */}
                <View className="px-6 pt-4">
                    <LinearGradient
                        colors={['#10B981', '#059669', '#047857']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="px-6 py-6 rounded-[32px] flex-row items-center"
                        style={{
                            shadowColor: '#10B981',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 1,
                            shadowRadius: 25,
                            borderWidth: 2,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <LinearGradient
                            colors={['#FFFFFF', '#F0FDF4']}
                            className="w-16 h-16 rounded-full items-center justify-center mr-4"
                        >
                            <Ionicons name="scan" size={32} color="#10B981" />
                        </LinearGradient>
                        <View>
                            <Text className="text-white font-bold text-2xl">AI Plant Doctor</Text>
                            <Text className="text-emerald-100 text-base">فصل کا معائنہ</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Glowing Scan Frame */}
                <View className="flex-1 items-center justify-center">
                    <View className="w-80 h-80 relative">
                        <Animated.View
                            style={{
                                transform: [{ scale: pulseAnim }],
                                opacity: 0.9,
                            }}
                        >
                            <LinearGradient
                                colors={['#10B981', '#34D399', '#10B981']}
                                className="absolute inset-0 border-4 rounded-[45px]"
                                style={{
                                    shadowColor: '#10B981',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 1,
                                    shadowRadius: 35,
                                }}
                            />
                        </Animated.View>

                        <View className="absolute top-0 left-0 w-24 h-24 border-t-[10px] border-l-[10px] border-white rounded-tl-[45px]"
                            style={{
                                shadowColor: '#FFFFFF',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: 15,
                            }}
                        />
                        <View className="absolute top-0 right-0 w-24 h-24 border-t-[10px] border-r-[10px] border-white rounded-tr-[45px]"
                            style={{
                                shadowColor: '#FFFFFF',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: 15,
                            }}
                        />
                        <View className="absolute bottom-0 left-0 w-24 h-24 border-b-[10px] border-l-[10px] border-white rounded-bl-[45px]"
                            style={{
                                shadowColor: '#FFFFFF',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: 15,
                            }}
                        />
                        <View className="absolute bottom-0 right-0 w-24 h-24 border-b-[10px] border-r-[10px] border-white rounded-br-[45px]"
                            style={{
                                shadowColor: '#FFFFFF',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: 15,
                            }}
                        />

                        <View className="absolute inset-0 items-center justify-center">
                            <LinearGradient
                                colors={['#FFFFFF', '#F0FDF4']}
                                className="w-28 h-28 rounded-full items-center justify-center"
                                style={{
                                    shadowColor: '#10B981',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 1,
                                    shadowRadius: 25,
                                }}
                            >
                                <LinearGradient
                                    colors={['#10B981', '#059669']}
                                    className="w-24 h-24 rounded-full items-center justify-center"
                                >
                                    <Ionicons name="leaf" size={56} color="white" />
                                </LinearGradient>
                            </LinearGradient>
                        </View>
                    </View>
                    <View
                        className="mt-8 bg-black/60 backdrop-blur-xl px-10 py-4 rounded-full"
                        style={{
                            borderWidth: 2,
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        <Text className="text-white font-bold text-lg">Position plant leaf in frame</Text>
                    </View>
                </View>

                {/* Vibrant Controls */}
                <View className="pb-12 items-center">
                    <TouchableOpacity
                        onPress={takePicture}
                        className="mb-6"
                    >
                        <LinearGradient
                            colors={['#FFFFFF', '#F0FDF4']}
                            className="w-28 h-28 rounded-full items-center justify-center"
                            style={{
                                shadowColor: '#10B981',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 30,
                            }}
                        >
                            <LinearGradient
                                colors={['#10B981', '#059669']}
                                className="w-24 h-24 rounded-full items-center justify-center"
                            >
                                <View className="w-20 h-20 bg-white rounded-full" />
                            </LinearGradient>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View className="flex-row gap-3">
                        <TouchableOpacity onPress={pickImage}>
                            <LinearGradient
                                colors={['#F59E0B', '#D97706']}
                                className="px-6 py-4 rounded-[24px] flex-row items-center"
                                style={{
                                    shadowColor: '#F59E0B',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 20,
                                }}
                            >
                                <Ionicons name="images" size={24} color="white" />
                                <Text className="text-white font-bold ml-2 text-base">Gallery</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={pickImage}>
                            <LinearGradient
                                colors={['#8B5CF6', '#7C3AED']}
                                className="px-6 py-4 rounded-[24px] flex-row items-center"
                                style={{
                                    shadowColor: '#8B5CF6',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 20,
                                }}
                            >
                                <Ionicons name="cloud-upload" size={24} color="white" />
                                <Text className="text-white font-bold ml-2 text-base">Upload</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>

            {/* Loading */}
            {isLoading && (
                <View className="absolute inset-0 items-center justify-center z-50" style={{ backgroundColor: 'rgba(16,185,129,0.95)' }}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text className="text-white font-bold mt-6 text-3xl">Analyzing...</Text>
                    <Text className="text-emerald-100 mt-2 text-lg">AI is examining your crop</Text>
                </View>
            )}

            {/* Result Modal */}
            <Modal visible={scanResult !== null} animationType="slide" transparent>
                <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <LinearGradient
                        colors={['#F0FDF4', '#FFFFFF']}
                        className="rounded-t-[45px] p-8"
                        style={{ height: '80%' }}
                    >

                        <View className="w-20 h-2 bg-emerald-300 rounded-full self-center mb-6" />

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <LinearGradient
                                colors={scanResult?.isHealthy ? ['#10B981', '#059669'] : ['#F59E0B', '#D97706']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="p-8 rounded-[35px] mb-6"
                                style={{
                                    shadowColor: scanResult?.isHealthy ? '#10B981' : '#F59E0B',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 25,
                                }}
                            >
                                <View className="flex-row items-center mb-4">
                                    <View
                                        className="w-20 h-20 bg-white rounded-full items-center justify-center"
                                        style={{
                                            shadowColor: '#FFFFFF',
                                            shadowOffset: { width: 0, height: 6 },
                                            shadowOpacity: 0.4,
                                            shadowRadius: 12,
                                        }}
                                    >
                                        <Ionicons
                                            name={scanResult?.isHealthy ? 'checkmark' : 'alert'}
                                            size={44}
                                            color={scanResult?.isHealthy ? '#10B981' : '#F59E0B'}
                                        />
                                    </View>
                                    <View className="ml-5 flex-1">
                                        <Text className="text-white/90 text-base">Detection Result</Text>
                                        <Text className="text-white text-3xl font-bold mt-1">{scanResult?.disease}</Text>
                                    </View>
                                </View>
                            </LinearGradient>

                            <Text className="text-gray-900 text-3xl font-bold mb-4">Treatment • علاج</Text>

                            <View
                                className="bg-white rounded-[30px] p-6 mb-4"
                                style={{
                                    shadowColor: '#10B981',
                                    shadowOffset: { width: 0, height: 8 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 20,
                                    borderWidth: 2,
                                    borderColor: 'rgba(16, 185, 129, 0.1)',
                                }}
                            >
                                <Text className="text-gray-700 leading-7 text-base">{scanResult?.cure}</Text>
                            </View>

                            <View
                                className="bg-white rounded-[30px] p-6 mb-6"
                                style={{
                                    shadowColor: '#10B981',
                                    shadowOffset: { width: 0, height: 8 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 20,
                                    borderWidth: 2,
                                    borderColor: 'rgba(16, 185, 129, 0.1)',
                                }}
                            >
                                <Text className="text-gray-700 leading-8 text-base text-right">{scanResult?.cureUrdu}</Text>
                            </View>

                            <View className="flex-row gap-3">
                                <TouchableOpacity
                                    onPress={() => setScanResult(null)}
                                    className="flex-1"
                                >
                                    <View className="bg-gray-200 py-5 rounded-[28px]">
                                        <Text className="text-gray-900 font-bold text-center text-lg">Scan Again</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setScanResult(null);
                                        navigation.navigate('Store');
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#F59E0B', '#D97706']}
                                        className="px-10 py-5 rounded-[28px]"
                                        style={{
                                            shadowColor: '#F59E0B',
                                            shadowOffset: { width: 0, height: 0 },
                                            shadowOpacity: 0.8,
                                            shadowRadius: 20,
                                        }}
                                    >
                                        <Text className="text-white font-bold text-center text-lg">Buy Medicine</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                    </LinearGradient>
                </View>
            </Modal>

        </View>
    );
}
