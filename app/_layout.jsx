import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { useLayoutStyles } from '@/ui/styles';
import { useWindowDimensions } from 'react-native';
import { HeaderLogout } from '@/components/HeaderLogout';
import {
  AuthProvider,
  useAuth,
  ThemeProvider,
  useTheme,
  QueryProvider,
} from '@/contexts';

const AppContent = () => {
  const { colorScheme, theme } = useTheme();
  const { width, height } = useWindowDimensions();
  const { user } = useAuth();
  const layoutStyles = useLayoutStyles();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.primaryBackground);
  }, [theme.primaryBackground, width, height]);

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          ...layoutStyles.screenStyles,
          ...(user && { headerRight: () => <HeaderLogout /> }),
        }}
      >
        <Stack.Screen name='index' options={{ title: 'Home' }} />
        <Stack.Screen name='notes' options={{ headerTitle: 'Notes' }} />
        <Stack.Screen name='auth' options={{ headerTitle: 'Login' }} />
        <Stack.Screen
          name='verify'
          options={{ headerTitle: 'Verify Email', headerShown: false }}
        />
        {__DEV__ && (
          <Stack.Screen name='storybook' options={{ headerShown: false }} />
        )}
      </Stack>
    </>
  );
};

const RootLayout = () => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
