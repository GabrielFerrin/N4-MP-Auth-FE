function getSystemTheme() {
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');

  if (darkModeQuery.matches) {
    return 'dark';
  } else if (lightModeQuery.matches) {
    return 'light';
  } else {
    return 'unknown';
  }
}

export default getSystemTheme