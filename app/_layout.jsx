import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useLayoutStyles } from '@/ui/styles';
import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { TouchableOpacity, Text, useWindowDimensions } from 'react-native';

const HeaderLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const layoutStyles = useLayoutStyles();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <TouchableOpacity style={layoutStyles.logoutButton} onPress={handleLogout}>
      <Text style={layoutStyles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const StackWithHeader = () => {
  const { user } = useAuth();
  const layoutStyles = useLayoutStyles();

  return (
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
    </Stack>
  );
};

const ThemeAwareContent = () => {
  const { colorScheme, theme } = useTheme();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.primaryBackground);
  }, [theme.primaryBackground, width, height]);

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <AuthProvider>
        <StackWithHeader />
      </AuthProvider>
    </>
  );
};

const RootLayout = () => {
  return (
    <ThemeProvider>
      <ThemeAwareContent />
    </ThemeProvider>
  );
};

export default RootLayout;
