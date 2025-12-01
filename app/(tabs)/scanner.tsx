import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { GlassView } from '../../components/GlassView';
import { COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function Scanner() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white', textAlign: 'center' }}>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.text}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {!scanned ? (
                <Camera style={styles.camera} type={type}>
                    <View style={styles.overlay}>
                        <View style={styles.scanFrame} />
                        <Text style={styles.scanText}>Align leaf within frame</Text>
                        <TouchableOpacity style={styles.captureBtn} onPress={() => setScanned(true)}>
                            <View style={styles.captureInner} />
                        </TouchableOpacity>
                    </View>
                </Camera>
            ) : (
                <View style={styles.resultContainer}>
                    <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.resultImage} />
                    <GlassView style={styles.resultCard}>
                        <Text style={styles.diseaseTitle}>Rust Disease Detected</Text>
                        <Text style={styles.confidence}>Confidence: 98.5%</Text>
                        <Text style={styles.cure}>Cure: Spray Fungicide X</Text>
                        <TouchableOpacity style={styles.buyBtn}>
                            <Text style={styles.buyText}>Buy Cure Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rescanBtn} onPress={() => setScanned(false)}>
                            <Text style={styles.rescanText}>Scan Again</Text>
                        </TouchableOpacity>
                    </GlassView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: COLORS.secondary,
        backgroundColor: 'transparent',
        marginBottom: 20,
    },
    scanText: {
        color: COLORS.white,
        fontFamily: 'Hind_400Regular',
        marginBottom: 50,
    },
    captureBtn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 100,
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.white,
    },
    resultContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        paddingTop: 50,
    },
    resultImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    resultCard: {
        marginTop: -50,
        width: '90%',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    diseaseTitle: {
        color: '#EF4444', // Red
        fontSize: 24,
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 10,
    },
    confidence: {
        color: COLORS.gray,
        marginBottom: 10,
    },
    cure: {
        color: COLORS.white,
        fontSize: 18,
        marginBottom: 20,
    },
    buyBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    buyText: {
        color: COLORS.white,
        fontFamily: 'Montserrat_700Bold',
    },
    rescanBtn: {
        padding: 10,
    },
    rescanText: {
        color: COLORS.secondary,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    text: {
        color: COLORS.white,
        fontFamily: 'Montserrat_700Bold',
    }
});
