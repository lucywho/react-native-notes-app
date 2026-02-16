import {
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useColorScheme } from 'react-native';
import { getThemeForScheme } from '@/ui/styles/theme';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();

  const value = useMemo(() => {
    const theme = getThemeForScheme(colorScheme);
    return {
      theme,
      colorScheme: colorScheme ?? 'light',
    };
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
