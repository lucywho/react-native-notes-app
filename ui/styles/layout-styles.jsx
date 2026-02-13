import { StyleSheet, Platform } from 'react-native';
import { COLOURS } from './colours';

// iOS 20+ uses system default in header buttons; iOS < 20 needs contrast background
const IOS_VERSION = Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : 0;
const ios20Plus = Platform.OS === 'ios' && IOS_VERSION < 20;

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
    paddingRight: ios20Plus ? 10 : 0,
    paddingLeft: 10,
    borderRadius: 20,
    backgroundColor: ios20Plus ? COLOURS.primaryBackground : 'transparent',
    ...(Platform.OS === 'ios'),
  },
  logoutButtonText: {
    fontSize: 16,
    color: COLOURS.secondaryBackground,
    fontWeight: 'bold',
  },
});
