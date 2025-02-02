import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Settings</Text>

      <View style={styles.section}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PickVoice')}>
          <Ionicons name="mic-outline" size={24} color="#4F8EF7" />
          <Text style={styles.optionText}>Pick Voice</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SetCompanyID')}>
          <Ionicons name="business-outline" size={24} color="#4F8EF7" />
          <Text style={styles.optionText}>Set Company ID</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  section: {
    backgroundColor: '#FFFFFF',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 12,
  },
});
