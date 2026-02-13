import { layoutStyles } from '@/ui/styles';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const HeaderLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();

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

const RootLayout = () => {
  return (
    <AuthProvider>
      <StackWithHeader />
    </AuthProvider>
  );
};

export default RootLayout;
