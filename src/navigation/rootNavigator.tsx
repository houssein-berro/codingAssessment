import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingNavigator from './onboarding/onboardingNavigator';
import MainNavigator from './main/mainNavigator';
import { Linking } from 'react-native';

const Stack = createStackNavigator();
export default function RootNavigator({initialRoute}) {
useEffect(()=>
{console.log(initialRoute)}
,[])
  return (
    <Stack.Navigator initialRouteName={initialRoute}  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="MainStack" component={MainNavigator} />
    </Stack.Navigator>
  );
}
