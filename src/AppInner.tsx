import React, { useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/rootNavigator';
import { linking } from './navigation/linking';
import { useBottomSheet } from './hooks/useBottomSheet';

export default function AppInner() {
  const { setDeepLinkSettings, setDeepLinkTarget } = useBottomSheet();
  const navigationRef = useRef(null);
  const [deepLinkUrl, setDeepLinkUrl] = useState(null);

  useEffect(() => {
    const handleDeepLink = (url) => {
      if (url && url.includes('/settings')) {
        setDeepLinkUrl(url);
        setDeepLinkSettings(true);
        if (url.toLowerCase().includes('setcompanyid')) {
          setDeepLinkTarget(true);
        } else {
          setDeepLinkTarget(false);
        }
      }
    };

    Linking.getInitialURL().then((url) => {
      handleDeepLink(url);
    });

    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      } else {
        Linking.removeEventListener('url', handleDeepLink);
      }
    };
  }, [setDeepLinkSettings, setDeepLinkTarget]);

  return (
    <NavigationContainer>
  <RootNavigator />
</NavigationContainer>

  );
}
