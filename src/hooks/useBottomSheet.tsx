import React, { createContext, useContext, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetContext = createContext(null);

export const BottomSheetProvider = ({ children }) => {
  const bottomSheetRef = useRef(null);
  const [deepLinkSettings, setDeepLinkSettings] = useState(false);
  const [deepLinkTarget, setDeepLinkTarget] = useState(false);

  return (
    <BottomSheetContext.Provider
      value={{
        bottomSheetRef,
        deepLinkSettings,
        setDeepLinkSettings,
        deepLinkTarget,
        setDeepLinkTarget,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => useContext(BottomSheetContext);
