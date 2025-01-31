import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../../screens/settings/settingsScreen';
import SetCompanyScreen from '../../screens/settings/setCompanyScreen';
import CompanyIdScreen from '../../screens/onboarding/companyIdScreen';
import VoicesScreen from '../../screens/onboarding/voicesScreen';
import MainNavigator from '../main/mainNavigator';
import PickVoiceScreen from '../../screens/onboarding/voicesScreen';
import BottomSheet from '@gorhom/bottom-sheet';
const SettingsStack = createStackNavigator();
interface SettingsNavigatorProps {
  bottomSheetRef?: React.RefObject<BottomSheet>;
}

export default function SettingsNavigator({ bottomSheetRef }: SettingsNavigatorProps) {
  return (
    <SettingsStack.Navigator initialRouteName='Settings'>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen name="SetCompanyID" component={SetCompanyScreen} />
      <SettingsStack.Screen name="EnterCompanyID" component={CompanyIdScreen} />
      <SettingsStack.Screen
        name="PickVoice"
        children={(props) => <PickVoiceScreen {...props} bottomSheetRef={bottomSheetRef} />}
      />
      <SettingsStack.Screen name="MainStack" component={MainNavigator} />
    </SettingsStack.Navigator>
  );
}
