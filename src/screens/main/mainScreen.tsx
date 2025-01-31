import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from '../../components/primaryButton/primaryButton';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import SettingsNavigator from '../../navigation/settings/settingsNavigator';

const MainScreen = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { bottomSheetRef } = useBottomSheet();

  const animateIcon = (toValue: number) => {
    Animated.timing(rotateAnim, {
      toValue,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleSheetChanges = (index: number) => {
    const sheetIsOpen = index !== -1;
    setIsSheetOpen(sheetIsOpen);
    animateIcon(sheetIsOpen ? 1 : 0);
  };

  const toggleSettings = () => {
    if (bottomSheetRef.current) {
      const isOpen = bottomSheetRef.current.snapToIndex(0) !== -1;
      isOpen ? bottomSheetRef.current.close() : bottomSheetRef.current.snapToIndex(0);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.settingsButton} onPress={toggleSettings}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}
          >
            <IonIcon name="settings-outline" size={28} color="#4F8EF7" />
          </Animated.View>
        </TouchableOpacity>

        <Text style={styles.title}>Main Screen</Text>
        <PrimaryButton
          title="Launch Voicebot Screen"
          onPress={() => navigation.navigate('Voicebot')}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['90%']}
        enablePanDownToClose
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          {isSheetOpen && <SettingsNavigator />}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  bottomSheetContainer: {
    flex: 1,
    width: '100%',
  },
});

export default MainScreen;