import { themes, themeSwitch } from './constants.js';

export class ThemeManager {
  constructor() {
    this.themeSwitch = themeSwitch;
  }

  loadTheme() {
    const storedTheme =
      localStorage.getItem('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches
        ? themes.LIGHT
        : themes.DARK);

    document.documentElement.setAttribute('data-theme', storedTheme);
    this.themeSwitch.checked = storedTheme === themes.DARK;
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === themes.LIGHT ? themes.DARK : themes.LIGHT;

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('data-theme', newTheme);
  }
}
