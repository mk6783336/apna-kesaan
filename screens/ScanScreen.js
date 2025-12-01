import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, Image, Alert, StyleSheet } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// REPLACE WITH YOUR IP
const BACKEND_URL = 'http://192.168.100.237:5000';

export default function ScanScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
                processImage(photo.base64);
            } catch (error) { Alert.alert("Error", "Could not capture image."); }
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
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
                body: JSON.stringify({ image: base64 })
            });
            const data = await response.json();

            // Map backend response to UI format
            // Assuming backend returns: { name, disease, confidence, cure, healthy }
            setScanResult({
                cropName: data.name || "Unknown Crop",
                diseaseName: data.disease || "Unknown Issue",
                confidence: Math.round(data.confidence || 0),
                cureUrdu: data.cure || "No cure info available.",
                cureEnglish: data.cure || "No cure info available.",
                isHealthy: data.healthy || false
            });

        } catch (error) {
            Alert.alert("Scan Failed", "Could not connect to AI server.");
        } finally {
            setIsLoading(false);
        }
    };

    if (hasPermission === null) return <View className="flex-1 bg-black items-center justify-center"><ActivityIndicator color="#10B981" /></View>;
    if (hasPermission === false) return <View className="flex-1 bg-black items-center justify-center"><Text className="text-white">No camera access</Text></View>;

    return (
        <View className="flex-1 bg-black">
            <CameraView style={StyleSheet.absoluteFill} ref={cameraRef}>
                <SafeAreaView className="flex-1 justify-between">

                    {/* Top Bar */}
                    <View className="px-6 pt-4 flex-row justify-between items-center">
                        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-black/40 p-3 rounded-full backdrop-blur-md">
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <View className="bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                            <Text className="text-white font-bold text-sm">AI Bio-Scanner</Text>
                        </View>
                        <TouchableOpacity className="bg-black/40 p-3 rounded-full backdrop-blur-md">
                            <Ionicons name="flash-off" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Scanner Frame */}
                    <View className="flex-1 items-center justify-center">
                        <View className="w-72 h-72 border-2 border-white/30 rounded-[40px] relative">
                            <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-3xl" />
                            <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-3xl" />
                            <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-3xl" />
                            <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-3xl" />
                            <View className="absolute top-1/2 w-full h-0.5 bg-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                        </View>
                        <Text className="text-white/80 mt-8 font-medium tracking-wider">Align crop within frame</Text>
                    </View>

                    {/* Bottom Controls */}
                    <View className="pb-12 px-8 flex-row justify-between items-center">
                        <TouchableOpacity onPress={pickImage} className="w-12 h-12 bg-white/20 rounded-full items-center justify-center backdrop-blur-md">
                            <Ionicons name="images" size={24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={takePicture} className="w-20 h-20 bg-white rounded-full items-center justify-center border-4 border-emerald-500/30 shadow-lg shadow-emerald-500/50">
                            <View className="w-16 h-16 bg-emerald-500 rounded-full border-2 border-white" />
                        </TouchableOpacity>

                        <TouchableOpacity className="w-12 h-12 bg-white/20 rounded-full items-center justify-center backdrop-blur-md">
                            <Ionicons name="help-circle" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </CameraView>

            {/* Loading Overlay */}
            {isLoading && (
                <View className="absolute inset-0 bg-black/80 items-center justify-center z-50">
                    <ActivityIndicator size="large" color="#10B981" />
                    <Text className="text-emerald-500 font-bold mt-4 text-lg">AI Diagnosing...</Text>
                </View>
            )}

            {/* Result Sheet */}
            <Modal visible={scanResult !== null} animationType="slide" transparent>
                <View className="flex-1 justify-end bg-black/60">
                    <View className="bg-white rounded-t-[40px] p-8 h-[85%]">
                        <View className="w-16 h-1.5 bg-gray-200 rounded-full self-center mb-8" />

                        <View className="flex-row items-center mb-6">
                            <View className={`w-16 h-16 rounded-2xl items-center justify-center ${scanResult?.isHealthy ? 'bg-emerald-100' : 'bg-red-100'}`}>
                                <Ionicons name={scanResult?.isHealthy ? "happy" : "warning"} size={32} color={scanResult?.isHealthy ? "#10B981" : "#EF4444"} />
                            </View>
                            <View className="ml-4 flex-1">
                                <Text className="text-gray-900 text-2xl font-bold">{scanResult?.cropName}</Text>
                                <Text className={`font-bold ${scanResult?.isHealthy ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {scanResult?.diseaseName}
                                </Text>
                            </View>
                            <View className="bg-gray-100 px-3 py-1 rounded-full">
                                <Text className="text-gray-600 font-bold">{scanResult?.confidence}%</Text>
                            </View>
                        </View>

                        <Text className="text-gray-900 font-bold text-lg mb-3">Diagnosis & Cure</Text>
                        <View className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 mb-8">
                            <Text className="text-emerald-900 font-medium leading-7 text-lg">{scanResult?.cureUrdu}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => { setScanResult(null); navigation.navigate('Store'); }}
                            className="bg-gray-900 py-5 rounded-[24px] items-center shadow-lg"
                        >
                            <Text className="text-white font-bold text-lg">Find Medicine in Store</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setScanResult(null)} className="mt-4 items-center">
                            <Text className="text-gray-500 font-bold">Close Scanner</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
