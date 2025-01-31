import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function MainScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('SettingsStack')}>
        <IonIcon name="settings-outline" size={24} color="#4F8EF7" />
      </TouchableOpacity>

      <Text style={styles.title}>Main Screen</Text>

      <TouchableOpacity
        style={styles.voicebotButton}
        onPress={() => navigation.navigate('Voicebot')}>
        <Text style={styles.buttonText}>Launch Voicebot Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  settingsButton: {
    position: 'absolute',
    top: 50, // Adjust based on status bar height
    left: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  voicebotButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
