import { layoutStyles } from '@/ui/styles';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack screenOptions={layoutStyles.screenStyles}>
      <Stack.Screen name='index' options={{ title: 'Home' }} />
      <Stack.Screen name='notes' options={{ headerTitle: 'Notes' }} />
    </Stack>
  );
};

export default RootLayout;
