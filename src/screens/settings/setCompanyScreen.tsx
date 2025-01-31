import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { PrimaryButton } from '../../components/primaryButton/primaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useBottomSheet } from '../../hooks/useBottomSheet';

const SetCompanyScreen = () => {
  const [companyIds, setCompanyIds] = useState<string[]>([]);
  const navigation = useNavigation();
  const { bottomSheetRef } = useBottomSheet(); 

  useFocusEffect(
    React.useCallback(() => {
      const fetchCompanyIds = async () => {
        try {
          const storedIds = await AsyncStorage.getItem('companyIds');
          setCompanyIds(storedIds ? JSON.parse(storedIds) : []);
        } catch (error) {
          console.error('Error fetching company IDs:', error);
        }
      };

      fetchCompanyIds();
    }, [])
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Company ID',
      `Are you sure you want to delete "${id}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedIds = companyIds.filter((item) => item !== id);
              await AsyncStorage.setItem('companyIds', JSON.stringify(updatedIds));
              setCompanyIds(updatedIds);
              Alert.alert('Success', 'Company ID deleted successfully.');
            } catch (error) {
              console.error('Error deleting company ID:', error);
              Alert.alert('Error', 'Failed to delete Company ID.');
            }
          },
        },
      ]
    );
  };

  const handleSelect = (id: string) => {
    Alert.alert('Selected Company ID', `You selected "${id}".`);
  };

  const handleAddCompanyId = () => {
    navigation.navigate('EnterCompanyId', { fromSettings: true });
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleSelect(item)} style={styles.cardContent}>
        <Text style={styles.companyText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#E53935" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Company IDs</Text>
      <Text style={styles.subtitle}>Select or delete existing Company IDs:</Text>

      {companyIds.length > 0 ? (
        <FlatList
          data={companyIds}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#9CA3AF" />
          <Text style={styles.noDataText}>No company IDs found.</Text>
        </View>
      )}

      <View style={styles.footer}>
        <PrimaryButton title="Add New Company ID" onPress={handleAddCompanyId} />
      </View>
    </View>
  );
};
export default SetCompanyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardContent: {
    flex: 1,
  },
  companyText: {
    fontSize: 16,
    color: '#1F2937',
  },
  deleteButton: {
    padding: 5,
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 10,
  },
  footer: {
    marginBottom: 100,
    width: '100%',
  },
});
