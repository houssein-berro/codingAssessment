import React from 'react';
import { BottomSheetProvider } from './hooks/useBottomSheet'; 
import AppInner from './AppInner';

export default function App() {
  return (
    <BottomSheetProvider>
      <AppInner />
    </BottomSheetProvider>
  );
}
