const body = document.getElementById('body');
const themeSwitch = document.getElementById('theme-switch');
const themes = {
  LIGHT: 'light',
  DARK: 'dark',
};

const loadTheme = () => {
  const storedTheme =
    localStorage.getItem('data-theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches
      ? themes.LIGHT
      : themes.DARK);

  document.documentElement.setAttribute('data-theme', storedTheme);
  themeSwitch.checked = storedTheme === themes.DARK;
};

const addColorTransition = () => {
  body.classList.add('body-colors-transition');
};

themeSwitch.onclick = () => {
  if (!body.classList.contains('body-colors-transition')) {
    addColorTransition();
  }

  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === themes.LIGHT ? themes.DARK : themes.LIGHT;

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('data-theme', newTheme);
};

loadTheme();
