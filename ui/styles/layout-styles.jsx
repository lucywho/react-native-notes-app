import { StyleSheet, Platform } from 'react-native';
import { COLOURS } from './colours';

export const layoutStyles = StyleSheet.create({
  screenStyles: {
    headerStyle: {
      backgroundColor: COLOURS.secondaryBackground,
    },
    headerTintColor: COLOURS.primaryBackground,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    contentStyle: {
      backgroundColor: COLOURS.primaryBackground,
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
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: COLOURS.primaryBackground,
    ...(Platform.OS === 'ios' && {
      overflow: 'hidden',
    }),
  },
  logoutButtonText: {
    fontSize: 16,
    color: COLOURS.secondaryBackground,
    fontWeight: 'bold',
  },
});
