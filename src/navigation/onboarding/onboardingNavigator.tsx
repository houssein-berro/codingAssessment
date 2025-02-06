import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../../screens/onboarding/welcomeScreen';
import CompanyIdScreen from '../../screens/onboarding/companyIdScreen';
import MainNavigator from '../main/mainNavigator';
import VoicesScreen from '../../screens/onboarding/voicesScreen';

const OnboardingStack = createStackNavigator();

export default function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <OnboardingStack.Screen
        name="EnterCompanyID"
        component={CompanyIdScreen}
        options={{
          title: 'Enter Company ID',
        }}
      />
      <OnboardingStack.Screen
        name="PickVoice"
        component={VoicesScreen}
        options={{
          title: 'Pick Voice',
          presentation: 'modal',
          animation: 'slide_from_right',
        }}
      />
    </OnboardingStack.Navigator>
  );
}
