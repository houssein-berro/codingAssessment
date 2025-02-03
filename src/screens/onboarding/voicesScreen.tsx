import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { SafeAreaWrapper } from '../../components/safeArea/safeArea';
import { PrimaryButton } from '../../components/primaryButton/primaryButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBottomSheet } from '../../hooks/useBottomSheet';

const VOICES = [
  { id: '1', name: 'English - Male' },
  { id: '2', name: 'English - Female' },
  { id: '3', name: 'French - Male' },
  { id: '4', name: 'French - Female' },
  { id: '5', name: 'Arabic - Male' },
  { id: '6', name: 'Arabic - Female' },
];

export default function PickVoiceScreen() {
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [error, setError] = useState('');
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const route = useRoute();
  const { fromSettings } = route.params || {}; 
  const { bottomSheetRef } = useBottomSheet();

  const handleSelectVoice = (voiceId: string) => {
    setSelectedVoice(voiceId);
    setError('');

    if (fromSettings && bottomSheetRef?.current) {
      bottomSheetRef.current.close();
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Settings' }], 
        });
      }, 300);
    }
  };

  const handleContinue = () => {
    if (!selectedVoice) {
      setError('❌ Please select a voice before continuing.');

      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 5,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();

      return;
    }

    if (fromSettings && bottomSheetRef?.current) {
      bottomSheetRef.current.close();
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Settings' }],
        });
      }, 300);
    } else {
      navigation.navigate('MainStack');
    }
  };

  return (
    <SafeAreaWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.flexContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Pick a Voice</Text>
            <Text style={styles.subtitle}>Choose your preferred voice below:</Text>

            <FlatList
              data={VOICES}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.voiceOption,
                    selectedVoice === item.id && styles.voiceOptionSelected,
                  ]}
                  onPress={() => handleSelectVoice(item.id)}
                >
                  <Text style={[styles.voiceText]}>{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContainer}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <View style={styles.footer}>
            <PrimaryButton title="Continue" onPress={handleContinue} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaWrapper>
  );
}


const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  contentHigher: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  listContainer: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    width: '100%',
  },
  voiceOption: {
    flex: 1,
    maxWidth: '48%',
    paddingVertical: 18,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceOptionSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#1D4ED8',
  },
  voiceText: {
    fontSize: 17,
    color: '#1F2937',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 0,
  },
  footerContainer: {
    width: '100%',
    backgroundColor: '#fff',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
  },
});
