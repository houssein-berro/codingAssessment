import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../../screens/main/mainScreen';
import VoicebotScreen from '../../screens/main/voicebotScreen';
import SettingsNavigator from '../settings/settingsNavigator';

const MainStack = createStackNavigator();

export default function MainNavigator() {
  return (
    <MainStack.Navigator initialRouteName="MainScreen">
      <MainStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{headerShown: false, presentation: 'card'}}
      />
      <MainStack.Screen
        name="Voicebot"
        component={VoicebotScreen}
        options={{
          presentation: 'modal',
          animation: 'fade',
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name="SettingsStack"
        component={SettingsNavigator}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
}
