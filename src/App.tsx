import React, {useEffect} from 'react';
import {BottomSheetProvider} from './hooks/useBottomSheet';
import AppInner from './AppInner';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BottomSheetProvider>
      <AppInner />
    </BottomSheetProvider>
  );
}
