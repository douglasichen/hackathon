import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../styles/colors.js';

const ListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placehold.co/300x200' }}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  titleContainer: {
    padding: 10,
    backgroundColor: colors.lightGray,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});

export default ListItem;