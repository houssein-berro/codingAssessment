import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingNavigator from './onboarding/onboardingNavigator';
import MainNavigator from './main/mainNavigator';
import { Linking } from 'react-native';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [initialRoute, setInitialRoute] = useState('Onboarding');

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url && url.includes('/settings')) {
        setInitialRoute('MainStack');
      }
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="MainStack" component={MainNavigator} />
    </Stack.Navigator>
  );
}
