import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../styles/colors.js';
import CustomIcon from '../components/CustomIcon.js';
import SwipeReveal from '../components/SwipeReveal';


import StroadBefore from '../../assets/photos/stroadBefore.jpg'
import StroadAfter from '../../assets/photos/stroadAfter.jpg'

const RecommendationsPostPage = ({ route, navigation }) => {
  const { title, imgBefore, imgAfter, text } = route.params;
  console.log(route);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Recommendations'}</Text>
      
      <SwipeReveal image1={imgBefore} image2={imgAfter} style={styles.image} />
      
      <View>
        <Text> {text} </Text>

      
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <CustomIcon name="arrow-left" size={24} color={colors.white} />
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      
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
  image: {
    width: 300,
    height: 100,
    alignItems: 'center',
  }

  
});

export default RecommendationsPostPage;
