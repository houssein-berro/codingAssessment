import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VoicesScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick Voice Screen</Text>
      <Button
        title="Dismiss"
        onPress={() => {
          navigation.navigate('MainStack');
        }}
      />
    </View>
  );
};

export default VoicesScreen;

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
});
