import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextInputForm from '../components/TextInputForm';

const TextInput = () => {
  const [submittedText, setSubmittedText] = useState('');

  // Handle text submission from the TextInputForm component
  const handleTextSubmit = (text) => {
    setSubmittedText(text);
  };

  return (
    <View style={styles.container}>

      {/* Render the TextInputForm component and pass the handler function */}
      <TextInputForm onSubmit={handleTextSubmit} />

      {/* Display the submitted text */}
      {submittedText ? (
        <Text style={styles.output}>Submitted Text: {submittedText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  output: {
    fontSize: 18,
    marginTop: 20,
    color: 'blue',
  },
});

export default TextInput;
