import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsScreen from '../../screens/settings/settingsScreen';
import SetCompanyScreen from '../../screens/settings/setCompanyScreen';
import CompanyIdScreen from '../../screens/onboarding/companyIdScreen';
import VoicesScreen from '../../screens/onboarding/voicesScreen';

const SettingsStack = createStackNavigator();

export default function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="SetCompanyID" component={SetCompanyScreen} />
      <SettingsStack.Screen name="EnterCompanyID" component={CompanyIdScreen} />
      <SettingsStack.Screen name="PickVoice" component={VoicesScreen} />
    </SettingsStack.Navigator>
  );
}
