import React, {useEffect, useRef, useState} from 'react';
import {Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigation/rootNavigator';
import {linking} from './navigation/linking';
import {useBottomSheet} from './hooks/useBottomSheet';

export default function AppInner() {
  const {bottomSheetRef, setDeepLinkSettings} =
    useBottomSheet();
  const navigationRef = useRef(null);
  const [deepLinkDetected, setDeepLinkDetected] = useState(false);

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url && url.includes('/settings')) {
        setDeepLinkSettings(true);
        setDeepLinkDetected(true);
      }
    });

    const handleUrl = event => {
      if (event.url && event.url.includes('/settings')) {
        setDeepLinkSettings(true);
        setDeepLinkDetected(true);
      }
    };

    const subscription = Linking.addEventListener('url', handleUrl);
    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      } else {
        Linking.removeEventListener('url', handleUrl);
      }
    };
  }, [setDeepLinkSettings]);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={() => {
        if (deepLinkDetected && navigationRef.current) {
          navigationRef.current.reset({
            index: 0,
            routes: [{name: 'MainStack'}],
          });
          setTimeout(() => {
            bottomSheetRef.current.snapToIndex(0);
          }, 1000);
        }
      }}>
      <RootNavigator />
    </NavigationContainer>
  );
}
