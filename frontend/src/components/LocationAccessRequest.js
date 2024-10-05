import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { requestForegroundPermissionsAsync } from 'expo-location';
import { colors } from '../styles/colors.js';
import CustomIcon from './CustomIcon.js';

const LocationAccessRequest = () => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        requestLocationPermission();
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const requestLocationPermission = async () => {
        try {
            const { status } = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <CustomIcon name="map-marker" size={50} color={colors.primaryGreen} />
            <Text style={styles.text}>Requesting Location Access</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    text: {
        marginTop: 20,
        fontSize: 18,
        color: colors.textPrimary,
        textAlign: 'center',
    },
});

export default LocationAccessRequest;