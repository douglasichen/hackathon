import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, PanResponder, Animated, Dimensions, Image } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function SwipeReveal({ image1, image2 }) {
  // Set the width 30 units smaller than the screen width
  const adjustedWidth = screenWidth - 30;
  const [revealWidth, setRevealWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(adjustedWidth); // Initial height

  // Calculate the height based on the width and aspect ratio of the image
  useEffect(() => {
    Image.getSize(image1, (originalWidth, originalHeight) => {
      const aspectRatio = originalWidth / originalHeight;
      setImageHeight(adjustedWidth / aspectRatio); // Calculate height based on width and aspect ratio
    });
  }, [image1, adjustedWidth]);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Update the width of the reveal dynamically
        const newWidth = Math.max(0, Math.min(adjustedWidth, gestureState.moveX));
        setRevealWidth(newWidth);
        Animated.event([null, { dx: pan.x }], { useNativeDriver: false })(_, gestureState);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View style={[styles.container, { width: adjustedWidth, height: imageHeight }]} {...panResponder.panHandlers}>
      {/* Background Image (image1) */}
      <Image source={image1} style={[styles.image, { width: adjustedWidth, height: imageHeight }]} resizeMode="cover" />

      {/* Foreground Image (image2) */}
      <Animated.View style={[styles.maskContainer, { width: revealWidth, height: imageHeight }]}>
        <Image source={image2} style={[styles.image, { width: adjustedWidth, height: imageHeight }]} resizeMode="cover" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
  },
  maskContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    overflow: 'hidden',
  },
});
