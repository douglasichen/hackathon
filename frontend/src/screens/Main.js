import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { colors } from '../styles/colors.js';
import { iconNames } from '../styles/icons.js';
import TitleHeader from '../components/TitleHeader.js';
import ListItem from '../components/ListItem.js';
import LocationAccessRequest from '../components/LocationAccessRequest.js';
import PhotoButton from '../components/PhotoButton.js';
import LocationButton from '../components/LocationButton.js';
import LocationModal from '../components/LocationModal.js';

import StroadBefore from '../../assets/photos/stroadBefore.jpg';
import StroadAfter from '../../assets/photos/stroadAfter.jpg';

const demoData = [
  { id: '1', title: 'Stroad Transformation', imgBefore: StroadBefore, imgAfter: StroadAfter, text: "This transformation shows how a typical stroad can be converted into a more pedestrian-friendly and aesthetically pleasing street." },
];

const Main = ({ navigation }) => {
  const [showLocationRequest, setShowLocationRequest] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedPhotoUri, setSelectedPhotoUri] = useState(null);

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
      setSelectedPhotoUri(result.assets[0].uri);
      setShowLocationModal(true);
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
        setSelectedPhotoUri(result.assets[0].uri);
        handleLocationFromDevice();
      }
    } else {
      Alert.alert('Camera permission not granted');
    }
  };

  const handleLocationFromDevice = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    navigation.navigate('RecommendationsPostPage', { 
      photoUri: selectedPhotoUri, 
      location: `${location.coords.latitude}, ${location.coords.longitude}` 
    });
  };

  const handleLocationSubmit = (location) => {
    navigation.navigate('RecommendationsPostPage', { photoUri: selectedPhotoUri, location });
  };

  const handleItemPress = (item) => {
    navigation.navigate('RecommendationsPostPage', { title: item.title, imgBefore: item.imgBefore, imgAfter: item.imgAfter, text: item.text });
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
      <LocationModal 
        visible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSubmit={handleLocationSubmit}
      />
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