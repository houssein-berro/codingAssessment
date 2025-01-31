import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from '../../components/primaryButton/primaryButton';

const VoiceBotScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VoiceBot Screen</Text>
      <Text style={styles.subtitle}>Your AI Voice Assistant is Ready</Text>
      <PrimaryButton title='Close' onPress={()=> navigation.goBack()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4B5563',
    marginBottom: 30,
  },
  closeButton: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VoiceBotScreen;
