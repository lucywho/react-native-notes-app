import { StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LIGHT_THEME } from './theme';

export function getModalStyles(colors) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.modalOverlay,
    },
    content: {
      backgroundColor: colors.modalContentBackground,
      padding: 20,
      borderRadius: 10,
      width: '80%',
      maxHeight: '80%',
    },
    landscapeContent: {
      backgroundColor: colors.modalContentBackground,
      padding: 20,
      borderRadius: 10,
      flexDirection: 'row',
      width: '90%',
      maxHeight: '70%',
      gap: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.modalTitle,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.modalInputBorder,
      borderRadius: 5,
      padding: 10,
      color: colors.primaryText,
      backgroundColor: colors.modalContentBackground,
    },
  });
}

export function useModalStyles() {
  const { theme } = useTheme();
  return getModalStyles(theme);
}

export const modalStyles = getModalStyles(LIGHT_THEME);
