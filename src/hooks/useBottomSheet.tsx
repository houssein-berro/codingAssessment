import React, { createContext, useContext, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetContext = createContext(null);

export const BottomSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <BottomSheetContext.Provider value={{ bottomSheetRef }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => useContext(BottomSheetContext);
