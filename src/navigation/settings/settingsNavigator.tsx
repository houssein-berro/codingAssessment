import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


const SettingsStack = createStackNavigator();

export default function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="SetCompanyID" component={SetCompanyIDScreen} />
      <SettingsStack.Screen name="EnterCompanyID" component={EnterCompanyIDScreen} />
      <SettingsStack.Screen name="PickVoice" component={PickVoiceScreen} />
    </SettingsStack.Navigator>
  );
}
