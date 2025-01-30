import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Main Screen</Text>
      <Button
        title="Launch Voicebot Screen"
        onPress={() => {
          navigation.navigate('Voicebot');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
});
