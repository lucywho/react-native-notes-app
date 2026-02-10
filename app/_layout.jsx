import { layoutStyles } from '@/ui/styles';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const HeaderLogout = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return user ? (
    <TouchableOpacity style={layoutStyles.logoutButton} onPress={handleLogout}>
      <Text style={layoutStyles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  ) : null;
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          ...layoutStyles.screenStyles,
          headerRight: () => <HeaderLogout />,
        }}
      >
        <Stack.Screen name='index' options={{ title: 'Home' }} />
        <Stack.Screen name='notes' options={{ headerTitle: 'Notes' }} />
        <Stack.Screen name='auth' options={{ headerTitle: 'Login' }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
