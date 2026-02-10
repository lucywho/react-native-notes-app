import { Stack } from 'expo-router';
import { layoutStyles } from '@/ui/styles';
import { AuthProvider } from '@/contexts/AuthContext';

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={layoutStyles.screenStyles}>
        <Stack.Screen name='index' options={{ title: 'Home' }} />
        <Stack.Screen name='notes' options={{ headerTitle: 'Notes' }} />
        <Stack.Screen name='auth' options={{ headerTitle: 'Login' }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
