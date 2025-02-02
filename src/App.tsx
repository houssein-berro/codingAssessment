import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigation/rootNavigator';
import {BottomSheetProvider} from './hooks/useBottomSheet';
import {linking} from './navigation/linking';
import {Linking} from 'react-native';

export default function App() {
    useEffect(() => {
      // Log if the app was launched from a deep link
      Linking.getInitialURL().then(url => {
        if (url) {
          console.log('App launched with URL:', url);
        }
      });

      const handleUrl = event => {
        console.log('Received deep link URL event:', event.url);
      };

      const subscription = Linking.addEventListener('url', handleUrl);
      return () => subscription.remove();
    }, []);
    
    return (
      <BottomSheetProvider>
        <NavigationContainer
          linking={linking}
          onStateChange={state => {
            console.log(
              'Navigation state changed:',
              JSON.stringify(state, null, 2),
            );
          }}>
          <RootNavigator />
        </NavigationContainer>
      </BottomSheetProvider>
    );
  }
