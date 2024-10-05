import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../styles/colors.js';
import CustomIcon from '../components/CustomIcon.js';
import LocationButton from '../components/LocationButton.js';

const RecommendationsPostPage = ({ route, navigation }) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryGreen,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default RecommendationsPostPage;