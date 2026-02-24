import React from 'react';
import { useRouter } from 'expo-router';
import { useThemeStore } from '../stores/themeStore';
import { AuthProvider } from '../contexts/AuthContext';
import { Switch, Text, Pressable, View } from 'react-native';

import type { Preview } from '@storybook/react-native';

const ThemeAndHomeDecorator = (Story) => {
  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);
  const colorScheme = useThemeStore((state) => state.colorScheme);
  const isDark = colorScheme === 'dark';

  const setTheme = (value: 'light' | 'dark') => {
    useThemeStore.getState().setColorScheme(value);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.primaryBackground }}>
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
        <Pressable
          onPress={() => router.replace('/')}
          style={({ pressed }) => ({
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginRight: 8,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: '#007AFF' }}>← Home</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ color: '#333', fontSize: 12 }}>Light</Text>
          <Switch
            value={isDark}
            onValueChange={() => setTheme(isDark ? 'light' : 'dark')}
            trackColor={{ false: '#ccc', true: '#007AFF' }}
            thumbColor='#fff'
          />
          <Text style={{ color: '#333', fontSize: 12 }}>Dark</Text>
        </View>
      </View>
      <AuthProvider>
        <Story />
      </AuthProvider>
    </View>
  );
};

const preview: Preview = {
  decorators: [ThemeAndHomeDecorator],
};

export default preview;
