import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TextInputForm = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  // Function to handle when the user submits the text
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(inputText); // Pass the text back to the parent or another component
    }
    setInputText(''); // Clear the input after submission
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Please enter location</Text>
      <TextInput
        style={styles.input}
        placeholder="Type something here..."
        value={inputText}
        onChangeText={setInputText} // Update the state with the new text
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default TextInputForm;
