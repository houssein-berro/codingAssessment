import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import { SafeAreaWrapper } from '../../components/safeArea/safeArea';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 🔹 Fade-in animation when the screen loads
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

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
