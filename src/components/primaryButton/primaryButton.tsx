import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

export function PrimaryButton({title, onPress}: Props) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}>
      <Text style={styles.buttonLabel}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
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
  buttonLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
