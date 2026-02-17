import { useRouter } from 'expo-router';
import { useLayoutStyles } from '@/ui/styles';
import { useAuth } from '@/contexts/AuthContext';
import { TouchableOpacity, Text } from 'react-native';

export const HeaderLogout = () => {
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
