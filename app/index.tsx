import { Redirect } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Hind_400Regular } from '@expo-google-fonts/hind';
import LottieView from 'lottie-react-native';
import { COLORS } from '../constants/theme';

export default function Index() {
    const [fontsLoaded] = useFonts({
        Montserrat_700Bold,
        Hind_400Regular,
    });

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (fontsLoaded) {
            // Simulate splash delay or loading
            setTimeout(() => {
                setIsReady(true);
            }, 3000);
        }
    }, [fontsLoaded]);

    if (!isReady || !fontsLoaded) {
        return (
            <View style={styles.container}>
                {/* Placeholder for DNA Animation - using a simple spinner or text if lottie not ready */}
                <Text style={styles.title}>Agri Gen</Text>
                <Text style={styles.subtitle}>Zaraat ki Nayi Nasal</Text>
                <Text style={styles.footer}>Developed by Mujahid Hazarain</Text>
            </View>
        );
    }

    return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 32,
        color: COLORS.primary,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: 'Hind_400Regular',
        fontSize: 18,
        color: COLORS.secondary,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        color: COLORS.gray,
        fontSize: 12,
        fontFamily: 'Hind_400Regular',
    },
});
