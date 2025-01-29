import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../../screens/main/mainScreen';
import VoicebotScreen from '../../screens/main/voicebotScreen';
import SettingsScreen from '../../screens/settings/settingsScreen';

const MainStack = createStackNavigator();

export default function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={MainScreen}
      />
      
      <MainStack.Screen
        name="Voicebot"
        component={VoicebotScreen}
        options={{
          presentation: 'modal',
        }}
      />
      
       <MainStack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </MainStack.Navigator>
  )
}
