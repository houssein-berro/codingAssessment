import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigation/rootNavigator';
import {BottomSheetProvider} from './hooks/useBottomSheet';

export default function App() {
  return (
    <BottomSheetProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </BottomSheetProvider>
  );
}
