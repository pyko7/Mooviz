import { createContext, useEffect, useState } from "react";

const initialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.classList.remove(colorTheme);
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
