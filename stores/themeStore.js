import { create } from 'zustand';
import { Appearance } from 'react-native';
import { getThemeForScheme } from '@/ui/styles/theme';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resolveTheme = (colorScheme) => {
  const effectiveScheme =
    colorScheme === 'system'
      ? (Appearance.getColorScheme() ?? 'light')
      : colorScheme;
  return getThemeForScheme(effectiveScheme);
};

export const useThemeStore = create(
  persist(
    (set) => ({
      colorScheme: 'system',
      theme: resolveTheme('system'),

      setColorScheme: (scheme) =>
        set({
          colorScheme: scheme,
          theme: resolveTheme(scheme),
        }),

      setThemeFromSystem: (systemScheme) =>
        set((state) => {
          if (state.colorScheme !== 'system') return state;
          return {
            theme: getThemeForScheme(systemScheme ?? 'light'),
          };
        }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ colorScheme: state.colorScheme }),
      merge: (persistedState, currentState) => {
        const colorScheme =
          persistedState?.colorScheme ?? currentState.colorScheme;
        return {
          ...currentState,
          colorScheme,
          theme: resolveTheme(colorScheme),
        };
      },
    },
  ),
);
