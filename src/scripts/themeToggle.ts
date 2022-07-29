const loadTheme = () => {
  const storedTheme =
    localStorage.getItem('theme') ||
    window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
};

export default loadTheme;
