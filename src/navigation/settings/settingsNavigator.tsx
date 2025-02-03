import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../../screens/settings/settingsScreen';
import SetCompanyScreen from '../../screens/settings/setCompanyScreen';
import EnterCompanyID from '../../screens/onboarding/companyIdScreen';
import PickVoiceScreen from '../../screens/onboarding/voicesScreen';

const SettingsStack = createStackNavigator();

const SettingsNavigator = ({ initialRoute }) => {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
        initialParams={{ deepLinkTarget: initialRoute }} 
      />
      <SettingsStack.Screen name="SetCompanyID" component={SetCompanyScreen} />
      <SettingsStack.Screen name="EnterCompanyId" component={EnterCompanyID} />
      <SettingsStack.Screen name="PickVoice" component={PickVoiceScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
