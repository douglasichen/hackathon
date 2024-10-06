import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../styles/colors.js';
import CustomIcon from '../components/CustomIcon.js';
import SwipeReveal from '../components/SwipeReveal.js';
import LocationButton from '../components/LocationButton.js';

const RecommendationsPostPage = ({ route, navigation }) => {
  const { title, imgBefore, imgAfter, text } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{title || 'Recommendations'}</Text>
        
        {imgBefore && imgAfter ? (
          <SwipeReveal image1={imgBefore} image2={imgAfter} style={styles.image} />
        ) : null}
        
        <View style={styles.textContainer}>
          <Text style={styles.descriptionText}>{text}</Text>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <CustomIcon name="arrow-left" size={24} color={colors.white} />
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 50,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    marginBottom: 20,
  },
  textContainer: {
    marginTop: 25,
    marginBottom: 30,
    width: 350,
    marginLeft: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
