import React, { createContext, useState, useEffect } from 'react';

   export const ThemeContext = createContext();

   const ThemeProvider = ({ children }) => {
       const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

       useEffect(() => {
           const root = document.documentElement;
           const applyTheme = (themeToApply) => {
               root.classList.remove('light', 'dark');
               root.classList.add(themeToApply);
               localStorage.setItem('theme', themeToApply);
           };

           const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

           if (theme === 'system') {
               applyTheme(systemTheme);
           } else {
               applyTheme(theme);
           }
       }, [theme]);

       useEffect(() => {
           const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
           const handleSystemThemeChange = (e) => {
               if (theme === 'system') {
                   const newTheme = e.matches ? 'dark' : 'light';
                   document.documentElement.classList.remove('light', 'dark');
                   document.documentElement.classList.add(newTheme);
               }
           };

           mediaQuery.addEventListener('change', handleSystemThemeChange);
           return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
       }, [theme]);

       const toggleTheme = (newTheme) => {
           setTheme(newTheme);
       };

       return (
           <ThemeContext.Provider value={{ theme, toggleTheme }}>
               {children}
           </ThemeContext.Provider>
       );
   };

   export default ThemeProvider;