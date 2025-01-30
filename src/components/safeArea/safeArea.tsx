import React from 'react';
import { SafeAreaView, StyleSheet, ViewProps } from 'react-native';

export function SafeAreaWrapper({ children, style }: ViewProps) {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
});
