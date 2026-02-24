import { useThemeStore } from '@/stores/themeStore';

export function useTheme() {
  const theme = useThemeStore((state) => state.theme);
  const colorScheme = useThemeStore((state) => state.colorScheme);
  return { theme, colorScheme };
}
