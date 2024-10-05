import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../styles/colors.js';
import { iconNames } from '../styles/icons.js';
import TitleHeader from './TitleHeader.js';
import ListItem from './ListItem.js';
import LocationAccessRequest from './LocationAccessRequest.js';
import PhotoButton from './PhotoButton.js';

const demoData = [
  { id: '1', title: 'Solar Panels' },
  { id: '2', title: 'Recycling Program' },
  { id: '3', title: 'Urban Garden' },
  { id: '4', title: 'Electric Vehicles' },
];

const Main = () => {
  const [showLocationRequest, setShowLocationRequest] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowLocationRequest(false), 3000);
  }, []);

  const handleUploadPhoto = () => {
    console.log('Upload Photo pressed');
    // Implement photo upload logic here
  };

  const handleTakePhoto = () => {
    console.log('Take Photo pressed');
    // Implement photo capture logic here
  };

  if (showLocationRequest) {
    return <LocationAccessRequest />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.primaryGreen, colors.secondaryGreen]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBackground}
        >
          <TitleHeader title="UrbanizeAI" />
        </LinearGradient>
        <FlatList
          data={demoData}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
        <View style={styles.buttonContainer}>
          <PhotoButton 
            title="Upload Photo" 
            iconName={iconNames.upload} 
            onPress={handleUploadPhoto} 
          />
          <PhotoButton 
            title="Take Photo" 
            iconName={iconNames.camera} 
            onPress={handleTakePhoto} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryGreen,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  gradientBackground: {
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  list: {
    width: '100%',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default Main;