import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Animated,
} from 'react-native';
import {SafeAreaWrapper} from '../../components/safeArea/safeArea';
import {PrimaryButton} from '../../components/primaryButton/primaryButton';
import {useNavigation} from '@react-navigation/native';

// 🔹 Dummy Company IDs
const VALID_COMPANY_IDS = [
  'ABC123',
  'XYZ789',
  'TEST456',
  'HELLO999',
  'COMPANY321',
];

export default function CompanyIdScreen() {
  const [companyId, setCompanyId] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const navigation = useNavigation();
  const shakeAnim = new Animated.Value(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => setKeyboardHeight(e.endCoordinates.height),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleChangeText = (text: string) => {
    setCompanyId(text);
    setError('');

    if (VALID_COMPANY_IDS.includes(text.toUpperCase().trim())) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleContinue = () => {
    if (isValid) {
      navigation.navigate('PickVoice');
    } else {
      setError('❌ Invalid Company ID. Please try again.');

      // 🔹 Shake animation for button
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
  };

  return (
    <SafeAreaWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.flexContainer}>
          {/* Main Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Enter Your Company ID</Text>
            <Text style={styles.subtitle}>
              Please enter your unique company ID to continue.
            </Text>

            {/* Input Field */}
            <TextInput
              style={[styles.input, isFocused && styles.inputFocused]}
              placeholder="Company ID"
              placeholderTextColor="#888"
              value={companyId}
              onChangeText={handleChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              keyboardType="default"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* 🔹 Footer (Matches Pick Voice screen exactly) */}
          <View style={styles.footer}>
            <View style={styles.separator} />
            <Animated.View style={[{transform: [{translateX: shakeAnim}]}]}>
              <PrimaryButton title="Continue" onPress={handleContinue} />
            </Animated.View>
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
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    textAlign: 'center',
    color: '#222',
    marginBottom: 10,
  },
  inputFocused: {
    borderColor: '#2196F3',
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 0,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    padding:20
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
  },
});
