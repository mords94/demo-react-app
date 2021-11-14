import React, { useCallback, useContext } from 'react';
import { useLocalStorage } from 'react-use';
import { Helmet } from 'react-helmet';

type ThemeType = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeType;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<ThemeType>('theme', 'dark');

  const toggleTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [setTheme, theme]);

  const isDark = theme === 'light';

  const themeDir = isDark ? 'vela-blue' : 'saga-blue';

  return (
    <ThemeContext.Provider
      value={{ theme: theme ?? 'dark', toggleTheme, isDark }}
    >
      <Helmet>
        <link rel="stylesheet" href={`/themes/${themeDir}/theme.css`} />
      </Helmet>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
