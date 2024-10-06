import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, PanResponder, Animated, Dimensions, Image } from 'react-native';
import Image1 from './assets/stroad.jpg';
import Image2 from './assets/stroad2.jpg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SwipeReveal() {
  const [revealWidth, setRevealWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(screenHeight);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    Image.getSize(Image1, (width, height) => {
      const aspectRatio = width / height;
      setImageHeight(screenWidth / aspectRatio);
    });
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newWidth = Math.max(0, Math.min(screenWidth, gestureState.moveX));
        setRevealWidth(newWidth);
        Animated.event([null, { dx: pan.x }], { useNativeDriver: false })(_, gestureState);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Image source={Image1} style={[styles.image, { height: imageHeight }]} resizeMode="cover" />
      <Animated.View
        style={[
          styles.maskContainer,
          {
            width: revealWidth,
          },
        ]}
      >
        <Image source={Image2} style={[styles.image, { height: imageHeight }]} resizeMode="cover" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    overflow: 'hidden',
  },
  image: {
    width: screenWidth,
  },
  maskContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    overflow: 'hidden',
  },
});