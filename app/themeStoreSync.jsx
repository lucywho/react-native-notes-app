import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';

export const ThemeStoreSync = () => {
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      useThemeStore.getState().setThemeFromSystem(colorScheme);
    });
    return () => subscription.remove();
  }, []);
  return null;
};
