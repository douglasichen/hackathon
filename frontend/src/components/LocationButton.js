import React from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { Text,TouchableOpacity,Linking,StyleSheet } from 'react-native';
import { colors } from '../styles/colors.js';
import CustomIcon from '../components/CustomIcon.js';


const LocationButton = () => {

    const handlePress = async () => {
        // Request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
    
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
    
        // Get current location if permission is granted
        let currentLocation = await Location.getCurrentPositionAsync({});

        const { latitude, longitude } = currentLocation.coords;
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url);
      };
    
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <CustomIcon name="arrow-left" size={24} color={colors.white} />
      <Text style={styles.buttonText}>  Google Map</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
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
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
  });



export default LocationButton;
