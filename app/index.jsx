import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import PostItImage from '@/assets/images/post-it.png';
import { useButtonStyles, useStyles } from '@/ui/styles';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

const HomeScreen = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const styles = useStyles();
  const buttonStyles = useButtonStyles();
  const { theme } = useTheme();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/notes');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={theme.activityIndicator} />
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
      {__DEV__ && (
        <TouchableOpacity
          testID='home-storybook'
          style={[
            buttonStyles.button,
            { backgroundColor: 'firebrick', opacity: 0.5, marginTop: 20 },
          ]}
          onPress={() => router.push('/storybook')}
        >
          <Text style={buttonStyles.buttonText}>Storybook</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeScreen;
