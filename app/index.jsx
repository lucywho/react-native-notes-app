import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import PostItImage from '@/assets/images/post-it.png';
import { useButtonStyles, useStyles } from '@/ui/styles';
import { Image, Text, Pressable, View, ActivityIndicator } from 'react-native';

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
      <Pressable
        testID='home-get-started'
        style={({ pressed }) => ({
          ...buttonStyles.button,
          opacity: pressed ? 0.7 : 1,
        })}
        onPress={() => {
          try {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          } catch {
            // Do nothing if haptics fail
          }
          router.push('/notes');
        }}
      >
        <Text style={buttonStyles.buttonText}>Get Started</Text>
      </Pressable>
      {__DEV__ && (
        <Pressable
          testID='home-storybook'
          style={({ pressed }) => ({
            ...buttonStyles.button,
            backgroundColor: 'firebrick',
            opacity: pressed ? 0.7 : 0.5,
            marginTop: 20,
          })}
          onPress={() => router.push('/storybook')}
        >
          <Text style={buttonStyles.buttonText}>Storybook</Text>
        </Pressable>
      )}
    </View>
  );
};

export default HomeScreen;
