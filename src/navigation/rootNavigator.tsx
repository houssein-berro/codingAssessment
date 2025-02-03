import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingNavigator from './onboarding/onboardingNavigator';
import MainNavigator from './main/mainNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="MainStack" component={MainNavigator} />
    </Stack.Navigator>
  );
}
