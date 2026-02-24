import { useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';

export const ThemeStoreHydration = () => {
  useEffect(() => {
    useThemeStore.persist.rehydrate();
  }, []);

  return null;
};
