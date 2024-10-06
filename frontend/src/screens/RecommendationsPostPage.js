import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../styles/colors.js';
import CustomIcon from '../components/CustomIcon.js';
import SwipeReveal from '../components/SwipeReveal.js';
import LocationButton from '../components/LocationButton.js';


const RecommendationsPostPage = ({ route, navigation }) => {
  const { photoUri, title, recommendations, imgBefore, imgAfter, text} = route.params;
  let recommendations_arr = recommendations || []
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title || 'Recommendations'}</Text>
      <LocationButton/>
      {imgBefore && imgAfter ? (
          <SwipeReveal image1={imgBefore} image2={imgAfter} style={styles.image} />
        ) : null}
      <View style={styles.recommendationsContainer}>
        {recommendations_arr.map((recommendation, index) => (
          <View key={index} style={styles.recommendationItem}>
            <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
            <Text style={styles.recommendationContent}>{recommendation.content}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <CustomIcon name="arrow-left" size={24} color={colors.white} />
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
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
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  recommendationsContainer: {
    marginBottom: 20,
  },
  recommendationItem: {
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryGreen,
    marginBottom: 10,
  },
  recommendationContent: {
    fontSize: 16,
    color: colors.textSecondary,
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
    marginBottom: 30,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default RecommendationsPostPage;
