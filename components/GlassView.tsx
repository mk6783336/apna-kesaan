import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../constants/theme';

interface GlassViewProps extends ViewProps {
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
}

export const GlassView: React.FC<GlassViewProps> = ({
    children,
    style,
    intensity = 50,
    tint = 'dark',
    ...props
}) => {
    return (
        <BlurView intensity={intensity} tint={tint} style={[styles.container, style]} {...props}>
            {children}
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.glass,
        borderColor: COLORS.glassBorder,
        borderWidth: 1,
        overflow: 'hidden',
    },
});
