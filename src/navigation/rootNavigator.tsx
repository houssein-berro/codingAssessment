import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingNavigator from './onboarding/onboardingNavigator';
import MainNavigator from './main/mainNavigator';
import SplashScreen from '../screens/splash/splashScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="MainStack" component={MainNavigator} />
    </Stack.Navigator>
  );
}
