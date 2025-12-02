import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen({ onFinish }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entrance animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();

        // Pulsing glow effect
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Auto-close
        const timer = setTimeout(() => {
            if (onFinish) onFinish();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2000' }}
            className="flex-1"
            resizeMode="cover"
        >
            <LinearGradient
                colors={['rgba(16,185,129,0.4)', 'rgba(245,158,11,0.7)', 'rgba(139,92,246,0.8)']}
                className="flex-1 items-center justify-center"
            >
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    }}
                    className="items-center px-8"
                >
                    {/* Glowing Logo */}
                    <Animated.View
                        style={{
                            opacity: glowAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.7, 1],
                            }),
                            transform: [{
                                scale: glowAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 1.05],
                                }),
                            }],
                        }}
                    >
                        <LinearGradient
                            colors={['#FFFFFF', '#F0FDF4']}
                            className="w-40 h-40 rounded-full items-center justify-center mb-8"
                            style={{
                                shadowColor: '#10B981',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 40,
                                elevation: 30,
                            }}
                        >
                            <LinearGradient
                                colors={['#10B981', '#059669']}
                                className="w-32 h-32 rounded-full items-center justify-center"
                            >
                                <Ionicons name="leaf" size={80} color="white" />
                            </LinearGradient>
                        </LinearGradient>
                    </Animated.View>

                    {/* Vibrant Title */}
                    <View
                        className="bg-white/10 backdrop-blur-2xl rounded-[35px] px-10 py-6 mb-6"
                        style={{
                            shadowColor: '#FBBF24',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.9,
                            shadowRadius: 35,
                            borderWidth: 2,
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        <Text
                            className="text-white text-7xl font-bold text-center"
                            style={{
                                textShadowColor: 'rgba(251, 191, 36, 1)',
                                textShadowOffset: { width: 0, height: 0 },
                                textShadowRadius: 25,
                            }}
                        >
                            Apna Kisaan
                        </Text>
                        <Text
                            className="text-amber-200 text-4xl text-center mt-3"
                            style={{
                                textShadowColor: 'rgba(0, 0, 0, 0.7)',
                                textShadowOffset: { width: 0, height: 2 },
                                textShadowRadius: 10,
                            }}
                        >
                            اپنا کسان
                        </Text>
                    </View>

                    {/* Glowing Slogan */}
                    <LinearGradient
                        colors={['#FBBF24', '#F59E0B', '#D97706']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="px-10 py-5 rounded-full"
                        style={{
                            shadowColor: '#FBBF24',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 1,
                            shadowRadius: 30,
                            elevation: 30,
                        }}
                    >
                        <Text className="text-white text-2xl font-bold">کسان خوشحال، پاکستان خوشحال</Text>
                    </LinearGradient>
                    <Text
                        className="text-white text-lg mt-4 font-medium"
                        style={{
                            textShadowColor: 'rgba(0, 0, 0, 0.8)',
                            textShadowOffset: { width: 0, height: 2 },
                            textShadowRadius: 8,
                        }}
                    >
                        Kisaan Khushhal, Pakistan Khushhal
                    </Text>

                    {/* Footer */}
                    <View className="absolute bottom-24">
                        <Text
                            className="text-white/90 text-base font-medium"
                            style={{
                                textShadowColor: 'rgba(0, 0, 0, 0.8)',
                                textShadowOffset: { width: 0, height: 1 },
                                textShadowRadius: 6,
                            }}
                        >
                            Developed by Mujahid Hazarain
                        </Text>
                        <Text
                            className="text-amber-200 text-sm text-center mt-1"
                            style={{
                                textShadowColor: 'rgba(0, 0, 0, 0.7)',
                                textShadowOffset: { width: 0, height: 1 },
                                textShadowRadius: 5,
                            }}
                        >
                            Hazara University
                        </Text>
                    </View>
                </Animated.View>
            </LinearGradient>
        </ImageBackground>
    );
}
