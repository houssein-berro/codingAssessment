// components/primaryButton/primaryButton.tsx
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function PrimaryButton({ title, onPress, disabled }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled, // Apply disabled style
      ]}
      onPress={disabled ? undefined : onPress} // Prevent press if disabled
      disabled={disabled}
    >
      <Text style={[styles.buttonLabel, disabled && styles.buttonLabelDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: 280,
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonPressed: {
    backgroundColor: '#1976D2',
  },
  buttonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonLabelDisabled: {
    color: '#ECEFF1',
  },
});
