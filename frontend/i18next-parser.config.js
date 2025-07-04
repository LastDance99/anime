module.exports = {
  locales: ['ko', 'en', 'es'],
  defaultNamespace: 'translation',
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  output: 'src/locales/$LOCALE.json',
  keySeparator: false, // "login.title" 같은 점 표기 허용
  namespaceSeparator: false,
  keepRemoved: true,
  sort: true,
};