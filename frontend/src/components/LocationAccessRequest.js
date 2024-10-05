import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import * as Location from 'expo-location'; // Add this import for Location module
import { requestForegroundPermissionsAsync } from 'expo-location';
import { colors } from '../styles/colors.js';
import CustomIcon from './CustomIcon.js';

const LocationAccessRequest = () => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [mapUrl, setMapUrl] = useState(''); // State to store the map URL

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
                return;
            }

            // Call getLocation to get and store the map URL
            const url = await getLocation();
            setMapUrl(url); // Store the map URL in state
        } catch (err) {
            console.warn(err);
        }
    };

    const getLocation = async () => {
        try {
            // Get the current location
            let currentLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = currentLocation.coords;

            // Create and return the Google Maps URL
            const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
            console.log('Map URL:', url);
            return url;
        } catch (err) {
            console.warn(err);
            return ''; // Return an empty string in case of error
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <CustomIcon name="map-marker" size={50} color={colors.primaryGreen} />
            <Text style={styles.text}>Requesting Location Access</Text>
            {/* Display the map URL if available */}
            {mapUrl ? (
                <Text style={styles.text}>Map URL: {mapUrl}</Text>
            ) : null}
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
