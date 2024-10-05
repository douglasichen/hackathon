import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors.js';

const TitleHeader = ({ title }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default TitleHeader;