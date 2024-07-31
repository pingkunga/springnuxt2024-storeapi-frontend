import { useTheme as vuetifyUseTheme } from "vuetify";

export const useTheme = () => {
  const theme = vuetifyUseTheme();

  const loadTheme = () => {
    const storedTheme = localStorage.getItem("theme_store");
    if (storedTheme) {
        theme.global.name.value = storedTheme;
    }
  };

  //Toggle Theme
  const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'lightTheme':'darkTheme'
    localStorage.setItem('theme_store', theme.global.name.value)
  };
  
  return {theme, loadTheme, toggleTheme};
};