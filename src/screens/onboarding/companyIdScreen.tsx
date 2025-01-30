import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CompanyIdScreen: React.FC = () => {
  const navigation = useNavigation();
  const [companyID, setCompanyID] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Company ID Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Type Company ID..."
        value={companyID}
        onChangeText={setCompanyID}
      />
      <Button
        title="Continue"
        onPress={() => navigation.navigate('PickVoice')}
      />
    </View>
  );
};

export default CompanyIdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    marginBottom: 20,
  },
});
