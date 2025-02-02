import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splash/splashScreen';
import OnboardingNavigator from './onboarding/onboardingNavigator';
import MainNavigator from './main/mainNavigator';
import { Linking } from 'react-native';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [initialRoute, setInitialRoute] = useState('Onboarding');

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('RootNavigator detected deep link URL:', url);
        setInitialRoute('Main');
      }
    });
  }, []);

  useEffect(() => {
    console.log('Initial route set to:', initialRoute);
  }, [initialRoute]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
}
