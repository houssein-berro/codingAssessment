import React, { useCallback, useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SettingsNavigator from '../../navigation/settings/settingsNavigator';
import { PrimaryButton } from '../../components/primaryButton/primaryButton';

const { height } = Dimensions.get('window');

const MainScreen = () => {
  const [open, setOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const animateIcon = (toValue: number) => {
    Animated.timing(rotateAnim, {
      toValue,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateIcon(open ? 1 : 0);
  }, [open]);

  const handleSheetChanges = useCallback((index: number) => {
    setOpen(index === 0);
  
    if (index === -1) {
      navigation.setParams({ screen: 'Settings' });
    }
  }, [navigation]);

  const toggleSettings = () => {
    if (open) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.snapToIndex(0);
    }
    setOpen(!open);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.settingsButton} onPress={toggleSettings}>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <IonIcon name="settings-outline" size={28} color="#4F8EF7" />
          </Animated.View>
        </TouchableOpacity>

        <Text style={styles.title}>Main Screen</Text>

        <PrimaryButton title="Launch Voicebot Screen" onPress={() => navigation.navigate('Voicebot')} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[height * 0.9]}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#FFFFFF' }}
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          <SettingsNavigator bottomSheetRef={bottomSheetRef} />
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
    backgroundColor: '#FFFFFF',
  },
});

export default MainScreen;
