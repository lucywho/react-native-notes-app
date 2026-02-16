import { StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LIGHT_THEME } from './theme';

export function getStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.primaryBackground,
    },
    landscapeContainer: {
      flex: 1,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: colors.primaryBackground,
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      marginBottom: 20,
      borderRadius: 10,
    },
    activityIndicatorColour: {
      color: colors.activityIndicator,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.primaryText,
    },
    subTitle: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.secondaryText,
      marginBottom: 20,
    },
    linkText: {
      color: colors.linkText,
      textDecorationLine: 'underline',
    },
    noteItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: colors.noteItemBackground,
      borderRadius: 5,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.inputBorder,
      marginVertical: 5,
    },
    noteText: {
      fontSize: 16,
      flex: 1,
      marginRight: 10,
    },
    text: {
      fontSize: 16,
      color: colors.primaryText,
    },
    errorText: {
      color: colors.errorText,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
    },
    successText: {
      color: colors.successText,
    },
    noteActions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: 70,
    },
    deleteNoteText: {
      color: colors.errorText,
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    editNoteText: {
      color: colors.editNoteText,
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      marginRight: 10,
      paddingVertical: 4,
      paddingHorizontal: 6,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      borderRadius: 4,
      color: colors.primaryText,
      backgroundColor: colors.primaryBackground,
    },
    authInputField: {
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      borderRadius: 4,
      paddingVertical: 4,
      paddingHorizontal: 6,
      width: '70%',
      color: colors.primaryText,
      backgroundColor: colors.primaryBackground,
    },
  });
}

export function useStyles() {
  const { theme } = useTheme();
  return getStyles(theme);
}

export const styles = getStyles(LIGHT_THEME);
