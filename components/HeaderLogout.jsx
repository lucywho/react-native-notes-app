import { useRouter } from 'expo-router';
import { useLayoutStyles } from '@/ui/styles';
import { useAuth } from '@/contexts/AuthContext';
import { Pressable, Text } from 'react-native';

export const HeaderLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const layoutStyles = useLayoutStyles();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <Pressable
      onPress={handleLogout}
      style={({ pressed }) => ({
        ...layoutStyles.logoutButton,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text style={layoutStyles.logoutButtonText}>Logout</Text>
    </Pressable>
  );
};
