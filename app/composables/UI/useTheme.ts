export type ThemeModes = 'dark' | 'blue' | 'grey' | 'red' | 'light';

export const useTheme = () => {
  const colorMode = useColorMode();

  const themeList: ThemeModes[] = ['dark', 'blue', 'grey', 'red', 'light']
  const currentTheme = computed(() => colorMode.preference);

  const setTheme = (mode: ThemeModes) => {
    colorMode.preference = mode;
  }

  return {
    themeList,
    currentTheme,
    setTheme,
  }
}