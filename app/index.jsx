import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { buttonStyles, styles } from '@/ui/styles';
import PostItImage from '@/assets/images/post-it.png';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import AppwriteConnectionTest from '@/components/AppwriteConnectionTest';

const HomeScreen = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/notes');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='rebeccapurple' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={PostItImage} style={styles.image} />

      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.subTitle}>
        Create and manage your notes effortlessly
      </Text>
      <TouchableOpacity
        testID='home-get-started'
        style={buttonStyles.button}
        onPress={() => router.push('/notes')}
      >
        <Text style={buttonStyles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <AppwriteConnectionTest />
    </View>
  );
};

export default HomeScreen;
