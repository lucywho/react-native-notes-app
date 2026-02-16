import { StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LIGHT_THEME } from './theme';

export function getButtonStyles(colors) {
  return StyleSheet.create({
    button: {
      backgroundColor: colors.primaryButtonBackground,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      left: 20,
      backgroundColor: colors.secondaryButtonBackground,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    addButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    landscapeAddButton: {
      position: 'relative',
      height: 50,
      backgroundColor: colors.secondaryButtonBackground,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      marginLeft: 10,
    },
    cancelButton: {
      backgroundColor: colors.cancelText,
      padding: 10,
      borderRadius: 5,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    saveButton: {
      backgroundColor: colors.secondaryButtonBackground,
      padding: 10,
      borderRadius: 5,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 5,
      marginTop: 20,
    },
    landscapeButtonContainer: {
      flexDirection: 'column',
      flex: 0,
      gap: 5,
      justifyContent: 'flex-end',
    },
  });
}

export function useButtonStyles() {
  const { theme } = useTheme();
  return getButtonStyles(theme);
}

export const buttonStyles = getButtonStyles(LIGHT_THEME);
