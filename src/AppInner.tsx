import React, {useEffect, useRef, useState} from 'react';
import {Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigation/rootNavigator';
import {linking} from './navigation/linking';
import {useBottomSheet} from './hooks/useBottomSheet';

export default function AppInner() {
  const {setDeepLinkSettings, setDeepLinkTarget} = useBottomSheet();
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        console.log('Initial URL:', initialUrl);
        if (initialUrl) {
          setInitialRoute('MainStack');
        } else {
          setInitialRoute('Onboarding');
        }
      } catch (error) {
        console.error('Error getting initial URL:', error);
        setInitialRoute('Onboarding');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleDeepLink = (url) => {
      if (url && url.includes('/settings')) {
        console.log('[DeepLink] Received URL:', url);
        setDeepLinkSettings(true);
        if (url.toLowerCase().includes('setcompanyid')) {
          setDeepLinkTarget(true);
        } else {
          setDeepLinkTarget(false);
        }
      }
    };

    Linking.getInitialURL().then(handleDeepLink).catch(console.error);
    const subscription = Linking.addEventListener('url', event => {
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
      {initialRoute && <RootNavigator initialRoute={initialRoute} />}
    </NavigationContainer>
  );
}
