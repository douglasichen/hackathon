import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors } from '../styles/colors.js';
import CustomIcon from '../components/CustomIcon.js';

const LocationButton = () => {
  const [loading, setLoading] = useState(false);
  const [locationString, setLocationString] = useState('');

  useEffect(() => {
    getLocationString();
  }, []);

  const getLocationString = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      
      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocationString(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationString('Location unavailable');
    }
  };

  const handlePress = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      
      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Failed to open Google Maps');
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <View style={styles.buttonContent}>
          <CustomIcon name="map-marker" size={24} color={colors.white} />
          <Text style={styles.buttonText}>{locationString || 'Loading location...'}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryGreen,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 200,
    minHeight: 48,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default LocationButton;
