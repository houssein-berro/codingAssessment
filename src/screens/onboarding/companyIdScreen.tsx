import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {SafeAreaWrapper} from '../../components/safeArea/safeArea';
import {PrimaryButton} from '../../components/primaryButton/primaryButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useBottomSheet} from '../../hooks/useBottomSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterCompanyID = () => {
  const [companyId, setCompanyId] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const shakeAnim = useState(new Animated.Value(0))[0];

  const navigation = useNavigation();
  const route = useRoute();
  const {fromSettings} = route.params || {};
  const {bottomSheetRef} = useBottomSheet();

  const fetchCompanyIds = async () => {
    try {
      const storedIds = await AsyncStorage.getItem('companyIds');
      return storedIds ? JSON.parse(storedIds) : [];
    } catch (error) {
      console.error('Error fetching company IDs:', error);
      return [];
    }
  };

  const handleChangeText = async text => {
    const trimmedText = text.toUpperCase().trim();
    setCompanyId(trimmedText);
    setError('');

    const validCompanyIds = await fetchCompanyIds();

    if (trimmedText.length > 0 && !validCompanyIds.includes(trimmedText)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleContinue = async () => {
    if (isValid) {
      try {
        const existingIds = await fetchCompanyIds();
        if (existingIds.includes(companyId)) {
          Alert.alert('Duplicate ID', 'This Company ID is already added.');
          return;
        }

        const updatedIds = [...existingIds, companyId];
        await AsyncStorage.setItem('companyIds', JSON.stringify(updatedIds));
        Alert.alert('Success', 'Company ID added successfully.');

        if (fromSettings) {
          Keyboard.dismiss();
          navigation.goBack();
        } else {
          navigation.navigate('PickVoice');
        }
      } catch (error) {
        console.error('Error saving company ID:', error);
        Alert.alert('Error', 'Failed to save Company ID.');
      }
    } else {
      setError('❌ Invalid or Duplicate Company ID. Please try again.');

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
    }
  };
  useEffect(() => {
    console.log('fromSettings:', fromSettings);
  }, [fromSettings]);
  
  return (
    <SafeAreaWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.flexContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Enter Your Company ID</Text>
            <Text style={styles.subtitle}>
              Please enter your unique company ID to continue.
            </Text>

            <Animated.View
              style={[
                styles.inputContainer,
                {transform: [{translateX: shakeAnim}]},
              ]}>
              <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                placeholder="Company ID"
                placeholderTextColor="#888"
                value={companyId}
                onChangeText={handleChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType="default"
                autoCapitalize="characters"
              />
            </Animated.View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <View style={styles.footer}>
            <View style={styles.separator} />
            {!fromSettings ? (
              <PrimaryButton title="Continue" onPress={handleContinue} />
            ) : (
              <PrimaryButton title="Enter" onPress={handleContinue} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaWrapper>
  );
};

export default EnterCompanyID;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 320,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    textAlign: 'center',
    color: '#222',
  },
  inputFocused: {
    borderColor: '#2196F3',
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
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
