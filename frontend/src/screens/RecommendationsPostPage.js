import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../styles/colors.js';
import CustomIcon from '../components/CustomIcon.js';
import SwipeReveal from '../components/SwipeReveal.js';

const RecommendationsPostPage = ({ route, navigation }) => {
  const { title, imgBefore, imgAfter, text } = route.params;

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 20,
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