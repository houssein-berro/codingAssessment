import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from '../../screens/main/mainScreen';
import VoicebotScreen from '../../screens/main/voicebotScreen';
import SettingsNavigator from '../settings/settingsNavigator';
import VoicesScreen from '../../screens/onboarding/voicesScreen';

const MainStack = createStackNavigator();

export default function MainNavigator() {
  return (
    <MainStack.Navigator initialRouteName="Main">
      <MainStack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
      

      <MainStack.Screen
        name="Voicebot"
        component={VoicebotScreen}
        options={{
          presentation: 'modal',
        }}
      />

      <MainStack.Screen name="Settings" component={SettingsNavigator} />
    </MainStack.Navigator>
  );
}
