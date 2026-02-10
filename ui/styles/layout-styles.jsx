import { StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
  screenStyles: {
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
    headerTintColor: 'antiquewhite',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    contentStyle: {
      backgroundColor: 'antiquewhite',
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
    borderRadius: 5,
    backgroundColor: 'antiquewhite',
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'rebeccapurple',
    fontWeight: 'bold',
  },
});
