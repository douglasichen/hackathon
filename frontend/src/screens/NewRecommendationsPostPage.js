import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../styles/colors.js';
import CustomIcon from '../components/CustomIcon.js';
import LocationButton from '../components/LocationButton.js';

const NewRecommendationsPostPage = ({ route, navigation }) => {
  const { photoUri, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Recommendations'}</Text>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <CustomIcon name="arrow-left" size={24} color={colors.white} />
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <LocationButton/>
    </View>
  );
};