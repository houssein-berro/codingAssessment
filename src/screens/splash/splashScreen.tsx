// screens/splash/splashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Linking, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/safeArea/safeArea';

export default function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        navigation.replace('MainStack');
      } else {
        navigation.replace('Onboarding');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);
  
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Welcome to Our App
        </Animated.Text>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 16,
  },
});
