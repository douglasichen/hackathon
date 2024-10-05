import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { colors } from '../styles/colors.js';
import { iconNames } from '../styles/icons.js';
import TitleHeader from '../components/TitleHeader.js';
import ListItem from '../components/ListItem.js';
import LocationAccessRequest from '../components/LocationAccessRequest.js';
import PhotoButton from '../components/PhotoButton.js';

const demoData = [
  { id: '1', title: 'Solar Panels' },
  { id: '2', title: 'Recycling Program' },
  { id: '3', title: 'Urban Garden' },
  { id: '4', title: 'Electric Vehicles' },
];

const Main = ({ navigation }) => {
  const [showLocationRequest, setShowLocationRequest] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    setTimeout(() => setShowLocationRequest(false), 3000);
    (async () => {
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(libraryStatus === 'granted' && cameraStatus === 'granted');
      if (libraryStatus !== 'granted' || cameraStatus !== 'granted') {
        Alert.alert('Sorry, we need camera and camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleUploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate('RecommendationsPostPage', { photoUri: result.assets[0].uri });
    }
  };

  const handleTakePhoto = async () => {
    if (hasPermission) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        navigation.navigate('RecommendationsPostPage', { photoUri: result.assets[0].uri });
      }
    } else {
      Alert.alert('Camera permission not granted');
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate('RecommendationsPostPage', { title: item.title });
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
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <ListItem item={item} />
            </TouchableOpacity>
          )}
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