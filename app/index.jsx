import PostItImage from '@/assets/images/post-it.png';
import { buttonStyles, styles } from '@/ui/styles';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={PostItImage} style={styles.image} />

      <Text style={styles.title}>Welcome to Notes App</Text>
      <Text style={styles.subTitle}>
        Create and manage your notes effortlessly
      </Text>
      <TouchableOpacity
        style={buttonStyles.button}
        onPress={() => router.push('/notes')}
      >
        <Text style={buttonStyles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
