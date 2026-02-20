import React from 'react';
import { useRouter } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import type { Preview } from '@storybook/react-native';
import {
  Appearance,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const ThemeAndHomeDecorator = (Story) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const setTheme = (value: 'light' | 'dark') => {
    if (Appearance.setColorScheme) {
      Appearance.setColorScheme(value);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 8,
          gap: 8,
          alignItems: 'center',
          backgroundColor: '#eee',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}
      >
        <TouchableOpacity
          onPress={() => router.replace('/')}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginRight: 8,
          }}
        >
          <Text style={{ color: '#007AFF' }}>← Home</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ color: '#333', fontSize: 12 }}>Light</Text>
          <Switch
            value={isDark}
            onValueChange={(dark) => setTheme(dark ? 'dark' : 'light')}
            trackColor={{ false: '#ccc', true: '#007AFF' }}
            thumbColor='#fff'
          />
          <Text style={{ color: '#333', fontSize: 12 }}>Dark</Text>
        </View>
      </View>
      <ThemeProvider>
        <AuthProvider>
          <Story />
        </AuthProvider>
      </ThemeProvider>
    </View>
  );
};

const preview: Preview = {
  decorators: [ThemeAndHomeDecorator],
};

export default preview;
