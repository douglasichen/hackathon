import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { colors } from '../styles/colors.js';
import CustomIcon from '../components/CustomIcon.js';

const RecommendationsPostPage = ({ route, navigation }) => {
  const { photoUri, title, recommendations} = route.params;

  // // Mock data for recommendations
  // const recommendations = [
  //   {
  //     "title": "Improve Pedestrian and Cyclist Infrastructure",
  //     "content": "Introduce dedicated pedestrian walkways, crosswalks, and bike lanes to enhance safety and encourage active transportation modes. This can help reduce car dependency and promote a more livable environment."
  //   },
  //   {
  //     "title": "Implement Traffic Calming Measures",
  //     "content": "Consider traffic calming measures such as speed humps, narrower lane widths, or curb extensions to slow down vehicular traffic and prioritize pedestrian and cyclist safety."
  //   },
  //   {
  //     "title": "Enhance Streetscaping and Greenery",
  //     "content": "Incorporate street trees, landscaping, and green spaces along the corridor to improve the visual appeal, provide shade, and create a more pleasant environment for pedestrians and cyclists."
  //   },
  //   {
  //     "title": "Encourage Mixed-Use Development",
  //     "content": "Promote mixed-use development along the corridor, combining residential, commercial, and recreational spaces. This can create a more vibrant and walkable community, reducing the need for long-distance travel."
  //   },
  //   {
  //     "title": "Improve Public Transportation Access",
  //     "content": "Evaluate the need for public transportation options, such as bus routes or dedicated lanes, to provide alternative modes of transportation and reduce reliance on personal vehicles."
  //   }
  // ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>{title || 'Recommendations'}</Text>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
      <View style={styles.recommendationsContainer}>
        {recommendations.map((recommendation, index) => (
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
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
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