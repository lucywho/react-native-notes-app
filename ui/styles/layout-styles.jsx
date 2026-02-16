import { StyleSheet, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LIGHT_THEME } from './theme';

// iOS 20+ uses system default in header buttons; iOS < 20 and android need contrast background
const IOS_VERSION = Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : 0;
const headerButtonBackground =
  (Platform.OS === 'ios' && IOS_VERSION < 20) || Platform.OS === 'android';

export function getLayoutStyles(colors) {
  return StyleSheet.create({
    screenStyles: {
      headerStyle: {
        backgroundColor: colors.secondaryBackground,
      },
      headerTintColor: colors.headerTintColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      contentStyle: {
        backgroundColor: colors.primaryBackground,
      },
      headerTitleAlign: 'center',
      headerBackTitle: 'Back',
      headerBackTitleStyle: {
        fontWeight: 'bold',
      },
    },
    logoutButton: {
      marginRight: 10,
      paddingVertical: 5,
      paddingRight: headerButtonBackground ? 10 : 0,
      paddingLeft: 10,
      borderRadius: 20,
      backgroundColor: headerButtonBackground
        ? colors.primaryBackground
        : 'transparent',
    },
    logoutButtonText: {
      fontSize: 16,
      color: colors.headerButtonText,
      fontWeight: 'bold',
    },
  });
}

export function useLayoutStyles() {
  const { theme } = useTheme();
  return getLayoutStyles(theme);
}

export const layoutStyles = getLayoutStyles(LIGHT_THEME);
