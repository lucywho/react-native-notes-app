import React from 'react';
import { useRouter } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import type { Preview } from '@storybook/react-native';
import { Appearance, Switch, Text, TouchableOpacity, View } from 'react-native';

const ThemeToggleDecorator = (Story) => {
  const router = useRouter();
  const [scheme, setScheme] = React.useState<'light' | 'dark'>(
    () => (Appearance.getColorScheme() as 'light' | 'dark') ?? 'light',
  );

  const setTheme = (value: 'light' | 'dark') => {
    if (Appearance.setColorScheme) {
      Appearance.setColorScheme(value);
    }
    setScheme(value);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 8,
          gap: 8,
          alignItems: 'center',
          backgroundColor: scheme === 'dark' ? '#333' : '#eee',
          borderBottomWidth: 1,
          borderBottomColor: scheme === 'dark' ? '#555' : '#ccc',
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
          <Text style={{ color: scheme === 'dark' ? '#0A84FF' : '#007AFF' }}>
            ← Home
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text
            style={{
              color: scheme === 'dark' ? '#fff' : '#007AFF',
              fontSize: 12,
            }}
          >
            Light
          </Text>
          <Switch
            value={scheme === 'dark'}
            onValueChange={(isDark) => setTheme(isDark ? 'dark' : 'light')}
            trackColor={{ false: '#ccc', true: '#007AFF' }}
            thumbColor='#fff'
          />
          <Text
            style={{
              color: scheme === 'dark' ? '#fff' : '#007AFF',
              fontSize: 12,
            }}
          >
            Dark
          </Text>
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
  decorators: [ThemeToggleDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
