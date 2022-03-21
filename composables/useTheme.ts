const themes: string[] = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];

const useTheme = () => {
  const theme = useState('theme', () => 'light');
  const changeTheme = (state: string) => {
    theme.value = state;
  };

  return {
    themes: readonly(themes),
    theme: readonly(theme),
    changeTheme,
  };
};

export default useTheme;
