import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaWrapper } from '../../components/safeArea/safeArea';
import { PrimaryButton } from '../../components/primaryButton/primaryButton';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaWrapper>
      <View style={styles.flexContainer}>
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://placehold.jp/250x250.png' }}
            style={styles.image}
          />
          <Text style={styles.title}>Welcome to Our App</Text>
          <Text style={styles.description}>
            Start your journey by setting up your company ID and voice preferences.
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.separator} />
          <PrimaryButton
            title="Get Started"
            onPress={() => navigation.navigate('EnterCompanyID')}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
  },
});
